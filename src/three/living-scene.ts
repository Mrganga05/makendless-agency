import * as THREE from "three";
import type { ShowcaseState } from "../showcase-state";

export type SceneHandle = {
  update: (state: ShowcaseState) => void;
  dispose: () => void;
};
const C = {
  bg: 0x0a0b1b,
  slate: 0x1d1b3a,
  violet: 0x8b5cf6,
  aqua: 0x22d3ee,
  white: 0xeaf2ff,
};
/** A demand-rendered spatial presentation. All controls and business state live in React. */
export function createLivingScene(
  host: HTMLDivElement,
  initial: ShowcaseState,
  ready: () => void,
  fail: () => void,
): SceneHandle {
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
    const ambient = new THREE.HemisphereLight(0xeaf2ff, 0x1d1b3a, 2.8);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xc7a6ff, 4);
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
    const floor = box(7.4, 0.04, 3.2, C.slate, 0.75, false);
    floor.position.set(0, -1.95, -0.2);
    world.add(floor);
    for (const x of [-3.1, 3.1]) {
      const rail = box(
        0.025,
        4.1,
        0.03,
        x < 0 ? C.aqua : C.violet,
        0.55,
        false,
      );
      rail.position.set(x, 0.05, -0.8);
      world.add(rail);
    }
    const upper = box(6.25, 0.025, 0.03, C.violet, 0.45, false);
    upper.position.set(0, 2.1, -0.8);
    world.add(upper);
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
    mountain.src = "/images/mountain.jpg";
    coffee.src = "/images/coffee.jpg";
    function photo(
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      x: number,
      y: number,
      w: number,
      h: number,
    ) {
      if (img.complete && img.naturalWidth) {
        const r = Math.max(w / img.naturalWidth, h / img.naturalHeight),
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
        ctx.fillStyle = "#1D1B3A";
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = "#22D3EE55";
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
      color = "#EAF2FF",
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
      ctx.fillStyle = "#0D1022";
      ctx.fillRect(0, 0, 1024, canvas.height / scale);
      return { ...t, w: 1024, h: canvas.height / scale };
    }
    function rebuild() {
      for (const child of [...content.children]) content.remove(child);
      modeResources.forEach((r) => r.dispose());
      modeResources.clear();
      textures.length = 0;
      nodes = [];
      deviceScreens = [];
      playhead = undefined;
      if (state.mode === "create") {
        panel(1.7, 3, 0.7, 0.15, 0.45, -0.06);
        panel(1.3, 1.75, -1.6, 0.35, -0.15, 0.16);
        panel(1.25, 0.9, 2.28, -0.55, -0.2, -0.25);
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
        Math.floor(state.progress / 34),
        state.finished,
        state.mobile,
        state.step,
        state.sitePanel,
      ].join(":");
      if (signature === lastPaint) return;
      lastPaint = signature;
      if (state.mode === "create") {
        const a = start(0);
        photo(a.ctx, mountain, 0, 0, a.w, a.h);
        if (state.edited) {
          const grad = a.ctx.createLinearGradient(0, 0, 0, a.h);
          grad.addColorStop(0, "#0A0B1B11");
          grad.addColorStop(1, "#0A0B1BEF");
          a.ctx.fillStyle = grad;
          a.ctx.fillRect(0, 0, a.w, a.h);
          text(a.ctx, "OUTSIDE THE ORDINARY", 70, 100, 26, "#EAF2FF", 500);
          const titles =
            state.progress < 34
              ? ["Go beyond.", "Find your story."]
              : state.progress < 68
                ? ["A new view.", "A different feeling."]
                : ["Make it", "matter."];
          text(a.ctx, titles[0], 65, a.h * 0.64, 110);
          text(a.ctx, titles[1], 65, a.h * 0.64 + 125, 82, "#C7A6FF");
          a.ctx.fillStyle = "#22D3EE";
          a.ctx.fillRect(70, a.h - 135, 130, 5);
          text(
            a.ctx,
            "EDITED / PHOTO MOTION CONCEPT",
            70,
            a.h - 80,
            23,
            "#EAF2FF",
            500,
          );
        } else text(a.ctx, "ORIGINAL PHOTO", 70, 95, 30, "#EAF2FF", 500);
        const b = start(1);
        photo(b.ctx, mountain, 0, 0, b.w, b.h * 0.74);
        text(b.ctx, "01 / SOURCE", 65, b.h * 0.85, 50);
        text(b.ctx, "From a moment", 65, b.h * 0.92, 28, "#A4AAC7", 400);
        const c = start(2);
        text(c.ctx, "THE EDIT", 65, 130, 65, "#C7A6FF");
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
          "#A4AAC7",
          400,
        );
      } else if (state.mode === "build") {
        for (let i = 0; i < 2; i++) {
          const a = start(i),
            mobile = i === 1;
          const { ctx, w, h } = a;
          ctx.fillStyle = state.finished ? "#EAF2FF" : "#181b31";
          ctx.fillRect(0, 0, w, h);
          if (state.sitePanel === "menu" && state.finished) {
            text(
              ctx,
              "still. / THE MENU",
              50,
              110,
              mobile ? 65 : 42,
              "#1D1B3A",
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
                "#8B5CF6",
                500,
              );
              text(
                ctx,
                label,
                mobile ? 150 : 115,
                y,
                mobile ? 70 : 36,
                "#1D1B3A",
                600,
              );
              ctx.fillStyle = "#A4AAC755";
              ctx.fillRect(50, y + 35, w - 100, 2);
            });
          } else if (!state.finished) {
            ctx.strokeStyle = "#A4AAC780";
            ctx.lineWidth = 3;
            ctx.strokeRect(40, 45, w - 80, 65);
            ctx.strokeRect(40, 145, w - 80, h * 0.48);
            ctx.strokeRect(40, h * 0.72, w * 0.55, 40);
            ctx.strokeRect(40, h * 0.82, w * 0.33, 45);
            text(ctx, "WIREFRAME", 65, 91, mobile ? 44 : 23, "#A4AAC7", 500);
          } else {
            text(ctx, "still.", 50, 95, mobile ? 80 : 54, "#1D1B3A", 800);
            text(
              ctx,
              "coffee & company",
              mobile ? 50 : 710,
              mobile ? 145 : 90,
              mobile ? 32 : 20,
              "#1D1B3A",
              500,
            );
            photo(ctx, coffee, 0, mobile ? 190 : 130, w, h * 0.6);
            ctx.fillStyle = "#0A0B1B60";
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
            ctx.fillStyle = "#1D1B3A";
            ctx.fillRect(50, h - 100, mobile ? w - 100 : 260, 55);
            text(
              ctx,
              "Find your moment ↗",
              70,
              h - 64,
              mobile ? 33 : 22,
              "#EAF2FF",
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
          "#22D3EE",
          500,
        );
        text(a.ctx, names[state.step], 65, 210, 65);
        text(a.ctx, messages[state.step][0], 65, 315, 32);
        text(a.ctx, messages[state.step][1], 65, 385, 24, "#A4AAC7", 400);
        for (let i = 0; i < 5; i++) {
          a.ctx.fillStyle = i <= state.step ? "#8B5CF6" : "#272b48";
          a.ctx.fillRect(65 + i * 180, a.h - 65, 150, 5);
        }
      }
      textures.forEach((t) => (t.texture.needsUpdate = true));
    }
    let readySent = false;
    let targetY = -0.1,
      targetX = -0.04;
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
        if (reducedMotion) {
          world.rotation.set(targetX, targetY, 0);
        } else {
          world.rotation.y += (targetY - world.rotation.y) * 0.18;
          world.rotation.x += (targetX - world.rotation.x) * 0.18;
        }
        renderer.render(scene, camera);
        if (!readySent) {
          readySent = true;
          ready();
        }
        if (
          !reducedMotion &&
          Math.abs(targetY - world.rotation.y) +
            Math.abs(targetX - world.rotation.x) >
            0.002
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
      camera.position.z =
        Math.max(4.7, 6.9 / camera.aspect) /
        (2 * Math.tan(THREE.MathUtils.degToRad(17)));
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
      targetY =
        -0.1 + ((e.clientX - rect.left - rect.width / 2) / rect.width) * 0.13;
      targetX =
        -0.04 + ((e.clientY - rect.top - rect.height / 2) / rect.height) * 0.07;
      requestRender();
    }
    function leave() {
      targetY = -0.1;
      targetX = -0.04;
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
