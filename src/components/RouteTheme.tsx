import { useLayoutEffect } from "react";
import { homePalettes, homeThemeVariables } from "../theme";
import { useSiteTheme } from "../theme-context";
import "../atelier-theme.css";

export default function RouteTheme() {
  const { theme } = useSiteTheme();
  useLayoutEffect(() => {
    const root = document.documentElement;
    const palette = homePalettes[theme];
    const variables = {
      ...homeThemeVariables(theme),
      "--brand-bg": palette.night,
      "--brand-surface": palette.surface,
      "--brand-violet": palette.violet,
      "--brand-aqua": palette.aqua,
      "--brand-text": palette.white,
      "--brand-muted": palette.mutedDark,
      "--border": palette.lineDark,
      "--brand-gradient": `linear-gradient(115deg, ${palette.aqua}, ${palette.violet} 52%, ${palette.violetLight})`,
    };
    const previous = Object.fromEntries(
      Object.keys(variables).map((name) => [
        name,
        root.style.getPropertyValue(name),
      ]),
    );
    const previousTheme = root.dataset.theme;
    for (const [name, value] of Object.entries(variables))
      root.style.setProperty(name, value);
    root.dataset.theme = theme;
    return () => {
      for (const [name, value] of Object.entries(previous)) {
        if (value) root.style.setProperty(name, value);
        else root.style.removeProperty(name);
      }
      if (previousTheme) root.dataset.theme = previousTheme;
      else delete root.dataset.theme;
    };
  }, [theme]);
  return null;
}
