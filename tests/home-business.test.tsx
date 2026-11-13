import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
  AudienceSolutions,
  SelectedConcepts,
} from "../src/components/home/BusinessSections";
import { ProjectProvider, useProject } from "../src/project";

function ProjectProbe() {
  const { project, setProject } = useProject();
  return (
    <>
      <button
        onClick={() =>
          setProject({
            business: "Gym / Fitness",
            services: ["T5"],
            goal: "Keep my own goal",
            notes: "Keep this context",
            timeline: "Next month",
            budget: "Discuss",
            brief: "An older generated brief",
          })
        }
      >
        Seed my project
      </button>
      <pre data-testid="project-state">{JSON.stringify(project)}</pre>
    </>
  );
}
function renderJourney() {
  render(
    <MemoryRouter>
      <ProjectProvider>
        <ProjectProbe />
        <Routes>
          <Route path="/" element={<AudienceSolutions />} />
          <Route
            path="/project-lab"
            element={<h1>Your project workspace</h1>}
          />
        </Routes>
      </ProjectProvider>
    </MemoryRouter>,
  );
}
function project() {
  return JSON.parse(screen.getByTestId("project-state").textContent!);
}

describe("homepage business journeys", () => {
  it("previews a relevant business without selecting services, then explicitly adds its suggested capabilities", async () => {
    const user = userEvent.setup();
    renderJourney();
    await user.click(screen.getByRole("button", { name: "Seed my project" }));
    await user.click(screen.getByRole("button", { name: /Online Store/ }));
    expect(
      screen.getByRole("heading", {
        name: "Make the product part of the story.",
      }),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Ink", exact: true }));
    await user.click(screen.getByRole("button", { name: "Try adding to bag" }));
    expect(screen.getByRole("status").textContent).toContain(
      "Ink lamp selected. No order or payment is created.",
    );
    expect(project().services).toEqual(["T5"]);
    expect(project().brief).toBe("An older generated brief");
    await user.click(
      screen.getByRole("button", { name: "Use this starting point" }),
    );
    expect(
      screen.getByRole("heading", { name: "Your project workspace" }),
    ).toBeTruthy();
    expect(project().services).toEqual(["T5", "T2", "V3", "T4"]);
    expect(project().goal).toBe("Keep my own goal");
    expect(project().notes).toBe(
      "Keep this context\nSelected business journey: Online Store.",
    );
    expect(project().business).toBe("Gym / Fitness");
    expect(project().brief).toBe("");
  });
  it("keeps custom project choices intact and does not require the recommended services", async () => {
    const user = userEvent.setup();
    renderJourney();
    await user.click(screen.getByRole("button", { name: "Seed my project" }));
    await user.click(screen.getByRole("button", { name: /Startup/ }));
    await user.click(
      screen.getByRole("button", { name: "Follow the inquiry" }),
    );
    expect(screen.getByRole("status").textContent).toContain("organized");
    await user.click(
      screen.getByRole("button", { name: "Follow the inquiry" }),
    );
    expect(screen.getByRole("status").textContent).toContain(
      "Nothing is sent.",
    );
    await user.click(
      screen.getByRole("link", { name: "Start with my own choices" }),
    );
    expect(project().services).toEqual(["T5"]);
    expect(project().brief).toBe("An older generated brief");
  });
});

describe("homepage original concept studies", () => {
  it("changes the actual type treatment, replays the sequence and reveals honest concept context", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter>
        <SelectedConcepts />
      </MemoryRouter>,
    );
    const previous = screen.getByLabelText("Make your mark.");
    await user.click(
      screen.getByRole("button", { name: "Outline typography" }),
    );
    expect(
      container.querySelector(".hp-motion-canvas.is-outline"),
    ).toBeTruthy();
    expect(screen.getByLabelText("Make your mark.")).not.toBe(previous);
    const outlined = screen.getByLabelText("Make your mark.");
    await user.click(screen.getByRole("button", { name: "Replay motion" }));
    expect(screen.getByLabelText("Make your mark.")).not.toBe(outlined);
    const motion = container.querySelector(".hp-concept--motion")!;
    await user.click(within(motion as HTMLElement).getByText("View concept"));
    expect(motion.querySelector("details")?.open).toBe(true);
    expect(
      within(motion as HTMLElement).getByText(
        /not a client commission or finished video export/,
      ),
    ).toBeTruthy();
  });
  it("requires a sample appointment time and invalidates confirmation when the day changes", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SelectedConcepts />
      </MemoryRouter>,
    );
    expect(
      (
        screen.getByRole("button", {
          name: "Preview appointment",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    await user.click(screen.getByRole("button", { name: "14:30" }));
    await user.click(
      screen.getByRole("button", { name: "Preview appointment" }),
    );
    expect(screen.getByRole("status").textContent).toContain(
      "Tue 18 at 14:30. This is a simulation; no booking is made.",
    );
    await user.click(screen.getByRole("button", { name: "Wed 19" }));
    expect(
      (
        screen.getByRole("button", {
          name: "Preview appointment",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(screen.getByRole("status").textContent).toBe(
      "Interactive concept. No real appointments.",
    );
  });
});
