import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Play,
  Plus,
  RotateCcw,
} from "lucide-react";
import { services } from "../../data";
import { useProject } from "../../project";
import "../../home-business.css";
export { default as PackageGuide } from "./PackageGuide";

const audiences = [
  {
    id: "creator",
    label: "Content Creator",
    title: "One recording. More possibilities.",
    scenario:
      "You have the ideas and the footage. Shape them into a consistent set of Reels, highlights and stories, with your voice intact.",
    services: ["V1", "V2", "V4"],
    goal: "Create a cohesive set of edited and repurposed content.",
  },
  {
    id: "local",
    label: "Local Business",
    title: "A welcoming first impression. Online, too.",
    scenario:
      "Help people understand what you offer, explore your business and find an easy way to book their next visit.",
    services: ["T1", "T3", "V3"],
    goal: "Build a clear business website with bookings and promotional content.",
  },
  {
    id: "startup",
    label: "Startup",
    title: "Give your next idea a clear shape.",
    scenario:
      "Introduce your product with a focused website and landing page. Explore promotional content and Digital Marketing Beta concepts.",
    services: ["T1", "T6", "V3", "M1"],
    goal: "Create a startup website and landing page; explore promotional video and Digital Marketing Beta concepts.",
  },
  {
    id: "store",
    label: "Online Store",
    title: "Make the product part of the story.",
    scenario:
      "Bring product details, a considered shopping journey and illustrative Digital Marketing Beta concepts together.",
    services: ["T2", "V3", "M1"],
    goal: "Develop an e-commerce experience with product media; explore Digital Marketing Beta concepts.",
  },
] as const;

