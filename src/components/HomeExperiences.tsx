import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Film,
  Monitor,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Sparkles,
  Workflow,
} from "lucide-react";
import { businesses } from "../data";
import { useProject } from "../project";
import "../home-experiences.css";

const ServiceDemo = lazy(() => import("./ServiceDemo"));
const workshops = [
  {
    id: "V1",
    title: "Edit a Reel",
    note: "Take a moment from source to story.",
    icon: Film,
  },
  {
    id: "T1",
    title: "Build a Website",
    note: "Watch a simple structure become a digital home.",
    icon: Monitor,
  },
  {
    id: "T4",
    title: "Automate a Workflow",
    note: "Follow an inquiry from first message to human review.",
    icon: Workflow,
  },
] as const;
class WorkshopBoundary extends Component<
  { children: ReactNode; id: string },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="workshop-loading">
        <p role="alert">This preview could not load.</p>
        <Link
          className="button button-secondary"
          to={`/services/${this.props.id}`}
        >
          Open the service <ArrowRight size={16} />
        </Link>
      </div>
    ) : (
      this.props.children
    );
  }
}
export function LiveWorkshop() {
  const [active, setActive] = useState<string>("V1");
  const [enabled, setEnabled] = useState(false);
  const host = useRef<HTMLElement>(null);
  const selected = workshops.find((item) => item.id === active)!;
  useEffect(() => {
    if (!host.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      className="home-workshop section-wrap"
      ref={host}
      aria-labelledby="workshop-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">03 / THE LIVE WORKSHOP</span>
          <h2 id="workshop-title" data-motion="typography">
            Less explaining.
            <br />
            <span>More experiencing.</span>
          </h2>
        </div>
        <p>Pick a tool. Change something. See what happens.</p>
      </div>
      <div className="workshop-bench">
        <div
          className="workshop-selector"
          role="group"
          aria-label="Choose a workshop"
        >
          {workshops.map(({ id, title, icon: Icon }, i) => (
            <button
              key={id}
              aria-pressed={active === id}
              onClick={() => {
                setActive(id);
                setEnabled(true);
              }}
            >
              <span>0{i + 1}</span>
              <Icon size={19} />
              <strong>{title}</strong>
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <div
          className="workshop-preview"
          data-motion="mask"
          data-motion-key={active}
        >
          {enabled ? (
            <WorkshopBoundary key={active} id={active}>
              <Suspense
                fallback={
                  <div className="workshop-loading" role="status">
                    Preparing your interactive workshop…
                  </div>
                }
              >
                <ServiceDemo id={active} />
              </Suspense>
            </WorkshopBoundary>
          ) : (
            <div className="workshop-loading">
              <div className="workshop-outline" aria-hidden="true">
                <Film size={35} />
                <span>01 / SOURCE → STORY</span>
              </div>
              <button
                className="button button-secondary"
                onClick={() => setEnabled(true)}
              >
                Open interactive workshop <Play size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="workshop-footer">
        <p>{selected.note}</p>
        <Link className="text-link" to={`/services/${active}`}>
          Explore this service <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
const ingredients = [
  { id: "T1", name: "Website", Icon: Monitor },
  { id: "T3", name: "Booking System", Icon: CalendarDays },
  { id: "V3", name: "Promotional Video", Icon: Film },
  { id: "T4", name: "AI Assistant", Icon: Sparkles },
];
const businessScenes: Record<
  string,
  { name: string; title: string; description: string; service: string }
> = {
  Salon: {
    name: "FORME / STUDIO",
    title: "A little time. All for you.",
    description: "Considered hair. A calmer kind of care.",
    service: "Signature styling",
  },
  "Café / Restaurant": {
    name: "STILL / CAFÉ",
    title: "Good mornings begin here.",
    description: "A place to pause. Coffee to come back for.",
    service: "Table for two",
  },
  "Gym / Fitness": {
    name: "PACE / CLUB",
    title: "Find your pace. Keep moving.",
    description: "Every body. Every level. Your next step.",
    service: "Intro session",
  },
  "General Small Business": {
    name: "YOUR / BUSINESS",
    title: "Small details. New possibilities.",
    description: "Your ideas, brought into the everyday.",
    service: "Discovery call",
  },
};
export function LabIntro() {
  const { project, setProject, toggleService } = useProject();
  const [time, setTime] = useState("10:00");
  const [confirmed, setConfirmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const film = useRef<HTMLElement>(null);
  const [reply, setReply] = useState("");
  const business = businessScenes[project.business] || businessScenes.Salon;
  const businessStyle =
    project.business === "Café / Restaurant"
      ? "cafe"
      : project.business === "Gym / Fitness"
        ? "gym"
        : project.business === "Salon"
          ? "salon"
          : "general";
  useEffect(() => {
    if (!playing) return;
    const tick = window.setInterval(() => {
      setProgress((value) => Math.min(1, value + 1 / 56));
    }, 125);
    const pauseWhenHidden = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) setPlaying(false);
          })
        : null;
    if (film.current) observer?.observe(film.current);
    return () => {
      window.clearInterval(tick);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [playing]);
  useEffect(() => {
    if (progress >= 1) setPlaying(false);
  }, [progress]);
  const active = (id: string) => project.services.includes(id);
  function toggle(id: string) {
    toggleService(id);
    if (id === "T3") setConfirmed(false);
    if (id === "V3") {
      setPlaying(false);
      setProgress(0);
    }
    if (id === "T4") setReply("");
  }
  function reset() {
    setProject((p) => ({
      ...p,
      services: p.services.filter(
        (id) => !ingredients.some((item) => item.id === id),
      ),
      brief: "",
    }));
    setConfirmed(false);
    setPlaying(false);
    setProgress(0);
    setReply("");
  }
  return (
    <section
      className="home-projectlab section-wrap"
      aria-labelledby="home-lab-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">04 / THE LIVING PROJECT LAB</span>
          <h2 id="home-lab-title" data-motion="typography">
            Your idea.
            <br />
            <span>Coming together.</span>
          </h2>
        </div>
        <p>
          Choose your business, add what you need, and watch the pieces connect.
        </p>
      </div>
      <div className="home-lab-layout">
        <div className="home-lab-options">
          <label className="home-lab-label" htmlFor="home-lab-business">
            Start with your business
          </label>
          <select
            id="home-lab-business"
            value={project.business}
            onChange={(event) => {
              setProject((p) => ({
                ...p,
                business: event.target.value,
                brief: "",
              }));
              setConfirmed(false);
              setReply("");
            }}
          >
            {businesses.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
          <span className="home-lab-label">Add a possibility</span>
          <div className="home-lab-ingredients">
            {ingredients.map(({ id, name, Icon }, i) => (
              <button
                key={id}
                aria-pressed={active(id)}
                onClick={() => toggle(id)}
              >
                <span>0{i + 1}</span>
                <Icon size={19} />
                <strong>{name}</strong>
                {active(id) ? <Check size={17} /> : <Plus size={17} />}
              </button>
            ))}
          </div>
          <button className="home-lab-reset" onClick={reset}>
            <RotateCcw size={14} /> Reset these choices
          </button>
          <Link className="button button-primary" to="/project-lab">
            Create my project brief <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="home-lab-preview" data-motion="prism">
          <div className="home-lab-connections" aria-hidden="true">
            {ingredients.map(({ id, name, Icon }) => (
              <span key={id} data-connected={active(id)}>
                <Icon size={14} />
                <small>{name}</small>
              </span>
            ))}
          </div>
          <div className="home-lab-preview-label">
            <span>
              <i /> YOUR LIVE CONCEPT
            </span>
            <span>{project.business}</span>
          </div>
          <div className="home-business-scene" data-business={businessStyle}>
            <header>
              <strong>{business.name}</strong>
              <span>ILLUSTRATIVE BUSINESS</span>
            </header>
            {active("T1") ? (
              <div
                className="home-business-hero"
                data-motion="transform"
                data-motion-key={project.business}
              >
                <span>THOUGHTFULLY MADE FOR YOU</span>
                <h3>{business.title}</h3>
                <p>{business.description}</p>
                <div className="home-business-form" aria-hidden="true">
                  {businessStyle === "cafe" ? (
                    <img
                      src="/images/coffee.jpg"
                      alt=""
                      width="1200"
                      height="800"
                      loading="lazy"
                    />
                  ) : businessStyle === "gym" ? (
                    <strong>
                      MOVE
                      <br />
                      WITH
                      <br />
                      PURPOSE.
                    </strong>
                  ) : businessStyle === "salon" ? (
                    <svg viewBox="0 0 180 260">
                      <path
                        d="M35 235V85a55 55 0 0 1 110 0v150z"
                        fill="#b5a5c5"
                      />
                      <path
                        d="M47 222V87a43 43 0 0 1 86 0v135z"
                        fill="#e7ddea"
                      />
                      <path
                        d="M60 210 118 95M55 180l55-110"
                        stroke="#fff"
                        strokeWidth="2"
                        opacity=".6"
                      />
                      <path d="M20 238h140" stroke="#8b7595" strokeWidth="4" />
                      <path
                        d="M120 210c-15-35 10-70 25-80-5 40-5 70-25 80Z"
                        fill="#8b9e8b"
                      />
                    </svg>
                  ) : (
                    <div className="home-business-grid">
                      <span>
                        YOUR
                        <br />
                        NEXT
                        <br />
                        CHAPTER.
                      </span>
                      <i />
                      <i />
                      <i />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="home-business-empty">
                <Monitor size={32} />
                <h3>A home for your business.</h3>
                <p>Add a website to start shaping your digital space.</p>
                <button onClick={() => toggle("T1")}>
                  Add Website <Plus size={16} />
                </button>
              </div>
            )}
            <div className="home-business-modules">
              {active("T3") && (
                <section
                  className="home-business-booking"
                  data-motion="spatial"
                >
                  <span className="home-module-label">
                    <CalendarDays size={15} /> BOOKING · SIMULATED
                  </span>
                  <h4>{business.service}</h4>
                  <div role="group" aria-label="Sample booking times">
                    {["10:00", "12:30", "16:00"].map((slot) => (
                      <button
                        key={slot}
                        aria-pressed={time === slot}
                        onClick={() => {
                          setTime(slot);
                          setConfirmed(false);
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <button
                    className="home-module-action"
                    onClick={() => setConfirmed(true)}
                  >
                    {confirmed ? "Preview confirmed" : "Preview booking"}{" "}
                    <Check size={14} />
                  </button>
                  <p
                    role="status"
                    data-motion="media"
                    data-motion-key={`${confirmed}-${time}`}
                  >
                    {confirmed
                      ? `Sample booking at ${time}. No appointment made.`
                      : "Choose a time to try the flow."}
                  </p>
                </section>
              )}
              {active("V3") && (
                <section
                  className={`home-business-film ${playing ? "is-playing" : ""}`}
                  ref={film}
                  data-motion="mask"
                >
                  <img
                    src="/images/mountain.jpg"
                    alt="Mountain scenery in a sample promotional concept"
                    width="1400"
                    height="933"
                    loading="lazy"
                    style={{ transform: `scale(${1 + progress * 0.12})` }}
                  />
                  <span className="home-module-label">
                    PROMOTIONAL MOTION CONCEPT
                  </span>
                  <h4
                    data-motion="typography"
                    data-motion-key={
                      progress < 0.35
                        ? "moment"
                        : progress < 0.72
                          ? "perspective"
                          : "yours"
                    }
                  >
                    {progress < 0.35
                      ? "A moment worth making."
                      : progress < 0.72
                        ? "A new perspective."
                        : "Make it yours."}
                  </h4>
                  <small className="home-film-time">
                    {Math.floor(progress * 7)} / 7s · PHOTO-MOTION STUDY
                  </small>
                  <button
                    aria-label={
                      playing
                        ? "Pause promotional concept"
                        : "Play promotional concept"
                    }
                    onClick={() => {
                      if (progress >= 1) setProgress(0);
                      setPlaying(!playing);
                    }}
                  >
                    {playing ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <div className="home-film-line" aria-hidden="true">
                    <i style={{ width: `${progress * 100}%` }} />
                  </div>
                </section>
              )}
              {active("T4") && (
                <section className="home-business-chat" data-motion="spatial">
                  <span className="home-module-label">
                    <Sparkles size={15} /> ASSISTANT · SCRIPTED EXAMPLE
                  </span>
                  <p
                    aria-live="polite"
                    data-motion="media"
                    data-motion-key={reply || business.name}
                  >
                    {reply ||
                      `Welcome to ${business.name}. How can we help you explore?`}
                  </p>
                  <button
                    onClick={() =>
                      setReply(
                        `This example offers ${business.service.toLowerCase()}. A real assistant would use your approved business information.`,
                      )
                    }
                  >
                    What can I book? <ArrowRight size={14} />
                  </button>
                  <small>No AI service is connected.</small>
                </section>
              )}
            </div>
          </div>
          <div className="home-lab-preview-foot">
            <span>
              {ingredients.filter((item) => active(item.id)).length} of 4
              possibilities selected
            </span>
            <Link to="/project-lab">
              Open full Project Lab <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
