/** V14 reviewable site palettes. Both families remain recoverable. */
export const PRISM_ATELIER = {
  night: "#0C1024",
  surface: "#202342",
  paper: "#F6F7FC",
  violet: "#6F45F6",
  aqua: "#08BBD4",
  white: "#F6F8FF",
  mutedDark: "#B7C0DB",
  ink: "#13172B",
  mutedLight: "#52607B",
  violetInk: "#5730C8",
  violetLight: "#BCA9FF",
  aquaInk: "#007387",
  lineLight: "#D6DCE9",
  lineDark: "#F6F8FF26",
  wash: "#ECEFF7",
  action: "#6F45F6",
} as const;
export const GLASS_PRISM = {
  night: "#0A0B1B",
  surface: "#1D1B3A",
  paper: "#EAF2FF",
  violet: "#8B5CF6",
  aqua: "#22D3EE",
  white: "#EAF2FF",
  mutedDark: "#A4AAC7",
  ink: "#0A0B1B",
  mutedLight: "#4B526C",
  violetInk: "#5730C8",
  violetLight: "#C7A6FF",
  aquaInk: "#007387",
  lineLight: "#CED7E9",
  lineDark: "#EAF2FF26",
  wash: "#DFE8F7",
  action: "#6035CE",
} as const;
export type HomeTheme = "atelier" | "glass";
/** Change this one setting to recover the prior brand palette site-wide. */
export const HOME_THEME: HomeTheme = "atelier";
export const homePalettes = { atelier: PRISM_ATELIER, glass: GLASS_PRISM };
export function homeThemeVariables(theme: HomeTheme): Record<string, string> {
  return Object.fromEntries(
    Object.entries(homePalettes[theme]).map(([key, value]) => [
      `--home-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
      value,
    ]),
  );
}
