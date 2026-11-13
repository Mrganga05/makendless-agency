import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Check,
  RotateCcw,
  Monitor,
  CalendarDays,
  Play,
  Pause,
  Sparkles,
  Copy,
  X,
  MessageCircle,
  WandSparkles,
} from "lucide-react";
import { businesses, services } from "../data";
import { useProject } from "../project";
import { generateBrief, getPairings } from "../brief";
import "../flows.css";

const solutions = [
  {
    id: "T1",
    name: "Website",
    description: "Your own digital home",
    Icon: Monitor,
  },
  {
    id: "T3",
    name: "Booking system",
    description: "Make time for what matters",
    Icon: CalendarDays,
  },
  {
    id: "V3",
    name: "Promotional video",
    description: "Give your story motion",
    Icon: Play,
  },
  {
    id: "T4",
    name: "AI assistant",
    description: "A little help, around the clock",
    Icon: Sparkles,
  },
];
const previewCopy: Record<
  string,
  {
    name: string;
    headline: string;
    line: string;
    service: string;
    monogram: string;
  }
> = {
  Salon: {
    name: "FORME STUDIO",
    headline: "A little time.\nAll for you.",
    line: "Considered hair. A quieter kind of care.",
    service: "Signature styling",
    monogram: "f",
  },
  "Café / Restaurant": {
    name: "STILL CAFÉ",
    headline: "Good things.\nSlow mornings.",
    line: "Seasonal plates, thoughtful coffee, a place to pause.",
    service: "Table for two",
    monogram: "s",
  },
  "Gym / Fitness": {
    name: "PACE CLUB",
    headline: "Find your pace.\nBuild your strength.",
    line: "Movement for every body, every day.",
    service: "Intro session",
    monogram: "p",
  },
  "General Small Business": {
    name: "EVERYDAY STUDIO",
    headline: "Small details.\nNew possibilities.",
    line: "Thoughtful solutions for the way you work.",
    service: "Discovery call",
    monogram: "e",
  },
};
export default function ProjectLab() {
  const { project, setProject, toggleService, reset } = useProject();
  const [copied, setCopied] = useState("");
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);
  const [slot, setSlot] = useState("10:00 AM");
  const [booked, setBooked] = useState(false);
  const [chat, setChat] = useState(
    "Hello! Explore a sample customer conversation.",
  );
  const [briefOpen, setBriefOpen] = useState(false);
  const info = previewCopy[project.business] || previewCopy.Salon;
  const selected = services.filter((service) =>
    project.services.includes(service.id),
  );
  const active = (id: string) => project.services.includes(id);
  const pairings = getPairings(project.services).filter(
    (pair) => !dismissed.includes(pair.id),
  );
  const update = (
    key: "goal" | "timeline" | "budget" | "notes",
    value: string,
  ) => setProject((p) => ({ ...p, [key]: value, brief: "" }));
  const makeBrief = () => {
    setProject((p) => ({ ...p, brief: generateBrief(p) }));
    setBriefOpen(true);
    setCopied("");
  };
  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(project.brief);
      setCopied("Copied to clipboard.");
    } catch {
      setCopied(
        "Clipboard unavailable. Select and copy the editable brief below.",
      );
    }
  }
  function resetLab() {
    reset();
    setDismissed([]);
    setPlaying(false);
    setBooked(false);
    setSlot("10:00 AM");
    setChat("Hello! Explore a sample customer conversation.");
    setBriefOpen(false);
    setCopied("");
  }
  return (
    <div className="page-shell lab-page">
      <header className="page-heading flow-heading">
        <p className="eyebrow">
          <span className="live-dot" /> YOUR PROJECT PLANNER
        </p>
        <h1>
          Build your brief.
          <br />
          <span className="flow-accent">See the possibilities.</span>
        </h1>
        <p>Choose a business. Add a possibility. Watch it become something.</p>
      </header>
      <div className="lab-layout">
        <aside className="lab-controls">
          <div className="lab-step">
            <span>01</span>
            <h2>Make it yours</h2>
          </div>
          <label className="flow-label" htmlFor="business-type">
            Your business
          </label>
          <select
            id="business-type"
            value={project.business}
            onChange={(e) => {
              setProject((p) => ({
                ...p,
                business: e.target.value,
                brief: "",
              }));
              setBooked(false);
            }}
          >
            {businesses.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <div className="lab-step">
            <span>02</span>
            <h2>Add a possibility</h2>
          </div>
          <div className="solution-options">
            {solutions.map(({ id, name, description, Icon }) => (
              <button
                key={id}
                type="button"
                className={`solution-option ${active(id) ? "is-selected" : ""}`}
                aria-pressed={active(id)}
                onClick={() => {
                  toggleService(id);
                  setBriefOpen(false);
                }}
              >
                <Icon size={21} />
                <span>
                  <strong>{name}</strong>
                  <small>{description}</small>
                </span>
                {active(id) ? <Check size={18} /> : <Plus size={18} />}
              </button>
            ))}
          </div>
          <button className="lab-reset" onClick={resetLab}>
            <RotateCcw size={14} /> Reset your canvas
          </button>
          <p className="lab-tip">
            <WandSparkles size={17} /> Every combination is a starting point.
            We’ll shape the details together.
          </p>
        </aside>
        <section className="lab-canvas" aria-label="Live project preview">
          <div className="canvas-caption">
            <span>
              <span className="live-dot" /> YOUR LIVE PREVIEW
            </span>
            <span>Illustrative concept</span>
          </div>
          <div
            className={`business-preview preview-${project.business.split(" ")[0].toLowerCase()}`}
          >
            <div className="mock-browser">
              <span className="mock-dots">
                <i />
                <i />
                <i />
              </span>
              <span>{info.name.toLowerCase().replaceAll(" ", "")}.example</span>
              <Monitor size={13} />
            </div>
            {active("T1") ? (
              <div className="mock-website">
                <div className="mock-site-nav">
                  <b>{info.name}</b>
                  <span>Thoughtfully made.</span>
                </div>
                <div className="mock-site-hero">
                  <div>
                    <span className="mock-eyebrow">YOUR NEXT CHAPTER</span>
                    <h3>
                      {info.headline.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </h3>
                    <p>{info.line}</p>
                    <button
                      type="button"
                      className="mock-button"
                      onClick={() => {
                        if (active("T3"))
                          document
                            .getElementById("lab-booking")
                            ?.scrollIntoView({
                              behavior: window.matchMedia?.(
                                "(prefers-reduced-motion: reduce)",
                              ).matches
                                ? "auto"
                                : "smooth",
                              block: "center",
                            });
                        else toggleService("T3");
                      }}
                    >
                      {active("T3")
                        ? "Find your moment"
                        : "Add booking to preview"}{" "}
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <div className="mock-sculpture" aria-hidden="true">
                    <span>{info.monogram}</span>
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            ) : (
              <div className="canvas-empty">
                <div className="empty-orbit">
                  <Monitor size={35} />
                </div>
                <h3>A space for your next idea.</h3>
                <p>Add a website to see your business take shape.</p>
                <button
                  className="button button-secondary"
                  onClick={() => toggleService("T1")}
                >
                  <Plus size={16} /> Add a website
                </button>
              </div>
            )}
            {(active("T3") || active("V3") || active("T4")) && (
              <div className="preview-modules">
                {active("T3") && (
                  <section className="preview-booking" id="lab-booking">
                    <span className="module-label">
                      <CalendarDays size={15} /> BOOKING · SIMULATED
                    </span>
                    <h4>{info.service}</h4>
                    <p>Choose a sample time</p>
                    <div className="mock-slots">
                      {["10:00 AM", "1:30 PM", "4:00 PM"].map((time) => (
                        <button
                          key={time}
                          aria-pressed={slot === time}
                          className={slot === time ? "selected" : ""}
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
                      className="mock-button"
                      onClick={() => setBooked(true)}
                    >
                      Preview booking <ArrowRight size={13} />
                    </button>
                    <p className="mock-status" role="status">
                      {booked
                        ? `Sample confirmation: ${slot}. No real booking made.`
                        : "Try the booking experience."}
                    </p>
                  </section>
                )}
                {active("V3") && (
                  <section
                    className={`preview-film ${playing ? "is-playing" : ""}`}
                  >
                    <span className="module-label">
                      PROMOTIONAL FILM · ILLUSTRATION
                    </span>
                    <div className="film-type">
                      A moment
                      <br />
                      to remember.
                    </div>
                    <button
                      className="film-play"
                      aria-label={
                        playing
                          ? "Pause illustrative animation"
                          : "Play illustrative animation"
                      }
                      onClick={() => setPlaying(!playing)}
                    >
                      {playing ? <Pause size={21} /> : <Play size={21} />}
                    </button>
                    <div className="film-progress">
                      <i />
                    </div>
                    <span className="film-foot">
                      {playing
                        ? "Playing motion concept"
                        : "Explore your story in motion"}
                    </span>
                  </section>
                )}
                {active("T4") && (
                  <section className="preview-chat">
                    <span className="module-label">
                      <MessageCircle size={15} /> AI ASSISTANT · SIMULATED
                    </span>
                    <p className="mock-chat-bubble" aria-live="polite">
                      {chat}
                    </p>
                    <div className="chat-questions">
                      <button
                        onClick={() =>
                          setChat(
                            `In this example, ${info.name} is open 9 AM–6 PM. Actual business details would be configured with you.`,
                          )
                        }
                      >
                        Opening hours?
                      </button>
                      <button
                        onClick={() =>
                          setChat(
                            `I can help with ${info.service.toLowerCase()}. A real assistant would connect to your approved booking system.`,
                          )
                        }
                      >
                        Can I book?
                      </button>
                    </div>
                    <small>Scripted example. No AI service connected.</small>
                  </section>
                )}
              </div>
            )}
          </div>
          <div className="canvas-footer">
            <span>
              {selected.length}{" "}
              {selected.length === 1 ? "solution" : "solutions"} selected
            </span>
            <span>
              Built around your possibilities <Sparkles size={13} />
            </span>
          </div>
        </section>
      </div>
      <section className="lab-brief-section">
        <div>
          <p className="eyebrow">03 / MAKE IT A PLAN</p>
          <h2>
            A little context.
            <br />A clearer direction.
          </h2>
          <p className="muted">
            Tell us what you’re imagining. Your brief stays editable.
          </p>
          <div className="selected-services" aria-label="Selected services">
            {selected.length ? (
              selected.map((service) => (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  aria-label={`Remove ${service.name}`}
                >
                  {service.short}
                  {service.world === "grow" ? " · Beta" : ""}
                  <X size={13} />
                </button>
              ))
            ) : (
              <span className="muted">Choose your first solution above.</span>
            )}
          </div>
          {pairings.length > 0 && (
            <div className="smart-pairings">
              <h3>Better together, if it suits you.</h3>
              {pairings.slice(0, 2).map((pair) => (
                <div className="pairing-row" key={pair.id}>
                  <div>
                    <strong>
                      {services.find((s) => s.id === pair.id)?.short}
                    </strong>
                    <p>{pair.reason}</p>
                  </div>
                  <button
                    className="pairing-add"
                    onClick={() => toggleService(pair.id)}
                    aria-label={`Add ${services.find((s) => s.id === pair.id)?.name}`}
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    className="pairing-dismiss"
                    onClick={() => setDismissed((d) => [...d, pair.id])}
                    aria-label={`Dismiss ${services.find((s) => s.id === pair.id)?.name} recommendation`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="brief-fields">
          <label className="field">
            Main project goal
            <input
              placeholder="What would you love to make happen?"
              value={project.goal}
              onChange={(e) => update("goal", e.target.value)}
            />
          </label>
          <div className="flow-field-row">
            <label className="field">
              Preferred timeline
              <select
                value={project.timeline}
                onChange={(e) => update("timeline", e.target.value)}
              >
                <option value="">Let’s discuss</option>
                <option>Within a month</option>
                <option>1–3 months</option>
                <option>3+ months</option>
                <option>Just exploring</option>
              </select>
            </label>
            <label className="field">
              Budget range (optional)
              <input
                placeholder="e.g. ₹50,000–₹1 lakh"
                value={project.budget}
                onChange={(e) => update("budget", e.target.value)}
              />
            </label>
          </div>
          <label className="field">
            Anything else? (optional)
            <textarea
              rows={3}
              placeholder="Your idea, a reference, or a question…"
              value={project.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </label>
          <button className="button button-primary" onClick={makeBrief}>
            Generate my project brief <ArrowUpRight size={18} />
          </button>
        </div>
      </section>
      {briefOpen && (
        <section className="generated-brief">
          <div>
            <p className="eyebrow">YOUR PROJECT, IN WORDS</p>
            <h2>A good place to begin.</h2>
            <p className="muted">
              Refine the text, save a copy, or bring it to your inquiry.
            </p>
          </div>
          <label className="field">
            Editable project brief
            <textarea
              rows={11}
              value={project.brief}
              onChange={(e) =>
                setProject((p) => ({ ...p, brief: e.target.value }))
              }
            />
          </label>
          <div className="flow-actions">
            <button className="button button-secondary" onClick={copyBrief}>
              <Copy size={16} /> Copy brief
            </button>
            <Link className="button button-primary" to="/contact">
              Continue to Start a Project <ArrowUpRight size={17} />
            </Link>
          </div>
          <p className="copy-status" role="status">
            {copied}
          </p>
        </section>
      )}
    </div>
  );
}
