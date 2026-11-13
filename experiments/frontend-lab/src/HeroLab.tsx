import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowRight, ArrowUpRight, Pause, Play, RotateCcw } from "lucide-react";
import { useLabSettings } from "./settings";
import "./heroes.css";

const SpatialLab = lazy(() => import("./SpatialLab"));
type Concept = "media" | "spatial" | "editorial";
const concepts: {
  id: Concept;
  letter: string;
  title: string;
  hypothesis: string;
  risk: string;
}[] = [
  {
    id: "media",
    letter: "A",
    title: "Cinematic Media Stage",
    hypothesis:
      "An unmistakable product film makes video editing tangible before visitors read the service catalogue.",
    risk: "The media needs a clear edited/source difference; visual hierarchy and the first mobile screen still need real-browser review.",
  },
  {
    id: "spatial",
    letter: "B",
    title: "Interactive Spatial Showcase",
    hypothesis:
      "A single material-aware display can explain the relationship between visual craft and a functional digital interface.",
    risk: "3D must justify its download and GPU cost. Compare its first-screen clarity with the lighter HTML-only concepts.",
  },
  {
    id: "editorial",
    letter: "C",
    title: "Editorial Motion Composition",
    hypothesis:
      "A light editorial canvas makes the visitor's idea the subject, then lets each discipline give it a different form.",
    risk: "The interactive treatment must reinforce the service message rather than become an unexplained typography toy.",
  },
];

