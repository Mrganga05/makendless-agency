import { describe, expect, it } from "vitest";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import StudioWorlds from "../src/components/v14/StudioWorlds";
import { services } from "../src/data";
import { ServiceDetail } from "../src/pages/Supporting";
import { ProjectProvider, useProject } from "../src/project";

function InquiryProbe() {
  const { project } = useProject();
  return <p>Inquiry services: {project.services.join(", ")}</p>;
}

describe("V16 studio discovery and service continuity", () => {
  it("gives each world a distinct working visual and a real studio destination", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter>
        <StudioWorlds />
      </MemoryRouter>,
    );
    const create = screen.getByRole("article", { name: "CREATE" });
    await user.click(within(create).getByRole("button", { name: "The frame" }));
    expect(
      within(create).queryByText("A lasting", { exact: false }),
    ).toBeNull();
    expect(
      within(create).getByText("THE ARTWORK / BEFORE THE STORY"),
    ).toBeTruthy();
    await user.click(within(create).getByRole("button", { name: "The story" }));
    expect(
      within(create).getByText("A lasting", { exact: false }),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Mobile" }));
    expect(container.querySelector(".v16-world-device.is-mobile")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Connect" }));
    expect(screen.getByText("Make your presence count.")).toBeTruthy();
    expect(screen.getByText("BETA / COMING SOON")).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "Enter CREATE studio" })
        .getAttribute("href"),
    ).toBe("/studios/create");
    expect(
      screen
        .getByRole("link", { name: "Enter BUILD studio" })
        .getAttribute("href"),
    ).toBe("/studios/build");
    expect(
      screen
        .getByRole("link", { name: /Enter GROW studio/ })
        .getAttribute("href"),
    ).toBe("/studios/grow");
  });

  it("keeps three discoverable native destinations and the revised service catalog", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter>
        <StudioWorlds />
      </MemoryRouter>,
    );
    const destinations = screen.getAllByRole("link");
    expect(destinations).toHaveLength(3);
    await user.tab();
    expect(document.activeElement).toBe(
      screen.getByRole("link", { name: "Enter CREATE studio" }),
    );
    const build = screen.getByRole("link", { name: "Enter BUILD studio" });
    act(() => build.focus());
    expect(container.querySelector(".v16-world-build.is-active")).toBeTruthy();
    expect(services).toHaveLength(14);
    expect(services.find((service) => service.id === "T4")).toBeUndefined();
    expect(services.find((service) => service.id === "T6")?.world).toBe(
      "build",
    );
    expect(services.find((service) => service.id === "M4")?.world).toBe("grow");
    expect(container.textContent).not.toMatch(/\bAI\b|automation|assistant/i);
  });

  it("carries the dedicated service into the final inquiry action", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/services/T3"]}>
        <ProjectProvider>
          <Routes>
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/contact" element={<InquiryProbe />} />
          </Routes>
        </ProjectProvider>
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("link", { name: "Start a project" }));
    expect(screen.getByText("Inquiry services: T3")).toBeTruthy();
  });
});
