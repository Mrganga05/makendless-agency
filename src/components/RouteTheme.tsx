import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { HOME_THEME, homePalettes, homeThemeVariables } from "../theme";
import "../atelier-theme.css";

export default function RouteTheme() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    const root = document.documentElement;
    for (const [name, value] of Object.entries(homeThemeVariables(HOME_THEME)))
      root.style.setProperty(name, value);
    root.dataset.theme = pathname === "/" ? HOME_THEME : "glass";
    const palette = homePalettes[HOME_THEME];
    const aliases: Record<string, string> = {
      "--brand-bg": palette.night,
      "--brand-surface": palette.surface,
      "--brand-violet": palette.violet,
      "--brand-aqua": palette.aqua,
      "--brand-text": palette.white,
      "--brand-muted": palette.mutedDark,
      "--brand-gradient": `linear-gradient(115deg, ${palette.aqua}, ${palette.violet} 52%, ${palette.violetLight})`,
    };
    for (const [name, value] of Object.entries(aliases)) {
      if (pathname === "/") root.style.setProperty(name, value);
      else root.style.removeProperty(name);
    }
    return () => {
      for (const name of Object.keys(aliases)) root.style.removeProperty(name);
      delete root.dataset.theme;
    };
  }, [pathname]);
  return null;
}
