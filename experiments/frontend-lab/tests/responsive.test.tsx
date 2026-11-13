import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ResponsiveLab from "../src/ResponsiveLab";
import { LabSettingsContext } from "../src/settings";
describe("responsive review tools", () => {
  it("tracks navigation within the preview so reviews name the visible experiment", async () => {
    const user = userEvent.setup();
    render(<ResponsiveLab />);
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Visual composition" }),
      "4",
    );
    const frame = screen.getByTitle(
      "heroes prototype at 390px",
    ) as HTMLIFrameElement;
    fireEvent.load(frame);
    act(() => {
      frame.contentWindow!.location.hash = "live";
      frame.contentWindow!.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(
      (
        screen.getByRole("combobox", {
          name: "Experiment",
        }) as HTMLSelectElement
      ).value,
    ).toBe("live");
    expect(
      (
        screen.getByRole("combobox", {
          name: "Visual composition",
        }) as HTMLSelectElement
      ).value,
    ).toBe("");
  });
  it("keeps scores attached to the reviewed viewport and settings", async () => {
    const user = userEvent.setup();
    const settings = {
      theme: "glass" as const,
      reducedMotion: false,
      forceFallback: false,
    };
    const { rerender } = render(
      <LabSettingsContext.Provider value={settings}>
        <ResponsiveLab />
      </LabSettingsContext.Provider>,
    );
    const score = () =>
      screen.getByRole("combobox", {
        name: "Visual composition",
      }) as HTMLSelectElement;
    await user.selectOptions(score(), "4");
    await user.click(screen.getByRole("button", { name: "1440px" }));
    expect(score().value).toBe("");
    await user.selectOptions(score(), "3");
    await user.click(screen.getByRole("button", { name: "390px" }));
    expect(score().value).toBe("4");
    rerender(
      <LabSettingsContext.Provider value={{ ...settings, forceFallback: true }}>
        <ResponsiveLab />
      </LabSettingsContext.Provider>,
    );
    expect(score().value).toBe("");
    rerender(
      <LabSettingsContext.Provider value={settings}>
        <ResponsiveLab />
      </LabSettingsContext.Provider>,
    );
    expect(score().value).toBe("4");
  });
  it("creates the chosen intrinsic iframe width and carries fallback and reduced-motion settings", async () => {
    const user = userEvent.setup();
    render(
      <LabSettingsContext.Provider
        value={{ theme: "atelier", reducedMotion: true, forceFallback: true }}
      >
        <ResponsiveLab />
      </LabSettingsContext.Provider>,
    );
    const frame = screen.getByTitle("heroes prototype at 390px");
    expect(frame.getAttribute("width")).toBe("390");
    expect(frame.getAttribute("src")).toContain(
      "theme=atelier&reduce=1&fallback=1#heroes",
    );
    await user.click(screen.getByRole("button", { name: "1440px" }));
    expect(frame.getAttribute("width")).toBe("1440");
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Experiment" }),
      "live",
    );
    expect(
      screen.getByTitle("live prototype at 1440px").getAttribute("src"),
    ).toContain("#live");
  });
  it("exports explicit reviewer observations without fabricating scores", async () => {
    const user = userEvent.setup();
    const create = vi.fn<(blob: Blob) => string>(() => "blob:local-review");
    const revoke = vi.fn();
    vi.stubGlobal(
      "URL",
      Object.assign(URL, { createObjectURL: create, revokeObjectURL: revoke }),
    );
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    try {
      render(<ResponsiveLab />);
      expect(
        (
          screen.getByRole("combobox", {
            name: "Visual composition",
          }) as HTMLSelectElement
        ).value,
      ).toBe("");
      await user.selectOptions(
        screen.getByRole("combobox", { name: "Interaction quality" }),
        "4",
      );
      await user.type(
        screen.getByRole("textbox", {
          name: "Observed strengths, weaknesses and next fixes",
        }),
        "Keyboard path checked; screenshot pending.",
      );
      await user.click(
        screen.getByRole("button", { name: /Export review JSON/ }),
      );
      const blob = create.mock.calls[0][0] as Blob;
      const content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsText(blob);
      });
      const data = JSON.parse(content);
      expect(data.ratings["Visual composition"]).toBe("Unreviewed");
      expect(data.ratings["Interaction quality"]).toBe("4");
      expect(data.observations).toContain("screenshot pending");
      expect(revoke).toHaveBeenCalledWith("blob:local-review");
      expect(screen.getByRole("status").textContent).toContain(
        "Nothing was sent",
      );
    } finally {
      click.mockRestore();
      vi.unstubAllGlobals();
    }
  });
});
