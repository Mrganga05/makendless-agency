import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ServiceDemo from "../src/components/ServiceDemo";
import { services } from "../src/data";
import { generateBrief, recommendServices, getPairings } from "../src/brief";

describe("V16 three-division catalog", () => {
  it("keeps existing relevant IDs, adds landing pages/reporting and retires the old service", () => {
    expect(
      services.filter((service) => service.world === "create"),
    ).toHaveLength(5);
    expect(
      services.filter((service) => service.world === "build"),
    ).toHaveLength(5);
    expect(services.filter((service) => service.world === "grow")).toHaveLength(
      4,
    );
    expect(services.map((service) => service.id)).not.toContain("T4");
    expect(services.find((service) => service.id === "T6")?.name).toBe(
      "Landing Page Development",
    );
    expect(services.find((service) => service.id === "M4")?.name).toBe(
      "Marketing Analytics & Reporting",
    );
    expect(JSON.stringify(services)).not.toMatch(
      /\bAI\b|automation|assistant/i,
    );
  });
  it("keeps beta interest explicit in recommendations and briefs without reinterpreting a retired ID", () => {
    expect(
      recommendServices("Launch a focused campaign page", ["T4"]).map(
        (service) => service.id,
      ),
    ).toEqual(["T6"]);
    expect(
      recommendServices("Explore digital marketing beta", []).map(
        (service) => service.id,
      ),
    ).toEqual(["M1"]);
    expect(getPairings(["M1"])[0].reason).toContain("Beta / Coming Soon");
    const brief = generateBrief({
      business: "Salon",
      services: ["T4", "T6", "M4"],
      goal: "",
      timeline: "",
      budget: "",
      notes: "",
      brief: "",
    });
    expect(brief).toContain("Landing Page Development");
    expect(brief).toContain(
      "Marketing Analytics & Reporting (Beta / Coming Soon — expression of interest)",
    );
    expect(brief).not.toMatch(/\bAI\b|automation|assistant/i);
  });
  it("changes a landing headline and invalidates local form feedback after edits", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="T6" />);
    const headline = screen.getByRole("textbox", {
      name: "Landing page headline",
    });
    await user.clear(headline);
    await user.type(headline, "One clear introduction.");
    expect(
      screen.getByRole("heading", { name: "One clear introduction." }),
    ).toBeTruthy();
    await user.type(
      screen.getByRole("textbox", { name: "Sample email" }),
      "visitor@example.invalid",
    );
    await user.click(
      screen.getByRole("button", { name: "Preview launch interest" }),
    );
    expect(screen.getByRole("status").textContent).toContain(
      "Local preview ready",
    );
    await user.type(headline, " More possibility.");
    expect(screen.queryByRole("status")).toBeNull();
  });
  it("filters the clearly fictional reporting dataset and invalidates prepared notes", async () => {
    const user = userEvent.setup();
    render(<ServiceDemo id="M4" />);
    expect(
      screen.getByText(/BETA \/ COMING SOON · fictional sample dataset/),
    ).toBeTruthy();
    expect(
      screen.getByText(/not client results, live measurements or predictions/),
    ).toBeTruthy();
    const report = screen.getByRole("region", {
      name: "Illustrative activity report",
    });
    expect(within(report).getByText("93")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Social" }));
    expect(within(report).getByText("138")).toBeTruthy();
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Report period" }),
      "Latest sample week",
    );
    expect(within(report).getAllByText("41")).toHaveLength(2);
    await user.click(
      screen.getByRole("button", { name: "Prepare sample report" }),
    );
    expect(screen.getByRole("status").textContent).toContain(
      "No account is connected",
    );
    await user.clear(
      screen.getByRole("textbox", { name: "Report observation" }),
    );
    expect(screen.queryByRole("status")).toBeNull();
    expect(
      (
        screen.getByRole("button", {
          name: "Prepare sample report",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
  });
});
