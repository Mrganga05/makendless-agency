import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import LiveLab, {
  VideoComparison,
  WebsiteTransformation,
  WorkflowSimulation,
} from "../src/LiveLab";
import { LabSettingsContext } from "../src/settings";

function next(label: string) {
  fireEvent.click(screen.getByRole("button", { name: label }));
}
function reachDraft() {
  next("Classify inquiry");
  next("Propose a route");
  next("Prepare local draft");
}
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("original vector comparison", () => {
  it("exposes equivalent comparison presets and independent caption, framing and scrub controls", () => {
    render(<VideoComparison />);
    const comparison = screen.getByRole("slider", {
      name: /Source to edited/,
    }) as HTMLInputElement;
    next("Before");
    expect(comparison.value).toBe("0");
    next("After");
    expect(comparison.value).toBe("100");
    next("Split");
    expect(comparison.value).toBe("50");
    fireEvent.change(comparison, { target: { value: "73" } });
    expect(comparison.getAttribute("aria-valuetext")).toBe("73 percent edited");
    next("Marker");
    next("Close");
    expect(screen.getByRole("status").textContent).toContain(
      "marker captions · close framing",
    );
    const position = screen.getByRole("slider", { name: "Film position" });
    fireEvent.change(position, { target: { value: "75" } });
    expect(position.getAttribute("aria-valuetext")).toBe("4.5 seconds of 6");
    expect(screen.getByText("MAKE THE MOMENT MATTER.")).toBeTruthy();
  });

  it("runs only on request, finishes once, and cancels when scrubbed or hidden", () => {
    vi.useFakeTimers();
    render(<VideoComparison />);
    const position = screen.getByRole("slider", {
      name: "Film position",
    }) as HTMLInputElement;
    act(() => vi.advanceTimersByTime(1500));
    expect(position.value).toBe("0");
    next("Play vector film");
    act(() => vi.advanceTimersByTime(6000));
    expect(position.value).toBe("100");
    expect(
      screen.getByRole("button", { name: "Replay vector film" }),
    ).toBeTruthy();
    next("Replay vector film");
    act(() => vi.advanceTimersByTime(150));
    expect(Number(position.value)).toBeGreaterThan(0);
    fireEvent.change(position, { target: { value: "50" } });
    act(() => vi.advanceTimersByTime(1000));
    expect(position.value).toBe("50");
    next("Play vector film");
    vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    fireEvent(document, new Event("visibilitychange"));
    act(() => vi.advanceTimersByTime(1000));
    expect(position.value).toBe("50");
    expect(
      screen.getByRole("button", { name: "Play vector film" }),
    ).toBeTruthy();
  });

  it("uses discrete user-selected frames under reduced motion", () => {
    vi.useFakeTimers();
    render(
      <LabSettingsContext.Provider
        value={{ reducedMotion: true, forceFallback: true, theme: "atelier" }}
      >
        <VideoComparison />
      </LabSettingsContext.Provider>,
    );
    const position = screen.getByRole("slider", {
      name: "Film position",
    }) as HTMLInputElement;
    next("Next still frame");
    expect(position.value).toBe("34");
    act(() => vi.advanceTimersByTime(12000));
    expect(position.value).toBe("34");
    next("Next still frame");
    expect(position.value).toBe("68");
    next("Next still frame");
    expect(position.value).toBe("0");
  });
});

