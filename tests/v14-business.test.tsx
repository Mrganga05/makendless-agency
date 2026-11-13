import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import type { ReactNode } from "react";
import {
  AudienceSection,
  WorkSection,
  PackagesSection,
  AboutSection,
  ProcessSection,
} from "../src/components/v14/BusinessJourney";
import { ProjectProvider, useProject } from "../src/project";

function Probe() {
  const { project, setProject } = useProject();
  return (
    <>
      <button
        onClick={() =>
          setProject({
            business: "Gym / Fitness",
            services: ["T5"],
            goal: "My own goal",
            timeline: "Next season",
            budget: "Discuss",
            notes: "Keep my notes",
            brief: "Old generated brief",
          })
        }
      >
        Seed project
      </button>
      <pre data-testid="project">{JSON.stringify(project)}</pre>
    </>
  );
}
function setup(element: ReactNode) {
  return render(
    <MemoryRouter>
      <ProjectProvider>
        <Probe />
        <Routes>
          <Route path="/" element={element} />
          <Route path="/contact" element={<h1>Inquiry draft</h1>} />
          <Route path="/project-lab" element={<h1>Project workspace</h1>} />
        </Routes>
      </ProjectProvider>
    </MemoryRouter>,
  );
}
function state() {
  return JSON.parse(screen.getByTestId("project").textContent!);
}

