import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SiteThemeProvider, useSiteTheme } from "../src/theme-context";
import RouteTheme from "../src/components/RouteTheme";
import { GLASS_PRISM, PRISM_ATELIER } from "../src/theme";
function Probe() {
  const { theme } = useSiteTheme();
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <Link to="/about">About</Link>
      <Link to="/?theme=atelier">Preview Atelier</Link>
      <Link to="/?theme=glass">Preview Glass</Link>
    </>
  );
}
function ThemeTest({ entry = "/" }: { entry?: string }) {
  return (
    <MemoryRouter initialEntries={[entry]}>
      <SiteThemeProvider>
        <RouteTheme />
        <Probe />
      </SiteThemeProvider>
    </MemoryRouter>
  );
}
describe("V14 recoverable site palette", () => {
  it("keeps Atelier across customer routes and restores document state on unmount", async () => {
    const { unmount } = render(<ThemeTest />);
    expect(document.documentElement.style.getPropertyValue("--brand-bg")).toBe(
      PRISM_ATELIER.night,
    );
    await userEvent.click(screen.getByRole("link", { name: "About" }));
    expect(document.documentElement.dataset.theme).toBe("atelier");
    unmount();
    expect(document.documentElement.dataset.theme).toBeUndefined();
    expect(
      document.documentElement.style.getPropertyValue("--home-paper"),
    ).toBe("");
  });
  it("supports a Glass review URL, retains it across navigation, and can recover Atelier", async () => {
    render(<ThemeTest entry="/?theme=glass" />);
    expect(document.documentElement.dataset.theme).toBe("glass");
    expect(
      document.documentElement.style.getPropertyValue("--home-paper"),
    ).toBe(GLASS_PRISM.paper);
    await userEvent.click(screen.getByRole("link", { name: "About" }));
    expect(screen.getByTestId("theme").textContent).toBe("glass");
    await userEvent.click(
      screen.getByRole("link", { name: "Preview Atelier" }),
    );
    expect(screen.getByTestId("theme").textContent).toBe("atelier");
    expect(document.documentElement.style.getPropertyValue("--brand-bg")).toBe(
      PRISM_ATELIER.night,
    );
  });
});
