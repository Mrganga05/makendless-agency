import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../src/App";
import { PRISM_ATELIER } from "../src/theme";

describe("V12 homepage architecture", () => {
  it("presents nine distinct stages and routes the service CTA to the actual gallery", async () => {
    window.history.replaceState({}, "", "/");
    const { container } = render(<App />);
    const page = container.querySelector(".atelier-home")!;
    const stages = Array.from(page.children);
    expect(stages).toHaveLength(9);
    expect(stages.every((node) => node.tagName === "SECTION")).toBe(true);
    expect(stages.map((node) => node.className)).toEqual([
      "hp-hero",
      "hp-service-gallery",
      "hp-transformation",
      "hp-audience",
      "hp-packages",
      "hp-work",
      "hp-lab",
      "hp-process",
      "hp-final",
    ]);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(
      /We make ideas.*impossible.*to ignore/,
    );
    expect(
      screen
        .getByRole("link", { name: "Explore Services" })
        .getAttribute("href"),
    ).toBe("#services");
    expect(document.getElementById("services")).toBe(stages[1]);
    const ids = Array.from(container.querySelectorAll("[id]")).map(
      (node) => node.id,
    );
    expect(new Set(ids).size).toBe(ids.length);
    expect(
      screen.getByRole("button", { name: "Generate my brief" }),
    ).toBeTruthy();
  });

  it("applies Atelier on home and restores the internal Glass Prism palette on navigation", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/");
    const { unmount } = render(<App />);
    expect(document.documentElement.dataset.theme).toBe("atelier");
    expect(document.documentElement.style.getPropertyValue("--brand-bg")).toBe(
      PRISM_ATELIER.night,
    );
    expect(
      document.documentElement.style.getPropertyValue("--home-paper"),
    ).toBe(PRISM_ATELIER.paper);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    await user.click(within(nav).getByRole("link", { name: "About" }));
    await screen.findByRole("heading", { level: 1 });
    await waitFor(() =>
      expect(document.documentElement.dataset.theme).toBe("glass"),
    );
    expect(document.documentElement.style.getPropertyValue("--brand-bg")).toBe(
      "",
    );
    unmount();
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
});