describe("V14 customer journeys", () => {
  it("keeps exploration local and carries only the chosen recommendations into inquiry", async () => {
    const user = userEvent.setup();
    setup(<AudienceSection />);
    await user.click(screen.getByRole("button", { name: "Seed project" }));
    await user.click(screen.getByRole("button", { name: /Online Store/ }));
    expect(state().services).toEqual(["T5"]);
    await user.click(screen.getByRole("button", { name: "Ink" }));
    await user.click(screen.getByRole("button", { name: "Add to sample bag" }));
    expect(screen.getByRole("status").textContent).toContain(
      "Ink speaker in the sample bag. No order or payment.",
    );
    await user.click(
      screen.getByRole("checkbox", { name: "Promotional & ad videos" }),
    );
    await user.click(screen.getByRole("button", { name: "Shape my project" }));
    expect(screen.getByRole("heading", { name: "Inquiry draft" })).toBeTruthy();
    expect(state().services).toEqual(["T5", "T2"]);
    expect(state().goal).toBe("My own goal");
    expect(state().business).toBe("Gym / Fitness");
    expect(state().timeline).toBe("Next season");
    expect(state().notes).toContain(
      "Keep my notes\nStarting point: Online Store.",
    );
    expect(state().brief).toBe("");
  });
  it("updates the actual media format, booking and workflow previews with truthful states", async () => {
    const user = userEvent.setup();
    const { container } = setup(<AudienceSection />);
    await user.click(screen.getByRole("button", { name: "Teaser" }));
    expect(container.querySelector(".bj-creator-frame--teaser")).toBeTruthy();
    expect(screen.getByText("16:9 / EPISODE TEASER")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: /Local Business/ }));
    await user.click(screen.getByRole("button", { name: "12:30" }));
    expect(screen.getByRole("status").textContent).toContain(
      "no table is booked",
    );
    await user.click(screen.getByRole("button", { name: /Startup/ }));
    await user.click(
      screen.getByRole("button", { name: "Follow the request" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Follow the request" }),
    );
    expect(screen.getByRole("status").textContent).toContain("Nothing is sent");
    await user.click(screen.getByRole("button", { name: "Reset sample flow" }));
    expect(screen.getByRole("status").textContent).toBe(
      "A sample request arrives.",
    );
    expect(state().services).toEqual([]);
  });
  it("lets a visitor make independent choices without applying a suggestion", async () => {
    const user = userEvent.setup();
    setup(<AudienceSection />);
    await user.click(screen.getByRole("button", { name: "Seed project" }));
    await user.click(screen.getByRole("link", { name: "Make my own choices" }));
    expect(
      screen.getByRole("heading", { name: "Project workspace" }),
    ).toBeTruthy();
    expect(state().services).toEqual(["T5"]);
    expect(state().brief).toBe("Old generated brief");
  });
});
describe("V14 package scope", () => {
  it("carries the selected package and optional additions, preserving existing project context", async () => {
    const user = userEvent.setup();
    setup(<PackagesSection />);
    await user.click(screen.getByRole("button", { name: "Seed project" }));
    await user.click(
      screen.getByRole("button", { name: /Websites & digital products/ }),
    );
    await user.click(screen.getByText("Optional additions"));
    await user.click(
      screen.getByRole("checkbox", { name: "Booking & web apps" }),
    );
    expect(state().services).toEqual(["T5"]);
    await user.click(screen.getByRole("button", { name: "Request a quote" }));
    expect(screen.getByRole("heading", { name: "Inquiry draft" })).toBeTruthy();
    expect(state().services).toEqual(["T5", "T1", "T3"]);
    expect(state().goal).toBe("My own goal");
    expect(state().notes).toContain(
      "Project starting point: Websites & digital products.",
    );
    expect(state().notes).toContain("Booking & web apps");
    expect(state().brief).toBe("");
  });
  it("clears former optional additions when changing package direction", async () => {
    const user = userEvent.setup();
    setup(<PackagesSection />);
    await user.click(screen.getByText("Optional additions"));
    await user.click(
      screen.getByRole("checkbox", { name: "Long-form & podcasts" }),
    );
    await user.click(screen.getByRole("button", { name: /AI & automation/ }));
    await user.click(screen.getByRole("button", { name: "Request a quote" }));
    expect(state().services).toEqual(["T4"]);
    expect(state().notes).toContain("Optional additions: none selected");
  });
});
describe("V14 work and trust", () => {
  it("renders distinct concept studies with functional page and type changes", async () => {
    const user = userEvent.setup();
    const { container } = setup(<WorkSection />);
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByText("Seasonal filter")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Story" }));
    expect(screen.queryByText("Seasonal filter")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Use outline type" }));
    expect(container.querySelector(".bj-type-poster.is-outline")).toBeTruthy();
    const art = screen.getByLabelText("Type composition: MAKE ROOM FOR MORE.");
    const before = art.getAttribute("data-motion-key");
    await user.click(
      screen.getByRole("button", { name: "Next type composition" }),
    );
    expect(art.getAttribute("data-motion-key")).not.toBe(before);
    expect(
      screen.getByLabelText("Type composition: GIVE IDEAS A VOICE."),
    ).toBeTruthy();
    expect(screen.getByText(/not a client commission/)).toBeTruthy();
    expect(
      screen
        .getByRole("link", {
          name: /Explore website design for a project like Still/,
        })
        .getAttribute("href"),
    ).toBe("/services/T1");
  });
  it("keeps the process readable and answers policy questions without inventing guarantees", async () => {
    const user = userEvent.setup();
    setup(
      <>
        <AboutSection />
        <ProcessSection />
      </>,
    );
    expect(
      screen.getByRole("heading", {
        name: "Creative minds. Technical thinking.",
      }),
    ).toBeTruthy();
    const process = screen.getByRole("region", {
      name: "From idea to delivery.",
    });
    expect(
      within(process)
        .getAllByRole("heading", { level: 3 })
        .map((node) => node.textContent),
    ).toEqual([
      "Discover",
      "Design",
      "Create",
      "Deliver",
      "A little claritygoes a long way.",
    ]);
    await user.click(screen.getByText("What about revisions?"));
    const answer = screen.getByText(
      /does not promise a fixed or unlimited revision allowance/,
    );
    expect(answer.closest("details")?.open).toBe(true);
    expect(
      screen
        .getByRole("link", { name: "Get to know the studio" })
        .getAttribute("href"),
    ).toBe("/about");
  });
});
