import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ProjectProvider, useProject } from "../src/project";
import ProjectLabExperience from "../src/components/v14/ProjectLabExperience";
function StateProbe() {
  const { project, setProject } = useProject();
  return (
    <>
      <output aria-label="Project state">{JSON.stringify(project)}</output>
      <button
        onClick={() =>
          setProject((p) => ({
            ...p,
            services: ["V2"],
            goal: "Edit my podcast",
            notes: "Keep this context",
          }))
        }
      >
        Seed other work
      </button>
    </>
  );
}
function setup() {
  return render(
    <MemoryRouter>
      <ProjectProvider>
        <Routes>
          <Route path="/" element={<ProjectLabExperience />} />
          <Route path="/contact" element={<h1>Inquiry destination</h1>} />
        </Routes>
        <StateProbe />
      </ProjectProvider>
    </MemoryRouter>,
  );
}
function state() {
  return JSON.parse(
    screen.getByRole("status", { name: "Project state" }).textContent!,
  );
}
const button = (name: string | RegExp) => screen.getByRole("button", { name });
describe("V16 standalone project experience", () => {
  it("shows a useful example without silently adding services to a brief", async () => {
    const user = userEvent.setup();
    setup();
    expect(
      screen.getByRole("heading", { name: "Build your next idea." }),
    ).toBeTruthy();
    expect(screen.getByText("FORME STUDIO")).toBeTruthy();
    expect(
      screen.getByRole("region", { name: "Mock booking preview" }),
    ).toBeTruthy();
    expect(state().services).toEqual([]);
    await user.click(button("Generate my project brief"));
    const brief = screen.getByLabelText(
      "Editable project brief",
    ) as HTMLTextAreaElement;
    expect(brief.value).toContain("Chosen solutions: To be discussed");
    expect(brief.value).not.toContain("Business Website Development");
    expect(document.activeElement).toBe(brief);
    await user.click(button("Use this example"));
    expect(state().services).toEqual(["T1", "T3"]);
    expect(screen.queryByLabelText("Editable project brief")).toBeNull();
  });
  it("changes each real module and resets campaign, booking and brief feedback when inputs change", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(button("Use this example"));
    await user.click(button("Preview booking"));
    expect(screen.getByText(/Sample confirmation:/)).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Sample date"), {
      target: { value: "2030-06-19" },
    });
    expect(screen.queryByText(/Sample confirmation:/)).toBeNull();
    await user.click(button("1:30 PM"));
    await user.click(button("Preview booking"));
    expect(screen.getByText(/2030-06-19 at 1:30 PM/)).toBeTruthy();
    await user.click(button(/^Digital marketing/));
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Campaign objective" }),
      "inquiries",
    );
    await user.click(button("People & story"));
    await user.click(button("Story"));
    expect(button("Story").getAttribute("aria-pressed")).toBe("true");
    await user.click(button("Generate my project brief"));
    expect(
      (screen.getByLabelText("Editable project brief") as HTMLTextAreaElement)
        .value,
    ).toContain("Beta / Coming Soon — expression of interest");
    await user.selectOptions(
      screen.getByLabelText("Your business"),
      "Café / Restaurant",
    );
    expect(screen.getByText("STILL CAFÉ")).toBeTruthy();
    expect(
      (
        screen.getByRole("combobox", {
          name: "Campaign objective",
        }) as HTMLSelectElement
      ).value,
    ).toBe("awareness");
    expect(button("Feed").getAttribute("aria-pressed")).toBe("true");
    expect(screen.queryByLabelText("Editable project brief")).toBeNull();
    await user.click(button(/^Website Your own/));
    expect(screen.queryByText("STILL CAFÉ")).toBeNull();
    expect(
      screen.getByRole("region", { name: "Digital marketing concept" }),
    ).toBeTruthy();
    await user.click(button(/^Booking system Make/));
    expect(
      screen.queryByRole("region", { name: "Mock booking preview" }),
    ).toBeNull();
  });
  it("keeps unrelated context on reset and transfers an edited brief into inquiry", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(button("Seed other work"));
    await user.click(button("Use this example"));
    await user.click(button("Reset Lab choices"));
    expect(state().services).toEqual(["V2"]);
    expect(state().goal).toBe("Edit my podcast");
    expect(state().notes).toBe("Keep this context");
    await user.click(button(/^Digital marketing/));
    await user.click(button("Generate my project brief"));
    const brief = screen.getByLabelText("Editable project brief");
    await user.clear(brief);
    await user.type(
      brief,
      "Podcast editing and future interest in digital marketing beta.",
    );
    await user.click(screen.getByRole("link", { name: "Continue to inquiry" }));
    expect(
      screen.getByRole("heading", { name: "Inquiry destination" }),
    ).toBeTruthy();
    expect(state().services).toEqual(["V2", "M1"]);
    expect(state().brief).toBe(
      "Podcast editing and future interest in digital marketing beta.",
    );
  });
  it("copies the edited brief and exposes a selected manual fallback if clipboard fails", async () => {
    const user = userEvent.setup();
    setup();
    const clipboard = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();
    try {
      await user.click(button("Generate my project brief"));
      const brief = screen.getByLabelText(
        "Editable project brief",
      ) as HTMLTextAreaElement;
      await user.clear(brief);
      await user.type(brief, "My own project words.");
      await user.click(button("Copy brief"));
      expect(clipboard).toHaveBeenCalledWith("My own project words.");
      clipboard.mockRejectedValueOnce(new Error("Denied"));
      await user.click(button("Copy brief"));
      expect(screen.getByText(/Copy is unavailable here/)).toBeTruthy();
      expect(document.activeElement).toBe(brief);
      expect(brief.selectionEnd).toBe(brief.value.length);
    } finally {
      clipboard.mockRestore();
    }
  });
  it("finishes a user-started film and cleans its timers on removal", () => {
    vi.useFakeTimers();
    try {
      const { unmount } = setup();
      fireEvent.click(button(/^Promotional video/));
      fireEvent.click(button("Play illustrative animation"));
      act(() => vi.advanceTimersByTime(6000));
      expect(screen.getByText("6 / 6s")).toBeTruthy();
      expect(button("Play illustrative animation")).toBeTruthy();
      fireEvent.click(button("Play illustrative animation"));
      act(() => vi.advanceTimersByTime(1000));
      fireEvent.click(button(/^Promotional video/));
      expect(
        screen.queryByRole("region", { name: "Promotional motion concept" }),
      ).toBeNull();
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });
  it("uses still frames under reduced motion and focuses the actual interactive preview", async () => {
    const user = userEvent.setup();
    const matchMedia = window.matchMedia;
    const preference = vi
      .spyOn(window, "matchMedia")
      .mockImplementation((query) => ({
        ...matchMedia(query),
        matches: query.includes("prefers-reduced-motion"),
      }));
    try {
      setup();
      await user.click(button(/^Promotional video/));
      await user.click(button("Play illustrative animation"));
      expect(
        screen.getByRole("heading", { name: "FEEL LIKE YOU." }),
      ).toBeTruthy();
      expect(
        screen.queryByRole("button", { name: "Pause illustrative animation" }),
      ).toBeNull();
      await user.click(button("Explore preview"));
      expect(document.activeElement).toBe(
        screen.getByLabelText("Live project preview"),
      );
      await user.click(button(/^Digital marketing/));
      const campaign = screen.getByRole("region", {
        name: "Digital marketing concept",
      });
      await user.selectOptions(
        within(campaign).getByRole("combobox", { name: "Campaign objective" }),
        "visits",
      );
      expect(
        (
          within(campaign).getByRole("combobox", {
            name: "Campaign objective",
          }) as HTMLSelectElement
        ).value,
      ).toBe("visits");
      expect(
        within(campaign).getAllByText(/BETA \/ COMING SOON/).length,
      ).toBeGreaterThan(0);
      expect(within(campaign).getByText(/No campaign is running/)).toBeTruthy();
    } finally {
      preference.mockRestore();
    }
  });
});
