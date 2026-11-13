import { describe, expect, it, vi } from "vitest";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProjectProvider } from "../src/project";
import ProjectLab from "../src/pages/ProjectLab";
import Contact from "../src/pages/Contact";
import FindSolution from "../src/pages/FindSolution";

function renderFlows(initialPath = "/project-lab") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ProjectProvider>
        <Routes>
          <Route path="/project-lab" element={<ProjectLab />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/find-solution" element={<FindSolution />} />
        </Routes>
      </ProjectProvider>
    </MemoryRouter>,
  );
}
async function finishDefaultDiscovery(
  user: ReturnType<typeof userEvent.setup>,
) {
  for (let step = 0; step < 4; step++)
    await user.click(screen.getByRole("button", { name: "Continue" }));
  await user.click(
    screen.getByRole("button", { name: "Find my starting point" }),
  );
}
describe("project exploration and inquiry", () => {
  it("rebuilds business-specific modules without retaining an old business conversation", async () => {
    const user = userEvent.setup();
    renderFlows();
    await user.click(
      screen.getByRole("button", { name: /^AI assistant A little help/ }),
    );
    await user.click(screen.getByRole("button", { name: "Opening hours?" }));
    expect(screen.getByText(/In this example, FORME STUDIO/)).toBeTruthy();
    await user.click(
      screen.getByRole("button", {
        name: /^Promotional video Give your story motion/,
      }),
    );
    await user.click(
      screen.getByRole("button", { name: "Play illustrative animation" }),
    );
    await user.selectOptions(
      screen.getByLabelText("Your business"),
      "Gym / Fitness",
    );
    expect(screen.queryByText(/In this example, FORME STUDIO/)).toBeNull();
    expect(
      screen.getByText("Hello! Explore a sample customer conversation."),
    ).toBeTruthy();
    expect(screen.getByText("Find your pace.")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Play illustrative animation" }),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Can I book?" }));
    expect(screen.getByText(/I can help with intro session/)).toBeTruthy();
    const map = screen.getByLabelText("Preview components");
    expect(within(map).getAllByText("Added")).toHaveLength(2);
  });

  it("suspends the film while out of view or in a hidden tab and disconnects its observer", async () => {
    let onVisibility: IntersectionObserverCallback = () => {};
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          onVisibility = callback;
        }
        observe() {}
        disconnect = disconnect;
      },
    );
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(false);
    try {
      const user = userEvent.setup();
      const { unmount } = renderFlows();
      await user.click(
        screen.getByRole("button", {
          name: /^Promotional video Give your story motion/,
        }),
      );
      await user.click(
        screen.getByRole("button", { name: "Play illustrative animation" }),
      );
      const film = screen
        .getByRole("button", { name: "Pause illustrative animation" })
        .closest("section")!;
      expect(film.classList.contains("is-playing")).toBe(true);
      act(() =>
        onVisibility(
          [{ isIntersecting: false } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        ),
      );
      expect(film.classList.contains("is-playing")).toBe(false);
      act(() =>
        onVisibility(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        ),
      );
      expect(film.classList.contains("is-playing")).toBe(true);
      hidden.mockReturnValue(true);
      act(() => document.dispatchEvent(new Event("visibilitychange")));
      expect(film.classList.contains("is-playing")).toBe(false);
      hidden.mockReturnValue(false);
      act(() => document.dispatchEvent(new Event("visibilitychange")));
      expect(film.classList.contains("is-playing")).toBe(true);
      unmount();
      expect(disconnect).toHaveBeenCalledOnce();
    } finally {
      hidden.mockRestore();
      vi.unstubAllGlobals();
    }
  });

  it("adds and removes working preview modules, then resets choices and context", async () => {
    const user = userEvent.setup();
    renderFlows();
    expect(screen.getByText("A space for your next idea.")).toBeTruthy();
    await user.selectOptions(
      screen.getByLabelText("Your business"),
      "Café / Restaurant",
    );
    await user.click(
      screen.getByRole("button", { name: /^Website Your own digital home/ }),
    );
    expect(screen.getByText("STILL CAFÉ")).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: /^Booking system Make time/ }),
    );
    expect(screen.getByRole("heading", { name: "Table for two" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "1:30 PM" }));
    await user.click(screen.getByRole("button", { name: "Preview booking" }));
    expect(
      screen.getByText("Sample confirmation: 1:30 PM. No real booking made."),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", {
        name: "Remove Booking Systems & Custom Web Applications",
      }),
    );
    expect(screen.queryByRole("heading", { name: "Table for two" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Reset your canvas" }));
    expect(
      (screen.getByLabelText("Your business") as HTMLSelectElement).value,
    ).toBe("Salon");
    expect(screen.getByText("0 solutions selected")).toBeTruthy();
    expect(screen.getByText("A space for your next idea.")).toBeTruthy();
  });

  it("transfers an edited brief and selected services from Lab to inquiry", async () => {
    const user = userEvent.setup();
    renderFlows();
    await user.click(
      screen.getByRole("button", { name: /^Website Your own digital home/ }),
    );
    await user.type(
      screen.getByLabelText("Main project goal"),
      "Build a welcoming online home",
    );
    await user.click(
      screen.getByRole("button", { name: "Generate my project brief" }),
    );
    const brief = screen.getByLabelText(
      "Editable project brief",
    ) as HTMLTextAreaElement;
    expect(brief.value).toContain("Business Website Design & Development");
    expect(brief.value).toContain("Build a welcoming online home");
    await user.clear(brief);
    await user.type(brief, "My edited brief: a welcoming salon website.");
    await user.click(
      screen.getByRole("link", { name: "Continue to Start a Project" }),
    );
    expect(
      (
        screen.getByLabelText(
          /Tell us about your project/,
        ) as HTMLTextAreaElement
      ).value,
    ).toBe("My edited brief: a welcoming salon website.");
    expect(
      screen
        .getByRole("button", { name: "Business websites" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(screen.getByText("DEMO INQUIRY")).toBeTruthy();
  });

  it("validates required inquiry fields and clearly labels a successful local preview", async () => {
    const user = userEvent.setup();
    renderFlows("/contact");
    await user.click(
      screen.getByRole("button", { name: "Preview my inquiry" }),
    );
    expect(screen.getByText("Please tell us your name.")).toBeTruthy();
    expect(screen.getByText("Enter a valid email address.")).toBeTruthy();
    expect(
      screen.getByText("Tell us a little about your project."),
    ).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByLabelText(/Your name/));
    await user.type(screen.getByLabelText(/Your name/), "Demo Visitor");
    await user.type(screen.getByLabelText(/Email address/), "demo@example.com");
    await user.type(
      screen.getByLabelText(/Tell us about your project/),
      "A new website for my small business.",
    );
    await user.click(
      screen.getByRole("button", { name: "Preview my inquiry" }),
    );
    expect(
      screen.getByRole("heading", { name: "Your draft is ready." }),
    ).toBeTruthy();
    expect(screen.getByText("not been sent")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Download inquiry draft" }),
    ).toBeTruthy();
    expect(screen.queryByText("Enter a valid email address.")).toBeNull();
    expect(
      within(screen.getByRole("status")).getByText(
        "A new website for my small business.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Preview, then download · Ready")).toBeTruthy();
  });

  it("invalidates the ready draft and download when any required field is edited", async () => {
    const user = userEvent.setup();
    renderFlows("/contact");
    const fields = [
      {
        element: screen.getByLabelText(/Your name/),
        value: "Demo Visitor",
        error: "Please tell us your name.",
      },
      {
        element: screen.getByLabelText(/Email address/),
        value: "demo@example.com",
        error: "Enter a valid email address.",
      },
      {
        element: screen.getByLabelText(/Tell us about your project/),
        value: "A salon website",
        error: "Tell us a little about your project.",
      },
    ];
    for (const field of fields) await user.type(field.element, field.value);
    for (const field of fields) {
      await user.click(
        screen.getByRole("button", { name: "Preview my inquiry" }),
      );
      expect(screen.getByText("Preview, then download · Ready")).toBeTruthy();
      await user.clear(field.element);
      expect(
        screen.queryByRole("heading", { name: "Your draft is ready." }),
      ).toBeNull();
      expect(
        screen.queryByRole("button", { name: "Download inquiry draft" }),
      ).toBeNull();
      expect(screen.queryByText("Preview, then download · Ready")).toBeNull();
      await user.click(
        screen.getByRole("button", { name: "Preview my inquiry" }),
      );
      expect(screen.getByText(field.error)).toBeTruthy();
      expect(document.activeElement).toBe(field.element);
      await user.type(field.element, field.value);
    }
    await user.click(
      screen.getByRole("button", { name: "Preview my inquiry" }),
    );
    expect(
      screen.getByRole("button", { name: "Download inquiry draft" }),
    ).toBeTruthy();
  });

  it("keeps an automatically generated inquiry brief in sync without overwriting manual edits", async () => {
    const user = userEvent.setup();
    renderFlows("/contact");
    await user.click(screen.getByRole("button", { name: "Business websites" }));
    const description = screen.getByLabelText(
      /Tell us about your project/,
    ) as HTMLTextAreaElement;
    expect(description.value).toContain(
      "Business Website Design & Development",
    );
    await user.selectOptions(
      screen.getByLabelText("Preferred timeline (optional)"),
      "1–3 months",
    );
    expect(description.value).toContain("Preferred timeline: 1–3 months");
    await user.click(
      screen.getByRole("button", { name: "Booking & web apps" }),
    );
    expect(description.value).toContain(
      "Booking Systems & Custom Web Applications",
    );
    await user.clear(description);
    await user.type(description, "Please preserve my own words.");
    await user.click(screen.getByRole("button", { name: "Business websites" }));
    expect(description.value).toBe("Please preserve my own words.");
  });

  it("carries guided recommendations and business context into the live Project Lab", async () => {
    const user = userEvent.setup();
    renderFlows("/find-solution");
    await user.click(screen.getByRole("button", { name: /Gym \/ Fitness/ }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(document.activeElement).toBe(
      screen.getByRole("heading", {
        name: "What would you like to make happen?",
      }),
    );
    await user.click(
      screen.getByRole("button", { name: /Simplify everyday work/ }),
    );
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: "Business websites" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: "1–3 months" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(
      screen.getByRole("button", { name: "Find my starting point" }),
    );
    expect(
      screen.getByRole("heading", {
        name: "Booking Systems & Custom Web Applications",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "Business Automation & AI Assistants",
      }),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("link", { name: "Explore in Project Lab" }),
    );
    expect(
      (screen.getByLabelText("Your business") as HTMLSelectElement).value,
    ).toBe("Gym / Fitness");
    expect(screen.getByText("3 solutions selected")).toBeTruthy();
    expect(screen.getByText("PACE CLUB")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Intro session" })).toBeTruthy();
    expect(
      (screen.getByLabelText("Preferred timeline") as HTMLSelectElement).value,
    ).toBe("1–3 months");
  });

  it("does not duplicate an optional recommendation after removing and adding it again", async () => {
    const user = userEvent.setup();
    renderFlows("/find-solution");
    await finishDefaultDiscovery(user);
    await user.click(
      screen.getByRole("button", {
        name: "Add Booking Systems & Custom Web Applications",
      }),
    );
    const card = screen
      .getByRole("heading", {
        name: "Booking Systems & Custom Web Applications",
      })
      .closest("button");
    expect(card).toBeTruthy();
    await user.click(card!);
    await user.click(
      screen.getByRole("button", {
        name: "Add Booking Systems & Custom Web Applications",
      }),
    );
    expect(
      screen.getAllByRole("heading", {
        name: "Booking Systems & Custom Web Applications",
      }),
    ).toHaveLength(1);
    expect(
      screen
        .getByRole("heading", {
          name: "Booking Systems & Custom Web Applications",
        })
        .closest("button")
        ?.getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen.getByText(
        "2 solutions selected. You can change these at any time.",
      ),
    ).toBeTruthy();
  });
});
