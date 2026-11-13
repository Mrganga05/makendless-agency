import { useEffect } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LiveShowcase from "../src/components/LiveShowcase";
import { ProjectProvider, useProject } from "../src/project";

const sceneSpy = vi.hoisted(() => ({ mount: vi.fn(), crash: false }));
vi.mock("../src/components/SpatialScene", () => ({
  default: function MockSpatialScene({
    onReady,
    onError,
    theme,
  }: {
    onReady: () => void;
    onError: () => void;
    theme?: string;
  }) {
    if (sceneSpy.crash) throw new Error("Simulated scene failure");
    useEffect(() => {
      sceneSpy.mount();
      onReady();
    }, [onReady]);
    return (
      <div data-testid="test-spatial-scene" data-scene-theme={theme}>
        <button onClick={onError}>Simulate context loss</button>
      </div>
    );
  },
}));
function SelectionReadout() {
  const { project } = useProject();
  return (
    <output aria-label="Project service selections">
      {project.services.join(",")}
    </output>
  );
}
function mount(props: Parameters<typeof LiveShowcase>[0] = {}) {
  return render(
    <MemoryRouter>
      <ProjectProvider>
        <LiveShowcase {...props} />
        <SelectionReadout />
        <Routes>
          <Route path="*" element={null} />
          <Route path="/services/:id" element={<p>Service destination</p>} />
        </Routes>
      </ProjectProvider>
    </MemoryRouter>,
  );
}
function media(queryMatch: (query: string) => boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: queryMatch(query),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
function webgl() {
  vi.stubGlobal("WebGL2RenderingContext", class {});
  const lose = vi.fn();
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    getExtension: () => ({ loseContext: lose }),
  } as never);
  return lose;
}
beforeEach(() => media(() => false));
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  sceneSpy.mount.mockClear();
  sceneSpy.crash = false;
});
describe("Living Showcase: service-led interactions and fallbacks", () => {
  it("uses the homepage palette in the spatial preview and retains a working flat fallback", async () => {
    webgl();
    const user = userEvent.setup();
    mount({ theme: "atelier" });
    expect(
      screen.queryByRole("link", { name: "Explore this service" }),
    ).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Add to my project" }),
    ).toBeNull();
    const scene = await screen.findByTestId("test-spatial-scene");
    expect(scene.getAttribute("data-scene-theme")).toBe("atelier");
    fireEvent.click(screen.getByText("Simulate context loss"));
    await user.click(
      screen.getByRole("button", { name: "Original", exact: true }),
    );
    expect(screen.getByText("SOURCE VIEW")).toBeTruthy();
    expect(
      screen.getByRole("status", { name: "Showcase feedback" }).textContent,
    ).toContain("Flat preview active");
  });

  it("reuses an explicitly opened BUILD study with working controls and no hero navigation", async () => {
    const user = userEvent.setup();
    mount({ initialMode: "build", variant: "study", showModeSwitch: false });
    expect(
      screen.queryByRole("group", { name: "Choose a service showcase" }),
    ).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Add to my project" }),
    ).toBeNull();
    expect(
      screen.queryByRole("link", { name: "Explore this service" }),
    ).toBeNull();
    await user.click(
      screen.getByRole("button", { name: "Mobile", exact: true }),
    );
    await user.click(
      screen.getByRole("button", { name: "Open the café menu" }),
    );
    expect(screen.getByText("Flat white")).toBeTruthy();
    expect(screen.getByText("Mobile layout · Finished design")).toBeTruthy();
  });

  it("keeps the flat view on a data-saving connection", async () => {
    webgl();
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: { saveData: true },
    });
    mount();
    expect(screen.getByText("FLAT PREVIEW")).toBeTruthy();
    expect(HTMLCanvasElement.prototype.getContext).not.toHaveBeenCalled();
    Reflect.deleteProperty(navigator, "connection");
  });
  it("recovers from a thrown scene error without disabling service controls", async () => {
    webgl();
    sceneSpy.crash = true;
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    mount();
    await waitFor(() =>
      expect(
        screen.getByRole("status", { name: "Showcase feedback" }).textContent,
      ).toContain("Flat preview active"),
    );
    await user.click(
      screen.getByRole("button", { name: /^DIGITAL MARKETING/ }),
    );
    expect(
      screen.getByRole("combobox", { name: "Campaign objective" }),
    ).toBeTruthy();
    errorLog.mockRestore();
  });

  it("opens on CREATE and keeps a functional flat view when WebGL is unavailable", async () => {
    const user = userEvent.setup();
    mount();
    expect(
      screen
        .getByRole("button", { name: "VIDEO EDITING CREATE" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    await waitFor(() =>
      expect(
        screen.getByRole("status", { name: "Showcase feedback" }).textContent,
      ).toContain("Flat preview active"),
    );
    expect(sceneSpy.mount).not.toHaveBeenCalled();
    await user.click(
      screen.getByRole("button", { name: "Original", exact: true }),
    );
    expect(screen.getByText("SOURCE VIEW")).toBeTruthy();
    expect(screen.queryByText("Go somewhere.")).toBeNull();
    await user.click(
      screen.getByRole("button", { name: "Edited", exact: true }),
    );
    expect(screen.getByText("Go somewhere.")).toBeTruthy();
    await user.click(screen.getByText("Make it yours"));
    fireEvent.change(screen.getByRole("slider", { name: "Edit timeline" }), {
      target: { value: "80" },
    });
    expect(screen.getByText("Make it matter.")).toBeTruthy();
  });
  it("plays, pauses and scrubs a photo-to-motion concept without claiming client footage", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(
      screen.getByRole("button", { name: "Play motion preview" }),
    );
    expect(
      screen.getByRole("button", { name: "Pause motion preview" }),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: "Pause motion preview" }),
    );
    await user.click(screen.getByText("Make it yours"));
    fireEvent.change(screen.getByRole("slider", { name: "Edit timeline" }), {
      target: { value: "50" },
    });
    expect(screen.getByText("Feel something.")).toBeTruthy();
    expect(
      screen.getByRole("status", { name: "Showcase feedback" }).textContent,
    ).toContain("not client footage");
  });
  it("changes website structure, viewport and actual sample menu content", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole("button", { name: "WEBSITES BUILD" }));
    await user.click(
      screen.getByRole("button", { name: "Wireframe", exact: true }),
    );
    expect(screen.getByText("START WITH THE STRUCTURE")).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: "Mobile", exact: true }),
    );
    expect(
      screen.getByText("Mobile layout · Wireframe structure"),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: "Open the café menu" }),
    );
    expect(screen.getByText("Flat white")).toBeTruthy();
    expect(screen.getByText("THE SAMPLE MENU")).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: "Back to sample homepage" }),
    );
    expect(screen.queryByText("Flat white")).toBeNull();
  });
  it("changes the campaign objective, creative and placement independently and can reset", async () => {
    const user = userEvent.setup();
    const { container } = mount();
    await user.click(
      screen.getByRole("button", { name: /^DIGITAL MARKETING/ }),
    );
    expect(screen.getByText("BETA / COMING SOON")).toBeTruthy();
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Campaign objective" }),
      "visits",
    );
    expect(
      screen.getByRole("heading", { name: "Make room for a daily ritual." }),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "People & story" }));
    expect(
      screen.getByRole("img", { name: /Friends sharing coffee/ }),
    ).toBeTruthy();
    expect(container.querySelector(".campaign-ad")?.className).toContain(
      "campaign-ad--placement-feed",
    );
    await user.click(
      screen.getByRole("button", { name: "Story", exact: true }),
    );
    expect(container.querySelector(".campaign-ad")?.className).toContain(
      "campaign-ad--placement-story",
    );
    await user.click(screen.getByRole("button", { name: "Product focus" }));
    expect(container.querySelector(".campaign-ad")?.className).toContain(
      "campaign-ad--placement-story",
    );
    expect(
      screen.getByRole("img", { name: /Original coffee cup artwork/ }),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: "Reset campaign preview" }),
    );
    expect(
      (
        screen.getByRole("combobox", {
          name: "Campaign objective",
        }) as HTMLSelectElement
      ).value,
    ).toBe("awareness");
    expect(container.querySelector(".campaign-ad")?.className).toContain(
      "campaign-ad--placement-feed",
    );
    expect(
      screen.getByText(/No campaign is running and no results are claimed/),
    ).toBeTruthy();
  });
  it("adds the relevant service to the shared project and links to its detail route", async () => {
    const user = userEvent.setup();
    mount({ showServiceActions: true });
    await user.click(screen.getByRole("button", { name: "Add to my project" }));
    expect(
      screen.getByRole("status", { name: "Project service selections" })
        .textContent,
    ).toBe("V1");
    await user.click(screen.getByRole("button", { name: "WEBSITES BUILD" }));
    await user.click(screen.getByRole("button", { name: "Add to my project" }));
    expect(
      screen.getByRole("status", { name: "Project service selections" })
        .textContent,
    ).toBe("V1,T1");
    expect(
      screen
        .getByRole("link", { name: "Explore this service" })
        .getAttribute("href"),
    ).toBe("/services/T1");
    await user.click(screen.getByRole("button", { name: "Added · remove" }));
    expect(
      screen.getByRole("status", { name: "Project service selections" })
        .textContent,
    ).toBe("V1");
  });
  it("does not request a GPU context automatically under reduced motion", async () => {
    media((q) => q.includes("prefers-reduced-motion"));
    const lose = webgl();
    mount();
    await waitFor(() => expect(screen.getByText("FLAT PREVIEW")).toBeTruthy());
    expect(HTMLCanvasElement.prototype.getContext).not.toHaveBeenCalled();
    expect(lose).not.toHaveBeenCalled();
    expect(sceneSpy.mount).not.toHaveBeenCalled();
  });
  it("uses the lightweight view by default on mobile and allows a deliberate spatial opt-in", async () => {
    media((q) => q.includes("max-width"));
    const lose = webgl();
    const user = userEvent.setup();
    mount();
    expect(HTMLCanvasElement.prototype.getContext).not.toHaveBeenCalled();
    await user.click(
      screen.getByRole("button", { name: "Use spatial preview" }),
    );
    await screen.findByText("SPATIAL PREVIEW");
    expect(lose).toHaveBeenCalledOnce();
    expect(sceneSpy.mount).toHaveBeenCalledOnce();
    await user.click(screen.getByRole("button", { name: "Use flat preview" }));
    expect(screen.queryByTestId("test-spatial-scene")).toBeNull();
  });
  it("falls back after a renderer/context failure without losing selected state", async () => {
    webgl();
    const user = userEvent.setup();
    mount();
    await screen.findByText("SPATIAL PREVIEW");
    await user.click(screen.getByRole("button", { name: "WEBSITES BUILD" }));
    await user.click(
      screen.getByRole("button", { name: "Mobile", exact: true }),
    );
    act(() => fireEvent.click(screen.getByText("Simulate context loss")));
    await waitFor(() =>
      expect(screen.queryByTestId("test-spatial-scene")).toBeNull(),
    );
    expect(
      screen
        .getByRole("button", { name: "Mobile", exact: true })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen.getByRole("status", { name: "Showcase feedback" }).textContent,
    ).toContain("Flat preview active");
    await user.click(
      screen.getByRole("button", { name: "Open the café menu" }),
    );
    expect(screen.getByText("Espresso")).toBeTruthy();
  });
  it("changes the actual comparison, caption and crop independently", async () => {
    const user = userEvent.setup();
    const { container } = mount({ variant: "study" });
    await user.click(
      screen.getByRole("button", { name: "Compare", exact: true }),
    );
    expect(
      container.querySelector(".living-edit")?.getAttribute("data-comparison"),
    ).toBe("50");
    fireEvent.change(
      screen.getByRole("slider", { name: "Before and after comparison" }),
      { target: { value: "25" } },
    );
    expect(
      container.querySelector(".living-edit")?.getAttribute("data-comparison"),
    ).toBe("25");
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Caption style" }),
      "none",
    );
    expect(screen.queryByText("Go somewhere.")).toBeNull();
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Framing" }),
      "tight",
    );
    expect(container.querySelector(".living-edit")?.className).toContain(
      "crop-tight",
    );
  });
  it("retains campaign choices across mode changes and treats marketing only as future interest", async () => {
    const user = userEvent.setup();
    mount({ initialMode: "grow", showServiceActions: true });
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Campaign objective" }),
      "inquiries",
    );
    await user.click(
      screen.getByRole("button", { name: "Story", exact: true }),
    );
    await user.click(screen.getByRole("button", { name: "WEBSITES BUILD" }));
    await user.click(
      screen.getByRole("button", { name: /^DIGITAL MARKETING/ }),
    );
    expect(
      (
        screen.getByRole("combobox", {
          name: "Campaign objective",
        }) as HTMLSelectElement
      ).value,
    ).toBe("inquiries");
    expect(
      screen
        .getByRole("button", { name: "Story", exact: true })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen.getByRole("status", { name: "Project service selections" })
        .textContent,
    ).toBe("");
    expect(
      screen.queryByRole("button", { name: "Add to my project" }),
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: "Explore Beta" }).getAttribute("href"),
    ).toBe("/services/M1");
    await user.click(
      screen.getByRole("button", { name: "Add future interest" }),
    );
    expect(
      screen.getByRole("status", { name: "Project service selections" })
        .textContent,
    ).toBe("M1");
    await user.click(
      screen.getByRole("button", { name: "Interest noted · remove" }),
    );
    expect(
      screen.getByRole("status", { name: "Project service selections" })
        .textContent,
    ).toBe("");
    expect(
      screen.getByRole("status", { name: "Showcase feedback" }).textContent,
    ).toContain("no ads are launched");
  });
  it("uses still stepping under reduced motion and bounds requested playback", async () => {
    media((q) => q.includes("prefers-reduced-motion"));
    const user = userEvent.setup();
    const first = mount();
    expect(
      screen.queryByRole("button", { name: "Play motion preview" }),
    ).toBeNull();
    await user.click(screen.getByRole("button", { name: "Next still" }));
    expect(screen.getByText("Feel something.")).toBeTruthy();
    first.unmount();
    media(() => false);
    vi.useFakeTimers();
    const second = mount();
    fireEvent.click(
      screen.getByRole("button", { name: "Play motion preview" }),
    );
    act(() => vi.advanceTimersByTime(6200));
    expect(
      screen.getByRole("button", { name: "Play motion preview" }),
    ).toBeTruthy();
    expect(screen.getByText("Make it matter.")).toBeTruthy();
    second.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
