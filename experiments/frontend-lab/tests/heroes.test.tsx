import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HeroLab from "../src/HeroLab";
import { LabSettingsContext, type LabSettings } from "../src/settings";

vi.mock("../src/SpatialLab", () => ({
  default: ({ embedded }: { embedded: boolean }) => (
    <div data-testid="spatial-embedded">
      {embedded ? "Embedded spatial study" : "Standalone spatial study"}
    </div>
  ),
}));

const base: LabSettings = {
  reducedMotion: false,
  forceFallback: false,
  theme: "glass",
};
const view = (settings: Partial<LabSettings> = {}) => (
  <LabSettingsContext.Provider value={{ ...base, ...settings }}>
    <HeroLab />
  </LabSettingsContext.Provider>
);
let observerCallback: IntersectionObserverCallback | undefined;
const disconnect = vi.fn();
beforeEach(() => {
  observerCallback = undefined;
  disconnect.mockClear();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      observe = vi.fn();
      disconnect = disconnect;
    },
  );
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function chooseEditorial() {
  fireEvent.click(
    screen.getByRole("button", { name: /C Editorial Motion Composition/ }),
  );
}

describe("hero concepts: native controls and finite preview lifecycle", () => {
  it("changes the actual media composition, crop and selected shot", () => {
    const result = render(view());
    expect(
      screen.getByRole("img", {
        name: "Original vector illustration of over-ear headphones",
      }),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Source" }));
    expect(screen.getByText("Before the edit.")).toBeTruthy();
    expect(result.container.querySelector(".hero-film-type")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Tight framing" }));
    expect(
      result.container.querySelector(".hero-film-screen.is-close"),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("button", { name: "Tight framing" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: /02 The detail/ }));
    expect(
      result.container.querySelector(".hero-film-screen.is-edited.hero-shot-1"),
    ).toBeTruthy();
    expect(
      result.container.querySelector(".hero-film-type")?.textContent,
    ).toContain("LESS NOISE.MORE YOU.");
    expect(
      screen
        .getByRole("button", { name: /02 The detail/ })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen
        .getByRole("link", { name: "Explore the live demos" })
        .getAttribute("href"),
    ).toBe("#live");
  });

  it("never autoplays and stops the requested preview after its three shots", () => {
    vi.useFakeTimers();
    const result = render(view());
    expect(vi.getTimerCount()).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Play concept film" }));
    expect(
      screen.getByRole("button", { name: "Pause concept film" }),
    ).toBeTruthy();
    act(() => vi.advanceTimersByTime(2000));
    expect(result.container.querySelector(".hero-shot-1")).toBeTruthy();
    act(() => vi.advanceTimersByTime(2000));
    expect(result.container.querySelector(".hero-shot-2")).toBeTruthy();
    act(() => vi.advanceTimersByTime(2000));
    expect(
      screen.getByRole("button", { name: "Play concept film" }),
    ).toBeTruthy();
    expect(vi.getTimerCount()).toBe(0);
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it("stops the preview offscreen and clears playback when a concept unmounts", () => {
    vi.useFakeTimers();
    render(view());
    fireEvent.click(screen.getByRole("button", { name: "Play concept film" }));
    act(() =>
      observerCallback?.(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    expect(
      screen.getByRole("button", { name: "Play concept film" }),
    ).toBeTruthy();
    expect(vi.getTimerCount()).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Play concept film" }));
    chooseEditorial();
    expect(
      screen.queryByLabelText("Cinematic media hero prototype"),
    ).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
    expect(disconnect).toHaveBeenCalledTimes(2);
  });

  it("stops the preview when the browser document becomes hidden", () => {
    vi.useFakeTimers();
    render(view());
    fireEvent.click(screen.getByRole("button", { name: "Play concept film" }));
    vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    fireEvent(document, new Event("visibilitychange"));
    expect(vi.getTimerCount()).toBe(0);
    expect(
      screen.getByRole("button", { name: "Play concept film" }),
    ).toBeTruthy();
  });

  it("replaces playback with discrete stills and responds to a live reduced-motion change", () => {
    vi.useFakeTimers();
    const result = render(view());
    fireEvent.click(screen.getByRole("button", { name: "Play concept film" }));
    result.rerender(view({ reducedMotion: true }));
    expect(vi.getTimerCount()).toBe(0);
    expect(
      screen.queryByRole("button", { name: "Play concept film" }),
    ).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Source" }));
    fireEvent.click(screen.getByRole("button", { name: "Next still" }));
    expect(
      result.container.querySelector(".hero-film-screen.is-edited.hero-shot-1"),
    ).toBeTruthy();
    expect(
      screen
        .getByLabelText("Cinematic media hero prototype")
        .getAttribute("data-hero-reduced"),
    ).toBe("true");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("mounts only the selected prototype and passes embedded mode to the spatial concept", async () => {
    render(view());
    expect(screen.queryByTestId("spatial-embedded")).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: /B Interactive Spatial Showcase/ }),
    );
    expect(await screen.findByText("Embedded spatial study")).toBeTruthy();
    expect(
      screen.queryByLabelText("Cinematic media hero prototype"),
    ).toBeNull();
    chooseEditorial();
    expect(screen.queryByTestId("spatial-embedded")).toBeNull();
    expect(
      screen.getByLabelText("Editorial motion hero prototype"),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("button", { name: /C Editorial Motion Composition/ })
        .getAttribute("aria-pressed"),
    ).toBe("true");
  });

  it("lets an idea change the editorial headline and opens and closes the real mini-site detail", () => {
    render(view());
    chooseEditorial();
    fireEvent.change(screen.getByLabelText("Try your own idea"), {
      target: { value: "Turn a small idea into a useful website." },
    });
    expect(
      screen.getByRole("heading", {
        name: "Turn a small idea into a useful website.",
      }),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "BUILD" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Open the project detail" }),
    );
    expect(
      screen.getByRole("heading", { name: "A quieter place to discover." }),
    ).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Return to the concept" }),
    );
    expect(
      screen.getByRole("button", { name: "Open the project detail" }),
    ).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Try your own idea"), {
      target: { value: "  " },
    });
    expect(
      screen.getByRole("heading", { name: "A new way to listen." }),
    ).toBeTruthy();
  });

  it("advances the sample workflow to a human-review stop and resets it", () => {
    render(view());
    chooseEditorial();
    fireEvent.click(screen.getByRole("button", { name: "AI" }));
    fireEvent.click(screen.getByRole("button", { name: "Follow the inquiry" }));
    expect(
      screen.getByText(
        "A rule identifies a website request and routes it to planning.",
      ),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Follow the inquiry" }));
    fireEvent.click(screen.getByRole("button", { name: "Follow the inquiry" }));
    expect(
      (
        screen.getByRole("button", {
          name: "Ready for human review",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(
      screen.getByText(
        "A person reviews the draft. Nothing is sent automatically.",
      ),
    ).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Reset editorial workflow" }),
    );
    expect(
      screen.getByText(
        "A sample request arrives. No connection to real messages.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Follow the inquiry" }),
    ).toBeTruthy();
  });

  it("replays only the finite visual composition while preserving the visitor's idea", () => {
    const result = render(view({ reducedMotion: true }));
    chooseEditorial();
    fireEvent.change(screen.getByLabelText("Try your own idea"), {
      target: { value: "A meaningful idea." },
    });
    const previous = result.container.querySelector(".hero-editorial-visual");
    fireEvent.click(
      screen.getByRole("button", { name: "Replay editorial composition" }),
    );
    expect(result.container.querySelector(".hero-editorial-visual")).not.toBe(
      previous,
    );
    expect(
      screen.getByRole("heading", { name: "A meaningful idea." }),
    ).toBeTruthy();
    expect(
      screen
        .getByLabelText("Editorial motion hero prototype")
        .getAttribute("data-hero-reduced"),
    ).toBe("true");
  });
});
