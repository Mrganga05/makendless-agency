import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { describe, expect, it, vi } from "vitest";
import { LiveWorkshop, LabIntro } from "../src/components/HomeExperiences";
import { ProjectProvider, useProject } from "../src/project";
vi.mock("../src/components/ServiceDemo", () => ({
  default: ({ id }: { id: string }) => <div>Interactive demo {id}</div>,
}));
function SelectionSummary() {
  const { project } = useProject();
  return (
    <output aria-label="Project handoff">
      {project.business} / {project.services.join(",")}
    </output>
  );
}
function SeedVideoService() {
  const { setProject } = useProject();
  useEffect(
    () => setProject((p) => ({ ...p, services: ["V2"] })),
    [setProject],
  );
  return null;
}
describe("homepage workshop and project introduction", () => {
  it("defers the workshop without IntersectionObserver until a visitor requests it", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LiveWorkshop />
      </MemoryRouter>,
    );
    expect(screen.queryByText(/Interactive demo/)).toBeNull();
    await user.click(
      screen.getByRole("button", { name: /Open interactive workshop/ }),
    );
    expect(await screen.findByText("Interactive demo V1")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: /Build a Website/ }));
    expect(await screen.findByText("Interactive demo T1")).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /Explore this service/ })
        .getAttribute("href"),
    ).toBe("/services/T1");
  });
  it("preserves selected business and solutions when entering the full project lab", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<LabIntro />} />
            <Route path="/project-lab" element={<SelectionSummary />} />
          </Routes>
        </ProjectProvider>
      </MemoryRouter>,
    );
    await user.selectOptions(
      screen.getByLabelText("Start with your business"),
      "Café / Restaurant",
    );
    await user.click(screen.getByRole("button", { name: /01 Website/ }));
    await user.click(
      screen.getByRole("button", { name: /04 Digital Marketing Beta/ }),
    );
    expect(
      screen.getByRole("heading", { name: "Good mornings begin here." }),
    ).toBeTruthy();
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Campaign objective" }),
      "inquiries",
    );
    expect(
      (
        screen.getByRole("combobox", {
          name: "Campaign objective",
        }) as HTMLSelectElement
      ).value,
    ).toBe("inquiries");
    expect(screen.getAllByText(/BETA \/ COMING SOON/i).length).toBeGreaterThan(
      0,
    );
    await user.click(
      screen.getByRole("link", { name: /Create my project brief/ }),
    );
    expect(
      screen.getByRole("status", { name: "Project handoff" }).textContent,
    ).toBe("Café / Restaurant / T1,M1");
  });
  it("runs a mock booking, clears only homepage ingredients and retains unrelated selections", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProjectProvider>
          <SeedVideoService />
          <LabIntro />
          <SelectionSummary />
        </ProjectProvider>
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button", { name: /02 Booking System/ }));
    await user.click(screen.getByRole("button", { name: "12:30" }));
    await user.click(screen.getByRole("button", { name: /Preview booking/ }));
    expect(
      screen.getByText("Sample booking at 12:30. No appointment made."),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: /03 Promotional Video/ }),
    );
    await user.click(
      screen.getByRole("button", { name: "Play promotional concept" }),
    );
    expect(
      screen.getByRole("button", { name: "Pause promotional concept" }),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: "Reset these choices" }),
    );
    expect(
      screen.queryByRole("button", { name: "Pause promotional concept" }),
    ).toBeNull();
    expect(
      screen.getByRole("status", { name: "Project handoff" }).textContent,
    ).toBe("Salon / V2");
  });
  it("finishes the seven-second photo study and lets the visitor replay it", () => {
    vi.useFakeTimers();
    try {
      render(
        <MemoryRouter>
          <ProjectProvider>
            <LabIntro />
          </ProjectProvider>
        </MemoryRouter>,
      );
      fireEvent.click(
        screen.getByRole("button", { name: /03 Promotional Video/ }),
      );
      fireEvent.click(
        screen.getByRole("button", { name: "Play promotional concept" }),
      );
      act(() => vi.advanceTimersByTime(7_000));
      expect(screen.getByText("7 / 7s · PHOTO-MOTION STUDY")).toBeTruthy();
      expect(screen.getByText("Make it yours.")).toBeTruthy();
      fireEvent.click(
        screen.getByRole("button", { name: "Play promotional concept" }),
      );
      expect(screen.getByText("0 / 7s · PHOTO-MOTION STUDY")).toBeTruthy();
      expect(
        screen.getByRole("button", { name: "Pause promotional concept" }),
      ).toBeTruthy();
    } finally {
      vi.useRealTimers();
    }
  });
});
