import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
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
  X,
} from "lucide-react";
import { businesses, services } from "../../data";
import { generateBrief } from "../../brief";
import { useProject } from "../../project";
import "../../v14-project.css";

const solutions = [
  { id: "T1", name: "Website", detail: "Your own digital home", Icon: Monitor },
  {
    id: "T3",
    name: "Booking system",
    detail: "Make time for what matters",
    Icon: CalendarDays,
  },
  {
    id: "V3",
    name: "Promotional video",
    detail: "Give your story motion",
    Icon: Film,
  },
  {
    id: "T4",
    name: "AI assistant",
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
    line: string;
    appointment: string;
    frames: string[];
  }
> = {
  Salon: {
    kind: "salon",
    name: "FORME STUDIO",
    category: "HAIR & SELF-CARE",
    title: "A little time.\nAll for you.",
    line: "Considered hair. A quieter kind of care.",
    appointment: "Signature styling",
    frames: ["MAKE TIME.", "FEEL LIKE YOU.", "YOUR NEXT CHAPTER."],
  },
  "Café / Restaurant": {
    kind: "cafe",
    name: "STILL CAFÉ",
    category: "COFFEE & COMPANY",
    title: "Good things.\nSlow mornings.",
    line: "Seasonal plates. Thoughtful coffee. A place to pause.",
    appointment: "Table for two",
    frames: ["PULL UP A CHAIR.", "STAY A LITTLE.", "GOOD THINGS, SHARED."],
  },
  "Gym / Fitness": {
    kind: "gym",
    name: "PACE CLUB",
    category: "MOVEMENT FOR EVERY DAY",
    title: "Find your pace.\nBuild your strength.",
    line: "Movement for every body, every day.",
    appointment: "Intro session",
    frames: ["START SOMEWHERE.", "FIND YOUR PACE.", "KEEP SHOWING UP."],
  },
  "General Small Business": {
    kind: "general",
    name: "PARALLEL STUDIO",
    category: "INDEPENDENT IDEAS, WELL MADE",
    title: "Small details.\nNew possibilities.",
    line: "A thoughtful introduction to what your business does best.",
    appointment: "Discovery conversation",
    frames: ["A CLEAR IDEA.", "A LITTLE CHARACTER.", "MAKE IT YOURS."],
  },
};
function ConceptArt({ kind }: { kind: string }) {
  return (
    <div
      className={`v14-project-art v14-project-art--${kind}`}
      aria-hidden="true"
    >
      {kind === "cafe" ? (
        <>
          <img
            src="/images/coffee.jpg"
            width="600"
            height="400"
            loading="lazy"
            alt=""
          />
          <span className="v14-project-art-stamp">
            A LITTLE
            <br />
            DAILY RITUAL.
          </span>
        </>
      ) : kind === "salon" ? (
        <>
          <svg viewBox="0 0 360 420" fill="none">
            <path
              d="M66 361V156a114 114 0 0 1 228 0v205Z"
              className="v14-art-outer"
            />
            <path
              d="M82 347V156a98 98 0 0 1 196 0v191Z"
              className="v14-art-inner"
            />
            <path
              d="m109 272 101-148m-68 188 105-152"
              className="v14-art-shine"
            />
            <path d="M46 364h267" className="v14-art-line" />
            <ellipse
              cx="180"
              cy="392"
              rx="112"
              ry="7"
              className="v14-art-shadow"
            />
          </svg>
          <span className="v14-project-art-monogram">f.</span>
        </>
      ) : kind === "gym" ? (
        <>
          <div className="v14-project-track">
            <i />
            <i />
            <i />
            <i />
          </div>
          <strong>
            MOVE.
            <br />
            <em>FEEL.</em>
            <br />
            REPEAT.
          </strong>
        </>
      ) : (
        <>
          <svg viewBox="0 0 360 420" fill="none">
            <path d="m53 275 124-72 130 75-127 72Z" className="v14-art-outer" />
            <path d="m53 209 124-72 130 75-127 72Z" className="v14-art-inner" />
            <path d="m53 143 124-72 130 75-127 72Z" className="v14-art-outer" />
            <path
              d="m53 143 127 75 127-72M180 218v132"
              className="v14-art-line"
            />
          </svg>
          <span className="v14-project-art-stamp">
            A CLEAR
            <br />
            POINT OF VIEW.
          </span>
        </>
      )}
    </div>
  );
}

export default function ProjectLabExperience({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const { project, setProject, toggleService } = useProject();
  const uid = useId();
  const scene = scenes[project.business] || scenes["General Small Business"];
  const selected = services.filter((item) =>
    project.services.includes(item.id),
  );
  const selectedLab = solutions.filter((item) =>
    project.services.includes(item.id),
  );
  const example = selectedLab.length === 0;
  const visible = (id: string) =>
    project.services.includes(id) || (example && ["T1", "T3"].includes(id));
  const [date, setDate] = useState("2030-06-18");
  const [slot, setSlot] = useState("10:00 AM");
  const [booked, setBooked] = useState(false);
  const [reply, setReply] = useState("");
  const [question, setQuestion] = useState("");
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [briefOpen, setBriefOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [explored, setExplored] = useState(false);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const film = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const booking = useRef<HTMLElement>(null);
  const briefField = useRef<HTMLTextAreaElement>(null);
  const frame = Math.min(2, Math.floor(elapsed / 2));
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    const pause = () => setPlaying(false);
    const hidden = () => {
      if (document.hidden) pause();
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
    return () => {
      window.clearInterval(timer);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", hidden);
    };
  }, [playing, reduced]);
  useEffect(() => {
    if (elapsed >= 6) setPlaying(false);
  }, [elapsed]);
  useEffect(() => {
    if (briefOpen) briefField.current?.focus();
  }, [briefOpen]);
  function resetPreview() {
    setBooked(false);
    setReply("");
    setQuestion("");
    setPlaying(false);
    setElapsed(0);
    setCopyStatus("");
    setExplored(false);
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
        (id) => !solutions.some((item) => item.id === id),
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
  function generate() {
    setProject((p) => ({ ...p, brief: generateBrief(p) }));
    setBriefOpen(true);
    setCopyStatus("");
  }
  async function copy() {
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
  function update(
    key: "goal" | "timeline" | "budget" | "notes",
    value: string,
  ) {
    setProject((p) => ({ ...p, [key]: value, brief: "" }));
    setBriefOpen(false);
    setCopyStatus("");
  }
  function play() {
    if (reduced) {
      setElapsed(((frame + 1) % 3) * 2);
      return;
    }
    if (elapsed >= 6) setElapsed(0);
    setPlaying((value) => !value);
  }
  function answer(input: string) {
    setQuestion(input);
    const text = input.toLowerCase();
    if (/book|appointment|reserve|session/.test(text))
      setReply(
        `I can help with ${scene.appointment.toLowerCase()} in this concept. ${visible("T3") ? "Use the sample booking form to explore the next step." : "Add Booking system to try an appointment flow."} No real appointment is made.`,
      );
    else if (/hours|open|time/.test(text))
      setReply(
        `In this example, ${scene.name} would answer using the business hours you provide. No opening hours have been supplied, so a person would need to confirm them.`,
      );
    else if (/price|cost|pay/.test(text))
      setReply(
        "No prices are supplied in this concept. I would ask a team member to confirm the service and quote before suggesting a cost.",
      );
    else
      setReply(
        `Thanks for asking about ${scene.name}. This scripted example needs a person to answer that question. It cannot invent an answer or send your message.`,
      );
  }
  function explore() {
    setExplored(true);
    preview.current?.focus({ preventScroll: true });
    preview.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
  }
  const Title = standalone ? "h1" : "h2";
  return (
    <section
      className={`v14-project${standalone ? " v14-project--standalone" : ""}`}
      id="project-lab"
      aria-labelledby={`${uid}-title`}
      data-surface="dark"
    >
      <div className="v14-project-shell">
        <header className="v14-project-heading">
          <div>
            <span className="v14-project-kicker">
              07 / THE LIVING PROJECT LAB
            </span>
            <Title id={`${uid}-title`} data-motion="typography">
              Build your
              <br />
              <em>next idea.</em>
            </Title>
          </div>
          <p>
            A business like yours.
            <br />
            An experience made around it.
            <br />
            <span>Choose what it could become.</span>
          </p>
        </header>
        <div className="v14-project-composer">
          <aside
            className="v14-project-choices"
            aria-label="Customize your project"
          >
            <label htmlFor={`${uid}-business`}>Your business</label>
            <select
              id={`${uid}-business`}
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
            <div className="v14-project-choice-heading">
              <span>MAKE IT YOURS</span>
              <span>01 — 04</span>
            </div>
            <div className="v14-project-options">
              {solutions.map(({ id, name, detail, Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={project.services.includes(id)}
                  onClick={() => toggle(id)}
                >
                  <Icon size={20} />
                  <span>
                    <strong>{name}</strong>
                    <small>{detail}</small>
                  </span>
                  {project.services.includes(id) ? (
                    <Check size={17} />
                  ) : (
                    <Plus size={17} />
                  )}
                </button>
              ))}
            </div>
            <div className="v14-project-selection" role="status">
              {selectedLab.length
                ? `${selectedLab.length} ${selectedLab.length === 1 ? "capability" : "capabilities"} selected for your project.`
                : "No Lab services selected. The preview is an example."}
            </div>
            <div className="v14-project-choice-actions">
              <button onClick={resetChoices}>
                <RotateCcw size={14} />
                Reset Lab choices
              </button>
              <button onClick={explore}>
                Explore preview
                <ArrowDown size={14} />
              </button>
            </div>
            <button className="v14-project-primary" onClick={generate}>
              Generate my project brief
              <ArrowUpRight size={18} />
            </button>
            <p className="v14-project-note">
              A place to explore. Nothing is booked, sent or purchased here.
            </p>
          </aside>
          <div className="v14-project-stage" data-business={scene.kind}>
            <div className="v14-project-stage-label">
              <span>
                <i />
                {example ? "EXAMPLE PROJECT" : "YOUR PROJECT CONCEPT"}
              </span>
              <span>INTERACTIVE / ILLUSTRATIVE</span>
            </div>
            <div
              className="v14-project-frame"
              ref={preview}
              tabIndex={-1}
              aria-label="Live project preview"
            >
              <div className="v14-project-browser">
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <small>
                  {scene.name.toLowerCase().replaceAll(" ", "")}.example
                </small>
                <Monitor size={13} />
              </div>
              {visible("T1") ? (
                <div
                  className="v14-project-site"
                  key={scene.kind}
                  data-motion="spatial"
                >
                  <div className="v14-project-site-nav">
                    <strong>{scene.name}</strong>
                    <span>{scene.category}</span>
                  </div>
                  <div className="v14-project-site-body">
                    <div>
                      <span className="v14-project-site-label">
                        THE EVERYDAY, CONSIDERED.
                      </span>
                      <h3>
                        {scene.title.split("\n").map((line, index) => (
                          <span key={index}>{line}</span>
                        ))}
                      </h3>
                      <p>{scene.line}</p>
                      <button
                        onClick={() => {
                          if (!visible("T3")) toggle("T3");
                          else {
                            booking.current?.focus({ preventScroll: true });
                            booking.current?.scrollIntoView({
                              behavior: reduced ? "auto" : "smooth",
                              block: "center",
                            });
                          }
                        }}
                      >
                        {visible("T3")
                          ? "Find your moment"
                          : "Add booking to preview"}
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                    <ConceptArt kind={scene.kind} />
                  </div>
                  <div className="v14-project-site-foot">
                    <span>MADE AROUND YOUR BUSINESS.</span>
                    <span>CONCEPT / 01</span>
                  </div>
                </div>
              ) : (
                <div className="v14-project-no-site">
                  <span>THE IDEA IS TAKING SHAPE.</span>
                  <h3>
                    Your next chapter,
                    <br />
                    your own combination.
                  </h3>
                  <p>
                    A website is optional. Explore the selected services below,
                    or give them a digital home.
                  </p>
                  <button onClick={() => toggle("T1")}>
                    Add a website
                    <Plus size={16} />
                  </button>
                </div>
              )}
              {(visible("T3") || visible("V3") || visible("T4")) && (
                <div className="v14-project-modules">
                  {visible("T3") && (
                    <section
                      className="v14-project-booking"
                      aria-label="Mock booking preview"
                      ref={booking}
                      tabIndex={-1}
                      data-motion="transform"
                    >
                      <div className="v14-project-module-head">
                        <CalendarDays size={18} />
                        <span>MAKE A LITTLE SPACE</span>
                        <small>DEMO</small>
                      </div>
                      <h4>{scene.appointment}</h4>
                      <div className="v14-project-booking-fields">
                        <label>
                          Sample date
                          <input
                            type="date"
                            value={date}
                            onChange={(event) => {
                              setDate(event.target.value);
                              setBooked(false);
                            }}
                          />
                        </label>
                        <fieldset>
                          <legend>Choose a sample time</legend>
                          <div>
                            {["10:00 AM", "1:30 PM", "4:00 PM"].map((time) => (
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
                        </fieldset>
                      </div>
                      <button
                        className="v14-project-mini-action"
                        disabled={!date || !slot}
                        onClick={() => setBooked(true)}
                      >
                        Preview booking
                        <ArrowRight size={14} />
                      </button>
                      <p role="status">
                        {booked
                          ? `Sample confirmation: ${date} at ${slot}. No real booking made.`
                          : "Choose a sample date and time. No availability is being checked."}
                      </p>
                    </section>
                  )}
                  {visible("V3") && (
                    <section
                      className={`v14-project-film${playing ? " is-playing" : ""}`}
                      aria-label="Promotional motion concept"
                      ref={film}
                      data-motion="mask"
                    >
                      <span>YOUR BUSINESS, IN MOTION / CONCEPT</span>
                      <div className="v14-project-film-art" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </div>
                      <h4 key={frame}>{scene.frames[frame]}</h4>
                      <div className="v14-project-film-controls">
                        <button
                          aria-label={
                            playing
                              ? "Pause illustrative animation"
                              : "Play illustrative animation"
                          }
                          onClick={play}
                        >
                          {playing ? <Pause size={15} /> : <Play size={15} />}{" "}
                          {reduced
                            ? "Next still"
                            : playing
                              ? "Pause"
                              : "Play concept"}
                        </button>
                        <span>{Math.floor(elapsed)} / 6s</span>
                      </div>
                      <p>
                        Original type-motion study. No client footage or sound.
                      </p>
                    </section>
                  )}
                  {visible("T4") && (
                    <section
                      className="v14-project-chat"
                      aria-label="Simulated assistant"
                      data-motion="transform"
                    >
                      <div className="v14-project-module-head">
                        <Sparkles size={18} />
                        <span>A USEFUL FIRST RESPONSE</span>
                        <small>SCRIPTED</small>
                      </div>
                      <h4>Hello from {scene.name}.</h4>
                      <p>
                        Try a customer question. This example uses visible
                        rules, not a live AI service.
                      </p>
                      <div className="v14-project-chat-suggestions">
                        {[
                          "Opening hours?",
                          "Can I book?",
                          "What does it cost?",
                        ].map((text) => (
                          <button key={text} onClick={() => answer(text)}>
                            {text}
                          </button>
                        ))}
                      </div>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          if (question.trim()) answer(question);
                        }}
                      >
                        <label
                          className="v14-project-sr"
                          htmlFor={`${uid}-question`}
                        >
                          Ask the sample assistant
                        </label>
                        <input
                          id={`${uid}-question`}
                          value={question}
                          onChange={(event) => {
                            setQuestion(event.target.value);
                            setReply("");
                          }}
                          placeholder="Ask a sample question…"
                          maxLength={300}
                        />
                        <button
                          disabled={!question.trim()}
                          aria-label="Try sample question"
                        >
                          <ArrowUpRight size={17} />
                        </button>
                      </form>
                      <p className="v14-project-reply" role="status">
                        {reply ||
                          "Hello! Explore a sample customer conversation."}
                      </p>
                    </section>
                  )}
                </div>
              )}
            </div>
            <div className="v14-project-stage-bottom">
              {example ? (
                <>
                  <p>
                    A website + booking example.
                    <br />
                    Your selections stay yours.
                  </p>
                  <button onClick={useExample}>
                    Use this example
                    <Plus size={15} />
                  </button>
                </>
              ) : (
                <>
                  <p>
                    {selectedLab.length} connected{" "}
                    {selectedLab.length === 1 ? "possibility" : "possibilities"}
                    .<br />
                    One coherent experience.
                  </p>
                  <span>CHANGE A CHOICE. SEE IT TAKE SHAPE.</span>
                </>
              )}
            </div>
            {explored && (
              <p className="v14-project-explored" role="status">
                Preview focused. Try the website, booking or assistant controls
                inside it.
              </p>
            )}
          </div>
        </div>
        <div className="v14-project-context">
          <div>
            <span className="v14-project-kicker">
              FROM AN IDEA TO A CONVERSATION
            </span>
            <h3>
              Keep the details
              <br />
              <em>that matter.</em>
            </h3>
            <p>{selected.length} solutions selected</p>
            <div
              className="v14-project-selected"
              aria-label="Selected services"
            >
              {selected.map((service) => (
                <button
                  key={service.id}
                  aria-label={`Remove ${service.name}`}
                  onClick={() => toggle(service.id)}
                >
                  {service.short}
                  {service.world === "grow" ? " · Beta" : ""}
                  <X size={13} />
                </button>
              ))}
            </div>
          </div>
          <details open={standalone}>
            <summary>
              Add context to your brief
              <span>
                OPTIONAL <Plus size={15} />
              </span>
            </summary>
            <div className="v14-project-context-fields">
              <label>
                Main project goal
                <input
                  value={project.goal}
                  onChange={(event) => update("goal", event.target.value)}
                  placeholder="What would you love to make happen?"
                />
              </label>
              <div>
                <label>
                  Preferred timeline
                  <select
                    value={project.timeline}
                    onChange={(event) => update("timeline", event.target.value)}
                  >
                    <option value="">Let’s discuss</option>
                    <option>Within a month</option>
                    <option>1–3 months</option>
                    <option>3+ months</option>
                    <option>Just exploring</option>
                  </select>
                </label>
                <label>
                  Budget range (optional)
                  <input
                    value={project.budget}
                    onChange={(event) => update("budget", event.target.value)}
                    placeholder="Your preferred range, if known"
                  />
                </label>
              </div>
              <label>
                Anything else? (optional)
                <textarea
                  rows={3}
                  value={project.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  placeholder="An idea, a reference, a question…"
                />
              </label>
            </div>
          </details>
        </div>
        {briefOpen && (
          <section
            className="v14-project-brief"
            aria-labelledby={`${uid}-brief-title`}
            data-motion="editorial"
          >
            <div>
              <span className="v14-project-kicker">YOUR PROJECT, IN WORDS</span>
              <h3 id={`${uid}-brief-title`}>
                A good place
                <br />
                to begin.
              </h3>
              <p>
                Edit freely. Your brief is a conversation starter, not a quote
                or booking.
              </p>
            </div>
            <div>
              <label>
                Editable project brief
                <textarea
                  ref={briefField}
                  rows={10}
                  value={project.brief}
                  onChange={(event) => {
                    setProject((p) => ({ ...p, brief: event.target.value }));
                    setCopyStatus("");
                  }}
                />
              </label>
              <div className="v14-project-brief-actions">
                <button onClick={copy}>
                  <Copy size={16} />
                  Copy brief
                </button>
                <Link to="/contact">
                  Continue to inquiry
                  <ArrowUpRight size={17} />
                </Link>
              </div>
              <p role="status">{copyStatus}</p>
            </div>
          </section>
        )}
        {!standalone && (
          <Link className="v14-project-route" to="/project-lab">
            Give your idea a little more room
            <ArrowUpRight size={17} />
          </Link>
        )}
      </div>
    </section>
  );
}
