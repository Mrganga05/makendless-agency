import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServiceDemo from "../src/components/ServiceDemo";

const button = (name: string | RegExp) => screen.getByRole("button", { name });
const isPressed = (name: string | RegExp) =>
  expect(button(name).getAttribute("aria-pressed")).toBe("true");

describe("CREATE studio demonstrations", () => {
  it("plays actual illustration frames and stops when the document becomes hidden", () => {
    vi.useFakeTimers();
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(false);
    try {
      render(<ServiceDemo id="V1" />);
      fireEvent.click(button("Preview edit"));
      expect(button("Pause edit")).toBeTruthy();
      act(() => vi.advanceTimersByTime(1800));
      expect(screen.getByText("FIND YOUR OWN RHYTHM.")).toBeTruthy();
      hidden.mockReturnValue(true);
      act(() => document.dispatchEvent(new Event("visibilitychange")));
      expect(button("Preview edit")).toBeTruthy();
      act(() => vi.advanceTimersByTime(5000));
      expect(screen.getByText("FIND YOUR OWN RHYTHM.")).toBeTruthy();
      expect(screen.queryByText("MAKE YOUR NEXT MOVE.")).toBeNull();
    } finally {
      hidden.mockRestore();
      vi.useRealTimers();
    }
  });

  it("uses discrete edit frames instead of timed playback with reduced motion", () => {
    const matchMedia = window.matchMedia;
    const preference = vi
      .spyOn(window, "matchMedia")
      .mockImplementation((query) => ({
        ...matchMedia(query),
        matches: query.includes("prefers-reduced-motion"),
      }));
    try {
      render(<ServiceDemo id="V1" />);
      fireEvent.click(button("Preview edit"));
      expect(screen.getByText("FIND YOUR OWN RHYTHM.")).toBeTruthy();
      expect(screen.queryByRole("button", { name: "Pause edit" })).toBeNull();
      fireEvent.click(button("Preview edit"));
      expect(screen.getByText("MAKE YOUR NEXT MOVE.")).toBeTruthy();
    } finally {
      preference.mockRestore();
    }
  });

  it("lets visitors compare the raw and edited scene, captions and framing", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="V1" />);
    const comparison = screen.getByRole("slider", {
      name: "Before and after comparison",
    }) as HTMLInputElement;
    await user.click(button("Raw"));
    expect(comparison.value).toBe("0");
    isPressed("Raw");
    await user.click(button("Edited"));
    expect(comparison.value).toBe("100");
    fireEvent.change(comparison, { target: { value: "37" } });
    isPressed("Compare");
    expect(comparison.value).toBe("37");
    await user.click(button("Highlight"));
    isPressed("Highlight");
    expect(screen.getByText("MAKE EVERY MOMENT MATTER.").className).toContain(
      "caption-highlight",
    );
    await user.click(button("Close-up"));
    isPressed("Close-up");
    await user.click(button("Full frame"));
    isPressed("Full frame");
  });

  it("previews a podcast highlight and lets visitors include or remove it", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="V2" />);
    await user.click(button(/12:40 · The turning point/));
    expect(
      screen.getByRole("heading", { name: "The turning point" }),
    ).toBeTruthy();
    expect(
      screen.getByText(/We stopped asking what was possible/),
    ).toBeTruthy();
    const picks = screen.getAllByRole("checkbox", {
      name: "Include in highlight package",
    });
    await user.click(picks[1]);
    expect(screen.getByRole("status").textContent).toContain(
      "3 highlights selected",
    );
    await user.click(picks[0]);
    expect(screen.getByRole("status").textContent).toContain(
      "2 highlights selected",
    );
    expect(screen.getByRole("status").textContent).not.toContain(
      "The opening idea",
    );
  });

  it("changes an advertisement’s composition and message with its creative style", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="V3" />);
    await user.click(button("Product-focused"));
    expect(
      screen.getByRole("heading", { name: /Thoughtfully\s+made/ }),
    ).toBeTruthy();
    expect(screen.getByText("Explore the details")).toBeTruthy();
    await user.click(button("Fast-paced social"));
    expect(
      screen.getByRole("heading", { name: /A little reset/ }),
    ).toBeTruthy();
    expect(screen.getByText(/Bold cropping/)).toBeTruthy();
  });

  it("repurposes a source into destination-specific copy and duration", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="V4" />);
    await user.click(button("Teaser"));
    expect(screen.getByText("SOMETHING GOOD IS COMING.")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain(
      "16:9 format · 0:15",
    );
    await user.click(button("Social cutdown"));
    expect(screen.getByText("THE BEST PART, RIGHT HERE.")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain(
      "1:1 format · 0:20",
    );
  });

  it("changes a motion treatment, graphic language and replays the animation", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="V5" />);
    await user.click(button("Reveal"));
    isPressed("Reveal");
    await user.click(button("Orbits"));
    isPressed("Orbits");
    const title = screen.getByRole("heading", { name: /MAKE IT MOVE/ });
    await user.click(button("Replay"));
    expect(screen.getByRole("heading", { name: /MAKE IT MOVE/ })).not.toBe(
      title,
    );
    expect(
      screen.getByText(/no AI generation is being performed/),
    ).toBeTruthy();
    await user.clear(
      screen.getByRole("textbox", { name: "Your motion headline" }),
    );
    await user.type(
      screen.getByRole("textbox", { name: "Your motion headline" }),
      "IDEAS IN MOTION.",
    );
    expect(
      screen.getByRole("heading", { name: "IDEAS IN MOTION." }),
    ).toBeTruthy();
    await user.click(button("Snappy"));
    isPressed("Snappy");
    expect(screen.getByText("SHORT & PRECISE")).toBeTruthy();
  });
});