describe("working exhibition website", () => {
  it("preserves navigation and content across treatment and device switches", () => {
    render(<WebsiteTransformation />);
    next("Explore the objects");
    const picker = screen.getByRole("group", { name: "Choose an object" });
    fireEvent.click(
      within(picker).getByRole("button", { name: "The quiet vessel" }),
    );
    expect(
      screen.getByRole("heading", { name: "The quiet vessel" }),
    ).toBeTruthy();
    next("Wireframe");
    next("Mobile");
    expect(
      screen
        .getByRole("button", { name: "Wireframe" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen
        .getByRole("button", { name: "Mobile" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen.getByRole("heading", { name: "The quiet vessel" }),
    ).toBeTruthy();
    const nav = screen.getByRole("navigation", { name: "Sample website" });
    expect(
      within(nav)
        .getByRole("button", { name: "Objects" })
        .getAttribute("aria-current"),
    ).toBe("page");
    fireEvent.click(within(nav).getByRole("button", { name: "Home" }));
    expect(
      screen.getByRole("button", { name: "Explore the objects" }),
    ).toBeTruthy();
  });

  it("validates and focuses a missing name, then creates a local preview that edits invalidate", () => {
    render(<WebsiteTransformation />);
    next("Visit");
    next("Preview visit request");
    const name = screen.getByRole("textbox", { name: "Sample visitor name" });
    expect(document.activeElement).toBe(name);
    expect(name.getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByRole("alert").textContent).toBe(
      "Enter a sample visitor name.",
    );
    fireEvent.change(name, { target: { value: "Asha" } });
    next("Preview visit request");
    expect(screen.getByRole("status").textContent).toBe(
      "Draft for Asha at 14:00. Nothing has been booked or sent.",
    );
    fireEvent.change(
      screen.getByRole("combobox", { name: "Sample visit time" }),
      { target: { value: "16:30" } },
    );
    expect(screen.queryByRole("status")).toBeNull();
    next("Preview visit request");
    expect(screen.getByRole("status").textContent).toContain("16:30");
  });
});

describe("inspectable local workflow", () => {
  it("classifies, routes and drafts a request, with an explicit human review gate", () => {
    render(<WorkflowSimulation />);
    next("Classify inquiry");
    expect(screen.getByText("Website experience")).toBeTruthy();
    next("Propose a route");
    expect(
      screen.getByText("BUILD / Websites & digital products"),
    ).toBeTruthy();
    next("Prepare local draft");
    const draft = screen.getByRole("textbox", {
      name: "Editable local reply draft",
    }) as HTMLTextAreaElement;
    expect(draft.value).toContain("your content, required pages");
    fireEvent.change(draft, {
      target: { value: "Could you share your three most important pages?" },
    });
    next("Review draft");
    const review = screen.getByRole("button", {
      name: "Mark reviewed locally",
    }) as HTMLButtonElement;
    expect(review.disabled).toBe(true);
    fireEvent.click(
      screen.getByRole("checkbox", { name: "I have reviewed this draft" }),
    );
    expect(review.disabled).toBe(false);
    fireEvent.click(review);
    expect(screen.getByRole("status").textContent).toBe(
      "Review recorded in this example. Nothing has been sent.",
    );
    next("Back");
    fireEvent.change(
      screen.getByRole("textbox", { name: "Editable local reply draft" }),
      { target: { value: "Updated draft" } },
    );
    next("Review draft");
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(
      false,
    );
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("invalidates all downstream state on an inquiry edit and allows an explicit reset", () => {
    render(<WorkflowSimulation />);
    reachDraft();
    fireEvent.change(
      screen.getByRole("textbox", { name: "Editable local reply draft" }),
      { target: { value: "A custom draft" } },
    );
    fireEvent.change(screen.getByRole("textbox", { name: "Sample inquiry" }), {
      target: { value: "Please edit a video" },
    });
    expect(
      screen.queryByRole("textbox", { name: "Editable local reply draft" }),
    ).toBeNull();
    next("Classify inquiry");
    expect(screen.getByText("Creative production")).toBeTruthy();
    next("Propose a route");
    next("Prepare local draft");
    expect(
      (
        screen.getByRole("textbox", {
          name: "Editable local reply draft",
        }) as HTMLTextAreaElement
      ).value,
    ).toContain("source material");
    next("Reset workflow");
    expect(
      screen.getByRole("button", { name: "Classify inquiry" }),
    ).toBeTruthy();
    expect(
      (
        screen.getByRole("textbox", {
          name: "Sample inquiry",
        }) as HTMLTextAreaElement
      ).value,
    ).toBe("Please edit a video");
  });

  it("uses documented rule priority and sends unrecognized input to human triage", () => {
    render(<WorkflowSimulation />);
    const inquiry = screen.getByRole("textbox", { name: "Sample inquiry" });
    fireEvent.change(inquiry, {
      target: { value: "A booking website with a video" },
    });
    next("Classify inquiry");
    expect(screen.getByText("Booking experience")).toBeTruthy();
    fireEvent.change(inquiry, { target: { value: "Help me clarify my idea" } });
    next("Classify inquiry");
    expect(screen.getByText("Needs clarification")).toBeTruthy();
    next("Propose a route");
    expect(
      screen.getByText("Human triage / no automatic assignment"),
    ).toBeTruthy();
    fireEvent.change(inquiry, { target: { value: "   " } });
    expect(
      (
        screen.getByRole("button", {
          name: "Classify inquiry",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
  });
});

it("mounts one study and resets its local state when changing studies", () => {
  render(<LiveLab />);
  next("After");
  next("Website transformation");
  expect(screen.queryByRole("slider", { name: "Film position" })).toBeNull();
  next("AI workflow");
  expect(
    screen.queryByRole("navigation", { name: "Sample website" }),
  ).toBeNull();
  next("Video editing");
  expect(
    (
      screen.getByRole("slider", {
        name: /Source to edited/,
      }) as HTMLInputElement
    ).value,
  ).toBe("65");
});
