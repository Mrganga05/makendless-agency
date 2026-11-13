import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../src/App";
import { PRISM_ATELIER } from "../src/theme";

describe("V14 complete customer journey", () => {
  it("presents the ten-section journey, useful studio destination and one main heading", () => {
    window.history.replaceState({}, "", "/");
    const { container } = render(<App />);
    const page = container.querySelector(".v14-home")!;
    const stages = Array.from(page.children);
    expect(stages.map((node) => node.id)).toEqual([
      "home",
      "studios",
      "showcase",
      "solutions",
      "work",
      "packages",
      "project-lab",
      "about",
      "process",
      "start",
    ]);
    expect(stages.every((node) => node.tagName === "SECTION")).toBe(true);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(
      /We make ideas.*impossible.*to ignore/,
    );
    expect(
      screen
        .getByRole("link", { name: "Explore Studios" })
        .getAttribute("href"),
    ).toBe("#studios");
    const ids = Array.from(container.querySelectorAll("[id]")).map(
      (node) => node.id,
    );
    expect(new Set(ids).size).toBe(ids.length);
    expect(
      screen.getByRole("heading", {
        name: /Creative minds.*Technical thinking/,
      }),
    ).toBeTruthy();
  });
  it("keeps the chosen palette through real navigation and the inquiry destination reachable", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/");
    const { unmount } = render(<App />);
    expect(document.documentElement.dataset.theme).toBe("atelier");
    expect(document.documentElement.style.getPropertyValue("--brand-bg")).toBe(
      PRISM_ATELIER.night,
    );
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    await user.click(within(nav).getByRole("link", { name: "About" }));
    await screen.findByRole("heading", { level: 1 });
    expect(document.documentElement.dataset.theme).toBe("atelier");
    await user.click(
      screen.getAllByRole("link", { name: "Start a Project" })[0],
    );
    expect(window.location.pathname).toBe("/contact");
    await screen.findByRole("heading", { level: 1 });
    unmount();
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
});
