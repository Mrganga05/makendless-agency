import { StrictMode } from "react";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { initialShowcaseState } from "../src/showcase-state";

const { createScene } = vi.hoisted(() => ({ createScene: vi.fn() }));
vi.mock("../src/three/living-scene", () => ({
  createLivingScene: createScene,
}));
import SpatialScene from "../src/components/SpatialScene";

describe("SpatialScene React lifecycle (renderer mocked; no GPU verification)", () => {
  beforeEach(() => {
    createScene.mockReset();
  });

  it("updates the existing scene without rebuilding the renderer on a mode change", () => {
    const handle = { update: vi.fn(), dispose: vi.fn() };
    createScene.mockReturnValue(handle);
    const onReady = vi.fn(),
      onError = vi.fn();
    const { rerender, unmount } = render(
      <SpatialScene
        state={initialShowcaseState}
        onReady={onReady}
        onError={onError}
      />,
    );
    const next = {
      ...initialShowcaseState,
      mode: "build" as const,
      mobile: true,
      sitePanel: "menu" as const,
    };
    rerender(<SpatialScene state={next} onReady={onReady} onError={onError} />);
    expect(createScene).toHaveBeenCalledTimes(1);
    expect(handle.update).toHaveBeenLastCalledWith(next);
    unmount();
    expect(handle.dispose).toHaveBeenCalledTimes(1);
  });

  it("forwards renderer readiness and failure to the latest callback props", () => {
    createScene.mockReturnValue({ update: vi.fn(), dispose: vi.fn() });
    const firstReady = vi.fn(),
      firstError = vi.fn(),
      nextReady = vi.fn(),
      nextError = vi.fn();
    const { rerender } = render(
      <SpatialScene
        state={initialShowcaseState}
        onReady={firstReady}
        onError={firstError}
      />,
    );
    const [, , ready, fail] = createScene.mock.calls[0] as [
      HTMLElement,
      typeof initialShowcaseState,
      () => void,
      () => void,
    ];
    rerender(
      <SpatialScene
        state={initialShowcaseState}
        onReady={nextReady}
        onError={nextError}
      />,
    );
    ready();
    fail();
    expect(nextReady).toHaveBeenCalledTimes(1);
    expect(nextError).toHaveBeenCalledTimes(1);
    expect(firstReady).not.toHaveBeenCalled();
    expect(firstError).not.toHaveBeenCalled();
    expect(createScene).toHaveBeenCalledTimes(1);
  });

  it("reports initialization failure so the caller can keep the HTML fallback", () => {
    createScene.mockImplementation(() => {
      throw new Error("WebGL initialization failed");
    });
    const onError = vi.fn();
    const { unmount } = render(
      <SpatialScene
        state={initialShowcaseState}
        onReady={vi.fn()}
        onError={onError}
      />,
    );
    expect(onError).toHaveBeenCalledTimes(1);
    expect(() => unmount()).not.toThrow();
  });

  it("cleans both StrictMode mount cycles without leaking the first handle", () => {
    const handles: {
      update: ReturnType<typeof vi.fn>;
      dispose: ReturnType<typeof vi.fn>;
    }[] = [];
    createScene.mockImplementation(() => {
      const handle = { update: vi.fn(), dispose: vi.fn() };
      handles.push(handle);
      return handle;
    });
    const { unmount } = render(
      <StrictMode>
        <SpatialScene
          state={initialShowcaseState}
          onReady={vi.fn()}
          onError={vi.fn()}
        />
      </StrictMode>,
    );
    expect(handles).toHaveLength(2);
    expect(handles[0].dispose).toHaveBeenCalledTimes(1);
    expect(handles[1].dispose).not.toHaveBeenCalled();
    unmount();
    expect(handles[1].dispose).toHaveBeenCalledTimes(1);
  });
});
