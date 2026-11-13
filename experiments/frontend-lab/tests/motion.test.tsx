import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MotionLab from "../src/MotionLab";
import { LabSettingsContext } from "../src/settings";

class ObserverMock {
  static instances: ObserverMock[] = [];
  readonly targets: Element[] = [];
  disconnect = vi.fn();
  constructor(
    readonly callback: IntersectionObserverCallback,
    readonly options?: IntersectionObserverInit,
  ) {
    ObserverMock.instances.push(this);
  }
  observe = (target: Element) => {
    this.targets.push(target);
  };
  unobserve = vi.fn();
  takeRecords = () => [];
  emit(target: Element, isIntersecting: boolean, intersectionRatio = 1) {
    this.callback(
      [
        {
          target,
          isIntersecting,
          intersectionRatio,
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
}
function progress() {
  return screen.getByRole("status", { name: "Sequence progress" }).textContent;
}

beforeEach(() => {
  ObserverMock.instances = [];
  vi.stubGlobal("IntersectionObserver", ObserverMock);
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("motion composition", () => {
  it("scrubs meaningful workflow states and has a working website scene", () => {
    render(<MotionLab />);
    fireEvent.click(screen.getByRole("button", { name: "Workflow" }));
    fireEvent.change(
      screen.getByRole("slider", { name: "Sequence position" }),
      { target: { value: "46" } },
    );
    expect(progress()).toBe("46%");
    expect(screen.getByRole("heading", { name: "Route" })).toBeTruthy();
    expect(
      screen.getByText("It reaches the website planning queue."),
    ).toBeTruthy();
    fireEvent.change(
      screen.getByRole("slider", { name: "Sequence position" }),
      { target: { value: "100" } },
    );
    expect(
      screen.getByText("A person reviews the draft. Nothing is sent."),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Website" }));
    fireEvent.click(
      screen.getByRole("button", { name: /Explore the collection/ }),
    );
    expect(
      screen.getByRole("heading", { name: "A small collection." }),
    ).toBeTruthy();
    expect(screen.getByText("The letter tray")).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: /Return to introduction/ }),
    );
    expect(
      screen.getByRole("button", { name: /Explore the collection/ }),
    ).toBeTruthy();
  });

  it("plays once, holds a frame, and clears the held state when the playhead changes", () => {
    vi.useFakeTimers();
    render(<MotionLab />);
    fireEvent.click(screen.getByRole("button", { name: "Replay sequence" }));
    act(() => vi.advanceTimersByTime(1200));
    expect(progress()).toBe("20%");
    fireEvent.click(screen.getByRole("button", { name: "Hold this frame" }));
    act(() => vi.advanceTimersByTime(1200));
    expect(progress()).toBe("20%");
    expect(screen.getByText(/Holding film at 20%/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Play sequence" }));
    act(() => vi.advanceTimersByTime(4800));
    expect(progress()).toBe("100%");
    expect(
      screen.getByRole("button", { name: "Replay sequence" }),
    ).toBeTruthy();
    act(() => vi.advanceTimersByTime(6000));
    expect(progress()).toBe("100%");
    expect(screen.queryByText(/Holding film/)).toBeNull();
  });

  it("pauses offscreen playback and disconnects narrative observation on unmount", () => {
    vi.useFakeTimers();
    const { unmount } = render(<MotionLab />);
    fireEvent.click(screen.getByRole("button", { name: "Replay sequence" }));
    act(() => vi.advanceTimersByTime(600));
    const playback = ObserverMock.instances.find(
      (observer) => !observer.options,
    );
    expect(playback).toBeTruthy();
    act(() => playback?.emit(playback.targets[0], false, 0));
    act(() => vi.advanceTimersByTime(1200));
    expect(progress()).toBe("10%");
    expect(screen.getByRole("button", { name: "Play sequence" })).toBeTruthy();
    const narrative = ObserverMock.instances.find(
      (observer) => observer.options,
    );
    unmount();
    expect(playback?.disconnect).toHaveBeenCalled();
    expect(narrative?.disconnect).toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("updates the narrative from intersection evidence and manual chapter controls", () => {
    render(<MotionLab />);
    const narrative = ObserverMock.instances.find(
      (observer) => observer.options,
    );
    expect(narrative?.targets).toHaveLength(3);
    act(() => narrative?.emit(narrative.targets[1], true, 0.75));
    const steps = screen.getByRole("group", {
      name: "Select a narrative chapter",
    });
    expect(
      within(steps)
        .getByRole("button", { name: /Give it a rhythm/ })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(screen.getByText("A LITTLE RHYTHM.")).toBeTruthy();
    fireEvent.click(
      within(steps).getByRole("button", { name: /Leave a feeling/ }),
    );
    expect(
      within(steps)
        .getByRole("button", { name: /Leave a feeling/ })
        .getAttribute("aria-pressed"),
    ).toBe("true");
  });

  it("keeps the composition editable and advances discrete frames with reduced motion", () => {
    vi.useFakeTimers();
    const animate = vi.fn();
    Object.defineProperty(Element.prototype, "animate", {
      configurable: true,
      writable: true,
      value: animate,
    });
    render(
      <LabSettingsContext.Provider
        value={{ reducedMotion: true, forceFallback: true, theme: "atelier" }}
      >
        <MotionLab />
      </LabSettingsContext.Provider>,
    );
    fireEvent.change(screen.getByRole("textbox", { name: "Motion headline" }), {
      target: { value: "A CLEARER IDEA." },
    });
    expect(
      screen.getByRole("heading", { name: "A CLEARER IDEA." }),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Advance frame" }));
    fireEvent.click(screen.getByRole("button", { name: "Advance frame" }));
    expect(progress()).toBe("25%");
    act(() => vi.advanceTimersByTime(6000));
    expect(progress()).toBe("25%");
    expect(animate).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
    delete (Element.prototype as Partial<Element>).animate;
  });

  it("cancels a scene entrance when focus enters it and when it is replaced", () => {
    const animations: { cancel: ReturnType<typeof vi.fn> }[] = [];
    const animate = vi.fn(() => {
      const animation = { cancel: vi.fn() };
      animations.push(animation);
      return animation;
    });
    Object.defineProperty(Element.prototype, "animate", {
      configurable: true,
      writable: true,
      value: animate,
    });
    const { unmount } = render(<MotionLab />);
    fireEvent.click(screen.getByRole("button", { name: "Website" }));
    expect(animations[0].cancel).toHaveBeenCalled();
    fireEvent.focusIn(
      screen.getByRole("button", { name: /Explore the collection/ }),
    );
    expect(animations[1].cancel).toHaveBeenCalled();
    unmount();
    expect(animations[1].cancel).toHaveBeenCalledTimes(2);
    delete (Element.prototype as Partial<Element>).animate;
  });
});
