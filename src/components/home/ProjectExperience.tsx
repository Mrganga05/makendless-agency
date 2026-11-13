import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Copy,
  Film,
  Monitor,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { businesses } from "../../data";
import { generateBrief } from "../../brief";
import { useProject } from "../../project";
import "../../home-project.css";

const ingredients = [
  { id: "T1", name: "Website", detail: "A digital home", Icon: Monitor },
  {
    id: "T3",
    name: "Booking System",
    detail: "An easier next step",
    Icon: CalendarDays,
  },
  {
    id: "V3",
    name: "Promotional Video",
    detail: "A story in motion",
    Icon: Film,
  },
  {
    id: "T4",
    name: "AI Assistant",
    detail: "A useful first response",
    Icon: Sparkles,
  },
];
const scenes: Record<
  string,
  {
    kind: string;
    name: string;
    category: string;
    title: string;
    description: string;
    appointment: string;
    frames: string[];
  }
> = {
  Salon: {
    kind: "salon",
    name: "ORA",
    category: "HAIR & SELF-CARE",
    title: "A moment, just for you.",
    description: "A considered space for a little everyday renewal.",
    appointment: "Styling consultation",
    frames: ["MAKE TIME.", "FEEL LIKE YOU.", "YOUR NEXT CHAPTER."],
  },
  "Café / Restaurant": {
    kind: "cafe",
    name: "LUNE",
    category: "A NEIGHBOURHOOD TABLE",
    title: "Make room for good company.",
    description: "Thoughtful plates. Unhurried conversations.",
    appointment: "Table for two",
    frames: ["PULL UP A CHAIR.", "STAY A LITTLE.", "GOOD THINGS, SHARED."],
  },
  "Gym / Fitness": {
    kind: "gym",
    name: "KINETIC",
    category: "MOVEMENT FOR EVERY DAY",
    title: "Move at your own pace.",
    description: "A welcoming place to find your next small step.",
    appointment: "Introductory session",
    frames: ["START SOMEWHERE.", "FIND YOUR RHYTHM.", "KEEP SHOWING UP."],
  },
  "General Small Business": {
    kind: "general",
    name: "PARALLEL",
    category: "INDEPENDENT IDEAS, WELL MADE",
    title: "Small details. A clear direction.",
    description: "A thoughtful introduction to what your business does best.",
    appointment: "Discovery conversation",
    frames: ["A CLEAR IDEA.", "A LITTLE CHARACTER.", "MAKE IT YOURS."],
  },
};

function BusinessArt({ kind }: { kind: string }) {
  return (
    <div
      className={`hp-business-art hp-business-art--${kind}`}
      aria-hidden="true"
    >
      {kind === "salon" ? (
        <svg viewBox="0 0 220 250" fill="none">
          <path
            d="M40 221V98a70 70 0 0 1 140 0v123H40Z"
            className="hp-art-plane"
          />
          <path
            d="M55 220V99a55 55 0 0 1 110 0v121H55Z"
            className="hp-art-inset"
          />
          <path d="m74 166 62-94m-51 123 54-83" className="hp-art-line" />
          <path d="M27 222h166" className="hp-art-stroke" />
          <path d="M98 225h25v21H98z" className="hp-art-plane" />
        </svg>
      ) : kind === "cafe" ? (
        <svg viewBox="0 0 220 250" fill="none">
          <ellipse cx="110" cy="206" rx="83" ry="17" className="hp-art-plane" />
          <path
            d="M53 112h112v41a56 56 0 0 1-112 0v-41Z"
            className="hp-art-inset"
          />
          <path d="M165 123h12a23 23 0 1 1-12 46" className="hp-art-stroke" />
          <ellipse cx="109" cy="112" rx="56" ry="15" className="hp-art-plane" />
          <path
            d="M87 91c-26-19 13-31-4-50m30 50c-26-19 13-31-4-50m30 50c-26-19 13-31-4-50"
            className="hp-art-line"
          />
        </svg>
      ) : kind === "gym" ? (
        <>
          <span>
            MOVE
            <br />
            WITH
            <br />
            <em>PURPOSE.</em>
          </span>
          <i />
          <i />
          <i />
        </>
      ) : (
        <svg viewBox="0 0 220 250" fill="none">
          <path d="m36 175 72-42 76 43-75 43-73-44Z" className="hp-art-plane" />
          <path d="m36 139 72-42 76 43-75 43-73-44Z" className="hp-art-inset" />
          <path d="m36 103 72-42 76 43-75 43-73-44Z" className="hp-art-plane" />
          <path d="m36 103 73 44 75-43M109 147v72" className="hp-art-line" />
        </svg>
      )}
    </div>
  );
}

