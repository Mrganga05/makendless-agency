import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Hero from "../components/v14/Hero";
import StudioWorlds from "../components/v14/StudioWorlds";
import LiveShowcase from "../components/LiveShowcase";
import {
  AudienceSection,
  PackagesSection,
  ProcessSection,
} from "../components/v14/BusinessJourney";
import { useSiteTheme } from "../theme-context";
import "../v14.css";
export default function Home() {
  const { theme } = useSiteTheme();
  return (
    <div className="v14-home">
      <Hero theme={theme} />
      <StudioWorlds />
      <section
        className="v14-transformation"
        id="showcase"
        aria-labelledby="transformation-title"
        data-surface="dark"
      >
        <div className="v14-wrap">
          <header className="v14-transformation-heading">
            <div>
              <span className="v14-eyebrow">
                03 / FROM POSSIBILITY TO PROOF
              </span>
              <h2 id="transformation-title" data-motion="typography">
                See the difference<span>.</span>
              </h2>
            </div>
            <p>
              Move the frame. Change the website. Explore a campaign concept.
              Try the possibilities, with Digital Marketing clearly in Beta.
            </p>
          </header>
          <LiveShowcase variant="study" theme={theme} />
          <div className="v14-transformation-foot">
            <span>
              Original studio concepts. Real controls. Yours to explore.
            </span>
            <a href="#solutions">
              Find your fit <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </section>
      <AudienceSection />
      <PackagesSection />
      <ProcessSection />
      <section
        className="v14-finale"
        id="start"
        aria-labelledby="invitation-title"
        data-surface="dark"
      >
        <div className="v14-wrap">
          <div className="v14-final-index">
            <span className="v14-eyebrow">07 / THE NEXT CHAPTER IS YOURS</span>
            <span aria-hidden="true">↗</span>
          </div>
          <h2 id="invitation-title" data-motion="typography">
            Let's make something
            <br />
            <em>worth remembering.</em>
          </h2>
          <div className="v14-final-bottom">
            <p>
              Tell us about your project.
              <br />
              We'll help you take the next step.
            </p>
            <Link className="v14-final-action" to="/contact">
              Start a Project <ArrowUpRight size={32} />
            </Link>
          </div>
          <div
            className="v14-final-mark"
            data-motion="prism"
            aria-hidden="true"
          >
            <span>MAK</span>
            <i />
            <span>NDLESS</span>
          </div>
        </div>
      </section>
    </div>
  );
}
