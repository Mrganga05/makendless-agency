import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import {
  ServiceGallery,
  TransformationStage,
} from "../src/components/home/ServiceExperiences";

function gallery() {
  return render(
    <MemoryRouter>
      <ServiceGallery />
    </MemoryRouter>,
  );
}

describe("V12 editorial service discovery", () => {
  it("plays a finite original sequence and stops work when the tab is hidden", () => {
    vi.useFakeTimers();
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(false);
    try {
      gallery();
      fireEvent.click(screen.getByRole("button", { name: "Preview sequence" }));
      act(() => vi.advanceTimersByTime(1500));
      expect(screen.getByRole("status").textContent).toContain("The right cut");
      hidden.mockReturnValue(true);
      act(() => document.dispatchEvent(new Event("visibilitychange")));
      expect(
        screen.getByRole("button", { name: "Preview sequence" }),
      ).toBeTruthy();
      act(() => vi.advanceTimersByTime(5000));
      expect(screen.getByRole("status").textContent).toContain("The right cut");
      hidden.mockReturnValue(false);
      fireEvent.click(screen.getByRole("button", { name: "Preview sequence" }));
      act(() => vi.advanceTimersByTime(4500));
      expect(
        screen.getByRole("button", { name: "Preview sequence" }),
      ).toBeTruthy();
      expect(screen.getByRole("status").textContent).toContain(
        "original motion-graphics concept",
      );
    } finally {
      hidden.mockRestore();
      vi.useRealTimers();
    }
  });
  it("lets each discipline reveal a different useful preview", async () => {
    const user = userEvent.setup();
    gallery();
    await user.click(screen.getByRole("button", { name: "Show film frame 3" }));
    expect(screen.getByRole("status").textContent).toContain(
      "original motion-graphics concept",
    );
    await user.click(
      screen.getByRole("button", { name: "Explore the objects" }),
    );
    expect(screen.getByText("The vessel")).toBeTruthy();
    expect(screen.getByText("The desk light")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Mobile" }));
    expect(
      document.querySelector(".hp-gallery-site-stage.is-mobile"),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: /Back to the homepage/ }),
    );
    expect(
      screen.getByRole("button", { name: "Explore the objects" }),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: "Create", exact: true }),
    );
    expect(screen.getByText("CONCEPT POST / NOT PUBLISHED")).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: "Review", exact: true }),
    );
    expect(screen.getByText("Consistent business details")).toBeTruthy();
    expect(
      screen.getByText("No performance results are implied."),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "Explore GROW beta services" })
        .getAttribute("href"),
    ).toBe("/studios/grow");
  });
  it("steps the type-film without timers for reduced-motion visitors", () => {
    const original = window.matchMedia;
    const preference = vi
      .spyOn(window, "matchMedia")
      .mockImplementation((query) => ({
        ...original(query),
        matches: query.includes("prefers-reduced-motion"),
      }));
    try {
      gallery();
      fireEvent.click(screen.getByRole("button", { name: "Preview sequence" }));
      expect(screen.getByRole("status").textContent).toContain("The right cut");
      expect(
        screen.queryByRole("button", { name: "Pause sequence" }),
      ).toBeNull();
    } finally {
      preference.mockRestore();
    }
  });
});
describe("V12 transformation stage", () => {
  it("defers one live demonstration, changes real output formats and switches capabilities", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <TransformationStage />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("slider")).toBeNull();
    await user.click(
      screen.getByRole("button", {
        name: "Open the interactive demonstration",
      }),
    );
    expect(
      await screen.findByRole("img", {
        name: "9:16 illustrative before-and-after preview",
      }),
    ).toBeTruthy();
    const formats = within(
      screen.getByRole("group", { name: "Output format" }),
    );
    await user.click(formats.getByRole("button", { name: "1:1" }));
    expect(
      screen
        .getByRole("img", { name: "1:1 illustrative before-and-after preview" })
        .closest(".format-square"),
    ).toBeTruthy();
    await user.click(formats.getByRole("button", { name: "16:9" }));
    expect(
      screen
        .getByRole("img", {
          name: "16:9 illustrative before-and-after preview",
        })
        .closest(".format-landscape"),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: /02 Build a website/ }),
    );
    expect(
      await screen.findByRole("button", { name: "Open sample collection" }),
    ).toBeTruthy();
    expect(screen.queryByRole("slider")).toBeNull();
    await user.click(
      screen.getByRole("button", { name: /03 Preview a campaign — Beta/ }),
    );
    const objective = await screen.findByRole("combobox", {
      name: "Campaign objective",
    });
    await user.selectOptions(objective, "Website visits");
    expect(screen.getByRole("status").textContent).toContain(
      "No campaign is launched",
    );
    expect(
      screen
        .getByRole("link", { name: "Explore this service" })
        .getAttribute("href"),
    ).toBe("/services/M1");
  });
});
