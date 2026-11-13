import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import PackageGuide from "../src/components/home/PackageGuide";
import { ProjectProvider, useProject, type Project } from "../src/project";

function ProjectProbe() {
  const { project, setProject } = useProject();
  const location = useLocation();
  return (
    <>
      <output aria-label="Shared project">{JSON.stringify(project)}</output>
      <output aria-label="Current route">{location.pathname}</output>
      <button
        onClick={() =>
          setProject({
            business: "Gym / Fitness",
            services: ["V3"],
            goal: "Launch a new class",
            timeline: "Next month",
            budget: "To discuss",
            notes: "Keep the existing booking provider.",
            brief: "An earlier generated brief",
          })
        }
      >
        Seed existing project
      </button>
    </>
  );
}
function setup() {
  render(
    <MemoryRouter>
      <ProjectProvider>
        <PackageGuide />
        <ProjectProbe />
      </ProjectProvider>
    </MemoryRouter>,
  );
}
const project = () =>
  JSON.parse(screen.getByLabelText("Shared project").textContent!) as Project;

describe("homepage package guide", () => {
  it("previews format-specific scope without selecting services or inventing a price", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: "Business website" }));
    expect(
      screen.getByRole("heading", { name: "Business website" }),
    ).toBeTruthy();
    expect(
      screen.getByText(/Page count, content creation, CMS requirements/),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: "Social content planning — Beta" }),
    );
    expect(screen.getByText("Example publishing plan")).toBeTruthy();
    expect(
      screen.getByText(/publishing frequency and approved assets/),
    ).toBeTruthy();
    expect(project().services).toEqual([]);
    expect(project().notes).toBe("");
    expect(screen.getByRole("button", { name: "Explore Beta" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Explore Beta" }));
    expect(screen.getByLabelText("Current route").textContent).toBe(
      "/studios/grow",
    );
    expect(project().services).toEqual([]);
    expect(screen.queryByText(/\$\d|₹\d|£\d|€\d/)).toBeNull();
  });
  it("transfers the chosen format into an inquiry while preserving the existing project", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(
      screen.getByRole("button", { name: "Seed existing project" }),
    );
    await user.click(screen.getByRole("button", { name: "Booking solution" }));
    expect(project().services).toEqual(["V3"]);
    await user.click(
      screen.getByRole("button", { name: "Request a tailored estimate" }),
    );
    expect(screen.getByLabelText("Current route").textContent).toBe("/contact");
    expect(project()).toMatchObject({
      business: "Gym / Fitness",
      services: ["V3", "T3"],
      goal: "Launch a new class",
      timeline: "Next month",
      budget: "To discuss",
      brief: "",
    });
    expect(project().notes).toBe(
      "Keep the existing booking provider.\nProject format to discuss: Booking solution.",
    );
    await user.click(
      screen.getByRole("button", { name: "Request a tailored estimate" }),
    );
    expect(project().notes.match(/Project format to discuss/g)).toHaveLength(1);
    expect(project().services).toEqual(["V3", "T3"]);
  });
});
