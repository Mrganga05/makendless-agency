import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SpatialLab from "../src/SpatialLab";
import { LabSettingsContext, type LabSettings } from "../src/settings";

const renderer = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
  dispose: vi.fn(),
  failure: undefined as undefined | (() => void),
}));
vi.mock("../src/spatial-renderer", () => ({
  createSpatialRenderer: renderer.create,
}));
const base: LabSettings = {
  reducedMotion: false,
  forceFallback: false,
  theme: "glass",
};
const view = (settings: Partial<LabSettings> = {}, embedded = false) => (
  <LabSettingsContext.Provider value={{ ...base, ...settings }}>
    <SpatialLab embedded={embedded} />
  </LabSettingsContext.Provider>
);

beforeEach(() => {
  renderer.create.mockReset();
  renderer.update.mockReset();
  renderer.dispose.mockReset();
  renderer.failure = undefined;
  renderer.create.mockImplementation((_canvas, _options, onFailure) => {
    renderer.failure = onFailure;
    return { update: renderer.update, dispose: renderer.dispose };
  });
});

describe("spatial study: DOM behavior and mocked renderer lifecycle", () => {
  it("keeps native material/camera controls usable in forced fallback without creating WebGL", () => {
    render(view({ forceFallback: true }));
    expect(renderer.create).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Satin" }));
    fireEvent.click(screen.getByRole("button", { name: "Front" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain(
      "satin material, front camera",
    );
    expect(
      (screen.getByRole("slider", { name: /Transmission/ }) as HTMLInputElement)
        .disabled,
    ).toBe(true);
    expect(
      screen.getByRole("status", { name: "Rendering status" }).textContent,
    ).toContain("Lightweight view is enabled");
  });

  it("updates the existing renderer for material changes, then disposes it when fallback is selected", async () => {
    const result = render(view());
    await waitFor(() => expect(renderer.create).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole("button", { name: "Satin" }));
    fireEvent.click(screen.getByRole("button", { name: "Warm" }));
    expect(renderer.update).toHaveBeenLastCalledWith(
      expect.objectContaining({
        material: "satin",
        roughness: 0.45,
        light: "warm",
      }),
    );
    expect(renderer.create).toHaveBeenCalledTimes(1);
    result.rerender(view({ forceFallback: true }));
    expect(renderer.dispose).toHaveBeenCalledTimes(1);
    result.unmount();
    expect(renderer.dispose).toHaveBeenCalledTimes(1);
  });

  it("offers a useful fallback and retry when renderer creation fails", async () => {
    renderer.create.mockImplementationOnce(() => {
      throw new Error("WebGL unavailable");
    });
    render(view());
    await waitFor(() =>
      expect(
        screen.getByRole("status", { name: "Rendering status" }).textContent,
      ).toContain("3D is unavailable"),
    );
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain(
      "non-WebGL fallback",
    );
    fireEvent.click(screen.getByRole("button", { name: "Retry 3D ↗" }));
    await waitFor(() =>
      expect(
        screen.getByRole("status", { name: "Rendering status" }).textContent,
      ).toContain("Live 3D"),
    );
  });

  it("replaces a lost rendering context with an accessible illustration", async () => {
    render(view());
    await waitFor(() => expect(renderer.create).toHaveBeenCalledTimes(1));
    act(() => renderer.failure?.());
    expect(
      screen.getByRole("status", { name: "Rendering status" }).textContent,
    ).toContain("3D is unavailable");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain(
      "non-WebGL fallback",
    );
    // The real renderer disposes its resources before issuing this callback.
  });

  it("does not start 3D automatically for reduced-motion users and respects opt-in", async () => {
    const result = render(view({ reducedMotion: true }, true));
    expect(renderer.create).not.toHaveBeenCalled();
    expect(screen.queryByRole("heading")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Enable 3D ↗" }));
    await waitFor(() => expect(renderer.create).toHaveBeenCalledTimes(1));
    expect(renderer.create.mock.calls[0][1]).toEqual(
      expect.objectContaining({ reducedMotion: true }),
    );
    result.unmount();
    expect(renderer.dispose).toHaveBeenCalledTimes(1);
  });

  it("cancels deferred initialization when the experiment is immediately unmounted", async () => {
    const result = render(view());
    result.unmount();
    await act(async () => {
      await Promise.resolve();
    });
    expect(renderer.create).not.toHaveBeenCalled();
  });
});