function AudienceVisual({ id }: { id: string }) {
  const [frame, setFrame] = useState(0);
  const [slot, setSlot] = useState("");
  const [shade, setShade] = useState("Violet");
  const [inCart, setInCart] = useState(false);
  return (
    <div
      className={`hp-audience-art hp-audience-art--${id}`}
      data-motion="mask"
    >
      <span className="hp-art-note">ILLUSTRATIVE BUSINESS SCENARIO</span>
      {id === "creator" && (
        <>
          <div
            className="hp-creator-composition"
            role="img"
            aria-label="Creator content concept"
          >
            <div
              className="hp-creator-type"
              key={frame}
              data-motion="typography"
            >
              <small>STUDIO JOURNAL / 0{frame + 1}</small>
              <strong>
                {
                  [
                    <>
                      ONE
                      <br />
                      GOOD
                      <br />
                      <em>IDEA.</em>
                    </>,
                    <>
                      GIVE IT
                      <br />
                      YOUR
                      <br />
                      <em>VOICE.</em>
                    </>,
                    <>
                      MAKE IT
                      <br />
                      MEAN
                      <br />
                      <em>MORE.</em>
                    </>,
                  ][frame]
                }
              </strong>
              <span>AN ORIGINAL TYPOGRAPHIC CONTENT STUDY</span>
            </div>
            <div className="hp-creator-editions" aria-hidden="true">
              <i>
                9:16
                <br />
                <b>REEL</b>
              </i>
              <i>
                1:1
                <br />
                <b>POST</b>
              </i>
              <i>
                16:9
                <br />
                <b>TEASER</b>
              </i>
            </div>
          </div>
          <button
            className="hp-art-action"
            onClick={() => setFrame((n) => (n + 1) % 3)}
          >
            Preview next edit <ArrowRight size={16} />
          </button>
        </>
      )}
      {id === "local" && (
        <>
          <div className="hp-local-composition">
            <div className="hp-salon-identity">
              <span>FORM / SALON CONCEPT</span>
              <strong>
                A moment.
                <br />
                Just for you.
              </strong>
              <div className="hp-salon-arch" aria-hidden="true">
                <i />
                <b />
              </div>
              <small>CARE, CONSIDERED.</small>
            </div>
            <div className="hp-salon-booking">
              <span>PLAN A LITTLE TIME FOR YOU</span>
              <strong>Find your moment.</strong>
              <small>Sample appointment times</small>
              <div>
                {["10:00", "13:30", "16:00"].map((time) => (
                  <button
                    key={time}
                    aria-pressed={slot === time}
                    onClick={() => setSlot(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <p role="status">
                {slot
                  ? `${slot} selected in this concept. No appointment is booked.`
                  : "Try choosing a time."}
              </p>
            </div>
          </div>
        </>
      )}
      {id === "startup" && (
        <>
          <div className="hp-startup-composition">
            <div className="hp-startup-site">
              <span>FRAME / PRODUCT CONCEPT</span>
              <strong>
                Ideas need
                <br />
                <em>a way forward.</em>
              </strong>
              <p>
                A clear introduction.
                <br />A useful next step.
              </p>
              <div className="hp-startup-planes" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="hp-startup-details">
              <span>LANDING PAGE CONCEPT</span>
              <strong>
                {
                  [
                    "Meet the product.",
                    "See what it does.",
                    "Take the next step.",
                  ][frame]
                }
              </strong>
              <p role="status">
                {
                  [
                    "A focused introduction to the product and its purpose.",
                    "A feature section explains the details in a clear sequence.",
                    "A contact section gives interested visitors one clear next action. Nothing is submitted.",
                  ][frame]
                }
              </p>
            </div>
          </div>
          <button
            className="hp-art-action"
            onClick={() => setFrame((n) => (n + 1) % 3)}
          >
            {frame === 2 ? "Reset landing preview" : "Explore landing page"}
            {frame === 2 ? <RotateCcw size={15} /> : <ArrowRight size={16} />}
          </button>
        </>
      )}
      {id === "store" && (
        <>
          <div className="hp-store-composition">
            <div className="hp-store-product">
              <span>ARC / STORE CONCEPT</span>
              <div
                className={`hp-lamp hp-lamp--${shade.toLowerCase()}`}
                aria-hidden="true"
              >
                <i />
                <b />
                <em />
              </div>
            </div>
            <div className="hp-store-copy">
              <small>A LIGHTER EVERYDAY.</small>
              <strong>
                Find
                <br />
                your light.
              </strong>
              <p>
                The Arc desk lamp.
                <br />A fictional product study.
              </p>
              <div
                className="hp-finish-choice"
                role="group"
                aria-label="Concept lamp finish"
              >
                {["Violet", "Ink"].map((finish) => (
                  <button
                    key={finish}
                    aria-pressed={shade === finish}
                    onClick={() => {
                      setShade(finish);
                      setInCart(false);
                    }}
                  >
                    {finish}
                  </button>
                ))}
              </div>
              <button className="hp-store-add" onClick={() => setInCart(true)}>
                {inCart ? <Check size={15} /> : <Plus size={15} />}{" "}
                {inCart ? "Added to sample bag" : "Try adding to bag"}
              </button>
              <p className="hp-store-status" role="status">
                {inCart
                  ? `${shade} lamp selected. No order or payment is created.`
                  : "An interactive shopping concept."}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function AudienceSolutions() {
  const [active, setActive] = useState(0);
  const { setProject } = useProject();
  const navigate = useNavigate();
  const selected = audiences[active];
  const continueProject = () => {
    const journeyNote = `Selected business journey: ${selected.label}.`;
    setProject((p) => ({
      ...p,
      services: [...new Set([...p.services, ...selected.services])],
      goal: p.goal || selected.goal,
      notes: p.notes.split("\n").includes(journeyNote)
        ? p.notes
        : [p.notes, journeyNote].filter(Boolean).join("\n"),
      brief: "",
    }));
    navigate("/project-lab");
  };
  return (
    <section
      className="hp-audience"
      data-surface="light"
      aria-labelledby="audience-title"
      id="business-solutions"
    >
      <div className="hp-business-wrap">
        <div className="hp-audience-intro">
          <span className="hp-section-kicker">
            04 / MADE FOR YOUR NEXT CHAPTER
          </span>
          <h2 id="audience-title" data-motion="typography">
            A different starting point.
            <br />
            <em>The same care.</em>
          </h2>
          <p>Find a combination that makes sense for you.</p>
        </div>
        <div className="hp-audience-layout">
          <div
            className="hp-audience-rail"
            role="group"
            aria-label="Choose your business journey"
          >
            {audiences.map((a, i) => (
              <button
                key={a.id}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <span>0{i + 1}</span>
                <strong>{a.label}</strong>
                <ArrowUpRight size={20} />
              </button>
            ))}
            <p>
              A starting point, not a fixed package. Keep what fits your
              project.
            </p>
          </div>
          <div className="hp-audience-story">
            <AudienceVisual key={selected.id} id={selected.id} />
            <div
              className="hp-scenario-copy"
              data-motion="editorial"
              data-motion-key={selected.id}
            >
              <h3>{selected.title}</h3>
              <p>{selected.scenario}</p>
              <div
                className="hp-suggested-services"
                aria-label="Suggested capabilities"
              >
                {selected.services.map((id) => (
                  <Link key={id} to={`/services/${id}`}>
                    {services.find((s) => s.id === id)?.short}
                    {services.find((s) => s.id === id)?.world === "grow"
                      ? " — Beta / Coming Soon"
                      : ""}
                    <ArrowUpRight size={13} />
                  </Link>
                ))}
              </div>
              <div className="hp-audience-next">
                <button onClick={continueProject}>
                  Use this starting point <ArrowRight size={17} />
                </button>
                <Link to="/project-lab">Start with my own choices</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MotionConcept() {
  const [replay, setReplay] = useState(0);
  const [outline, setOutline] = useState(false);
  return (
    <article className="hp-concept hp-concept--motion">
      <div className={`hp-motion-canvas ${outline ? "is-outline" : ""}`}>
        <div className="hp-motion-meta">
          <span>MAKENDLESS / TYPE STUDY 001</span>
          <span>ORIGINAL CONCEPT</span>
        </div>
        <div
          className="hp-motion-poster"
          role="img"
          key={`${replay}-${outline}`}
          aria-label="Make your mark."
        >
          <span>MAKE</span>
          <span>YOUR</span>
          <span>
            MARK<span className="hp-motion-period">.</span>
          </span>
          <i aria-hidden="true" />
        </div>
        <div className="hp-motion-tools">
          <button onClick={() => setReplay((n) => n + 1)}>
            <Play size={13} /> Replay motion
          </button>
          <button aria-pressed={outline} onClick={() => setOutline((v) => !v)}>
            {outline ? "Filled typography" : "Outline typography"}
          </button>
        </div>
      </div>
      <div className="hp-concept-caption">
        <div>
          <span>MOTION GRAPHICS / ORIGINAL STUDY</span>
          <h3>
            A few words.
            <br />A distinct point of view.
          </h3>
        </div>
        <details>
          <summary>
            View concept <Plus size={18} />
          </summary>
          <div>
            <p>
              A typographic identity built from three words: pacing, contrast
              and a deliberate final mark. Try the filled and outline
              treatments, or replay the short sequence.
            </p>
            <p>
              This is an original browser motion study, not a client commission
              or finished video export.
            </p>
            <Link to="/services/V5">
              Explore motion graphics <ArrowUpRight size={15} />
            </Link>
          </div>
        </details>
      </div>
    </article>
  );
}
function BookingConcept() {
  const [date, setDate] = useState("Tue 18");
  const [time, setTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  return (
    <article className="hp-concept hp-concept--booking">
      <div
        className="hp-booking-canvas"
        data-motion="mask"
        data-surface="light"
      >
        <div className="hp-booking-identity">
          <span>STILLPOINT / WELLNESS CONCEPT</span>
          <strong>
            Make room
            <br />
            for yourself.
          </strong>
          <div className="hp-booking-sculpture" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <small>A QUIETER KIND OF DIGITAL EXPERIENCE.</small>
        </div>
        <div className="hp-appointment">
          <span>SAMPLE SESSION / 30 MIN</span>
          <h4>A little time for you.</h4>
          <div
            className="hp-date-choice"
            role="group"
            aria-label="Concept appointment day"
          >
            {["Tue 18", "Wed 19", "Thu 20"].map((d) => (
              <button
                key={d}
                aria-pressed={date === d}
                onClick={() => {
                  setDate(d);
                  setTime("");
                  setConfirmed(false);
                }}
              >
                {d}
              </button>
            ))}
          </div>
          <p>Choose a sample time</p>
          <div
            className="hp-time-choice"
            role="group"
            aria-label="Concept appointment time"
          >
            {["09:30", "11:00", "14:30"].map((t) => (
              <button
                key={t}
                aria-pressed={time === t}
                onClick={() => {
                  setTime(t);
                  setConfirmed(false);
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            className="hp-appointment-confirm"
            disabled={!time}
            onClick={() => setConfirmed(true)}
          >
            {confirmed ? <Check size={15} /> : <ArrowRight size={15} />}{" "}
            {confirmed ? "Concept confirmed" : "Preview appointment"}
          </button>
          <p className="hp-appointment-status" role="status">
            {confirmed
              ? `${date} at ${time}. This is a simulation; no booking is made.`
              : "Interactive concept. No real appointments."}
          </p>
        </div>
      </div>
      <div className="hp-concept-caption">
        <div>
          <span>BOOKING EXPERIENCE / ORIGINAL CONCEPT</span>
          <h3>
            Less back and forth.
            <br />
            More time for people.
          </h3>
        </div>
        <details>
          <summary>
            View concept <Plus size={18} />
          </summary>
          <div>
            <p>
              A simple path from a preferred day to a confirmed time. The
              interface makes available choices clear and keeps the next step
              close.
            </p>
            <p>
              This fictional wellness concept demonstrates selection and
              confirmation. Dates and times are illustrative; no real
              availability is connected.
            </p>
            <Link to="/services/T3">
              Explore booking experiences <ArrowUpRight size={15} />
            </Link>
          </div>
        </details>
      </div>
    </article>
  );
}
export function SelectedConcepts() {
  return (
    <section
      className="hp-work"
      data-surface="dark"
      aria-labelledby="home-work-title"
      id="selected-work"
    >
      <div className="hp-business-wrap">
        <header className="hp-work-heading">
          <span className="hp-section-kicker">06 / A CLOSER LOOK</span>
          <h2 id="home-work-title" data-motion="typography">
            The details
            <br />
            <em>make the difference.</em>
          </h2>
          <p>
            Original studio explorations. A glimpse of how we think, shape and
            make. These are concepts, not client commissions.
          </p>
        </header>
        <MotionConcept />
        <BookingConcept />
        <Link className="hp-all-work" to="/work">
          Explore more studio concepts <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
