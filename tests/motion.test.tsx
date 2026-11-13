import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MotionSystem from "../src/components/MotionSystem";

let intersect: IntersectionObserverCallback;
let reduced = false;
let narrow = false;
let preferenceChange: (() => void) | undefined;
const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();
const cancel = vi.fn();
const animate = vi.fn(() => ({ cancel, onfinish: null }));
const originalAnimate = Element.prototype.animate;

beforeEach(() => {
  reduced = false;
  narrow = false;
  preferenceChange = undefined;
  vi.clearAllMocks();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        intersect = callback;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    },
  );
  Object.defineProperty(Element.prototype, "animate", {
    configurable: true,
    value: animate,
    writable: true,
  });
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        get matches() {
          return query.includes("reduced-motion") ? reduced : narrow;
        },
        addEventListener: (_: string, listener: () => void) => {
          preferenceChange = listener;
        },
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList,
  );
});
afterEach(() => {
  cleanup();
  Object.defineProperty(Element.prototype, "animate", {
    configurable: true,
    value: originalAnimate,
    writable: true,
  });
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function enter(element: Element, isIntersecting = true) {
  act(() => {
    intersect(
      [{ target: element, isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
}

describe("declared motion regions", () => {
  it("keeps content and controls available when animation support is absent", () => {
    Object.defineProperty(Element.prototype, "animate", { value: undefined });
    render(
      <>
        <MotionSystem />
        <button data-motion="mask">Continue to my project</button>
      </>,
    );
    const control = screen.getByRole("button", {
      name: "Continue to my project",
    });
    expect(control.getAttribute("style")).toBeNull();
    expect(control.hasAttribute("data-motion-active")).toBe(false);
    expect(observe).not.toHaveBeenCalled();
  });

  it("plays once on entry and retriggers changed content, without replaying on each scroll", async () => {
    function Example({ selected }: { selected: string }) {
      return (
        <>
          <MotionSystem />
          <h2 data-motion="typography" data-motion-key={selected}>
            {selected}
          </h2>
        </>
      );
    }
    const view = render(<Example selected="First direction" />);
    const heading = screen.getByRole("heading");
    expect(animate).not.toHaveBeenCalled();
    enter(heading);
    expect(animate).toHaveBeenCalledTimes(1);
    enter(heading, false);
    enter(heading);
    expect(animate).toHaveBeenCalledTimes(1);
    view.rerender(<Example selected="New direction" />);
    await waitFor(() => expect(animate).toHaveBeenCalledTimes(2));
    expect(screen.getByRole("heading").textContent).toBe("New direction");
  });

  it("registers late route content and cancels work when it is removed", async () => {
    const view = render(<MotionSystem />);
    const preview = document.createElement("section");
    preview.setAttribute("data-motion", "spatial");
    preview.textContent = "Your website preview";
    document.body.append(preview);
    await waitFor(() => expect(observe).toHaveBeenCalledWith(preview));
    enter(preview);
    expect(animate).toHaveBeenCalledTimes(1);
    preview.remove();
    await waitFor(() => expect(unobserve).toHaveBeenCalledWith(preview));
    expect(cancel).toHaveBeenCalled();
    view.unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it("cancels in-flight motion immediately when reduced motion is enabled", () => {
    render(
      <>
        <MotionSystem />
        <h2 data-motion="prism">A considered experience</h2>
      </>,
    );
    const heading = screen.getByRole("heading");
    enter(heading);
    expect(heading.hasAttribute("data-motion-active")).toBe(true);
    act(() => {
      reduced = true;
      preferenceChange?.();
    });
    expect(cancel).toHaveBeenCalledOnce();
    expect(heading.hasAttribute("data-motion-active")).toBe(false);
    enter(heading, false);
    enter(heading);
    expect(animate).toHaveBeenCalledTimes(1);
  });

  it("never starts an entrance with the visitor's reduced-motion preference", () => {
    reduced = true;
    render(
      <>
        <MotionSystem />
        <h2 data-motion="mask">Readable immediately</h2>
      </>,
    );
    enter(screen.getByRole("heading"));
    expect(animate).not.toHaveBeenCalled();
  });

  it("keeps focused controls uncovered and cancels an entrance when focus enters it", async () => {
    const view = render(
      <>
        <MotionSystem />
        <section data-motion="mask" data-motion-key="website">
          <button>Choose appointment</button>
        </section>
      </>,
    );
    const button = screen.getByRole("button");
    const region = button.parentElement!;
    enter(region);
    expect(animate).toHaveBeenCalledOnce();
    act(() => button.focus());
    expect(cancel).toHaveBeenCalledOnce();
    expect(region.hasAttribute("data-motion-active")).toBe(false);
    view.rerender(
      <>
        <MotionSystem />
        <section data-motion="mask" data-motion-key="booking">
          <button>Choose appointment</button>
        </section>
      </>,
    );
    await act(async () => {});
    expect(animate).toHaveBeenCalledOnce();
    expect(document.activeElement).toBe(button);
  });

  it("uses a short opacity change on mobile, without clipping or spatial movement", () => {
    narrow = true;
    render(
      <>
        <MotionSystem />
        <button data-motion="spatial">Choose a service</button>
      </>,
    );
    enter(screen.getByRole("button"));
    expect(animate).toHaveBeenCalledWith(
      [{ opacity: 0.75 }, { opacity: 1 }],
      expect.objectContaining({ duration: 400, fill: "none" }),
    );
  });
});
