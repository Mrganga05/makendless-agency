import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Hero from "../src/components/v14/Hero";
import { ProjectProvider, useProject } from "../src/project";
function Destination() {
  const { project } = useProject();
  return (
    <p>Inquiry services: {project.services.join(",") || "not selected"}</p>
  );
}
function mount() {
  return render(
    <MemoryRouter>
      <ProjectProvider>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/contact" element={<Destination />} />
        </Routes>
      </ProjectProvider>
    </MemoryRouter>,
  );
}
describe("V14 hero journey", () => {
  it("communicates the business and preserves real studio and inquiry destinations", async () => {
    const user = userEvent.setup();
    mount();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "We make ideas impossible to ignore.",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Video editing, websites and AI solutions for ambitious creators and businesses.",
      ),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "Explore Studios" })
        .getAttribute("href"),
    ).toBe("#studios");
    await user.click(screen.getByRole("link", { name: "Start a Project" }));
    expect(screen.getByText("Inquiry services: not selected")).toBeTruthy();
  });
  it("carries an explicitly explored service into the inquiry", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole("button", { name: "AI Automation" }));
    await user.click(screen.getByRole("link", { name: "Start a Project" }));
    expect(screen.getByText("Inquiry services: T4")).toBeTruthy();
  });
});
