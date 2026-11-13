import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Film,
  Monitor,
  Pause,
  Play,
  RotateCcw,
  Smartphone,
  Workflow,
} from "lucide-react";
import { useLabSettings } from "./settings";
import "./live.css";

const captions = [
  "FIND YOUR RHYTHM.",
  "CHANGE THE PERSPECTIVE.",
  "MAKE THE MOMENT MATTER.",
];

function MovementFrame({
  edited,
  progress,
}: {
  edited: boolean;
  progress: number;
}) {
  const travel = Math.sin((progress / 100) * Math.PI) * 22;
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      aria-hidden="true"
      className={
        edited ? "live-vector edited-vector" : "live-vector source-vector"
      }
    >
      <path d="M0 302H480M0 322H480M0 342H480" className="vector-grid" />
      <path d="M46 302V128a97 97 0 0 1 194 0v174H46Z" className="vector-arch" />
      <path d="M72 302V129a71 71 0 0 1 142 0v173" className="vector-inner" />
      <path
        d="M281 302V245H328V188H375V131H422V74H480"
        className="vector-steps"
      />
      <path
        d="M288 302H480M335 245H480M382 188H480M429 131H480"
        className="vector-grid"
      />
      <g transform={`translate(${travel} ${-travel * 0.2})`}>
        <circle cx="260" cy="141" r="15" className="vector-figure" />
        <path
          d="m257 166-26 51 36 30-23 49m-13-79-36 30-28-10m87-66 37 29 29-25m-66-4 14 38 38 15"
          className="vector-runner"
        />
      </g>
      <circle cx="383" cy="62" r="21" className="vector-disc" />
      {!edited && (
        <g className="vector-guides">
          <path d="M240 0V360M0 180H480" />
          <circle cx="260" cy="141" r="23" />
          <path d="M30 30H65M30 30V65M450 30H415M450 30V65" />
        </g>
      )}
    </svg>
  );
}

