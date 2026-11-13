import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import StudioWorlds from "../src/components/v14/StudioWorlds";
import ServiceDemo from "../src/components/ServiceDemo";
import { ServiceDetail } from "../src/pages/Supporting";
import { ProjectProvider, useProject } from "../src/project";

function InquiryProbe() {
  const { project } = useProject();
  return <p>Inquiry services: {project.services.join(", ")}</p>;
}

describe("V14 studio discovery and service continuity", () => {
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
    expect(container.querySelector(".v14-world-device.is-mobile")).toBeTruthy();
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
        .getByRole("link", { name: /Explore what’s coming/ })
        .getAttribute("href"),
    ).toBe("/studios/grow");
  });

  it("routes edited inquiries, preserves human draft edits and invalidates them on input changes", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="T4" />);
    const inquiry = screen.getByRole("textbox", {
      name: /Your sample inquiry/,
    });
    await user.clear(inquiry);
    expect(
      (screen.getByRole("button", { name: "Next step" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    await user.type(inquiry, "Can you edit my podcast video?");
    await user.click(screen.getByRole("button", { name: "Next step" }));
    expect(screen.getByText(/Rule match: Video editing/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Next step" }));
    expect(
      screen.getByText(/Suggested destination: CREATE studio/),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Next step" }));
    const draft = screen.getByRole("textbox", { name: "Response draft" });
    await user.clear(draft);
    expect(
      (screen.getByRole("button", { name: "Next step" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    await user.type(
      draft,
      "Please share a sample episode and the intended audience.",
    );
    await user.click(screen.getByRole("button", { name: "Next step" }));
    expect(
      screen.getByText(
        "Please share a sample episode and the intended audience.",
      ),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("checkbox", { name: "I have reviewed this example" }),
    );
    expect(screen.getByRole("status").textContent).toContain(
      "No message was sent",
    );
    await user.clear(inquiry);
    await user.type(inquiry, "Can we talk about a new idea?");
    expect(
      screen.getByRole("heading", { name: "Customer inquiry" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("checkbox", { name: "I have reviewed this example" }),
    ).toBeNull();
    await user.click(screen.getByRole("button", { name: "Next step" }));
    await user.click(screen.getByRole("button", { name: "Next step" }));
    expect(
      screen.getByText(/Suggested destination: Human triage/),
    ).toBeTruthy();
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
