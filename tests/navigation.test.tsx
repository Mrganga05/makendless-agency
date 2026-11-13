import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "../src/App";
import { services } from "../src/data";

describe("navigation and routing", () => {
  for (const path of [
    "/",
    "/studios",
    "/studios/create",
    "/studios/build",
    "/studios/grow",
    "/work",
    "/about",
    "/project-lab",
    "/find-solution",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    ...services.map((s) => `/services/${s.id}`),
    "/not-found",
  ]) {
    it(`renders ${path} with one main heading and working main landmark`, () => {
      window.history.replaceState({}, "", path);
      render(<App />);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getByRole("main")).toBeTruthy();
      expect(
        screen
          .getByRole("link", { name: "MAKENDLESS home" })
          .getAttribute("href"),
      ).toBe("/");
    });
  }
  it("offers direct Services, Work and About links without a nested menu", () => {
    window.history.replaceState({}, "", "/");
    render(<App />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(
      Array.from(nav.querySelectorAll("a")).map((a) => a.textContent),
    ).toEqual(["Services", "Work", "About"]);
    expect(nav.querySelector("button")).toBeNull();
    expect(
      screen.getByRole("link", { name: "Services" }).getAttribute("href"),
    ).toBe("/studios");
  });
  it("opens mobile navigation, contains focus and closes after navigation", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/");
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    expect(dialog).toBeTruthy();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Close navigation" }),
    );
    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(document.activeElement?.textContent).toMatch(/Start a Project/);
    await user.keyboard("{Tab}");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Close navigation" }),
    );
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Open navigation" }),
    );
  });
  it("keeps GROW availability visible and all 13 categories intact", () => {
    expect(services).toHaveLength(13);
    expect(new Set(services.map((s) => s.id)).size).toBe(13);
    window.history.replaceState({}, "", "/studios/grow");
    render(<App />);
    expect(screen.getAllByText(/coming soon/i).length).toBeGreaterThan(0);
  });
  it("updates page title when a destination changes", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/");
    render(<App />);
    await user.click(screen.getAllByRole("link", { name: "About" })[0]);
    await waitFor(() =>
      expect(document.title).toBe("MAKENDLESS — About the Studio"),
    );
  });
});
