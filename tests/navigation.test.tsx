import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import App from "../src/App";
import { services } from "../src/data";

describe("navigation and routing", () => {
  it("redirects the retired service URL to BUILD without reusing its ID", async () => {
    window.history.replaceState({}, "", "/services/T4");
    render(<App />);
    await screen.findByRole("heading", { level: 1 });
    await waitFor(() =>
      expect(window.location.pathname).toBe("/studios/build"),
    );
    expect(services.some((service) => service.id === "T4")).toBe(false);
  });
  it.each(["outside", "still"])(
    "scrolls to the %s concept after its lazy route mounts",
    async (anchor) => {
      const visited: string[] = [];
      const scroll = vi
        .spyOn(Element.prototype, "scrollIntoView")
        .mockImplementation(function (this: Element) {
          visited.push(this.id);
        });
      try {
        window.history.replaceState({}, "", `/work#${anchor}`);
        render(<App />);
        await screen.findByRole("heading", { level: 1 });
        await waitFor(() => expect(visited).toContain(anchor));
        expect(document.activeElement).toBe(screen.getByRole("main"));
      } finally {
        scroll.mockRestore();
      }
    },
  );
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
    it(`renders ${path} with one main heading and working main landmark`, async () => {
      window.history.replaceState({}, "", path);
      const { container } = render(<App />);
      await screen.findByRole("heading", { level: 1 });
      const interfaceCopy = Array.from(
        container.querySelectorAll("[aria-label],[alt],[placeholder],[title]"),
      )
        .map((node) =>
          ["aria-label", "alt", "placeholder", "title"]
            .map((key) => node.getAttribute(key) || "")
            .join(" "),
        )
        .join(" ");
      expect(
        `${container.textContent} ${interfaceCopy} ${document.title}`,
      ).not.toMatch(/\b(?:AI|automation|automate|assistants?)\b/i);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getByRole("main")).toBeTruthy();
      expect(
        screen
          .getByRole("link", { name: "MAKENDLESS home" })
          .getAttribute("href"),
      ).toBe("/");
    });
  }
  it("opens the compact Studios disclosure and restores focus on Escape", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/");
    render(<App />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(
      within(nav)
        .getByRole("link", { name: "Project Lab" })
        .getAttribute("href"),
    ).toBe("/project-lab");
    const opener = within(nav).getByRole("button", { name: "Studios" });
    await user.click(opener);
    const grow = within(nav).getByRole("link", {
      name: /GROW Digital Marketing Beta \/ Coming Soon/,
    });
    expect(grow.getAttribute("href")).toBe("/studios/grow");
    const first = within(nav).getByRole("link", {
      name: "CREATE Video Editing",
    });
    first.focus();
    await user.keyboard("{Escape}");
    expect(document.activeElement).toBe(opener);
    expect(opener.getAttribute("aria-expanded")).toBe("false");
    expect(
      within(nav).queryByRole("link", { name: "CREATE Video Editing" }),
    ).toBeNull();
  });
  it("closes the studio disclosure on outside interaction and destination navigation", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/");
    render(<App />);
    const opener = screen.getByRole("button", { name: "Studios" });
    await user.click(opener);
    await user.click(screen.getByRole("heading", { level: 1 }));
    expect(opener.getAttribute("aria-expanded")).toBe("false");
    await user.click(opener);
    await user.click(
      screen.getByRole("link", { name: "BUILD Website Development" }),
    );
    expect(window.location.pathname).toBe("/studios/build");
    expect(opener.getAttribute("aria-expanded")).toBe("false");
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
  it("navigates from mobile studios and releases the page scroll lock", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/");
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(
      within(dialog).getByRole("link", { name: "CREATE Video Editing" }),
    );
    expect(window.location.pathname).toBe("/studios/create");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });
  it("keeps GROW availability visible and all 14 categories intact", () => {
    expect(services).toHaveLength(14);
    expect(new Set(services.map((s) => s.id)).size).toBe(14);
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
