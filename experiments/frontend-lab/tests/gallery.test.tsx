import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import App from "../src/App";
import { useLabSettings } from "../src/settings";
function Probe() {
  const value = useLabSettings();
  return (
    <>
      <h2>Hero experiment</h2>
      <output aria-label="Applied settings">{JSON.stringify(value)}</output>
    </>
  );
}
vi.mock("../src/HeroLab", () => ({ default: () => <Probe /> }));
vi.mock("../src/SpatialLab", () => ({
  default: () => <h2>Spatial experiment</h2>,
}));
vi.mock("../src/MotionLab", () => ({
  default: () => <h2>Motion experiment</h2>,
}));
vi.mock("../src/LiveLab", () => ({ default: () => <h2>Live experiment</h2> }));
vi.mock("../src/SectionLab", () => ({
  default: () => <h2>Section experiment</h2>,
}));
describe("isolated lab gallery", () => {
  it("mounts only the selected experiment and follows a real hash destination", async () => {
    window.history.replaceState({}, "", "/#heroes");
    render(<App />);
    await screen.findByRole("heading", { name: "Hero experiment" });
    expect(
      screen.queryByRole("heading", { name: "Spatial experiment" }),
    ).toBeNull();
    await userEvent.click(
      screen.getByRole("link", { name: /02 Material & light/ }),
    );
    await screen.findByRole("heading", { name: "Spatial experiment" });
    expect(
      screen.queryByRole("heading", { name: "Hero experiment" }),
    ).toBeNull();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
  it("keeps the current experiment when skipping to its content", async () => {
    window.history.replaceState({}, "", "/#spatial");
    render(<App />);
    await screen.findByRole("heading", { name: "Spatial experiment" });
    await userEvent.click(
      screen.getByRole("link", { name: "Skip to experiment" }),
    );
    expect(window.location.hash).toBe("#spatial");
    expect(document.activeElement).toBe(screen.getByRole("main"));
    expect(
      screen.queryByRole("heading", { name: "Hero experiment" }),
    ).toBeNull();
  });
  it("passes real palette and accessibility settings without changing production state", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/#heroes");
    render(<App />);
    await screen.findByRole("heading", { name: "Hero experiment" });
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Palette" }),
      "atelier",
    );
    await user.click(screen.getByRole("checkbox", { name: "Reduce motion" }));
    await user.click(
      screen.getByRole("checkbox", { name: "Force HTML fallback" }),
    );
    expect(
      JSON.parse(
        screen.getByRole("status", { name: "Applied settings" }).textContent!,
      ),
    ).toEqual({ theme: "atelier", reducedMotion: true, forceFallback: true });
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
  it("embeds only the experiment and allows its CTA hash to select another one", async () => {
    window.history.replaceState({}, "", "/?embed=1&reduce=1&fallback=1#heroes");
    render(<App />);
    await screen.findByRole("heading", { name: "Hero experiment" });
    expect(screen.queryByRole("navigation")).toBeNull();
    expect(
      screen.getByRole("status", { name: "Applied settings" }).textContent,
    ).toContain('"reducedMotion":true');
    act(() => {
      window.location.hash = "live";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: "Live experiment" }),
      ).toBeTruthy(),
    );
  });
});