export function VideoComparison() {
  const { reducedMotion } = useLabSettings();
  const [comparison, setComparison] = useState(65);
  const [caption, setCaption] = useState("Editorial");
  const [framing, setFraming] = useState("Wide");
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const id = useId();
  const frame = Math.min(2, Math.floor(progress / 34));

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setPlaying(false);
      return;
    }
    const stop = () => setPlaying(false);
    const visibility = () => {
      if (document.hidden) stop();
    };
    const timer = window.setInterval(
      () => setProgress((value) => Math.min(100, value + 2.5)),
      150,
    );
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) stop();
          })
        : null;
    if (host.current) observer?.observe(host.current);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      clearInterval(timer);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [playing, reducedMotion]);
  useEffect(() => {
    if (progress >= 100) setPlaying(false);
  }, [progress]);

  function play() {
    if (reducedMotion) {
      setProgress((value) => (value >= 68 ? 0 : value + 34));
      return;
    }
    if (progress >= 100) setProgress(0);
    setPlaying((value) => !value);
  }

  return (
    <div className="live-study live-video-study">
      <div className="live-study-intro">
        <span>CREATE / VIDEO COMPARISON</span>
        <h3>A different point of view.</h3>
        <p>
          One original vector scene. Change the crop, caption and sequence to
          see how an edit changes its meaning.
        </p>
      </div>
      <div className="live-edit-layout">
        <div className="live-comparison" ref={host}>
          <div
            className={`live-comparison-art ${framing === "Close" ? "is-close" : ""}`}
            style={{ "--comparison": `${comparison}%` } as CSSProperties}
          >
            <div className="live-source-layer">
              <MovementFrame edited={false} progress={progress} />
              <span className="live-source-label">SOURCE / VECTOR STUDY</span>
            </div>
            <div
              className="live-edited-layer"
              style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }}
            >
              <MovementFrame edited progress={progress} />
              <div
                className={`live-edit-caption caption-${caption.toLowerCase()}`}
              >
                <span>RHYTHM / 001</span>
                <strong>{captions[frame]}</strong>
              </div>
              <span className="live-film-credit">
                MAKENDLESS / ORIGINAL CONCEPT
              </span>
            </div>
            <i className="live-comparison-divider" aria-hidden="true" />
          </div>
          <div className="live-media-transport">
            <button
              onClick={play}
              aria-label={
                reducedMotion
                  ? "Next still frame"
                  : playing
                    ? "Pause vector film"
                    : progress >= 100
                      ? "Replay vector film"
                      : "Play vector film"
              }
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}{" "}
              {reducedMotion
                ? "Next frame"
                : playing
                  ? "Pause"
                  : progress >= 100
                    ? "Replay"
                    : "Play"}
            </button>
            <label htmlFor={`${id}-time`} className="live-time-field">
              <span>Film position</span>
              <input
                id={`${id}-time`}
                type="range"
                min="0"
                max="100"
                step="1"
                value={progress}
                aria-valuetext={`${(progress * 0.06).toFixed(1)} seconds of 6`}
                onChange={(event) => {
                  setProgress(Number(event.target.value));
                  setPlaying(false);
                }}
              />
            </label>
            <span className="live-timecode" aria-hidden="true">
              {(progress * 0.06).toFixed(1)} / 6s
            </span>
          </div>
        </div>
        <div className="live-edit-tools">
          <label htmlFor={`${id}-compare`}>
            Source to edited{" "}
            <span aria-hidden="true">{comparison}% edited</span>
          </label>
          <input
            id={`${id}-compare`}
            type="range"
            min="0"
            max="100"
            step="1"
            value={comparison}
            aria-valuetext={`${comparison} percent edited`}
            onChange={(event) => setComparison(Number(event.target.value))}
          />
          <div
            className="live-segments"
            role="group"
            aria-label="Comparison presets"
          >
            {[
              ["Before", 0],
              ["Split", 50],
              ["After", 100],
            ].map(([name, value]) => (
              <button
                key={name}
                aria-pressed={comparison === value}
                onClick={() => setComparison(Number(value))}
              >
                {name}
              </button>
            ))}
          </div>
          <fieldset>
            <legend>Caption treatment</legend>
            <div className="live-segments">
              {["Editorial", "Marker", "Minimal"].map((style) => (
                <button
                  key={style}
                  aria-pressed={caption === style}
                  onClick={() => setCaption(style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Framing</legend>
            <div className="live-segments">
              {["Wide", "Close"].map((crop) => (
                <button
                  key={crop}
                  aria-pressed={framing === crop}
                  onClick={() => setFraming(crop)}
                >
                  {crop}
                </button>
              ))}
            </div>
          </fieldset>
          <p className="live-state-note" role="status">
            {comparison === 0
              ? "Original structure"
              : comparison === 100
                ? "Finished composition"
                : "Source and edit side by side"}{" "}
            · {caption.toLowerCase()} captions · {framing.toLowerCase()}{" "}
            framing.
          </p>
          <p className="live-honesty">
            Illustrative SVG motion, not client footage. No audio or generated
            video.
          </p>
        </div>
      </div>
    </div>
  );
}

export function WebsiteTransformation() {
  const [finished, setFinished] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [page, setPage] = useState<"home" | "objects" | "visit">("home");
  const [object, setObject] = useState(0);
  const [name, setName] = useState("");
  const [time, setTime] = useState("14:00");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const id = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const objects = ["The folded lamp", "The quiet vessel", "The everyday chair"];
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Enter a sample visitor name.");
      nameRef.current?.focus();
      return;
    }
    setError("");
    setConfirmation(true);
  }
  return (
    <div className="live-study live-web-study">
      <div className="live-study-intro">
        <span>BUILD / WEBSITE TRANSFORMATION</span>
        <h3>Structure becomes character.</h3>
        <p>
          Switch between the plan and the finished design. Explore the
          collection and try the local visit request.
        </p>
      </div>
      <div className="live-web-tools">
        <div
          className="live-segments"
          role="group"
          aria-label="Website treatment"
        >
          <button aria-pressed={!finished} onClick={() => setFinished(false)}>
            Wireframe
          </button>
          <button aria-pressed={finished} onClick={() => setFinished(true)}>
            Finished
          </button>
        </div>
        <div className="live-segments" role="group" aria-label="Preview device">
          <button aria-pressed={!mobile} onClick={() => setMobile(false)}>
            <Monitor size={16} /> Desktop
          </button>
          <button aria-pressed={mobile} onClick={() => setMobile(true)}>
            <Smartphone size={16} /> Mobile
          </button>
        </div>
      </div>
      <div className="live-device-stage">
        <div
          className={`live-demo-site ${mobile ? "site-mobile" : ""} ${finished ? "site-finished" : "site-wireframe"}`}
        >
          <header>
            <strong>
              FOLD<span>OBJECTS & IDEAS</span>
            </strong>
            <nav aria-label="Sample website">
              <button
                aria-current={page === "home" ? "page" : undefined}
                onClick={() => setPage("home")}
              >
                Home
              </button>
              <button
                aria-current={page === "objects" ? "page" : undefined}
                onClick={() => setPage("objects")}
              >
                Objects
              </button>
              <button
                aria-current={page === "visit" ? "page" : undefined}
                onClick={() => setPage("visit")}
              >
                Visit
              </button>
            </nav>
          </header>
          {page === "home" ? (
            <div className="live-site-home">
              <div>
                <span>A FICTIONAL DESIGN EXHIBITION</span>
                <h4>
                  Everyday things.
                  <br />
                  <em>Extraordinary care.</em>
                </h4>
                <p>
                  A small collection of considered forms. A space to look a
                  little closer.
                </p>
                <button onClick={() => setPage("objects")}>
                  Explore the objects <ArrowRight size={15} />
                </button>
              </div>
              <div className="live-object-art object-lamp" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
          ) : page === "objects" ? (
            <div className="live-site-collection">
              <div
                className={`live-object-art object-${["lamp", "vessel", "chair"][object]}`}
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
              </div>
              <div>
                <span>THE COLLECTION / 0{object + 1}</span>
                <h4>{objects[object]}</h4>
                <p>
                  Original interface illustrations. No products are available
                  for sale.
                </p>
                <div
                  className="live-object-picker"
                  role="group"
                  aria-label="Choose an object"
                >
                  {objects.map((item, index) => (
                    <button
                      key={item}
                      aria-pressed={object === index}
                      onClick={() => setObject(index)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <button
                  className="live-site-action"
                  onClick={() => setPage("visit")}
                >
                  Plan a sample visit <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            <div className="live-site-visit">
              <div>
                <span>COME A LITTLE CLOSER</span>
                <h4>
                  A moment
                  <br />
                  with the objects.
                </h4>
                <p>
                  This request stays in the browser. No appointment is booked
                  and no personal data is sent.
                </p>
              </div>
              <form
                onSubmit={submit}
                noValidate
                onChange={() => {
                  setConfirmation(false);
                  setError("");
                }}
              >
                <label htmlFor={`${id}-name`}>Sample visitor name</label>
                <input
                  ref={nameRef}
                  id={`${id}-name`}
                  value={name}
                  maxLength={60}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${id}-error` : undefined}
                />
                <label htmlFor={`${id}-time`}>Sample visit time</label>
                <select
                  id={`${id}-time`}
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                >
                  <option>10:30</option>
                  <option>14:00</option>
                  <option>16:30</option>
                </select>
                {error && (
                  <p id={`${id}-error`} role="alert">
                    {error}
                  </p>
                )}
                <button type="submit">
                  Preview visit request <ArrowRight size={15} />
                </button>
                {confirmation && (
                  <p className="live-visit-confirmation" role="status">
                    Draft for {name.trim()} at {time}. Nothing has been booked
                    or sent.
                  </p>
                )}
              </form>
            </div>
          )}
          <footer>
            <span>FOLD / ORIGINAL WEBSITE CONCEPT</span>
            <span>
              {finished
                ? "DESIGN, WITH INTENTION"
                : "WIREFRAME / SAME WORKING CONTENT"}
            </span>
          </footer>
        </div>
      </div>
      <p className="live-honesty">
        Same content and behavior in both treatments. The mobile control
        recomposes this preview; it is not a real-device performance test.
      </p>
    </div>
  );
}

const stages = [
  "Inquiry",
  "Classification",
  "Routing",
  "Draft",
  "Human review",
];
function classifyInquiry(inquiry: string) {
  const value = inquiry.toLowerCase();
  if (/book|appointment|schedule/.test(value))
    return {
      category: "Booking experience",
      route: "BUILD / Booking & web applications",
      next: "what visitors need to book, and how availability is managed",
    };
  if (/video|reel|edit|podcast/.test(value))
    return {
      category: "Creative production",
      route: "CREATE / Video editing",
      next: "your source material, intended audience and target formats",
    };
  if (/web|site|store|shop/.test(value))
    return {
      category: "Website experience",
      route: "BUILD / Websites & digital products",
      next: "your content, required pages and the actions visitors should take",
    };
  return {
    category: "Needs clarification",
    route: "Human triage / no automatic assignment",
    next: "your main goal and what kind of support you are looking for",
  };
}
export function WorkflowSimulation() {
  const [inquiry, setInquiry] = useState("I need a website for my new studio.");
  const [step, setStep] = useState(0);
  const [draftOverride, setDraftOverride] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const id = useId();
  const result = classifyInquiry(inquiry);
  const draft =
    draftOverride ??
    `Thank you for sharing your idea. To explore a ${result.category.toLowerCase()}, could you tell us ${result.next}? This is an exploratory reply, not a quote or commitment.`;
  function updateInquiry(value: string) {
    setInquiry(value);
    setStep(0);
    setDraftOverride(null);
    setChecked(false);
    setReviewed(false);
  }
  function reset() {
    setStep(0);
    setDraftOverride(null);
    setChecked(false);
    setReviewed(false);
  }
  return (
    <div className="live-study live-flow-study">
      <div className="live-study-intro">
        <span>AI / WORKFLOW SIMULATION</span>
        <h3>A request. A considered reply.</h3>
        <p>
          Follow a local, rule-based workflow. Every route and draft is
          inspectable; a person decides what happens next.
        </p>
      </div>
      <div className="live-flow-layout">
        <div className="live-inquiry-panel">
          <label htmlFor={`${id}-inquiry`}>Sample inquiry</label>
          <textarea
            id={`${id}-inquiry`}
            rows={5}
            maxLength={400}
            value={inquiry}
            onChange={(event) => updateInquiry(event.target.value)}
          />
          <div
            className="live-inquiry-samples"
            role="group"
            aria-label="Try an inquiry"
          >
            <button
              onClick={() =>
                updateInquiry("Please edit a set of reels from my podcast.")
              }
            >
              Video
            </button>
            <button
              onClick={() =>
                updateInquiry("I need a website for my new studio.")
              }
            >
              Website
            </button>
            <button
              onClick={() =>
                updateInquiry("Can customers book an appointment online?")
              }
            >
              Booking
            </button>
          </div>
          <p>
            Changing the inquiry clears downstream classification, draft and
            review.
          </p>
          <details>
            <summary>Inspect the local rules</summary>
            <ul>
              <li>Booking, appointment or schedule → booking experience.</li>
              <li>Video, reel, edit or podcast → creative production.</li>
              <li>Web, site, store or shop → website experience.</li>
              <li>Anything else → human clarification.</li>
            </ul>
            <p>Rules are evaluated in that order. This is not an AI model.</p>
          </details>
        </div>
        <div className="live-flow-result">
          <ol className="live-flow-steps" aria-label="Workflow progress">
            {stages.map((stage, index) => (
              <li
                key={stage}
                aria-current={step === index ? "step" : undefined}
                className={index < step ? "is-complete" : ""}
              >
                <span>
                  {index < step ? <Check size={13} /> : `0${index + 1}`}
                </span>
                <small>{stage}</small>
              </li>
            ))}
          </ol>
          <div className="live-flow-content" key={step}>
            <span>STEP {step + 1} OF 5</span>
            <h4>{stages[step]}</h4>
            {step === 0 && (
              <>
                <p>Your inquiry is ready for a local rule check.</p>
                <blockquote>
                  {inquiry.trim() || "Add a sample inquiry to begin."}
                </blockquote>
              </>
            )}
            {step === 1 && (
              <>
                <strong className="live-flow-output">{result.category}</strong>
                <p>
                  The first matching rule provides a proposed category. It can
                  be wrong; ambiguous requests go to a person.
                </p>
              </>
            )}
            {step === 2 && (
              <>
                <strong className="live-flow-output">{result.route}</strong>
                <p>
                  This is a proposed internal destination. No message, task or
                  assignment has been created.
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <label htmlFor={`${id}-draft`}>
                  Editable local reply draft
                </label>
                <textarea
                  id={`${id}-draft`}
                  rows={6}
                  value={draft}
                  onChange={(event) => {
                    setDraftOverride(event.target.value);
                    setChecked(false);
                    setReviewed(false);
                  }}
                />
              </>
            )}
            {step === 4 && (
              <>
                <blockquote>{draft}</blockquote>
                <label className="live-review-check">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      setChecked(event.target.checked);
                      setReviewed(false);
                    }}
                  />{" "}
                  I have reviewed this draft
                </label>
                <button
                  className="live-local-review"
                  disabled={!checked || !draft.trim()}
                  onClick={() => setReviewed(true)}
                >
                  <Check size={16} /> Mark reviewed locally
                </button>
                {reviewed && (
                  <p role="status">
                    Review recorded in this example. Nothing has been sent.
                  </p>
                )}
              </>
            )}
          </div>
          <div className="live-flow-actions">
            <button
              onClick={() => setStep((value) => Math.max(0, value - 1))}
              disabled={step === 0}
            >
              <ChevronLeft size={16} /> Back
            </button>
            {step < 4 && (
              <button
                className="live-flow-next"
                disabled={!inquiry.trim() || (step === 3 && !draft.trim())}
                onClick={() => setStep((value) => Math.min(4, value + 1))}
              >
                {
                  [
                    "Classify inquiry",
                    "Propose a route",
                    "Prepare local draft",
                    "Review draft",
                  ][step]
                }{" "}
                <ArrowRight size={16} />
              </button>
            )}
            <button onClick={reset} aria-label="Reset workflow">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
      <p className="live-honesty">
        Rule-based simulation. No AI API, automated sending or customer data
        storage.
      </p>
    </div>
  );
}

const experiments = [
  { id: "video", label: "Video editing", Icon: Film },
  { id: "website", label: "Website transformation", Icon: Monitor },
  { id: "workflow", label: "AI workflow", Icon: Workflow },
] as const;
export default function LiveLab() {
  const [active, setActive] =
    useState<(typeof experiments)[number]["id"]>("video");
  return (
    <section className="live-lab">
      <header className="live-lab-heading">
        <span>EXPERIMENT 04 / LIVE COMPONENTS</span>
        <h2>Proof through interaction.</h2>
        <p>
          Three original working studies. Each control changes an actual result.
        </p>
      </header>
      <div
        className="live-lab-selector"
        role="group"
        aria-label="Choose a live experiment"
      >
        {experiments.map(({ id, label, Icon }) => (
          <button
            key={id}
            aria-pressed={active === id}
            onClick={() => setActive(id)}
          >
            <Icon size={18} />
            {label}
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
      {active === "video" ? (
        <VideoComparison />
      ) : active === "website" ? (
        <WebsiteTransformation />
      ) : (
        <WorkflowSimulation />
      )}
      <p className="live-study-reset-note">
        Changing studies resets that study’s local example. No production
        project data is used.
      </p>
    </section>
  );
}
