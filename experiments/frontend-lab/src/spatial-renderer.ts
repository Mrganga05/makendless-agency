import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export interface SpatialOptions {
  material: "glass" | "satin";
  roughness: number;
  transmission: number;
  light: "studio" | "warm";
  camera: "perspective" | "front";
  reducedMotion: boolean;
  palette: {
    night: string;
    surface: string;
    paper: string;
    ink: string;
    muted: string;
    mutedDark: string;
    accent: string;
    aqua: string;
    accentLight: string;
  };
}

export interface SpatialRenderer {
  update: (options: SpatialOptions) => void;
  dispose: () => void;
}

/** Owns every GPU resource and listener created for this one, demand-rendered scene. */
export function createSpatialRenderer(
  canvas: HTMLCanvasElement,
  initial: SpatialOptions,
  onFailure: () => void,
): SpatialRenderer {
  const resources = new Set<{ dispose: () => void }>();
  const own = <T extends { dispose: () => void }>(resource: T): T => {
    resources.add(resource);
    return resource;
  };
  let disposed = false;
  let frame = 0;
  let visible = true;
  let settings = initial;
  let resizeObserver: ResizeObserver | undefined;
  let intersectionObserver: IntersectionObserver | undefined;
  let renderer: THREE.WebGLRenderer | undefined;
  let pointerX = 0;
  let pointerY = 0;
  let width = 0;
  let height = 0;
  let frameDeadline = 0;

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    frame = 0;
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    window.removeEventListener("resize", invalidate);
    document.removeEventListener("visibilitychange", visibilityChanged);
    canvas.removeEventListener("webglcontextlost", contextLost);
    canvas.removeEventListener("pointermove", pointerMoved);
    canvas.removeEventListener("pointerleave", pointerLeft);
    resources.forEach((resource) => resource.dispose());
    resources.clear();
    renderer?.dispose();
    // Explicitly release the context when switching experiments, rather than waiting for GC.
    renderer?.forceContextLoss();
  };
  const fail = () => {
    if (!disposed) {
      dispose();
      onFailure();
    }
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    fail();
  };
  const visibilityChanged = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else invalidate();
  };
  const pointerMoved = (event: PointerEvent) => {
    if (settings.reducedMotion || event.pointerType !== "mouse") return;
    const bounds = canvas.getBoundingClientRect();
    pointerX =
      ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 0.08;
    pointerY =
      ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 0.05;
    invalidate();
  };
  const pointerLeft = () => {
    pointerX = 0;
    pointerY = 0;
    invalidate();
  };
  function invalidate() {
    if (disposed || document.hidden || !visible) return;
    frameDeadline = performance.now() + 700;
    if (!frame) frame = requestAnimationFrame(render);
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.set(0, 0.65, 7.7);
  const targetPosition = new THREE.Vector3();
  const display = new THREE.Group();
  scene.add(display);

  // Original interface artwork. The high-contrast bands make refraction legible.
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 1200;
  textureCanvas.height = 750;
  const context = textureCanvas.getContext("2d");
  if (!context) throw new Error("A canvas drawing context is unavailable.");
  const texture = own(new THREE.CanvasTexture(textureCanvas));
  texture.colorSpace = THREE.SRGBColorSpace;
  function drawInterface() {
    if (!context) return;
    const p = settings.palette;
    context.fillStyle = p.night;
    context.fillRect(0, 0, 1200, 750);
    context.fillStyle = p.paper;
    context.font = '600 24px "Syne Variable", Syne, sans-serif';
    context.fillText("MAKENDLESS", 60, 65);
    context.font = '400 18px "Syne Variable", Syne, sans-serif';
    context.fillText("CREATE / BUILD / GROW", 835, 65);
    context.strokeStyle = p.mutedDark;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(60, 98);
    context.lineTo(1140, 98);
    context.stroke();
    context.font = '700 100px "Syne Variable", Syne, sans-serif';
    context.fillText("Make", 60, 245);
    context.fillText("what’s", 60, 350);
    context.fillText("next.", 60, 455);
    context.fillStyle = p.accent;
    context.beginPath();
    context.arc(900, 348, 200, 0, Math.PI * 2);
    context.fill();
    context.save();
    context.beginPath();
    context.arc(900, 348, 200, 0, Math.PI * 2);
    context.clip();
    context.strokeStyle = p.paper;
    context.lineWidth = 7;
    for (let x = 610; x < 1200; x += 24) {
      context.beginPath();
      context.moveTo(x, 130);
      context.lineTo(x + 145, 570);
      context.stroke();
    }
    context.restore();
    context.fillStyle = p.paper;
    context.font = '500 23px "Syne Variable", Syne, sans-serif';
    context.fillText("Ideas into experiences.", 62, 537);
    context.fillStyle = p.accentLight;
    context.fillRect(62, 580, 260, 64);
    context.fillStyle = p.night;
    context.font = '600 20px "Syne Variable", Syne, sans-serif';
    context.fillText("EXPLORE THE WORK  ↗", 79, 620);
    context.fillStyle = p.paper;
    context.font = '500 17px "Syne Variable", Syne, sans-serif';
    context.fillText("BUILD — INTERFACE STUDY / 01", 62, 705);
    context.fillText("A MATERIAL EXPLORATION", 885, 705);
    texture.needsUpdate = true;
  }

  const frameMaterial = own(
    new THREE.MeshStandardMaterial({
      color: initial.palette.ink,
      metalness: 0.68,
      roughness: 0.32,
    }),
  );
  const screenMaterial = own(
    new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),
  );
  const lensMaterial = own(
    new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0,
      roughness: initial.roughness,
      transmission: initial.transmission,
      thickness: 0.42,
      ior: 1.46,
      opacity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.3,
      attenuationDistance: 2.5,
    }),
  );
  const floorMaterial = own(
    new THREE.MeshStandardMaterial({
      color: initial.palette.paper,
      roughness: 0.95,
    }),
  );
  const addBox = (
    x: number,
    y: number,
    z: number,
    material: THREE.Material,
    px = 0,
    py = 0,
    pz = 0,
    round = 0.03,
  ) => {
    const mesh = new THREE.Mesh(
      own(new RoundedBoxGeometry(x, y, z, 3, round)),
      material,
    );
    mesh.position.set(px, py, pz);
    display.add(mesh);
    return mesh;
  };
  addBox(3.9, 2.51, 0.15, frameMaterial, 0, 0.13);
  const screen = new THREE.Mesh(
    own(new THREE.PlaneGeometry(3.72, 2.325)),
    screenMaterial,
  );
  screen.position.set(0, 0.13, 0.083);
  display.add(screen);
  // One solid glass inspection lens over the interface, not layered transparency.
  addBox(1.29, 1.73, 0.23, lensMaterial, 0.91, 0.18, 0.31, 0.11);
  addBox(0.24, 0.46, 0.18, frameMaterial, 0, -1.3, -0.07);
  addBox(1.5, 0.08, 0.6, frameMaterial, 0, -1.54, 0.05);
  const floor = new THREE.Mesh(
    own(new THREE.PlaneGeometry(30, 30)),
    floorMaterial,
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.59;
  scene.add(floor);
  const keyLight = new THREE.DirectionalLight("#ffffff", 4);
  keyLight.position.set(-3, 5, 4);
  const fillLight = new THREE.DirectionalLight(initial.palette.aqua, 2);
  fillLight.position.set(4, 1, 3);
  scene.add(
    keyLight,
    fillLight,
    new THREE.HemisphereLight("#ffffff", "#494238", 2),
  );

  function render(time: number) {
    frame = 0;
    if (disposed || document.hidden || !visible || !renderer) return;
    try {
      const w = Math.max(1, Math.round(canvas.clientWidth));
      const h = Math.max(1, Math.round(canvas.clientHeight));
      if (w !== width || h !== height) {
        width = w;
        height = h;
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio || 1, w < 600 ? 1.25 : 1.5),
        );
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      const distance = 7.4 * Math.max(1, 1.35 / camera.aspect);
      targetPosition.set(
        settings.camera === "front" ? 0 : 2.0,
        settings.camera === "front" ? 0.45 : 1.12,
        distance,
      );
      const snap = settings.reducedMotion || time >= frameDeadline;
      camera.position.lerp(targetPosition, snap ? 1 : 0.14);
      camera.lookAt(0, -0.12, 0);
      const rotationX = settings.reducedMotion ? 0 : pointerY;
      const rotationY = settings.reducedMotion ? 0 : pointerX;
      display.rotation.x +=
        (rotationX - display.rotation.x) * (snap ? 1 : 0.14);
      display.rotation.y +=
        (rotationY - display.rotation.y) * (snap ? 1 : 0.14);
      renderer.render(scene, camera);
      const moving =
        camera.position.distanceToSquared(targetPosition) > 0.00001 ||
        Math.abs(display.rotation.x - rotationX) +
          Math.abs(display.rotation.y - rotationY) >
          0.0002;
      if (!snap && moving) frame = requestAnimationFrame(render);
    } catch {
      fail();
    }
  }

  const update = (next: SpatialOptions) => {
    if (disposed) return;
    const paletteChanged = settings.palette !== next.palette;
    settings = next;
    const isGlass = next.material === "glass";
    const previouslyTransmissive = lensMaterial.transmission > 0;
    lensMaterial.transmission = isGlass ? next.transmission : 0;
    lensMaterial.roughness = next.roughness;
    lensMaterial.metalness = isGlass ? 0 : 0.58;
    lensMaterial.color.set(isGlass ? "#ffffff" : next.palette.aqua);
    lensMaterial.attenuationColor.set(next.palette.paper);
    // Crossing zero changes Three.js shader defines.
    if (previouslyTransmissive !== lensMaterial.transmission > 0)
      lensMaterial.needsUpdate = true;
    keyLight.color.set(next.light === "warm" ? "#ffe1b7" : "#ffffff");
    fillLight.color.set(
      next.light === "warm" ? next.palette.accent : next.palette.aqua,
    );
    frameMaterial.color.set(next.palette.ink);
    floorMaterial.color.set(next.palette.paper);
    scene.background = new THREE.Color(next.palette.paper);
    if (paletteChanged) drawInterface();
    if (next.reducedMotion) {
      pointerX = 0;
      pointerY = 0;
    }
    invalidate();
  };

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "low-power",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.transmissionResolutionScale = 0.6;
    const environment = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(renderer);
    try {
      scene.environment = own(generator.fromScene(environment, 0.04)).texture;
    } finally {
      environment.dispose();
      generator.dispose();
    }
    drawInterface();
    update(initial);
    canvas.addEventListener("webglcontextlost", contextLost, false);
    canvas.addEventListener("pointermove", pointerMoved);
    canvas.addEventListener("pointerleave", pointerLeft);
    document.addEventListener("visibilitychange", visibilityChanged);
    window.addEventListener("resize", invalidate);
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(invalidate);
      resizeObserver.observe(canvas);
    }
    if (typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible) invalidate();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      });
      intersectionObserver.observe(canvas);
    }
    // Redraw the owned texture when the local Syne font finishes loading.
    void document.fonts?.ready.then(() => {
      if (!disposed) {
        drawInterface();
        invalidate();
      }
    });
  } catch (error) {
    dispose();
    throw error;
  }
  return { update, dispose };
}
