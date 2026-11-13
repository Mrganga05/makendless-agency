import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Scene, Camera } from "three";
import { initialShowcaseState } from "../src/showcase-state";

const gpu = vi.hoisted(() => ({
  instances: [] as Array<{
    domElement: HTMLCanvasElement;
    render: ReturnType<typeof vi.fn>;
    dispose: ReturnType<typeof vi.fn>;
    forceContextLoss: ReturnType<typeof vi.fn>;
    setPixelRatio: ReturnType<typeof vi.fn>;
    setSize: ReturnType<typeof vi.fn>;
  }>,
  targets: [] as Array<{ dispose: ReturnType<typeof vi.fn> }>,
}));
vi.mock("three", async () => {
  const actual = await vi.importActual<typeof import("three")>("three");
  return {
    ...actual,
    WebGLRenderer: class {
      domElement = document.createElement("canvas");
      render = vi.fn<(scene: Scene, camera: Camera) => void>();
      dispose = vi.fn();
      forceContextLoss = vi.fn();
      setPixelRatio = vi.fn();
      setSize = vi.fn();
      setClearColor = vi.fn();
      constructor() {
        gpu.instances.push(this);
      }
    },
    PMREMGenerator: class {
      fromScene() {
        const target = new actual.WebGLRenderTarget(16, 16);
        const dispose = vi.spyOn(target, "dispose");
        gpu.targets.push({ dispose });
        return target;
      }
      dispose() {}
    },
  };
});
import { createLivingScene } from "../src/three/living-scene";

