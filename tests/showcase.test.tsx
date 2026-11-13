import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import LiveShowcase from "../src/components/LiveShowcase";
describe("clear interactive hero", () => {
  it("lets visitors open the sample menu and return to the cafe", async () => {
    const user = userEvent.setup();
    render(<LiveShowcase />);
    await user.click(screen.getByRole("button", { name: /The menu/ }));
    expect(screen.getByText(/Espresso · Flat white/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: /Back to café/ }));
    expect(screen.getByRole("button", { name: /Book a table/ })).toBeTruthy();
  });
  it("previews a booking with the selected time and never claims real delivery", async () => {
    const user = userEvent.setup();
    render(<LiveShowcase />);
    await user.click(screen.getByRole("button", { name: /Book a table/ }));
    await user.click(screen.getByRole("button", { name: "12:30" }));
    await user.click(screen.getByRole("button", { name: /Try the booking/ }));
    expect(screen.getByRole("status").textContent).toContain(
      "Sample table for two at 12:30. No real booking made.",
    );
    await user.click(screen.getByRole("button", { name: "15:00" }));
    expect(
      screen.getByRole("button", { name: /Try the booking/ }),
    ).toBeTruthy();
    await user.click(
      screen.getByRole("button", { name: "Close sample booking" }),
    );
    expect(screen.queryByRole("status")).toBeNull();
  });
  it("switches from the website to a controllable motion concept and source comparison", async () => {
    const user = userEvent.setup();
    render(<LiveShowcase />);
    await user.click(screen.getByRole("button", { name: "A video edit" }));
    expect(screen.getByText("EDITED CONCEPT")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Original" }));
    expect(screen.getByText("SOURCE PHOTO")).toBeTruthy();
    expect(screen.queryByText("Go somewhere.")).toBeNull();
    await user.click(screen.getByRole("button", { name: "With edit" }));
    await user.click(
      screen.getByRole("button", { name: "Play motion preview" }),
    );
    expect(
      screen.getByRole("button", { name: "Pause motion preview" }),
    ).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "A website" }));
    expect(screen.getByRole("button", { name: /Book a table/ })).toBeTruthy();
  });
});
