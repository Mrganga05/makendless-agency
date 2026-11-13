import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Play, Check, Sparkles } from "lucide-react";
import LiveShowcase from "../components/LiveShowcase";
import { LiveWorkshop, LabIntro } from "../components/HomeExperiences";
import { worldInfo, type World } from "../data";
import "../living-home.css";
export function StudioCards() {
  const [world, setWorld] = useState<World>("create");
  return (
    <div className="studio-portals">
      <div
        className="portal-selector"
        role="group"
        aria-label="Choose a studio world"
      >
        {(["create", "build", "grow"] as World[]).map((id, i) => (
          <button
            key={id}
            aria-pressed={world === id}
            onClick={() => setWorld(id)}
          >
            <span>0{i + 1}</span>
            <div>
              <strong>{worldInfo[id].label}</strong>
              <small>
                {id === "create"
                  ? "Video Editing & Creative Production"
                  : id === "build"
                    ? "Websites, Apps & AI"
                    : "Digital Marketing · Beta / Coming Soon"}
              </small>
            </div>
            <ArrowUpRight size={22} />
          </button>
        ))}
        <p>
          Three connected worlds.
          <br />
          One place to bring your idea to life.
        </p>
      </div>
      <div className={`portal-stage portal-${world}`} key={world}>
        {world === "create" ? (
          <>
            <div className="portal-photo">
              <img
                src="/images/mountain.jpg"
                alt="A mountain photograph used in a concept video edit"
                width="1400"
                height="933"
                loading="lazy"
              />
              <span>CREATE / ORIGINAL PHOTO-MOTION STUDY</span>
              <h3>
                A moment.
                <br />A story.
                <br />
                <em>A feeling.</em>
              </h3>
              <div className="portal-timeline" aria-hidden="true">
                {Array.from({ length: 28 }, (_, i) => (
                  <i key={i} style={{ height: `${8 + ((i * 17) % 25)}px` }} />
                ))}
              </div>
            </div>
          </>
        ) : world === "build" ? (
          <div className="portal-website">
            <div className="portal-browser">
              <span>● ● ●</span> YOUR BUSINESS, BROUGHT TO LIFE
            </div>
            <div className="portal-web-content">
              <img
                src="/images/coffee.jpg"
                alt="Café website concept"
                width="1200"
                height="800"
                loading="lazy"
              />
              <div>
                <strong>still.</strong>
                <h3>
                  A place for
                  <br />
                  good things.
                </h3>
                <span>WEBSITE + BOOKING + AUTOMATION</span>
              </div>
            </div>
            <div className="portal-booking">
              <Check size={17} />
              <span>
                A thoughtful experience.
                <small>From first visit to next appointment.</small>
              </span>
            </div>
          </div>
        ) : (
          <div className="portal-growth">
            <span className="beta-tag">BETA / COMING SOON</span>
            <h3>
              Your next
              <br />
              chapter of growth.
            </h3>
            <div className="growth-planner" aria-hidden="true">
              {["PLAN", "CREATE", "CONNECT"].map((t, i) => (
                <div key={t}>
                  <span>0{i + 1}</span>
                  <strong>{t}</strong>
                  <i style={{ width: `${45 + i * 20}%` }} />
                </div>
              ))}
            </div>
            <p>
              Campaign planning. Content. Local presence.
              <br />
              Explore the concepts while we develop the services.
            </p>
          </div>
        )}
        <Link to={`/studios/${world}`} className="portal-action">
          {world === "grow"
            ? "Explore what’s coming"
            : `Enter ${worldInfo[world].label}`}
          <ArrowUpRight size={20} />
        </Link>
      </div>
    </div>
  );
}
export function Studios() {
  return (
    <div className="page-shell living-studios">
      <header className="page-heading">
        <span className="eyebrow">CREATE • BUILD • GROW</span>
        <h1>
          Find the world
          <br />
          for your next idea.
        </h1>
        <p>
          Choose a studio. Try its capabilities. Make it part of your project.
        </p>
      </header>
      <StudioCards />
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
const steps = [
  {
    name: "DISCOVER",
    title: "First, we listen.",
    text: "We get to know your goals, your audience and what matters to you.",
  },
  {
    name: "DESIGN",
    title: "Make the direction clear.",
    text: "We shape a focused concept and agree on the experience together.",
  },
  {
    name: "CREATE",
    title: "Bring the details to life.",
    text: "We edit, build and refine, sharing progress as the idea takes shape.",
  },
  {
    name: "DELIVER",
    title: "Ready for what comes next.",
    text: "We review the result with you and prepare a clear handover.",
  },
];
function ProcessSequence() {
  const [active, setActive] = useState(0);
  return (
    <section
      className="living-process section-wrap"
      aria-labelledby="process-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">06 / HOW WE WORK</span>
          <h2 id="process-title">
            Good things.
            <br />
            Made together.
          </h2>
        </div>
        <p>
          A clear process. A close collaboration.
          <br />
          Space for your ideas at every step.
        </p>
      </div>
      <div
        className="process-selector"
        role="group"
        aria-label="Explore our process"
      >
        {steps.map((s, i) => (
          <button
            key={s.name}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            <strong>{s.name}</strong>
            <ArrowRight size={20} />
          </button>
        ))}
      </div>
      <div className="process-story" aria-live="polite">
        <span>0{active + 1}</span>
        <div>
          <h3>{steps[active].title}</h3>
          <p>{steps[active].text}</p>
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  return (
    <>
      <section
        className="living-hero section-wrap"
        aria-labelledby="hero-title"
      >
        <div className="living-hero-copy">
          <span className="eyebrow">
            MAKENDLESS — CREATIVE & TECHNOLOGY STUDIO
          </span>
          <h1 id="hero-title">
            We make ideas
            <br />
            <span>
              impossible
              <br />
              to ignore.
            </span>
          </h1>
          <p>
            Video editing, websites and AI solutions for ambitious creators and
            businesses.
          </p>
          <div className="living-hero-actions">
            <Link className="button button-primary" to="/studios">
              Explore Our Studios <ArrowUpRight size={18} />
            </Link>
            <Link className="text-link" to="/contact">
              Start a Project <ArrowRight size={17} />
            </Link>
          </div>
          <div className="living-signature">
            <span>CREATE</span>
            <i />
            <span>BUILD</span>
            <i />
            <Link to="/studios/grow">
              GROW <small>COMING SOON</small>
            </Link>
          </div>
        </div>
        <div className="hero-workbench">
          <div className="workbench-label">
            <span>THE LIVING SHOWCASE</span>
            <span>
              MADE TO BE EXPLORED <ArrowUpRight size={13} />
            </span>
          </div>
          <LiveShowcase />
        </div>
      </section>
      <section
        className="living-worlds section-wrap"
        id="studios"
        aria-labelledby="worlds-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / THREE WORLDS. ONE STUDIO.</span>
            <h2 id="worlds-title">
              Where your idea
              <br />
              <span>finds its form.</span>
            </h2>
          </div>
          <p>
            From your first frame to a fully working product. Choose what you
            want to make.
          </p>
        </div>
        <StudioCards />
      </section>
      <LiveWorkshop />
      <LabIntro />
      <section
        className="living-selected section-wrap"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">05 / SELECTED EXPLORATIONS</span>
            <h2 id="work-title">
              A glimpse of
              <br />
              <span>what could be.</span>
            </h2>
          </div>
          <Link className="text-link" to="/work">
            Explore the concepts <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="living-work-pair">
          <Link to="/work" className="living-work-piece">
            <div>
              <img
                src="/images/mountain.jpg"
                alt="Outdoor storytelling concept in a mountain valley"
                width="1400"
                height="933"
                loading="lazy"
              />
              <span>CONCEPT / MOTION DIRECTION</span>
              <h3>
                Outside
                <br />
                the ordinary.
              </h3>
              <Play size={27} />
            </div>
            <p>
              A moment, reimagined.
              <ArrowUpRight size={18} />
            </p>
          </Link>
          <Link to="/work" className="living-work-piece">
            <div>
              <img
                src="/images/coffee.jpg"
                alt="A café digital-experience concept"
                width="1200"
                height="800"
                loading="lazy"
              />
              <span>CONCEPT / DIGITAL EXPERIENCE</span>
              <h3>
                A small business.
                <br />A new possibility.
              </h3>
              <Sparkles size={27} />
            </div>
            <p>
              Small business. Big presence.
              <ArrowUpRight size={18} />
            </p>
          </Link>
        </div>
        <p className="living-work-note">
          Original studio concepts, not client commissions. Open a project to
          explore the approach and deliverables.
        </p>
      </section>
      <ProcessSequence />
      <section className="living-final section-wrap">
        <span className="eyebrow">07 / YOUR NEXT CHAPTER</span>
        <h2>
          Let’s make something
          <br />
          <span>worth remembering.</span>
        </h2>
        <p>Tell us what you’re building. We’ll help shape the next step.</p>
        <Link className="button button-primary" to="/contact">
          Start Your Project <ArrowUpRight size={19} />
        </Link>
        <div aria-hidden="true">CREATE • BUILD • GROW</div>
      </section>
    </>
  );
}
