import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { StudioDestinations } from "../components/v14/StudioWorlds";
import "../living-home.css";

/** Retained export for existing callers; composition follows the three V16 divisions. */
export const StudioCards = StudioDestinations;
export default function Studios() {
  return (
    <div className="page-shell living-studios v14-studios-directory">
      <header className="page-heading" data-motion="typography">
        <span className="eyebrow">CREATE • BUILD • GROW</span>
        <h1>
          Three worlds.
          <br />
          One place for
          <br />
          your next idea.
        </h1>
        <p>
          Video editing with feeling. Website development with purpose. Digital
          marketing in Beta / Coming Soon. Explore the studio that fits your
          ambition.
        </p>
      </header>
      <StudioDestinations />
      <div className="studio-assistance">
        <div>
          <h2>Not sure where to begin?</h2>
          <p>A few simple questions can help you find a starting point.</p>
        </div>
        <Link className="button button-secondary" to="/find-solution">
          Find My Solution <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
