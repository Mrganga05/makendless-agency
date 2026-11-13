import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { About, FAQ, Work } from "../src/pages/Supporting";

vi.mock("../src/components/LiveShowcase", () => ({
  default: ({ initialMode }: { initialMode: string }) => (
    <div data-testid="spatial-study">Spatial capability: {initialMode}</div>
  ),
}));

function renderPage(page: React.ReactNode) {
  return render(<MemoryRouter>{page}</MemoryRouter>);
}

describe("editorial concept studies", () => {
  it("shows the source and directed treatments and opens deeper project reasoning", async () => {
    const user = userEvent.setup();
    renderPage(<Work />);
    const project = screen
      .getByRole("heading", { name: "A moment, reimagined." })
      .closest("article")!;
    const scope = within(project);
    expect(project.id).toBe("outside");
    await user.click(scope.getByRole("button", { name: "Source" }));
    expect(scope.getByRole("status").textContent).toContain(
      "original landscape photograph",
    );
    expect(project.querySelector(".concept-art-film.is-source")).toBeTruthy();
    await user.click(scope.getByRole("button", { name: "Art direction" }));
    expect(scope.getByRole("status").textContent).toContain(
      "crop, colour and typography",
    );
    await user.click(scope.getByRole("button", { name: "Inside the concept" }));
    expect(
      scope.getByRole("heading", {
        name: "How can one photograph become a story?",
      }),
    ).toBeTruthy();
    expect(scope.getByText(/not finished video footage/)).toBeTruthy();
    expect(
      scope
        .getByRole("link", { name: "Try the capability" })
        .getAttribute("href"),
    ).toBe("/services/V3");
    await user.click(
      scope.getByRole("button", { name: "Close the project notes" }),
    );
    expect(
      scope.queryByRole("heading", {
        name: "How can one photograph become a story?",
      }),
    ).toBeNull();
  });

  it("recomposes the website and progresses a resettable, human-reviewed workflow", async () => {
    const user = userEvent.setup();
    renderPage(<Work />);
    const site = within(
      screen
        .getByRole("heading", { name: "Small business. Big presence." })
        .closest("article")!,
    );
    await user.click(site.getByRole("button", { name: "Mobile composition" }));
    expect(
      site
        .getByRole("button", { name: "Mobile composition" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(site.getByRole("status").textContent).toContain("focused view");
    const flow = within(
      screen
        .getByRole("heading", { name: "A little less busywork." })
        .closest("article")!,
    );
    await user.click(flow.getByRole("button", { name: "Follow the inquiry" }));
    expect(flow.getByRole("status").textContent).toContain(
      "sorted into website planning",
    );
    await user.click(flow.getByRole("button", { name: "Follow the inquiry" }));
    expect(flow.getByRole("status").textContent).toContain(
      "Nothing is sent automatically",
    );
    expect(
      (
        flow.getByRole("button", {
          name: "Ready for human review",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    await user.click(
      flow.getByRole("button", { name: "Reset concept workflow" }),
    );
    expect(flow.getByRole("status").textContent).toContain(
      "sample website inquiry arrives",
    );
  });

  it("mounts only one requested spatial study and removes it when notes close", async () => {
    const user = userEvent.setup();
    renderPage(<Work />);
    expect(screen.queryByTestId("spatial-study")).toBeNull();
    const film = within(
      screen
        .getByRole("heading", { name: "A moment, reimagined." })
        .closest("article")!,
    );
    const site = within(
      screen
        .getByRole("heading", { name: "Small business. Big presence." })
        .closest("article")!,
    );
    await user.click(film.getByRole("button", { name: "Inside the concept" }));
    await user.click(film.getByRole("button", { name: "Open spatial study" }));
    expect((await screen.findByTestId("spatial-study")).textContent).toContain(
      "create",
    );
    await user.click(site.getByRole("button", { name: "Inside the concept" }));
    await user.click(site.getByRole("button", { name: "Open spatial study" }));
    expect(screen.getAllByTestId("spatial-study")).toHaveLength(1);
    expect(screen.getByTestId("spatial-study").textContent).toContain("build");
    expect(
      film
        .getByRole("button", { name: "Open spatial study" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
    await user.click(
      site.getByRole("button", { name: "Close the project notes" }),
    );
    expect(screen.queryByTestId("spatial-study")).toBeNull();
  });
});

describe("supporting page clarity", () => {
  it("filters answers, opens an answer and recovers from an empty search", async () => {
    const user = userEvent.setup();
    renderPage(<FAQ />);
    const search = screen.getByRole("searchbox", { name: "Find an answer" });
    await user.type(search, "cost");
    expect(screen.getByRole("status").textContent).toBe("1 matching answer");
    const question = screen.getByText(
      "How much will my project cost, and how long will it take?",
    );
    await user.click(question);
    expect(question.closest("details")?.open).toBe(true);
    expect(screen.getByText(/does not generate binding quotes/)).toBeTruthy();
    await user.clear(search);
    await user.type(search, "not-a-real-topic");
    expect(screen.getByRole("status").textContent).toBe("0 matching answers");
    await user.click(screen.getByRole("button", { name: "Show all answers" }));
    expect((search as HTMLInputElement).value).toBe("");
    expect(screen.getByText("What does MAKENDLESS do?")).toBeTruthy();
  });

  it("explains the selected working belief without changing the approved studio identity", async () => {
    const user = userEvent.setup();
    renderPage(<About />);
    await user.click(screen.getByRole("button", { name: /Make it useful/ }));
    expect(
      screen.getByRole("heading", {
        name: "The experience should earn its place.",
      }),
    ).toBeTruthy();
    expect(screen.getByText(/make the next step easier/)).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /03 \/ GROW/ }).textContent,
    ).toContain("Coming soon");
    await user.click(
      screen.getByRole("button", { name: /Care for the details/ }),
    );
    expect(
      screen.getByRole("heading", {
        name: "Small decisions make the whole feel right.",
      }),
    ).toBeTruthy();
  });
});
