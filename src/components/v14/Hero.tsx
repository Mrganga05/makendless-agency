import { useState } from "react";
import { useProject } from "../../project";
import type { ShowcaseMode } from "../../showcase-state";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import LiveShowcase from "../LiveShowcase";
import { HOME_THEME, type HomeTheme } from "../../theme";
import "../../v14-hero.css";
export default function Hero({ theme = HOME_THEME }: { theme?: HomeTheme }) {
  const [mode, setMode] = useState<ShowcaseMode | null>(null);
  const { setProject } = useProject();
  const serviceId = mode === "create" ? "V1" : mode === "build" ? "T1" : "M1";
  function carrySelection() {
    if (!mode) return;
    setProject((previous) => ({
      ...previous,
      brief: "",
      services: [...new Set([...previous.services, serviceId])],
    }));
  }
  return (
    <section
      id="home"
      className="v14-hero"
      aria-labelledby="hero-title"
      data-surface="dark"
    >
      <div className="v14-hero-topline">
        <span>CREATIVE & TECHNOLOGY STUDIO</span>
        <span>IDEAS INTO EXPERIENCES ↗</span>
      </div>
      <div className="v14-hero-composition">
        <div className="v14-hero-copy">
          <h1
            id="hero-title"
            data-motion="typography"
            aria-label="We make ideas impossible to ignore."
          >
            We make ideas
            <br />
            <span>impossible</span>
            <br />
            to ignore<span className="v14-hero-dot">.</span>
          </h1>
          <p>
            Premium video editing, website development and digital marketing
            solutions for ambitious creators and businesses.
          </p>
          <div className="v14-hero-actions">
            <a className="v14-hero-primary" href="#studios">
              Explore Studios <ArrowDown size={18} />
            </a>
            <Link to="/contact" onClick={carrySelection}>
              Start a Project <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="v14-hero-philosophy">
            <span>CREATE</span>
            <i />
            <span>BUILD</span>
            <i />
            <Link to="/studios/grow">
              GROW <small>BETA / COMING SOON</small>
            </Link>
          </div>
        </div>
        <div className="v14-hero-experience">
          <div className="v14-stage-heading">
            <span>THE LIVING STAGE</span>
            <span>DON’T JUST IMAGINE IT. TRY IT.</span>
          </div>
          <LiveShowcase theme={theme} onModeChange={setMode} />
        </div>
      </div>
      <div className="v14-hero-bottom">
        <span>GOOD IDEAS DESERVE TO BE SEEN.</span>
        <a href="#showcase">
          A little possibility. A real interaction. <ArrowDown size={14} />
        </a>
        <span>01 — 07</span>
      </div>
    </section>
  );
}
