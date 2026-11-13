import * as THREE from "three";
import type { ShowcaseState } from "../showcase-state";
import { GLASS_PRISM, PRISM_ATELIER } from "../theme";

export type SceneHandle = {
  update: (state: ShowcaseState) => void;
  dispose: () => void;
};
/** A demand-rendered spatial presentation. All controls and business state live in React. */
export function createLivingScene(
  host: HTMLDivElement,
  initial: ShowcaseState,
  ready: () => void,
  fail: () => void,
  theme: "glass" | "atelier" = "glass",
): SceneHandle {
  const P =
    theme === "atelier"
      ? {
          ...PRISM_ATELIER,
          highlight: PRISM_ATELIER.violetLight,
          canvas: PRISM_ATELIER.night,
          wire: PRISM_ATELIER.surface,
          inactive: PRISM_ATELIER.surface,
        }
      : {
          ...GLASS_PRISM,
          highlight: GLASS_PRISM.violetLight,
          canvas: "#0D1022",
          wire: "#181B31",
          inactive: "#272B48",
        };
  const C = {
    bg: new THREE.Color(P.night).getHex(),
    slate: new THREE.Color(P.surface).getHex(),
    violet: new THREE.Color(P.violet).getHex(),
    aqua: new THREE.Color(P.aqua).getHex(),
    white: new THREE.Color(P.white).getHex(),
  };
  let dead = false,
    frame = 0,
    visible = true,
    state = initial,
    lastPaint = "",
    currentMode = "";
  const resources = new Set<
    THREE.BufferGeometry | THREE.Material | THREE.Texture
  >();
  const modeResources = new Set<
    THREE.BufferGeometry | THREE.Material | THREE.Texture
  >();
  const cleanups: Array<() => void> = [];
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  function cleanup() {
    if (dead) return;
    dead = true;
    cancelAnimationFrame(frame);
    for (const release of cleanups.reverse()) release();
    modeResources.forEach((r) => r.dispose());
    resources.forEach((r) => r.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  }
  try {
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 1.5),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(C.bg, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    cleanups.push(() => scene.clear());
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0.5, 10.5);
    camera.lookAt(0, -0.05, 0);
    const ambient = new THREE.HemisphereLight(C.white, C.slate, 2.8);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(P.highlight, 4);
    key.position.set(-3, 5, 4);
    scene.add(key);
    const fill = new THREE.PointLight(C.aqua, 35, 15, 2);
    fill.position.set(4, 2, 3);
    scene.add(fill);
    const world = new THREE.Group();
    scene.add(world);
    world.rotation.set(-0.04, -0.1, 0);
    const content = new THREE.Group();
    world.add(content);
    const track = <
      T extends THREE.BufferGeometry | THREE.Material | THREE.Texture,
    >(
      r: T,
      mode = true,
    ): T => {
      (mode ? modeResources : resources).add(r);
      return r;
    };
    function box(
      w: number,
      h: number,
      d: number,
      color: number,
      opacity = 1,
      mode = true,
    ) {
      return new THREE.Mesh(
        track(new THREE.BoxGeometry(w, h, d), mode),
        track(
          new THREE.MeshStandardMaterial({
            color,
            metalness: 0.45,
            roughness: 0.25,
            transparent: opacity < 1,
            opacity,
          }),
          mode,
        ),
      );
    }
    const floor = box(6.5, 0.025, 2.7, C.slate, 0.24, false);
    floor.position.set(0, -1.98, -0.2);
    world.add(floor);
    // A quiet lit horizon grounds the work; no surrounding architectural box.
    const horizon = box(6.2, 0.012, 0.025, C.violet, 0.38, false);
    horizon.position.set(0, -1.96, -1.25);
    world.add(horizon);
    const edge = box(1.5, 0.012, 0.025, C.aqua, 0.45, false);
    edge.position.set(-2.2, -1.95, 0.9);
    world.add(edge);
    const textures: {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      texture: THREE.CanvasTexture;
    }[] = [];
    function panel(
      w: number,
      h: number,
      x: number,
      y: number,
      z: number,
      angle = 0,
    ) {
      const group = new THREE.Group();
      group.position.set(x, y, z);
      group.rotation.y = angle;
      content.add(group);
      const backing = box(w + 0.08, h + 0.08, 0.09, C.slate);
      group.add(backing);
      const canvas = document.createElement("canvas");
      canvas.width = w < h ? 512 : 1024;
      canvas.height = Math.round((canvas.width * h) / w);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable");
      const texture = track(new THREE.CanvasTexture(canvas));
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      const screen = new THREE.Mesh(
        track(new THREE.PlaneGeometry(w, h)),
        track(new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })),
      );
      screen.position.z = 0.051;
      group.add(screen);
      textures.push({ canvas, ctx, texture });
      return group;
    }
    let playhead: THREE.Mesh | undefined;
    let nodes: THREE.Mesh[] = [];
    let deviceScreens: THREE.Group[] = [];
    const mountain = new Image(),
      coffee = new Image();
    function photo(
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      x: number,
      y: number,
      w: number,
      h: number,
      zoom = 1,
    ) {
      if (img.complete && img.naturalWidth) {
        const r = Math.max(w / img.naturalWidth, h / img.naturalHeight) * zoom,
          sw = w / r,
          sh = h / r;
        ctx.drawImage(
          img,
          (img.naturalWidth - sw) / 2,
          (img.naturalHeight - sh) / 2,
          sw,
          sh,
          x,
          y,
          w,
          h,
        );
      } else {
        ctx.fillStyle = P.surface;
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = `${P.aqua}55`;
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.moveTo(x, y + h * (i / 8));
          ctx.lineTo(x + w, y + h * (i / 8) - w * 0.2);
          ctx.stroke();
        }
      }
    }
    function text(
      ctx: CanvasRenderingContext2D,
      value: string,
      x: number,
      y: number,
      size: number,
      color: string = P.white,
      weight = 600,
    ) {
      ctx.fillStyle = color;
      ctx.font = `${weight} ${size}px "Syne Variable", Syne, sans-serif`;
      ctx.fillText(value, x, y);
    }
    function start(i: number) {
      const t = textures[i];
      const { ctx, canvas } = t;
      const scale = canvas.width / 1024;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.clearRect(0, 0, 1024, canvas.height / scale);
      ctx.fillStyle = P.canvas;
      ctx.fillRect(0, 0, 1024, canvas.height / scale);
      return { ...t, w: 1024, h: canvas.height / scale };
    }
    let introduction = 0;
    let baseDistance = 10.5;
    function rebuild() {
      introduction = performance.now();
      for (const child of [...content.children]) content.remove(child);
      modeResources.forEach((r) => r.dispose());
      modeResources.clear();
      textures.length = 0;
      nodes = [];
      deviceScreens = [];
      playhead = undefined;
      if (state.mode === "create") {
        if (!mountain.src) mountain.src = "/images/mountain.jpg";
        if (theme === "atelier") {
          panel(2.1, 3.72, 0.36, 0.34, 0.55, -0.06);
          panel(1.1, 1.46, -1.55, 0.22, -0.16, 0.16);
          panel(1.0, 0.72, 2.0, -0.5, -0.2, -0.17);
        } else {
          panel(1.85, 3.25, 0.48, 0.19, 0.55, -0.09);
          panel(1.3, 1.75, -1.65, 0.22, -0.12, 0.19);
          panel(1.22, 0.88, 2.16, -0.42, -0.2, -0.23);
        }
        const timeline = box(4.9, 0.24, 0.5, C.slate);
        timeline.position.set(0, -1.6, 0.4);
        content.add(timeline);
        for (let i = 0; i < 18; i++) {
          const bar = box(
            0.19,
            0.075 + ((i * 7) % 9) * 0.009,
            0.03,
            i < 9 ? C.violet : C.aqua,
            0.8,
          );
          bar.position.set(-2.2 + i * 0.25, -1.54, 0.68);
          content.add(bar);
        }
        playhead = box(0.025, 0.36, 0.06, C.white);
        playhead.position.set(-2.35, -1.57, 0.75);
        content.add(playhead);
      }
      if (state.mode === "build") {
        if (!coffee.src) coffee.src = "/images/coffee.jpg";
        deviceScreens.push(
          panel(4.3, 2.6, -0.4, 0.15, 0, -0.07),
          panel(1.13, 2.1, 2.05, -0.35, 0.8, -0.15),
        );
        const stand = box(0.8, 0.6, 0.45, C.slate);
        stand.position.set(-0.4, -1.45, -0.05);
        content.add(stand);
        const base = box(2.2, 0.08, 0.9, C.slate);
        base.position.set(-0.4, -1.75, 0);
        content.add(base);
      }
      if (state.mode === "ai") {
        panel(4.25, 2.1, 0, 0.65, -0.2, 0);
        for (let i = 0; i < 5; i++) {
          const node = box(0.78, 0.43, 0.35, C.slate);
          node.position.set(-2.35 + i * 1.18, -1.1, 0.4);
          content.add(node);
          nodes.push(node);
          if (i < 4) {
            const wire = box(0.4, 0.025, 0.025, C.aqua, 0.45);
            wire.position.set(-1.76 + i * 1.18, -1.1, 0.4);
            content.add(wire);
          }
        }
      }
      lastPaint = "";
      currentMode = state.mode;
    }
    function paint() {
      const signature = [
        state.mode,
        state.edited,
        Math.floor(state.progress / 2),
        state.finished,
        state.mobile,
        state.step,
        state.sitePanel,
      ].join(":");
      if (signature === lastPaint) return;
      lastPaint = signature;
      if (state.mode === "create") {
        const a = start(0);
        photo(
          a.ctx,
          mountain,
          0,
          0,
          a.w,
          a.h,
          state.edited ? 1.06 + state.progress * 0.0012 : 1,
        );
        if (state.edited) {
          const grad = a.ctx.createLinearGradient(0, 0, 0, a.h);
          grad.addColorStop(0, `${P.night}11`);
          grad.addColorStop(1, `${P.night}EF`);
          a.ctx.fillStyle = grad;
          a.ctx.fillRect(0, 0, a.w, a.h);
          text(a.ctx, "OUTSIDE THE ORDINARY", 70, 100, 26, P.white, 500);
          const titles =
            state.progress < 35
              ? ["Go", "somewhere."]
              : state.progress < 70
                ? ["Feel", "something."]
                : ["Make it", "matter."];
          text(a.ctx, titles[0], 65, a.h * 0.64, 110);
          text(a.ctx, titles[1], 65, a.h * 0.64 + 125, 105, P.highlight);
          a.ctx.fillStyle = P.aqua;
          a.ctx.fillRect(70, a.h - 135, 130, 5);
          text(
            a.ctx,
            "EDITED / PHOTO MOTION CONCEPT",
            70,
            a.h - 80,
            23,
            P.white,
            500,
          );
        } else text(a.ctx, "ORIGINAL PHOTO", 70, 95, 30, P.white, 500);
        const b = start(1);
        photo(b.ctx, mountain, 0, 0, b.w, b.h * 0.74);
        text(b.ctx, "01 / SOURCE", 65, b.h * 0.85, 50);
        text(b.ctx, "From a moment", 65, b.h * 0.92, 28, P.mutedDark, 400);
        const c = start(2);
        text(c.ctx, "THE EDIT", 65, 130, 65, P.highlight);
        text(
          c.ctx,
          state.edited ? "Framing + titles" : "Source only",
          65,
          240,
          43,
        );
        text(
          c.ctx,
          state.edited ? "A story takes shape." : "Choose Edited to compare.",
          65,
          335,
          27,
          P.mutedDark,
          400,
        );
      } else if (state.mode === "build") {
        for (let i = 0; i < 2; i++) {
          const a = start(i),
            mobile = i === 1;
          const { ctx, w, h } = a;
          ctx.fillStyle = state.finished ? P.white : P.wire;
          ctx.fillRect(0, 0, w, h);
          if (state.sitePanel === "menu" && state.finished) {
            text(
              ctx,
              "still. / THE MENU",
              50,
              110,
              mobile ? 65 : 42,
              P.surface,
              800,
            );
            [
              "Espresso",
              "Flat white",
              "Filter coffee",
              "Seasonal pastries",
            ].forEach((label, index) => {
              const y = 220 + index * (mobile ? 200 : 85);
              text(
                ctx,
                `0${index + 1}`,
                50,
                y,
                mobile ? 45 : 24,
                P.violet,
                500,
              );
              text(
                ctx,
                label,
                mobile ? 150 : 115,
                y,
                mobile ? 70 : 36,
                P.surface,
                600,
              );
              ctx.fillStyle = `${P.mutedDark}55`;
              ctx.fillRect(50, y + 35, w - 100, 2);
            });
          } else if (!state.finished) {
            ctx.strokeStyle = `${P.mutedDark}80`;
            ctx.lineWidth = 3;
            ctx.strokeRect(40, 45, w - 80, 65);
            ctx.strokeRect(40, 145, w - 80, h * 0.48);
            ctx.strokeRect(40, h * 0.72, w * 0.55, 40);
            ctx.strokeRect(40, h * 0.82, w * 0.33, 45);
            text(ctx, "WIREFRAME", 65, 91, mobile ? 44 : 23, P.mutedDark, 500);
          } else {
            text(ctx, "still.", 50, 95, mobile ? 80 : 54, P.surface, 800);
            text(
              ctx,
              "coffee & company",
              mobile ? 50 : 710,
              mobile ? 145 : 90,
              mobile ? 32 : 20,
              P.surface,
              500,
            );
            photo(ctx, coffee, 0, mobile ? 190 : 130, w, h * 0.6);
            ctx.fillStyle = `${P.night}60`;
            ctx.fillRect(0, mobile ? 190 : 130, w, h * 0.6);
            const y = mobile ? h * 0.48 : h * 0.5;
            text(ctx, "Good coffee.", 60, y, mobile ? 98 : 67);
            text(
              ctx,
              "Better company.",
              60,
              y + (mobile ? 115 : 75),
              mobile ? 83 : 67,
            );
            ctx.fillStyle = P.surface;
            ctx.fillRect(50, h - 100, mobile ? w - 100 : 260, 55);
            text(
              ctx,
              "Find your moment ↗",
              70,
              h - 64,
              mobile ? 33 : 22,
              P.white,
              500,
            );
          }
        }
      } else {
        const a = start(0);
        const names = [
          "Customer inquiry",
          "Classification",
          "Routing",
          "Draft response",
          "Human review",
        ];
        const messages = [
          [
            "“I need a website for my business.”",
            "An illustrative inquiry enters the workflow.",
          ],
          [
            "Website project · new inquiry",
            "Rules identify the type of request.",
          ],
          [
            "Send to the BUILD studio",
            "A person can change the suggested destination.",
          ],
          [
            "“Tell us a little about your goals.”",
            "A draft is prepared for review.",
          ],
          [
            "A person makes the final decision.",
            "This example never sends a message.",
          ],
        ];
        text(
          a.ctx,
          `0${state.step + 1} / SIMULATED WORKFLOW`,
          65,
          90,
          24,
          P.aqua,
          500,
        );
        text(a.ctx, names[state.step], 65, 210, 65);
        text(a.ctx, messages[state.step][0], 65, 315, 32);
        text(a.ctx, messages[state.step][1], 65, 385, 24, P.mutedDark, 400);
        for (let i = 0; i < 5; i++) {
          a.ctx.fillStyle = i <= state.step ? P.violet : P.inactive;
          a.ctx.fillRect(65 + i * 180, a.h - 65, 150, 5);
        }
      }
      textures.forEach((t) => (t.texture.needsUpdate = true));
    }
    let readySent = false;
    let targetY = -0.1,
      targetX = -0.04,
      lightTargetX = 4,
      lightTargetY = 2;
    function render() {
      frame = 0;
      if (dead || !visible || document.hidden) return;
      try {
        if (currentMode !== state.mode) rebuild();
        paint();
        if (deviceScreens.length) {
          deviceScreens[0].scale.setScalar(state.mobile ? 0.85 : 1);
          deviceScreens[0].position.x = state.mobile ? -0.8 : -0.4;
          deviceScreens[1].scale.setScalar(state.mobile ? 1.4 : 1);
          deviceScreens[1].position.x = state.mobile ? 1.65 : 2.05;
        }
        if (playhead) playhead.position.x = -2.2 + (4.4 * state.progress) / 100;
        nodes.forEach((n, i) => {
          const m = n.material as THREE.MeshStandardMaterial;
          m.color.setHex(
            i === state.step ? C.aqua : i < state.step ? C.violet : C.slate,
          );
          n.position.y = i === state.step ? -0.98 : -1.1;
        });
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        // A bounded entrance is the only automatic camera motion. The renderer
        // settles completely after it and after user-driven pointer transitions.
        const progress = reducedMotion
          ? 1
          : Math.min(1, (performance.now() - introduction) / 680);
        const eased = 1 - Math.pow(1 - progress, 3);
        content.position.y = (1 - eased) * -0.12;
        content.position.z = (1 - eased) * -0.28;
        content.scale.setScalar(0.96 + eased * 0.04);
        camera.position.z = baseDistance * (1 + (1 - eased) * 0.025);
        camera.lookAt(0, -0.05, 0);
        if (reducedMotion) {
          world.rotation.set(targetX, targetY, 0);
          fill.position.set(4, 2, 3);
        } else {
          world.rotation.y += (targetY - world.rotation.y) * 0.18;
          world.rotation.x += (targetX - world.rotation.x) * 0.18;
          fill.position.x += (lightTargetX - fill.position.x) * 0.15;
          fill.position.y += (lightTargetY - fill.position.y) * 0.15;
        }
        renderer.render(scene, camera);
        if (!readySent) {
          readySent = true;
          ready();
        }
        if (
          !reducedMotion &&
          (progress < 1 ||
            Math.abs(targetY - world.rotation.y) +
              Math.abs(targetX - world.rotation.x) >
              0.002 ||
            Math.abs(lightTargetX - fill.position.x) +
              Math.abs(lightTargetY - fill.position.y) >
              0.01)
        )
          requestRender();
      } catch {
        fail();
      }
    }
    function requestRender() {
      if (!dead && visible && !document.hidden && !frame)
        frame = requestAnimationFrame(render);
    }
    function resize() {
      if (dead) return;
      const width = host.clientWidth,
        height = host.clientHeight;
      if (!width || !height) return;
      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          window.innerWidth < 768 ? 1 : 1.5,
        ),
      );
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      baseDistance =
        Math.max(4.7, (theme === "atelier" ? 5.7 : 6.5) / camera.aspect) /
        (2 * Math.tan(THREE.MathUtils.degToRad(17)));
      camera.position.z = baseDistance;
      camera.updateProjectionMatrix();
      requestRender();
    }
    function pointer(e: PointerEvent) {
      if (
        e.pointerType !== "mouse" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const rect = host.getBoundingClientRect();
      const restingYaw =
        state.mode === "build" ? 0.06 : state.mode === "ai" ? 0 : -0.1;
      targetY =
        restingYaw +
        ((e.clientX - rect.left - rect.width / 2) / rect.width) * 0.13;
      targetX =
        -0.04 + ((e.clientY - rect.top - rect.height / 2) / rect.height) * 0.07;
      lightTargetX = 4 + ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      lightTargetY = 2 - ((e.clientY - rect.top) / rect.height - 0.5);
      requestRender();
    }
    function leave() {
      targetY = state.mode === "build" ? 0.06 : state.mode === "ai" ? 0 : -0.1;
      targetX = -0.04;
      lightTargetX = 4;
      lightTargetY = 2;
      requestRender();
    }
    function lost(e: Event) {
      e.preventDefault();
      fail();
    }
    function visibility() {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else requestRender();
    }
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    cleanups.push(() => observer?.disconnect());
    observer?.observe(host);
    cleanups.push(() => window.removeEventListener("resize", resize));
    if (!observer) window.addEventListener("resize", resize);
    const intersection =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              visible = entries[0].isIntersecting;
              if (visible) requestRender();
              else {
                cancelAnimationFrame(frame);
                frame = 0;
              }
            },
            { threshold: 0 },
          )
        : null;
    cleanups.push(() => intersection?.disconnect());
    intersection?.observe(host);
    cleanups.push(() => {
      host.removeEventListener("pointermove", pointer);
      host.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      document.removeEventListener("visibilitychange", visibility);
      mountain.onload =
        coffee.onload =
        mountain.onerror =
        coffee.onerror =
          null;
    });
    host.addEventListener("pointermove", pointer);
    host.addEventListener("pointerleave", leave);
    renderer.domElement.addEventListener("webglcontextlost", lost);
    document.addEventListener("visibilitychange", visibility);
    mountain.onload = coffee.onload = () => {
      lastPaint = "";
      requestRender();
    };
    mountain.onerror = coffee.onerror = () => fail();
    void document.fonts?.ready.then(() => {
      if (!dead) {
        lastPaint = "";
        requestRender();
      }
    });
    resize();
    requestRender();
    return {
      update(next) {
        state = next;
        targetY = next.mode === "build" ? 0.06 : next.mode === "ai" ? 0 : -0.1;
        requestRender();
      },
      dispose: cleanup,
    };
  } catch (error) {
    cleanup();
    throw error;
  }
}