describe("BUILD studio demonstrations", () => {
  it("lets visitors navigate a finished sample website and return to its homepage", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="T1" />);
    await user.click(button("Open sample collection"));
    expect(
      screen.getByRole("heading", { name: "A little less. A little better." }),
    ).toBeTruthy();
    expect(screen.getByText("The daily vessel")).toBeTruthy();
    await user.click(button("Back to sample homepage"));
    expect(button("Open sample collection")).toBeTruthy();
    await user.click(button("Collection"));
    await user.click(button("Wireframe"));
    expect(
      screen.queryByRole("heading", {
        name: "A little less. A little better.",
      }),
    ).toBeNull();
    await user.click(button("Finished"));
    expect(button("Open sample collection")).toBeTruthy();
  });
  it("shows wireframe and finished website states on both device sizes", async () => {
    const user = userEvent.setup();
    const { container } = render(<ServiceDemo id="T1" />);
    await user.click(button("Wireframe"));
    isPressed("Wireframe");
    expect(container.querySelector(".is-wireframe")).toBeTruthy();
    await user.click(button("Mobile"));
    isPressed("Mobile");
    expect(container.querySelector(".is-mobile")).toBeTruthy();
    await user.click(button("Finished"));
    expect(container.querySelector(".is-wireframe")).toBeNull();
    await user.click(button("Desktop"));
    expect(container.querySelector(".is-mobile")).toBeNull();
  });

  it("maintains a multi-product demo cart and invalidates checkout when it changes", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="T2" />);
    await user.click(button("Add to demo cart"));
    expect(
      screen.getByLabelText("Quantity of The everyday vessel").textContent,
    ).toBe("1");
    await user.click(button("Add one The everyday vessel"));
    expect(
      screen.getByLabelText("Quantity of The everyday vessel").textContent,
    ).toBe("2");
    await user.click(button("The morning reset"));
    await user.click(button("Add to demo cart"));
    expect(screen.getByText("Demo total: $80.00")).toBeTruthy();
    await user.click(button("Preview checkout"));
    expect(screen.getByText("Mock checkout ready")).toBeTruthy();
    expect(
      screen.getByText(/No order or payment has been created/),
    ).toBeTruthy();
    await user.click(button("Remove one The everyday vessel"));
    expect(screen.queryByText("Mock checkout ready")).toBeNull();
    expect(screen.getByText("Demo total: $52.00")).toBeTruthy();
    await user.click(button("Remove one The everyday vessel"));
    expect(
      screen.queryByLabelText("Quantity of The everyday vessel"),
    ).toBeNull();
    await user.click(button("Remove one The morning reset"));
    expect(screen.getByText(/Your demo cart is empty/)).toBeTruthy();
  });

  it("requires an available time and clears a mock confirmation after a date change", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="T3" />);
    expect((button("Preview booking") as HTMLButtonElement).disabled).toBe(
      true,
    );
    expect((button("10:30") as HTMLButtonElement).disabled).toBe(true);
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Sample service" }),
      "Website planning",
    );
    await user.click(button("09:00"));
    await user.click(button("Preview booking"));
    expect(screen.getByRole("status").textContent).toContain(
      "Website planning",
    );
    expect(screen.getByRole("status").textContent).toContain(
      "No appointment has been booked",
    );
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 2);
    await user.click(
      button(
        nextDate.toLocaleDateString("en", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      ),
    );
    expect(screen.queryByText("Simulated booking confirmed")).toBeNull();
    expect((button("Preview booking") as HTMLButtonElement).disabled).toBe(
      true,
    );
  });

  it("routes simulated inquiries and keeps human review as the final workflow step", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="T4" />);
    expect((button("Back") as HTMLButtonElement).disabled).toBe(true);
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Example inquiry" }),
      "Video editing",
    );
    await user.click(button("Next step"));
    expect(
      screen.getByRole("heading", { name: "Classification" }),
    ).toBeTruthy();
    await user.click(button("Next step"));
    expect(
      screen.getByText(/Suggested destination: CREATE studio/),
    ).toBeTruthy();
    await user.click(button("Next step"));
    expect(
      screen.getByRole("heading", { name: "Draft response" }),
    ).toBeTruthy();
    await user.click(button("Next step"));
    expect(screen.getByText(/Nothing is sent by this demo/)).toBeTruthy();
    await user.click(button("Restart"));
    expect(
      screen.getByRole("heading", { name: "Customer inquiry" }),
    ).toBeTruthy();
  });

  it("applies independent illustrative maintenance improvements without speed claims", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="T5" />);
    await user.click(button("Mobile preview"));
    await user.click(
      screen.getByRole("checkbox", { name: "Content hierarchy" }),
    );
    expect(screen.queryByText(/Welcome!/)).toBeNull();
    expect(screen.getByRole("status").textContent).toContain("1 of 3");
    await user.click(
      screen.getByRole("checkbox", { name: "Responsive layout" }),
    );
    await user.click(
      screen.getByRole("checkbox", { name: "Visual consistency" }),
    );
    expect(screen.getByRole("status").textContent).toContain(
      "A clearer layout",
    );
    await user.click(
      screen.getByRole("checkbox", { name: "Content hierarchy" }),
    );
    expect(screen.getByText(/Welcome!/)).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain("2 of 3");
  });
});

