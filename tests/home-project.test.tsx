import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import {
  HomepageLab,
  ProcessFaq,
} from "../src/components/home/ProjectExperience";
import { ProjectProvider, useProject } from "../src/project";
import Contact from "../src/pages/Contact";

function Handoff() {
  const { project } = useProject();
  return <output aria-label="Project state">{JSON.stringify(project)}</output>;
}
function ExistingProject() {
  const { setProject } = useProject();
  useEffect(
    () =>
      setProject((p) => ({
        ...p,
        services: ["V2"],
        goal: "Edit my podcast",
        notes: "Keep my existing brief context",
      })),
    [setProject],
  );
  return null;
}
function renderLab(existing = false) {
  return render(
    <MemoryRouter>
      <ProjectProvider>
        {existing && <ExistingProject />}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomepageLab />
                <Handoff />
              </>
            }
          />
          <Route path="/contact" element={<Handoff />} />
          <Route path="/project-lab" element={<Handoff />} />
        </Routes>
      </ProjectProvider>
    </MemoryRouter>,
  );
}
const state = () =>
  JSON.parse(
    screen.getByRole("status", { name: "Project state" }).textContent!,
  );
const button = (name: string | RegExp) => screen.getByRole("button", { name });

describe("homepage project creation", () => {
  it("carries an unselected example brief into the real inquiry form without adding paid services", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<HomepageLab />} />
            <Route
              path="/contact"
              element={
                <>
                  <Contact />
                  <Handoff />
                </>
              }
            />
          </Routes>
        </ProjectProvider>
      </MemoryRouter>,
    );
    await user.click(button("Generate my brief"));
    expect(
      document.getElementById(
        button("Generate my brief").getAttribute("aria-controls")!,
      ),
    ).toBeTruthy();
    await user.click(screen.getByRole("link", { name: "Continue to inquiry" }));
    const description = screen.getByRole("textbox", {
      name: "Tell us about your project",
    }) as HTMLTextAreaElement;
    expect(description.value).toContain("Chosen solutions: To be discussed");
    expect(description.value).toContain("Business type: Salon");
    expect(description.value).not.toContain(
      "Business Website Design & Development",
    );
    expect(state().services).toEqual([]);
  });
  it("shows an interactive example without selecting services or putting them in the brief", async () => {
    const user = userEvent.setup();
    renderLab();
    expect(
      screen.getByRole("heading", { name: "A moment, just for you." }),
    ).toBeTruthy();
    expect(button(/Website A digital home/).getAttribute("aria-pressed")).toBe(
      "false",
    );
    expect(
      button(/Booking System An easier next step/).getAttribute("aria-pressed"),
    ).toBe("false");
    await user.click(button("12:30"));
    await user.click(button("Preview booking"));
    expect(
      screen.getByText(
        "Example appointment at 12:30. Nothing has been booked.",
      ),
    ).toBeTruthy();
    expect(state().services).toEqual([]);
    await user.click(button("Generate my brief"));
    const brief = screen.getByLabelText(
      "Your editable project brief",
    ) as HTMLTextAreaElement;
    expect(brief.value).toContain("Chosen solutions: To be discussed");
    expect(brief.value).not.toContain("Business Website Design & Development");
    expect(document.activeElement).toBe(brief);
    expect(state().services).toEqual([]);
  });

  it("only adopts the example on request, and removes selected modules independently", async () => {
    const user = userEvent.setup();
    renderLab();
    await user.click(button("Use this example"));
    expect(state().services).toEqual(["T1", "T3"]);
    expect(screen.queryByText("EXAMPLE PROJECT")).toBeNull();
    await user.click(button(/Website A digital home/));
    expect(state().services).toEqual(["T3"]);
    expect(
      screen.queryByRole("heading", { name: "A moment, just for you." }),
    ).toBeNull();
    expect(
      screen.getByRole("region", { name: "Mock booking preview" }),
    ).toBeTruthy();
    await user.click(button(/Website A digital home/));
    await user.click(button(/Promotional Video A story in motion/));
    await user.click(button(/AI Assistant A useful first response/));
    expect(state().services).toEqual(["T3", "T1", "V3", "T4"]);
    expect(
      screen.getByRole("region", { name: "Promotional motion concept" }),
    ).toBeTruthy();
    await user.click(button("What can I arrange?"));
    expect(
      screen.getByText(/This salon concept offers a styling consultation/),
    ).toBeTruthy();
    await user.selectOptions(
      screen.getByLabelText("Choose your business"),
      "Café / Restaurant",
    );
    expect(
      screen.getByRole("heading", { name: "Make room for good company." }),
    ).toBeTruthy();
    expect(screen.queryByText(/This salon concept offers/)).toBeNull();
    expect(
      screen.getByText("Hello from LUNE. What would you like to know?"),
    ).toBeTruthy();
    expect(state().services).toHaveLength(4);
  });

  it("preserves other services and context when resetting the Lab, then hands an edited brief to inquiry", async () => {
    const user = userEvent.setup();
    renderLab(true);
    await user.click(button("Use this example"));
    await user.click(button("Reset Lab choices"));
    expect(state().services).toEqual(["V2"]);
    expect(state().goal).toBe("Edit my podcast");
    expect(state().notes).toBe("Keep my existing brief context");
    await user.click(button(/AI Assistant A useful first response/));
    await user.selectOptions(
      screen.getByLabelText("Choose your business"),
      "Gym / Fitness",
    );
    await user.click(button("Generate my brief"));
    const brief = screen.getByLabelText("Your editable project brief");
    await user.clear(brief);
    await user.type(
      brief,
      "A fitness studio assistant and podcast editing, with human review.",
    );
    await user.click(screen.getByRole("link", { name: "Continue to inquiry" }));
    expect(state().business).toBe("Gym / Fitness");
    expect(state().services).toEqual(["V2", "T4"]);
    expect(state().brief).toBe(
      "A fitness studio assistant and podcast editing, with human review.",
    );
  });

  it("copies the actual editable brief and offers a selectable fallback if clipboard access fails", async () => {
    const user = userEvent.setup();
    renderLab();
    const clipboard = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();
    try {
      await user.click(button("Use this example"));
      await user.click(button("Generate my brief"));
      await user.click(button("Copy brief"));
      expect(clipboard).toHaveBeenCalledWith(state().brief);
      expect(
        screen.getByText("Brief copied. It has not been sent."),
      ).toBeTruthy();
      clipboard.mockRejectedValueOnce(new Error("Clipboard unavailable"));
      await user.click(button("Copy brief"));
      expect(screen.getByText(/Copy is unavailable here/)).toBeTruthy();
      const field = screen.getByLabelText(
        "Your editable project brief",
      ) as HTMLTextAreaElement;
      expect(document.activeElement).toBe(field);
      expect(field.selectionStart).toBe(0);
      expect(field.selectionEnd).toBe(field.value.length);
    } finally {
      clipboard.mockRestore();
    }
  });

  it("finishes user-started motion, replays, and stops when the tab is hidden", () => {
    vi.useFakeTimers();
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(false);
    try {
      const { unmount } = renderLab();
      fireEvent.click(button(/Promotional Video A story in motion/));
      fireEvent.click(button("Play promotional preview"));
      act(() => vi.advanceTimersByTime(6000));
      expect(screen.getByText("6 / 6s")).toBeTruthy();
      expect(
        screen.getByRole("heading", { name: "YOUR NEXT CHAPTER." }),
      ).toBeTruthy();
      expect(button("Play promotional preview")).toBeTruthy();
      fireEvent.click(button("Play promotional preview"));
      act(() => vi.advanceTimersByTime(1000));
      hidden.mockReturnValue(true);
      act(() => document.dispatchEvent(new Event("visibilitychange")));
      expect(button("Play promotional preview")).toBeTruthy();
      act(() => vi.advanceTimersByTime(3000));
      expect(screen.getByText("1 / 6s")).toBeTruthy();
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      hidden.mockRestore();
      vi.useRealTimers();
    }
  });

  it("uses discrete media frames under reduced motion and preserves selections entering the full Lab", async () => {
    const user = userEvent.setup();
    const matchMedia = window.matchMedia;
    const preference = vi
      .spyOn(window, "matchMedia")
      .mockImplementation((query) => ({
        ...matchMedia(query),
        matches: query.includes("prefers-reduced-motion"),
      }));
    try {
      renderLab();
      await user.click(button(/Promotional Video A story in motion/));
      await user.click(button("Play promotional preview"));
      expect(
        screen.getByRole("heading", { name: "FEEL LIKE YOU." }),
      ).toBeTruthy();
      expect(
        screen.queryByRole("button", { name: "Pause promotional preview" }),
      ).toBeNull();
      await user.click(
        screen.getByRole("link", { name: "Explore the full Project Lab" }),
      );
      expect(state().services).toEqual(["V3"]);
    } finally {
      preference.mockRestore();
    }
  });
});

describe("homepage collaboration guidance", () => {
  it("offers native expandable answers without inventing prices or revision allowances", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProcessFaq />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    const question = screen.getByText("How do revisions work?");
    expect(question.closest("details")?.open).toBe(false);
    await user.click(question);
    expect(question.closest("details")?.open).toBe(true);
    expect(screen.getByText(/no blanket revision allowance/)).toBeTruthy();
    await user.click(screen.getByText("How is project pricing determined?"));
    const pricing = screen
      .getByText(/No fixed prices are published here/)
      .closest("details")!;
    expect(pricing.open).toBe(true);
    expect(within(pricing).getByText(/external costs/)).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "More questions, answered" })
        .getAttribute("href"),
    ).toBe("/faq");
  });
});
