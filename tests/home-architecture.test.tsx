import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../src/App";
import { PRISM_ATELIER } from "../src/theme";

describe("V16 seven-section customer journey", () => {
  it("presents the seven-section journey, useful studio destination and one main heading", () => {
    window.history.replaceState({}, "", "/");
    const { container } = render(<App />);
    const page = container.querySelector(".v14-home")!;
    const stages = Array.from(page.children);
    expect(stages.map((node) => node.id)).toEqual([
      "home",
      "studios",
      "showcase",
      "solutions",
      "packages",
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
    expect(page.querySelector("#work")).toBeNull();
    expect(page.querySelector("#project-lab")).toBeNull();
    expect(page.querySelector("#about")).toBeNull();
    expect(
      screen.getAllByRole("link", { name: "Project Lab" }).length,
    ).toBeGreaterThan(0);
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
  it("keeps the two campaign previews independent with uniquely associated controls", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/");
    const { container } = render(<App />);
    const hero = within(container.querySelector("#home") as HTMLElement);
    const transformation = within(
      container.querySelector("#showcase") as HTMLElement,
    );
    await user.click(
      hero.getByRole("button", { name: /DIGITAL MARKETING GROW/ }),
    );
    await user.click(
      transformation.getByRole("button", { name: /DIGITAL MARKETING GROW/ }),
    );
    await user.selectOptions(
      hero.getByRole("combobox", { name: "Campaign objective" }),
      "visits",
    );
    expect(
      (
        transformation.getByRole("combobox", {
          name: "Campaign objective",
        }) as HTMLSelectElement
      ).value,
    ).toBe("awareness");
    await user.click(
      transformation.getByRole("button", { name: "Story", exact: true }),
    );
    expect(
      hero
        .getByRole("button", { name: "Feed", exact: true })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    const ids = Array.from(container.querySelectorAll("[id]")).map(
      (node) => node.id,
    );
    expect(new Set(ids).size).toBe(ids.length);
  });
});