function PrototypeActions() {
  return (
    <div className="hero-prototype-actions">
      <a className="hero-prototype-primary" href="#live">
        Explore the live demos <ArrowRight size={17} />
      </a>
      <a href="#sections">
        See the section studies <ArrowUpRight size={17} />
      </a>
    </div>
  );
}
function StudioDisciplines() {
  return (
    <div className="hero-prototype-disciplines">
      <span>CREATE / Video</span>
      <span>BUILD / Websites & AI</span>
      <span>
        GROW <small>Beta / Coming Soon</small>
      </span>
    </div>
  );
}
function HeadphoneArtwork() {
  const id = useId();
  return (
    <svg
      className="hero-headphone"
      viewBox="0 0 640 520"
      role="img"
      aria-label="Original vector illustration of over-ear headphones"
    >
      <defs>
        <linearGradient
          id={id}
          x1="150"
          y1="100"
          x2="460"
          y2="430"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--lab-accent-light)" />
          <stop offset=".5" stopColor="var(--lab-surface)" />
          <stop offset="1" stopColor="var(--lab-aqua)" />
        </linearGradient>
      </defs>
      <ellipse
        className="headphone-shadow"
        cx="320"
        cy="455"
        rx="165"
        ry="25"
      />
      <path
        className="headphone-band"
        d="M184 304v-95a136 136 0 0 1 272 0v95"
        stroke={`url(#${id})`}
        strokeWidth="38"
        fill="none"
      />
      <path
        className="headphone-inner-band"
        d="M206 276v-65a114 114 0 0 1 228 0v65"
        fill="none"
        strokeWidth="12"
      />
      <g className="headphone-left">
        <path className="headphone-joint" d="M185 257v60" strokeWidth="14" />
        <rect
          className="headphone-cup"
          x="145"
          y="284"
          width="89"
          height="144"
          rx="42"
          fill={`url(#${id})`}
        />
        <rect
          className="headphone-pad"
          x="192"
          y="293"
          width="48"
          height="127"
          rx="23"
        />
        <path className="headphone-detail" d="M161 322v65" strokeWidth="3" />
        <circle className="headphone-detail" cx="174" cy="400" r="3" />
      </g>
      <g className="headphone-right">
        <path className="headphone-joint" d="M455 257v60" strokeWidth="14" />
        <rect
          className="headphone-cup"
          x="406"
          y="284"
          width="89"
          height="144"
          rx="42"
          fill={`url(#${id})`}
        />
        <rect
          className="headphone-pad"
          x="400"
          y="293"
          width="48"
          height="127"
          rx="23"
        />
        <path className="headphone-detail" d="M479 322v65" strokeWidth="3" />
      </g>
      <path
        className="headphone-detail"
        d="M246 127a97 97 0 0 1 148 0"
        fill="none"
        strokeWidth="2"
      />
    </svg>
  );
}
const shots = [
  {
    title: (
      <>
        LISTEN
        <br />
        CLOSER.
      </>
    ),
    name: "The introduction",
    detail: "An intentional crop, a clear product and a line worth reading.",
  },
  {
    title: (
      <>
        LESS NOISE.
        <br />
        MORE YOU.
      </>
    ),
    name: "The detail",
    detail: "Tighter framing and a second message change the emphasis.",
  },
  {
    title: (
      <>
        FIND YOUR
        <br />
        FREQUENCY.
      </>
    ),
    name: "The invitation",
    detail: "The final frame gives the concept a purposeful ending.",
  },
];
function MediaHero() {
  const { reducedMotion } = useLabSettings();
  const [edited, setEdited] = useState(true);
  const [close, setClose] = useState(false);
  const [shot, setShot] = useState(0);
  const [playing, setPlaying] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!playing || reducedMotion) return;
    let next = 0;
    const stop = () => setPlaying(false);
    const hide = () => {
      if (document.hidden) stop();
    };
    const timer = window.setInterval(() => {
      next += 1;
      if (next > 2) stop();
      else setShot(next);
    }, 2000);
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) stop();
          })
        : null;
    if (host.current) observer?.observe(host.current);
    document.addEventListener("visibilitychange", hide);
    return () => {
      clearInterval(timer);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", hide);
    };
  }, [playing, reducedMotion]);
  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);
  function play() {
    setEdited(true);
    if (reducedMotion) {
      setShot((value) => (value + 1) % 3);
      return;
    }
    if (playing) setPlaying(false);
    else {
      setShot(0);
      setPlaying(true);
    }
  }
  return (
    <article
      className="hero-prototype hero-media-prototype"
      aria-label="Cinematic media hero prototype"
      data-hero-reduced={reducedMotion}
    >
      <div className="hero-media-copy">
        <span className="hero-prototype-kicker">
          MAKENDLESS / CREATIVE & TECHNOLOGY STUDIO
        </span>
        <h3>
          Make the ordinary
          <br />
          <em>unmissable.</em>
        </h3>
        <p>
          Video editing, websites and AI solutions. One studio for the idea you
          can’t leave alone.
        </p>
        <PrototypeActions />
        <StudioDisciplines />
      </div>
      <div className="hero-film-workspace" ref={host}>
        <div className="hero-film-label">
          <span>PULSE / ORIGINAL PRODUCT-FILM STUDY</span>
          <span>NO CLIENT COMMISSION</span>
        </div>
        <div
          className={`hero-film-screen ${edited ? "is-edited" : "is-source"} ${close || (edited && shot === 1) ? "is-close" : ""} hero-shot-${shot}`}
        >
          <span className="hero-film-counter">
            {edited ? `SHOT 0${shot + 1} / 03` : "SOURCE ARTWORK"}
          </span>
          <div className="hero-film-art">
            <HeadphoneArtwork />
          </div>
          {edited ? (
            <div key={shot} className="hero-film-type">
              <span>PULSE / A FICTIONAL AUDIO BRAND</span>
              <strong>{shots[shot].title}</strong>
              <small>DESIGNED TO BE HEARD.</small>
            </div>
          ) : (
            <div className="hero-source-caption">
              <span>01 / VECTOR SOURCE</span>
              <strong>Before the edit.</strong>
              <small>Artwork at its original framing.</small>
            </div>
          )}
          <div className="hero-film-timecode" aria-hidden="true">
            <i />
            <span>00:0{shot * 2} / 00:06</span>
          </div>
        </div>
        <div className="hero-film-controls">
          <div role="group" aria-label="Product film treatment">
            <button
              aria-pressed={!edited}
              onClick={() => {
                setEdited(false);
                setPlaying(false);
                setClose(false);
              }}
            >
              Source
            </button>
            <button aria-pressed={edited} onClick={() => setEdited(true)}>
              Directed edit
            </button>
          </div>
          <button
            aria-pressed={close}
            onClick={() => setClose((value) => !value)}
          >
            Tight framing
          </button>
          <button className="hero-film-play" onClick={play}>
            {playing ? <Pause size={16} /> : <Play size={16} />}{" "}
            {reducedMotion
              ? "Next still"
              : playing
                ? "Pause concept film"
                : "Play concept film"}
          </button>
        </div>
        <div
          className="hero-film-shot-selector"
          role="group"
          aria-label="Product film shots"
        >
          {shots.map((item, index) => (
            <button
              key={item.name}
              aria-pressed={shot === index}
              onClick={() => {
                setShot(index);
                setPlaying(false);
                setEdited(true);
              }}
            >
              <span>0{index + 1}</span>
              {item.name}
            </button>
          ))}
        </div>
        <p className="hero-film-feedback" role="status">
          {edited
            ? shots[shot].detail
            : "Original artwork without the edit’s crop, typography or sequence."}
        </p>
        <p className="hero-prototype-caption">
          A finite, silent SVG motion study—not filmed footage or a finished
          client advertisement.
        </p>
      </div>
    </article>
  );
}
class SpatialBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="hero-spatial-fallback" role="alert">
        <h4>The spatial prototype could not load.</h4>
        <p>
          The other hero concepts and live HTML demonstrations remain available.
        </p>
        <a href="#live">
          Open the live component lab <ArrowRight size={16} />
        </a>
      </div>
    ) : (
      this.props.children
    );
  }
}
function SpatialHero() {
  return (
    <article
      className="hero-prototype hero-spatial-prototype"
      aria-label="Spatial showcase hero prototype"
    >
      <header className="hero-spatial-heading">
        <div>
          <span className="hero-prototype-kicker">
            MAKENDLESS / CREATIVE & TECHNOLOGY STUDIO
          </span>
          <h3>
            Your idea.
            <br />
            <em>Another dimension.</em>
          </h3>
        </div>
        <div>
          <p>
            Video editing with a point of view. Websites with character. AI
            workflows with a clear next step.
          </p>
          <PrototypeActions />
        </div>
      </header>
      <SpatialBoundary>
        <Suspense
          fallback={
            <div className="hero-spatial-loading" role="status">
              Preparing the interactive display study…
            </div>
          }
        >
          <SpatialLab embedded />
        </Suspense>
      </SpatialBoundary>
      <StudioDisciplines />
    </article>
  );
}
type Discipline = "create" | "build" | "ai";
const editorial = {
  create: {
    verb: "Make a moment.",
    line: "Editing gives a story its rhythm.",
    outcome:
      "A visual idea becomes a sequence with a beginning, detail and invitation.",
  },
  build: {
    verb: "Build a presence.",
    line: "A useful interface gives it a home.",
    outcome: "A page becomes a small, usable product experience.",
  },
  ai: {
    verb: "Connect the steps.",
    line: "A clear workflow gives time back.",
    outcome:
      "An inquiry moves through a deliberate sequence and stops for human review.",
  },
};
function EditorialHero() {
  const { reducedMotion } = useLabSettings();
  const [discipline, setDiscipline] = useState<Discipline>("create");
  const [idea, setIdea] = useState("A new way to listen.");
  const [replay, setReplay] = useState(0);
  const [siteOpen, setSiteOpen] = useState(false);
  const [step, setStep] = useState(0);
  const selected = editorial[discipline];
  return (
    <article
      className="hero-prototype hero-editorial-prototype"
      aria-label="Editorial motion hero prototype"
      data-hero-reduced={reducedMotion}
    >
      <div className="hero-editorial-masthead">
        <span>MAKENDLESS</span>
        <span>CREATIVE & TECHNOLOGY STUDIO</span>
        <span>IDEA / FORM / EXPERIENCE</span>
      </div>
      <div className="hero-editorial-layout">
        <div className="hero-editorial-copy">
          <span className="hero-prototype-kicker">YOU BRING THE IDEA.</span>
          <h3>{idea.trim() || "A new way to listen."}</h3>
          <p>
            We bring the editing, websites and AI solutions to make it something
            people can experience.
          </p>
          <PrototypeActions />
          <label className="hero-idea-field">
            Try your own idea
            <input
              value={idea}
              maxLength={54}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="A new way to listen."
            />
          </label>
        </div>
        <div className="hero-editorial-stage">
          <div
            className="hero-editorial-tabs"
            role="group"
            aria-label="Give the idea a form"
          >
            {(["create", "build", "ai"] as Discipline[]).map((item) => (
              <button
                key={item}
                aria-pressed={discipline === item}
                onClick={() => {
                  setDiscipline(item);
                  setStep(0);
                  setSiteOpen(false);
                }}
              >
                {item === "ai" ? "AI" : item.toUpperCase()}
              </button>
            ))}
          </div>
          <div
            key={`${discipline}-${replay}`}
            className={`hero-editorial-visual visual-${discipline}`}
          >
            {discipline === "create" ? (
              <div className="hero-editorial-film">
                <span>01 / AN EDITING DIRECTION</span>
                <strong>
                  LISTEN
                  <br />
                  <i>CLOSER.</i>
                </strong>
                <div className="hero-editorial-wave" aria-hidden="true">
                  {Array.from({ length: 24 }, (_, index) => (
                    <i
                      key={index}
                      style={{ height: `${20 + ((index * 31) % 78)}%` }}
                    />
                  ))}
                </div>
                <small>SPACE. RHYTHM. A REASON TO STAY.</small>
              </div>
            ) : discipline === "build" ? (
              <div className="hero-editorial-site">
                <div className="hero-editorial-site-nav">
                  <strong>listen club.</strong>
                  <span>FICTIONAL DIGITAL CONCEPT</span>
                </div>
                {siteOpen ? (
                  <div className="hero-editorial-site-detail">
                    <span>THE LISTENING ROOM</span>
                    <h4>
                      A quieter place
                      <br />
                      to discover.
                    </h4>
                    <p>
                      A sample project detail with a clear purpose, a focused
                      story and a direct next step.
                    </p>
                    <button onClick={() => setSiteOpen(false)}>
                      Return to the concept <ArrowRight size={15} />
                    </button>
                  </div>
                ) : (
                  <>
                    <h4>
                      A little less noise.
                      <br />A little more discovery.
                    </h4>
                    <div className="hero-record-art" aria-hidden="true">
                      <i />
                      <span>LC / 01</span>
                    </div>
                    <button onClick={() => setSiteOpen(true)}>
                      Open the project detail <ArrowUpRight size={15} />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="hero-editorial-flow">
                <span>A SAMPLE WEBSITE INQUIRY</span>
                <ol aria-label="Inquiry sequence">
                  {["Receive", "Understand", "Draft", "Human review"].map(
                    (label, index) => (
                      <li
                        key={label}
                        className={
                          index === step
                            ? "is-current"
                            : index < step
                              ? "is-complete"
                              : ""
                        }
                      >
                        <span>0{index + 1}</span>
                        <strong>{label}</strong>
                      </li>
                    ),
                  )}
                </ol>
                <p role="status">
                  {
                    [
                      "A sample request arrives. No connection to real messages.",
                      "A rule identifies a website request and routes it to planning.",
                      "A draft asks about pages, content and the project's purpose.",
                      "A person reviews the draft. Nothing is sent automatically.",
                    ][step]
                  }
                </p>
                <div>
                  <button
                    disabled={step === 3}
                    onClick={() => setStep((value) => Math.min(3, value + 1))}
                  >
                    {step === 3
                      ? "Ready for human review"
                      : "Follow the inquiry"}
                    <ArrowRight size={15} />
                  </button>
                  <button
                    aria-label="Reset editorial workflow"
                    onClick={() => setStep(0)}
                  >
                    <RotateCcw size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="hero-editorial-outcome">
            <div>
              <strong>{selected.verb}</strong>
              <span>{selected.line}</span>
            </div>
            <button
              aria-label="Replay editorial composition"
              onClick={() => setReplay((value) => value + 1)}
            >
              <RotateCcw size={17} />
            </button>
          </div>
          <p className="hero-editorial-note" role="status">
            {selected.outcome}
          </p>
        </div>
      </div>
      <StudioDisciplines />
    </article>
  );
}

export default function HeroLab() {
  const [active, setActive] = useState<Concept>("media");
  const selected = concepts.find((concept) => concept.id === active)!;
  return (
    <section className="hero-lab" aria-labelledby="hero-lab-title">
      <header className="hero-lab-intro">
        <div>
          <span className="hero-lab-index">
            EXPERIMENT 01 / THREE HYPOTHESES
          </span>
          <h2 id="hero-lab-title">What earns the first five seconds?</h2>
        </div>
        <p>
          Compare three original directions. The purpose is clear service
          communication; visual quality remains subject to desktop and mobile
          review.
        </p>
      </header>
      <div
        className="hero-concept-selector"
        role="group"
        aria-label="Choose a hero prototype"
      >
        {concepts.map((concept) => (
          <button
            key={concept.id}
            aria-pressed={active === concept.id}
            onClick={() => setActive(concept.id)}
          >
            <span>{concept.letter}</span>
            <strong>{concept.title}</strong>
            <ArrowUpRight size={17} />
          </button>
        ))}
      </div>
      {active === "media" ? (
        <MediaHero />
      ) : active === "spatial" ? (
        <SpatialHero />
      ) : (
        <EditorialHero />
      )}
      <aside
        className="hero-comparison-note"
        aria-label="Current concept hypothesis"
      >
        <div>
          <span>HYPOTHESIS / {selected.letter}</span>
          <p>{selected.hypothesis}</p>
        </div>
        <div>
          <span>WHAT MUST BE REVIEWED</span>
          <p>{selected.risk}</p>
        </div>
      </aside>
    </section>
  );
}