describe("GROW beta concepts", () => {
  it("builds a simulated campaign brief across platform, goal and audience", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="M1" />);
    expect(screen.getByText(/BETA \/ COMING SOON/)).toBeTruthy();
    await user.click(button("Google"));
    expect(
      screen.getByText("Sponsored search result · Example business"),
    ).toBeTruthy();
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Campaign objective" }),
      "Inquiries",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Example audience" }),
      "Small business owners",
    );
    expect(screen.getByRole("status").textContent).toContain(
      "Google · Inquiries · Small business owners",
    );
    expect(screen.getByText("Send an inquiry")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain(
      "No campaign is launched",
    );
  });

  it("edits a selected day in the planner without changing other days", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="M2" />);
    await user.click(button("TUE Plan a moment"));
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Tuesday's content" }),
      "Helpful tip",
    );
    expect(button("TUE Helpful tip")).toBeTruthy();
    expect(button("MON Behind the scenes")).toBeTruthy();
    await user.click(button("Carousel"));
    expect(screen.getByRole("status").textContent).toContain(
      "Tuesday: Helpful tip — Carousel concept",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Tuesday's content" }),
      "",
    );
    expect(button("TUE Plan a moment")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain("Tuesday is open");
  });

  it("builds actual format previews, changes slides and remembers each day’s format", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="M2" />);
    await user.click(button("Carousel"));
    const monday = within(
      screen.getByRole("region", { name: "Monday post preview" }),
    );
    expect(monday.getByText("Slide 1 of 3")).toBeTruthy();
    expect(
      monday.getByRole("heading", { name: "THE WORK BEFORE THE WORK." }),
    ).toBeTruthy();
    await user.click(button("Next carousel slide"));
    expect(monday.getByText("Slide 2 of 3")).toBeTruthy();
    expect(
      monday.getByRole("heading", {
        name: "A LITTLE DETAIL. A BIG DIFFERENCE.",
      }),
    ).toBeTruthy();
    await user.click(button("WED Product story"));
    isPressed("Reel");
    await user.click(button("Story"));
    expect(screen.getByText("Story frame 1 of 3")).toBeTruthy();
    await user.click(button("Next story frame"));
    expect(
      screen.getByRole("heading", { name: "CONSIDERED FROM EVERY ANGLE." }),
    ).toBeTruthy();
    await user.click(button("MON Behind the scenes"));
    isPressed("Carousel");
    expect(screen.getByText("Slide 1 of 3")).toBeTruthy();
    await user.click(button("WED Product story"));
    isPressed("Story");
    expect(screen.getByText("Story frame 1 of 3")).toBeTruthy();
  });

  it("tracks profile completeness and labels analytics as fictional", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="M3" />);
    await user.click(screen.getByRole("checkbox", { name: "Opening hours" }));
    expect(screen.getByRole("status").textContent).toContain("2 of 4");
    await user.click(button("Analytics"));
    expect(
      screen.getByText(/fictional sample values, not client results/),
    ).toBeTruthy();
    expect(screen.getByText("Sample profile views")).toBeTruthy();
    await user.click(button("Presence"));
    expect(
      (
        screen.getByRole("checkbox", {
          name: "Opening hours",
        }) as HTMLInputElement
      ).checked,
    ).toBe(true);
  });
});
