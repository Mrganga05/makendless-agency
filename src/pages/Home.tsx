import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import LiveShowcase from "../components/LiveShowcase";
import { LiveWorkshop, LabIntro } from "../components/HomeExperiences";
import { worldInfo, type World } from "../data";
import "../living-home.css";
export function StudioCards() {
  const [world, setWorld] = useState<World>("create");
  return (
    <div className="studio-portals" data-world={world}>
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
      <div
        className={`portal-stage portal-${world}`}
        key={world}
        data-motion="mask"
      >
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
              <span>01 / CREATE — A PHOTO-MOTION STUDY</span>
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
      <header className="page-heading" data-motion="typography">
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
    output: "A shared understanding of your project.",
  },
  {
    name: "DESIGN",
    title: "Make the direction clear.",
    text: "We shape a focused concept and agree on the experience together.",
    output: "A direction you can see and respond to.",
  },
  {
    name: "CREATE",
    title: "Bring the details to life.",
    text: "We edit, build and refine, sharing progress as the idea takes shape.",
    output: "A working creation, refined with your feedback.",
  },
  {
    name: "DELIVER",
    title: "Ready for what comes next.",
    text: "We review the result with you and prepare a clear handover.",
    output: "Your final assets and the guidance to use them.",
  },
];
export function ProcessSequence() {
  const [active, setActive] = useState(0);
  return (
    <section
      className="living-process section-wrap"
      aria-labelledby="process-title"
    >
      <div className="section-heading" data-motion="typography">
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
      <div className="process-composition">
        <div
          className="process-drawing"
          data-motion="transform"
          data-motion-key={active}
          aria-hidden="true"
        >
          <svg viewBox="0 0 360 260" fill="none">
            <defs>
              <linearGradient
                id="process-prism"
                x1="0"
                y1="0"
                x2="360"
                y2="260"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#22D3EE" />
                <stop offset=".52" stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#C7A6FF" />
              </linearGradient>
            </defs>
            <path
              className="process-path"
              d="M25 205H335M45 225H315"
              stroke="#A4AAC7"
              opacity=".2"
            />
            {active === 0 && (
              <g stroke="url(#process-prism)" strokeWidth="1.5">
                <circle cx="180" cy="126" r="54" />
                <circle cx="180" cy="126" r="82" opacity=".2" />
                <path d="M54 64L138 97M290 65L222 98M68 177L133 151M295 188L224 153" />
                <circle cx="54" cy="64" r="13" fill="#1D1B3A" />
                <circle cx="290" cy="65" r="9" fill="#1D1B3A" />
                <circle cx="68" cy="177" r="9" fill="#1D1B3A" />
                <circle cx="295" cy="188" r="13" fill="#1D1B3A" />
                <path d="M156 115H204M156 127H194M156 139H184" />
              </g>
            )}
            {active === 1 && (
              <g stroke="url(#process-prism)" strokeWidth="1.5">
                <path d="M74 45H288V189H74zM74 71H288M92 89H191V168H92zM207 89H270M207 102H260M207 115H266M207 154H248" />
                <path d="M61 32H275V176M48 19H262V163" opacity=".3" />
                <circle cx="86" cy="58" r="2" />
                <circle cx="97" cy="58" r="2" />
                <path
                  d="M100 157L124 122L145 142L169 109L183 157z"
                  fill="#8B5CF620"
                />
              </g>
            )}
            {active === 2 && (
              <g stroke="url(#process-prism)" strokeWidth="1.5">
                <path d="M107 28H252V210H107z" fill="#1D1B3A" />
                <path d="M91 42H236V223M123 16H267V197" opacity=".25" />
                <path d="M125 48H232M125 55H188M125 183H232M125 194H207" />
                <path
                  d="M128 145L154 81L180 145M138 121H169M196 81V145M187 81H205M187 145H205"
                  strokeWidth="7"
                />
                <path d="M68 184H93M257 57H282M80 172V197M270 45V70" />
              </g>
            )}
            {active === 3 && (
              <g stroke="url(#process-prism)" strokeWidth="1.5">
                <path d="M107 31H228L254 57V210H107z" fill="#1D1B3A" />
                <path d="M228 31V57H254M165 89H228M165 122H219M165 155H228M126 84L135 93L150 76M126 117L135 126L150 109M126 150L135 159L150 142M128 185H205" />
                <path d="M90 47V223H239" opacity=".3" />
              </g>
            )}
          </svg>
          <span>THE IDEA TAKES SHAPE / 0{active + 1}</span>
        </div>
        <div className="process-narrative">
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
          <div
            className="process-story"
            aria-live="polite"
            data-motion="editorial"
            data-motion-key={active}
          >
            <span>0{active + 1}</span>
            <div>
              <h3>{steps[active].title}</h3>
              <p>{steps[active].text}</p>
              <small>{steps[active].output}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  return (
    <div className="universe-home">
      <section
        className="living-hero section-wrap"
        aria-labelledby="hero-title"
      >
        <div className="living-hero-copy" data-motion="typography">
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
            <span>01 / THE LIVING STAGE</span>
            <span>
              CHOOSE. PLAY. MAKE. <ArrowUpRight size={13} />
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
            <h2 id="worlds-title" data-motion="typography">
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
            <h2 id="work-title" data-motion="typography">
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
          <Link
            to="/work#outside"
            className="living-work-piece work-piece-film"
          >
            <div data-motion="mask">
              <img
                src="/images/mountain.jpg"
                alt="Outdoor storytelling concept in a mountain valley"
                width="1400"
                height="933"
                loading="lazy"
              />
              <span>EXPLORATION 001 / MOTION DIRECTION</span>
              <h3>
                Outside
                <br />
                the ordinary.
              </h3>
              <div className="work-film-corners" aria-hidden="true" />
              <small className="work-film-time" aria-hidden="true">
                FRAME / 001
              </small>
            </div>
            <p>
              A moment, reimagined.
              <ArrowUpRight size={18} />
            </p>
          </Link>
          <Link to="/work#still" className="living-work-piece work-piece-site">
            <div data-motion="spatial">
              <span>EXPLORATION 002 / DIGITAL EXPERIENCE</span>
              <div className="selected-browser" aria-hidden="true">
                <div className="selected-browser-nav">
                  <b>still.</b>
                  <span>Slow mornings. Good company.</span>
                  <i>↗</i>
                </div>
                <img
                  src="/images/coffee.jpg"
                  alt=""
                  width="1200"
                  height="800"
                  loading="lazy"
                />
                <div className="selected-browser-copy">
                  <strong>
                    A little
                    <br />
                    everyday joy.
                  </strong>
                  <small>COFFEE, CONNECTION & A PLACE TO PAUSE.</small>
                  <span>Find your moment ↗</span>
                </div>
                <div className="selected-browser-foot">
                  <span>Made with care.</span>
                  <span>Served with a smile.</span>
                </div>
              </div>
              <h3 className="visually-hidden">
                A small business. A new possibility.
              </h3>
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
        <h2 data-motion="typography">
          Let’s make something
          <br />
          <span>worth remembering.</span>
        </h2>
        <p>Tell us what you’re building. We’ll help shape the next step.</p>
        <Link className="button button-primary" to="/contact">
          Start Your Project <ArrowUpRight size={19} />
        </Link>
        <div className="final-horizon" aria-hidden="true" data-motion="prism">
          <i />
          <i />
          <i />
        </div>
        <small className="final-signature">CREATE • BUILD • GROW</small>
      </section>
    </div>
  );
}
