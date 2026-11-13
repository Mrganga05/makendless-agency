import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProjectProvider, useProject } from "../src/project";
import { generateBrief } from "../src/brief";
function Probe() {
  const { project, setProject } = useProject();
  return (
    <>
      <button
        onClick={() =>
          setProject((previous) => ({
            ...previous,
            services: ["T4", "T1", "T1", "M4"],
            brief: "Outdated service brief",
            notes: "Keep my project context",
          }))
        }
      >
        Restore selection
      </button>
      <output data-testid="project">{JSON.stringify(project)}</output>
      <pre data-testid="brief">{generateBrief(project)}</pre>
    </>
  );
}
describe("V16 service boundary", () => {
  it("drops retired IDs without reinterpreting them, preserves context and labels future interest", async () => {
    render(
      <ProjectProvider>
        <Probe />
      </ProjectProvider>,
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Restore selection" }),
    );
    const project = JSON.parse(screen.getByTestId("project").textContent!);
    expect(project.services).toEqual(["T1", "M4"]);
    expect(project.notes).toBe("Keep my project context");
    expect(project.brief).toBe("");
    expect(screen.getByTestId("brief").textContent).toContain(
      "Beta / Coming Soon — expression of interest",
    );
    expect(screen.getByTestId("brief").textContent).not.toMatch(
      /undefined|automation|assistant/i,
    );
  });
});
