import { createContext, useContext } from "react";
export type LabSettings = {
  reducedMotion: boolean;
  forceFallback: boolean;
  theme: "glass" | "atelier";
};
export const LabSettingsContext = createContext<LabSettings>({
  reducedMotion: false,
  forceFallback: false,
  theme: "glass",
});
export function useLabSettings() {
  return useContext(LabSettingsContext);
}
