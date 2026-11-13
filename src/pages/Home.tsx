import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import LiveShowcase from "../components/LiveShowcase";
import {
  ServiceGallery,
  TransformationStage,
} from "../components/home/ServiceExperiences";
import {
  AudienceSolutions,
  PackageGuide,
  SelectedConcepts,
} from "../components/home/BusinessSections";
import { HomepageLab, ProcessFaq } from "../components/home/ProjectExperience";
import { HOME_THEME } from "../theme";
import "../homepage-atelier.css";
export default function Home() {
  return (
    <div className="atelier-home">
      <section
        className="hp-hero"
        aria-labelledby="hero-title"
        data-surface="dark"
      >
        <div className="hp-hero-inner">
          <div className="hp-hero-copy">
            <span className="hp-kicker">
              MAKENDLESS / CREATIVE & TECHNOLOGY STUDIO
            </span>
            <h1 id="hero-title" data-motion="typography">
              We make ideas
              <br />
              <span>
                impossible
                <br />
                to ignore.
              </span>
            </h1>
            <p>
              Premium video editing, websites and AI solutions for creators and
              ambitious businesses.
            </p>
            <div className="hp-hero-actions">
              <a className="button button-primary" href="#services">
                Explore Services <ArrowRight size={18} />
              </a>
              <Link className="text-link" to="/contact">
                Start a Project <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="hp-hero-disciplines">
              <span>CREATE</span>
              <i />
              <span>BUILD</span>
              <i />
              <Link to="/studios/grow">
                GROW <small>BETA / COMING SOON</small>
              </Link>
            </div>
          </div>
          <div className="hp-hero-media">
            <div className="hp-stage-label">
              <span>IDEAS, IN THEIR ELEMENT.</span>
              <span>TRY THE STUDIO ↓</span>
            </div>
            <LiveShowcase theme={HOME_THEME} />
          </div>
        </div>
        <div className="hp-hero-foot">
          <span>FROM YOUR FIRST FRAME TO YOUR NEXT DIGITAL PRODUCT.</span>
          <a href="#services">
            Find your starting point <ArrowRight size={15} />
          </a>
        </div>
      </section>
      <ServiceGallery />
      <TransformationStage />
      <AudienceSolutions />
      <PackageGuide />
      <SelectedConcepts />
      <HomepageLab />
      <ProcessFaq />
      <section
        className="hp-final"
        aria-labelledby="invitation-title"
        data-surface="dark"
      >
        <div className="hp-final-inner">
          <span className="hp-kicker">09 / YOUR NEXT CHAPTER</span>
          <h2 id="invitation-title" data-motion="typography">
            Let's make something
            <br />
            <span>worth remembering.</span>
          </h2>
          <p>
            Tell us what you're creating. We'll help you define the next step.
          </p>
          <Link className="button button-primary" to="/contact">
            Start a Project <ArrowUpRight size={20} />
          </Link>
          <div
            className="hp-final-signature"
            aria-hidden="true"
            data-motion="prism"
          >
            <span>CREATE</span>
            <i />
            <span>BUILD</span>
            <i />
            <span>GROW</span>
          </div>
        </div>
      </section>
    </div>
  );
}
