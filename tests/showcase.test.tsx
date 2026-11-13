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
    await user.click(screen.getByRole("button", { name: "AI Automation" }));
    expect(screen.getByRole("button", { name: "Next step" })).toBeTruthy();
    errorLog.mockRestore();
  });

  it("opens on CREATE and keeps a functional flat view when WebGL is unavailable", async () => {
    const user = userEvent.setup();
    mount();
    expect(
      screen
        .getByRole("button", { name: "CREATE Video editing" })
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
    await user.click(screen.getByRole("button", { name: "BUILD Websites" }));
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
  it("steps an inquiry through human review and can restart", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole("button", { name: "AI Automation" }));
    expect(
      screen.getByText("“Hello, I’d like a website with appointment booking.”"),
    ).toBeTruthy();
    for (let i = 0; i < 4; i++)
      await user.click(screen.getByRole("button", { name: "Next step" }));
    expect(screen.getByText("Human decision required")).toBeTruthy();
    expect(
      screen.getByRole("status", { name: "Showcase feedback" }).textContent,
    ).toContain("Nothing is sent");
    await user.click(screen.getByRole("button", { name: "Restart" }));
    expect(
      screen
        .getByRole("button", { name: "Previous workflow step" })
        .hasAttribute("disabled"),
    ).toBe(true);
  });
  it("adds the relevant service to the shared project and links to its detail route", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole("button", { name: "Add to my project" }));
    expect(
      screen.getByRole("status", { name: "Project service selections" })
        .textContent,
    ).toBe("V1");
    await user.click(screen.getByRole("button", { name: "BUILD Websites" }));
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
    await user.click(screen.getByRole("button", { name: "BUILD Websites" }));
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
});