export function HomepageLab() {
  const { project, setProject, toggleService } = useProject();
  const selected = ingredients.filter(({ id }) =>
    project.services.includes(id),
  );
  const example = selected.length === 0;
  const visible = (id: string) =>
    project.services.includes(id) || (example && ["T1", "T3"].includes(id));
  const scene = scenes[project.business] || scenes["General Small Business"];
  const [slot, setSlot] = useState("10:00");
  const [booked, setBooked] = useState(false);
  const [reply, setReply] = useState("");
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [briefOpen, setBriefOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const film = useRef<HTMLElement>(null);
  const briefField = useRef<HTMLTextAreaElement>(null);
  const frame = Math.min(2, Math.floor(elapsed / 2));

  useEffect(() => {
    if (!playing) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pause = () => setPlaying(false);
    const hidden = () => {
      if (document.hidden) pause();
    };
    const motionChanged = () => {
      if (preference.matches) pause();
    };
    const timer = window.setInterval(
      () => setElapsed((value) => Math.min(6, value + 0.125)),
      125,
    );
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) pause();
          })
        : null;
    if (film.current) observer?.observe(film.current);
    document.addEventListener("visibilitychange", hidden);
    preference.addEventListener("change", motionChanged);
    return () => {
      window.clearInterval(timer);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", hidden);
      preference.removeEventListener("change", motionChanged);
    };
  }, [playing]);
  useEffect(() => {
    if (elapsed >= 6) setPlaying(false);
  }, [elapsed]);

  useEffect(() => {
    if (briefOpen) briefField.current?.focus();
  }, [briefOpen]);

  function resetPreview() {
    setBooked(false);
    setReply("");
    setPlaying(false);
    setElapsed(0);
    setCopyStatus("");
  }
  function toggle(id: string) {
    toggleService(id);
    resetPreview();
    setBriefOpen(false);
  }
  function resetChoices() {
    setProject((p) => ({
      ...p,
      services: p.services.filter(
        (id) => !ingredients.some((item) => item.id === id),
      ),
      brief: "",
    }));
    resetPreview();
    setBriefOpen(false);
  }
  function useExample() {
    setProject((p) => ({
      ...p,
      services: [...new Set([...p.services, "T1", "T3"])],
      brief: "",
    }));
    resetPreview();
    setBriefOpen(false);
  }
  function createBrief() {
    setProject((p) => ({ ...p, brief: generateBrief(p) }));
    setBriefOpen(true);
    setCopyStatus("");
  }
  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(project.brief);
      setCopyStatus("Brief copied. It has not been sent.");
    } catch {
      setCopyStatus(
        "Copy is unavailable here. Select the brief below and copy it manually.",
      );
      briefField.current?.focus();
      briefField.current?.select();
    }
  }
  function play() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setElapsed(((frame + 1) % 3) * 2);
      return;
    }
    if (elapsed >= 6) setElapsed(0);
    setPlaying((value) => !value);
  }

  return (
    <section
      className="hp-lab"
      data-surface="dark"
      id="project-lab"
      aria-labelledby="hp-lab-title"
    >
      <div className="hp-lab-shell">
        <header className="hp-lab-heading">
          <div>
            <span className="hp-kicker">07 / THE LIVING PROJECT LAB</span>
            <h2 id="hp-lab-title" data-motion="typography">
              What could <em>your</em>
              <br />
              next chapter look like?
            </h2>
          </div>
          <p>
            Start with an example. Add what matters.
            <br />
            Leave with a brief that is yours.
          </p>
        </header>
        <div className="hp-lab-workspace">
          <aside className="hp-lab-choices" aria-label="Customize your project">
            <label htmlFor="hp-lab-business">Choose your business</label>
            <select
              id="hp-lab-business"
              value={project.business}
              onChange={(event) => {
                setProject((p) => ({
                  ...p,
                  business: event.target.value,
                  brief: "",
                }));
                resetPreview();
                setBriefOpen(false);
              }}
            >
              {businesses.map((business) => (
                <option key={business} value={business}>
                  {business === "General Small Business"
                    ? "General Business"
                    : business}
                </option>
              ))}
              {!businesses.includes(project.business) && (
                <option value={project.business}>{project.business}</option>
              )}
            </select>
            <span className="hp-lab-choice-label">
              What would you like to make?
            </span>
            <div className="hp-lab-ingredients">
              {ingredients.map(({ id, name, detail, Icon }) => (
                <button
                  key={id}
                  aria-pressed={project.services.includes(id)}
                  onClick={() => toggle(id)}
                >
                  <Icon size={19} />
                  <span>
                    <strong>{name}</strong>
                    <small>{detail}</small>
                  </span>
                  {project.services.includes(id) ? (
                    <Check size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </button>
              ))}
            </div>
            <p className="hp-lab-selection" role="status">
              {selected.length
                ? `${selected.length} ${selected.length === 1 ? "capability" : "capabilities"} selected for your project.`
                : "No Lab services selected. The preview is an example."}
            </p>
            <button className="hp-lab-reset" onClick={resetChoices}>
              <RotateCcw size={14} /> Reset Lab choices
            </button>
            <button
              className="hp-lab-primary"
              onClick={createBrief}
              aria-expanded={briefOpen}
              aria-controls="hp-generated-brief"
            >
              Generate my brief <ArrowRight size={17} />
            </button>
            <Link className="hp-lab-explore" to="/project-lab">
              Explore the full Project Lab <ArrowUpRight size={15} />
            </Link>
          </aside>
          <div className="hp-lab-stage" data-business={scene.kind}>
            <div className="hp-lab-stage-caption">
              <span>
                <i />
                {example ? "EXAMPLE PROJECT" : "YOUR PROJECT CONCEPT"}
              </span>
              <span>ILLUSTRATIVE · NO LIVE BOOKINGS</span>
            </div>
            <div
              className="hp-lab-business"
              data-motion="transform"
              data-motion-key={project.business}
            >
              <div className="hp-lab-business-nav">
                <strong>
                  {scene.name}
                  <span>CONCEPT</span>
                </strong>
                <small>{scene.category}</small>
              </div>
              {visible("T1") ? (
                <div className="hp-lab-website" data-motion="transform">
                  <div>
                    <span>A FICTIONAL BUSINESS CONCEPT</span>
                    <h3>{scene.title}</h3>
                    <p>{scene.description}</p>
                    <button
                      onClick={() => {
                        if (!visible("T3")) toggle("T3");
                        else
                          document.getElementById("hp-booking-demo")?.focus();
                      }}
                    >
                      {visible("T3") ? "Explore a visit" : "Add Booking System"}{" "}
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <BusinessArt kind={scene.kind} />
                </div>
              ) : (
                <div className="hp-lab-business-intro">
                  <p>{scene.title}</p>
                  <span>Your selected capabilities, brought together.</span>
                </div>
              )}
              <div className="hp-lab-modules">
                {visible("T3") && (
                  <section
                    className="hp-lab-booking"
                    id="hp-booking-demo"
                    tabIndex={-1}
                    data-motion="spatial"
                    aria-label="Mock booking preview"
                  >
                    <span className="hp-module-kicker">
                      <CalendarDays size={15} /> BOOKING / SIMULATED
                    </span>
                    <h4>{scene.appointment}</h4>
                    <div
                      className="hp-lab-times"
                      role="group"
                      aria-label="Example appointment times"
                    >
                      {["10:00", "12:30", "16:00"].map((time) => (
                        <button
                          key={time}
                          aria-pressed={slot === time}
                          onClick={() => {
                            setSlot(time);
                            setBooked(false);
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <button
                      className="hp-module-link"
                      onClick={() => setBooked(true)}
                    >
                      {booked ? "Preview confirmed" : "Preview booking"}
                      <ArrowRight size={14} />
                    </button>
                    <p role="status">
                      {booked
                        ? `Example appointment at ${slot}. Nothing has been booked.`
                        : "Choose a time to explore the flow."}
                    </p>
                  </section>
                )}
                {visible("V3") && (
                  <section
                    className="hp-lab-film"
                    ref={film}
                    data-motion="mask"
                    aria-label="Promotional motion concept"
                  >
                    <span className="hp-module-kicker">
                      PROMOTIONAL VIDEO / ORIGINAL MOTION STUDY
                    </span>
                    <div className="hp-lab-film-art" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                    <h4
                      data-motion="typography"
                      data-motion-key={`${scene.kind}-${frame}`}
                    >
                      {scene.frames[frame]}
                    </h4>
                    <div className="hp-film-controls">
                      <button
                        onClick={play}
                        aria-label={
                          playing
                            ? "Pause promotional preview"
                            : "Play promotional preview"
                        }
                      >
                        {playing ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <span>{Math.floor(elapsed)} / 6s</span>
                      <span>NO AUDIO</span>
                    </div>
                    <div className="hp-film-progress" aria-hidden="true">
                      <i style={{ width: `${(elapsed / 6) * 100}%` }} />
                    </div>
                  </section>
                )}
                {visible("T4") && (
                  <section
                    className="hp-lab-assistant"
                    data-motion="spatial"
                    aria-label="Scripted assistant preview"
                  >
                    <span className="hp-module-kicker">
                      <Sparkles size={15} /> ASSISTANT / SCRIPTED EXAMPLE
                    </span>
                    <div
                      className="hp-assistant-reply"
                      aria-live="polite"
                      data-motion="media"
                      data-motion-key={reply || scene.name}
                    >
                      {reply ||
                        `Hello from ${scene.name}. What would you like to know?`}
                    </div>
                    <div className="hp-assistant-prompts">
                      <button
                        onClick={() =>
                          setReply(
                            `This ${project.business.toLowerCase()} concept offers a ${scene.appointment.toLowerCase()}. A real integration would check availability before confirming anything.`,
                          )
                        }
                      >
                        What can I arrange?
                      </button>
                      <button
                        onClick={() =>
                          setReply(
                            "A real assistant could pass your question to the team for human review. This scripted example does not send messages.",
                          )
                        }
                      >
                        Ask the team
                      </button>
                    </div>
                  </section>
                )}
              </div>
            </div>
            <div className="hp-lab-example-note">
              {example ? (
                <>
                  <p>
                    <strong>An example, not a selection.</strong> Try it freely,
                    or add the website and booking capabilities to your project.
                  </p>
                  <button onClick={useExample}>
                    Use this example <Plus size={15} />
                  </button>
                </>
              ) : (
                <p>
                  These are concept previews. Scope, integrations and costs are
                  discussed before a project begins.
                </p>
              )}
            </div>
          </div>
        </div>
        {briefOpen && (
          <section
            className="hp-lab-brief"
            id="hp-generated-brief"
            aria-labelledby="hp-brief-title"
            data-motion="editorial"
          >
            <div>
              <span className="hp-kicker">YOUR IDEA, IN WORDS</span>
              <h3 id="hp-brief-title">
                A starting point for
                <br />
                the conversation.
              </h3>
              <p>
                Review and edit this draft. It includes your actual selections,
                never the unselected example.
              </p>
              <p>No quote, booking or message is created here.</p>
            </div>
            <div>
              <label htmlFor="hp-project-brief">
                Your editable project brief
              </label>
              <textarea
                ref={briefField}
                id="hp-project-brief"
                rows={9}
                value={project.brief}
                onChange={(event) => {
                  setProject((p) => ({ ...p, brief: event.target.value }));
                  setCopyStatus("");
                }}
              />
              <div className="hp-brief-actions">
                <button onClick={copyBrief} disabled={!project.brief.trim()}>
                  <Copy size={15} /> Copy brief
                </button>
                <Link to="/contact" className="hp-lab-primary">
                  Continue to inquiry <ArrowUpRight size={16} />
                </Link>
              </div>
              <p role="status">{copyStatus}</p>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

const process = [
  {
    name: "DISCOVER",
    title: "Begin with the idea.",
    text: "Tell us what you need, who it is for and what a useful outcome looks like.",
  },
  {
    name: "DESIGN",
    title: "Agree on a direction.",
    text: "Define the scope, creative approach, deliverables and estimate before production.",
  },
  {
    name: "CREATE",
    title: "Make it, together.",
    text: "Develop the work, share progress and use your feedback to refine the details.",
  },
  {
    name: "DELIVER",
    title: "Ready for your next step.",
    text: "Review the agreed deliverables and prepare the files, website or workflow for handover.",
  },
];
const faqs = [
  {
    question: "How does a project begin?",
    answer:
      "Start with an inquiry describing your idea. The next conversation can clarify your goals, the work involved and whether the studio is the right fit. This website currently prepares a local inquiry draft; it does not send it automatically.",
  },
  {
    question: "What should I prepare?",
    answer:
      "A short description of your goal, examples you like, your preferred timing and any existing brand assets are useful. For editing, include details about your source footage; for a website, think about the content and features you need. You do not need a finished brief to begin.",
  },
  {
    question: "How is project pricing determined?",
    answer:
      "An estimate depends on the deliverables, complexity, source material, integrations and timeline. No fixed prices are published here. Request a tailored estimate so the scope, inclusions and any external costs can be made clear.",
  },
  {
    question: "How do revisions work?",
    answer:
      "The number of review rounds and how changes are handled should be agreed in the project scope before work begins. There is no blanket revision allowance or unlimited-revisions promise on this site.",
  },
  {
    question: "How are files or websites handed over?",
    answer:
      "Handover is planned around the agreed deliverables: for example, edited exports, a website and its access details, or documentation for a workflow. Final formats, hosting responsibilities and any training should be confirmed in the project scope.",
  },
  {
    question: "Is ongoing maintenance available?",
    answer:
      "Website Maintenance & Optimization is an available service category. Updates, support requirements and the appropriate maintenance scope can be discussed for your website; no ongoing plan is added automatically.",
  },
];
export function ProcessFaq() {
  return (
    <section
      className="hp-process"
      data-surface="light"
      aria-labelledby="hp-process-title"
    >
      <div className="hp-process-shell">
        <header>
          <span className="hp-kicker">08 / A CLEAR WAY FORWARD</span>
          <h2 id="hp-process-title" data-motion="typography">
            Good work starts
            <br />
            with a good conversation.
          </h2>
          <p>
            Four steps. A shared direction.
            <br />
            Room for your questions along the way.
          </p>
        </header>
        <ol className="hp-process-steps">
          {process.map((step, index) => (
            <li key={step.name}>
              <div>
                <span>0{index + 1}</span>
                <strong>{step.name}</strong>
                {index < 3 && <ArrowRight size={18} aria-hidden="true" />}
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="hp-faq-layout">
          <div>
            <span className="hp-kicker">BEFORE WE BEGIN</span>
            <h3>
              A few things
              <br />
              you might be wondering.
            </h3>
            <Link to="/faq">
              More questions, answered <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="hp-faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary>
                  <span>0{index + 1}</span>
                  {faq.question}
                  <Plus size={18} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
