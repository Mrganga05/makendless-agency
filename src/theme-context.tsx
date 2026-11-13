import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { HOME_THEME, type HomeTheme } from "./theme";
const SiteTheme = createContext<{ theme: HomeTheme }>({ theme: HOME_THEME });
/** A query override is a review tool, never a customer-facing design control. */
export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const { search } = useLocation();
  const candidate = new URLSearchParams(search).get("theme");
  const [theme, setTheme] = useState<HomeTheme>(() =>
    candidate === "glass" ? "glass" : HOME_THEME,
  );
  useEffect(() => {
    if (candidate === "glass" || candidate === "atelier") setTheme(candidate);
  }, [candidate]);
  return <SiteTheme.Provider value={{ theme }}>{children}</SiteTheme.Provider>;
}
export function useSiteTheme() {
  return useContext(SiteTheme);
}