let now = 0;
let frameId = 0;
let frames = new Map<number, FrameRequestCallback>();
let host: HTMLDivElement;
let observerCallbacks: IntersectionObserverCallback[];
function tick(milliseconds = 100) {
  now += milliseconds;
  const batch = [...frames.values()];
  frames.clear();
  batch.forEach((callback) => callback(now));
}
function settle() {
  for (let i = 0; i < 20 && frames.size; i++) tick();
}
beforeEach(() => {
  gpu.instances.length = 0;
  gpu.targets.length = 0;
  now = 0;
  frameId = 0;
  frames = new Map();
  observerCallbacks = [];
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  vi.stubGlobal("devicePixelRatio", 3);
  vi.spyOn(performance, "now").mockImplementation(() => now);
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn((callback: FrameRequestCallback) => {
      const id = ++frameId;
      frames.set(id, callback);
      return id;
    }),
  );
  vi.stubGlobal(
    "cancelAnimationFrame",
    vi.fn((id: number) => frames.delete(id)),
  );
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe = vi.fn();
      disconnect = vi.fn();
    },
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        observerCallbacks.push(callback);
      }
      observe = vi.fn();
      disconnect = vi.fn();
    },
  );
  const context = {
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    fillText: vi.fn(),
    drawImage: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    rect: vi.fn(),
    ellipse: vi.fn(),
    fill: vi.fn(),
    clip: vi.fn(),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  };
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    context as unknown as CanvasRenderingContext2D,
  );
  host = document.createElement("div");
  Object.defineProperties(host, {
    clientWidth: { value: 500, configurable: true },
    clientHeight: { value: 450, configurable: true },
  });
  document.body.append(host);
});
afterEach(() => {
  host.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("living renderer ownership (WebGL driver mocked, real Three scene graph)", () => {
  it("builds a real transmissive material, settles finite rendering and disposes owned resources", () => {
    const ready = vi.fn(),
      fail = vi.fn();
    const handle = createLivingScene(
      host,
      initialShowcaseState,
      ready,
      fail,
      "atelier",
    );
    settle();
    const renderer = gpu.instances[0];
    expect(ready).toHaveBeenCalledTimes(1);
    expect(fail).not.toHaveBeenCalled();
    expect(frames.size).toBe(0);
    const scene = renderer.render.mock.calls[0][0] as Scene;
    const physical: import("three").MeshPhysicalMaterial[] = [];
    scene.traverse((object) => {
      const material = (object as import("three").Mesh).material;
      if (
        material &&
        !Array.isArray(material) &&
        "isMeshPhysicalMaterial" in material
      )
        physical.push(material as import("three").MeshPhysicalMaterial);
    });
    expect(physical).toHaveLength(1);
    expect(physical[0].transmission).toBeGreaterThan(0);
    expect(physical[0].opacity).toBe(1);
    expect(physical[0].thickness).toBeGreaterThan(0);
    expect(renderer.setPixelRatio).toHaveBeenLastCalledWith(1.25);
    const disposeLens = vi.spyOn(physical[0], "dispose");
    handle.dispose();
    handle.dispose();
    expect(disposeLens).toHaveBeenCalledTimes(1);
    expect(gpu.targets[0].dispose).toHaveBeenCalledTimes(1);
    expect(renderer.dispose).toHaveBeenCalledTimes(1);
    expect(renderer.forceContextLoss).toHaveBeenCalledTimes(1);
    expect(host.querySelector("canvas")).toBeNull();
  });

  it("updates media and mode without replacing the WebGL driver, then stays idle offscreen", () => {
    const handle = createLivingScene(
      host,
      initialShowcaseState,
      vi.fn(),
      vi.fn(),
      "atelier",
    );
    settle();
    const renderer = gpu.instances[0];
    const originalRenderCount = renderer.render.mock.calls.length;
    handle.update({
      ...initialShowcaseState,
      mode: "build",
      mobile: true,
      sitePanel: "menu",
    });
    settle();
    expect(gpu.instances).toHaveLength(1);
    expect(renderer.render.mock.calls.length).toBeGreaterThan(
      originalRenderCount,
    );
    observerCallbacks[0](
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    const before = renderer.render.mock.calls.length;
    handle.update({
      ...initialShowcaseState,
      mode: "grow",
      campaign: { objective: "visits", creative: "story", placement: "story" },
    });
    settle();
    expect(renderer.render).toHaveBeenCalledTimes(before);
    observerCallbacks[0](
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    settle();
    expect(renderer.render.mock.calls.length).toBeGreaterThan(before);
    handle.dispose();
  });

  it("synchronizes campaign copy, creative and placement without inventing advertising results", () => {
    const fail = vi.fn();
    const handle = createLivingScene(
      host,
      { ...initialShowcaseState, mode: "grow" },
      vi.fn(),
      fail,
      "atelier",
    );
    settle();
    const context = document.createElement("canvas").getContext("2d")!;
    const labels = () =>
      vi.mocked(context.fillText).mock.calls.map(([value]) => value);
    expect(labels()).toContain("GROW — BETA / COMING SOON");
    expect(labels()).toContain("BRAND AWARENESS / FEED");
    expect(labels()).toContain("Discover the café");
    expect(
      labels().some((value) => /automation|workflow|\bAI\b/i.test(value)),
    ).toBe(false);
    const renderer = gpu.instances[0];
    const scene = renderer.render.mock.calls[0][0] as Scene;
    const story = scene.getObjectByName("campaign-story")!;
    const before = story.scale.x;
    const originalEllipseCalls = vi.mocked(context.ellipse).mock.calls.length;
    vi.mocked(context.fillText).mockClear();
    handle.update({
      ...initialShowcaseState,
      mode: "grow",
      campaign: { objective: "visits", creative: "story", placement: "story" },
    });
    settle();
    expect(labels()).toContain("WEBSITE VISITS / STORY");
    expect(labels()).toContain("Explore the sample menu");
    expect(labels()).toContain("SELECTED PLACEMENT · ILLUSTRATIVE ONLY");
    expect(story.scale.x).toBeGreaterThan(before);
    expect(vi.mocked(context.ellipse).mock.calls.length).toBe(
      originalEllipseCalls,
    );
    expect(gpu.instances).toHaveLength(1);
    expect(frames.size).toBe(0);
    expect(fail).not.toHaveBeenCalled();
    handle.dispose();
  });

  it("releases the context and environment immediately on context loss and ignores later updates", () => {
    const fail = vi.fn();
    const handle = createLivingScene(
      host,
      initialShowcaseState,
      vi.fn(),
      fail,
      "atelier",
    );
    settle();
    const renderer = gpu.instances[0];
    renderer.domElement.dispatchEvent(
      new Event("webglcontextlost", { cancelable: true }),
    );
    expect(fail).toHaveBeenCalledTimes(1);
    expect(renderer.dispose).toHaveBeenCalledTimes(1);
    expect(gpu.targets[0].dispose).toHaveBeenCalledTimes(1);
    handle.update({ ...initialShowcaseState, mode: "build" });
    expect(frames.size).toBe(0);
    handle.dispose();
    expect(renderer.dispose).toHaveBeenCalledTimes(1);
  });

  it("uses immediate state frames with reduced motion and no animation tail", () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    const handle = createLivingScene(
      host,
      initialShowcaseState,
      vi.fn(),
      vi.fn(),
    );
    tick();
    expect(frames.size).toBe(0);
    const renderer = gpu.instances[0];
    expect(renderer.render).toHaveBeenCalledTimes(1);
    handle.update({ ...initialShowcaseState, mode: "grow" });
    tick();
    expect(frames.size).toBe(0);
    expect(renderer.render).toHaveBeenCalledTimes(2);
    handle.dispose();
  });

  it("releases a failed texture setup before reporting the fallback", () => {
    vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(null);
    const fail = vi.fn();
    const handle = createLivingScene(host, initialShowcaseState, vi.fn(), fail);
    tick();
    expect(fail).toHaveBeenCalledTimes(1);
    expect(gpu.instances[0].dispose).toHaveBeenCalledTimes(1);
    expect(gpu.targets[0].dispose).toHaveBeenCalledTimes(1);
    expect(host.querySelector("canvas")).toBeNull();
    expect(frames.size).toBe(0);
    handle.dispose();
  });

  it("cleans up a driver draw error instead of repeatedly scheduling failing frames", () => {
    const fail = vi.fn();
    const handle = createLivingScene(host, initialShowcaseState, vi.fn(), fail);
    const renderer = gpu.instances[0];
    renderer.render.mockImplementation(() => {
      throw new Error("driver lost");
    });
    tick();
    expect(fail).toHaveBeenCalledTimes(1);
    expect(renderer.dispose).toHaveBeenCalledTimes(1);
    expect(frames.size).toBe(0);
    handle.dispose();
  });
});
