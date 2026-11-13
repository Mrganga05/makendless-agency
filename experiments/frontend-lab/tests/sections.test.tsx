import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SectionLab from "../src/SectionLab";
import { LabSettingsContext } from "../src/settings";

describe("section composition studies", () => {
  it("compares framing and switches meaningful service content with accurate availability", () => {
    render(<SectionLab />);
    fireEvent.click(screen.getByRole("button", { name: "Wide cut" }));
    expect(
      screen.getByText("Wide cut: context becomes part of the story."),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("button", { name: "Wide cut" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    const services = screen.getByRole("group", {
      name: "Explore studio capabilities",
    });
    fireEvent.click(within(services).getByRole("button", { name: /BUILD/ }));
    expect(
      screen.getByRole("heading", { name: "Make it useful. Make it yours." }),
    ).toBeTruthy();
    fireEvent.click(within(services).getByRole("button", { name: /GROW/ }));
    expect(
      screen.getByText(/These services are not yet generally available/),
    ).toBeTruthy();
    expect(
      screen.getByText("An illustrative plan, not a live campaign."),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /Try a working component/ })
        .getAttribute("href"),
    ).toBe("#live");
  });

  it("assembles project modules, creates a truthful description, and supports the empty state", () => {
    render(<SectionLab />);
    const choices = screen.getByRole("group", {
      name: "Project study components",
    });
    fireEvent.click(within(choices).getByRole("button", { name: "Booking" }));
    fireEvent.click(within(choices).getByRole("button", { name: "Assistant" }));
    fireEvent.click(
      screen.getByRole("button", { name: /Describe this project/ }),
    );
    expect(
      screen.getByText(
        "Project study: Website + Booking + Assistant. Scope and pricing remain to be discussed.",
      ),
    ).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "What should I prepare?" }),
    );
    expect(
      screen.getByText(/Share your goal, content and preferred timing/),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Reset conversation" }));
    expect(screen.getByText(/Hello. I can explain/)).toBeTruthy();
    for (const name of ["Website", "Booking", "Assistant"])
      fireEvent.click(within(choices).getByRole("button", { name }));
    expect(screen.getByText("Start with a need.")).toBeTruthy();
    expect(
      screen.queryByRole("heading", { name: "Choose a conversation." }),
    ).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: /Describe this project/ }),
    );
    expect(
      screen.getByText(
        "Project study: no components selected. Start with a conversation.",
      ),
    ).toBeTruthy();
  });

  it("validates sample booking, invalidates changed selections, and works with motion disabled", () => {
    render(
      <LabSettingsContext.Provider
        value={{ reducedMotion: true, forceFallback: true, theme: "glass" }}
      >
        <SectionLab />
      </LabSettingsContext.Provider>,
    );
    const choices = screen.getByRole("group", {
      name: "Project study components",
    });
    fireEvent.click(within(choices).getByRole("button", { name: "Booking" }));
    const preview = screen.getByRole("button", {
      name: "Preview appointment",
    }) as HTMLButtonElement;
    expect(preview.disabled).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "10:00" }));
    expect(preview.disabled).toBe(false);
    fireEvent.click(preview);
    expect(
      screen.getByText("Example appointment at 10:00. Nothing is booked."),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "14:00" }));
    expect(
      screen.queryByText("Example appointment at 10:00. Nothing is booked."),
    ).toBeNull();
    fireEvent.click(preview);
    expect(
      screen.getByText("Example appointment at 14:00. Nothing is booked."),
    ).toBeTruthy();
    fireEvent.click(within(choices).getByRole("button", { name: "Booking" }));
    fireEvent.click(within(choices).getByRole("button", { name: "Booking" }));
    expect(
      (
        screen.getByRole("button", {
          name: "Preview appointment",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
  });
});
