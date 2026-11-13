import { useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { services } from "../../data";
import { useProject } from "../../project";
import "../../v14-business.css";

const journeys = [
  {
    id: "creator",
    label: "Content Creator",
    title: "Your voice. In more places.",
    description:
      "From one recording to a world of stories. Give your ideas the rhythm, framing and consistency they deserve.",
    services: ["V1", "V2", "V4"],
    optional: [],
    goal: "Create a cohesive set of short-form and repurposed content.",
  },
  {
    id: "local",
    label: "Local Business",
    title: "Your welcome starts online.",
    description:
      "A place to discover your business, find the details and take the next step. Thoughtful from the first visit to the next booking.",
    services: ["T1", "T3", "V3"],
    optional: [],
    goal: "Build a welcoming business website with booking and promotional content.",
  },
  {
    id: "startup",
    label: "Startup",
    title: "Give the next big idea a clear beginning.",
    description:
      "Make your offering easy to understand. Connect a distinctive website, a focused landing page and a promotional story around your launch.",
    services: ["T1", "T6", "V3"],
    optional: ["M1"],
    goal: "Introduce a startup with a business website, landing page and promotional video.",
  },
  {
    id: "store",
    label: "Online Store",
    title: "A considered journey to the bag.",
    description:
      "Let the details do the talking. Bring your products, their stories and a useful shopping experience together.",
    services: ["T2", "V3"],
    optional: ["M1"],
    goal: "Build an e-commerce experience with considered product content.",
  },
] as const;

function ProductObject({ finish = "violet" }: { finish?: "violet" | "ink" }) {
  const pattern = `speaker-${useId().replace(/:/g, "")}`;
  return (
    <svg className="bj-product-object" viewBox="0 0 500 500" aria-hidden="true">
      <defs>
        <pattern
          id={pattern}
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="6" cy="6" r="2" fill="var(--home-night)" opacity=".45" />
        </pattern>
      </defs>
      <ellipse
        cx="256"
        cy="432"
        rx="131"
        ry="17"
        fill="var(--home-ink)"
        opacity=".09"
      />
      <path
        d="M158 125q0-59 91-59t91 59v249q0 52-91 52t-91-52Z"
        fill={
          finish === "violet" ? "var(--home-violet)" : "var(--home-surface)"
        }
      />
      <ellipse
        cx="249"
        cy="126"
        rx="91"
        ry="49"
        fill={
          finish === "violet"
            ? "var(--home-violet-light)"
            : "var(--home-muted-dark)"
        }
      />
      <ellipse cx="249" cy="125" rx="66" ry="30" fill="var(--home-night)" />
      <path
        d="M180 170q69 34 138 0v198q-69 43-138 0Z"
        fill={`url(#${pattern})`}
      />
      <path
        d="M249 101v48m-24-24h48"
        stroke="var(--home-white)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M168 163v192"
        stroke="var(--home-white)"
        strokeWidth="4"
        opacity=".25"
        strokeLinecap="round"
      />
      <text
        x="249"
        y="397"
        textAnchor="middle"
        fill="var(--home-white)"
        fontSize="11"
        letterSpacing="4"
      >
        ARC
      </text>
    </svg>
  );
}

function JourneyPreview({ id }: { id: string }) {
  const [format, setFormat] = useState("Reel");
  const [time, setTime] = useState("");
  const [landingPanel, setLandingPanel] = useState<"story" | "details">(
    "story",
  );
  const [finish, setFinish] = useState<"violet" | "ink">("violet");
  const [bag, setBag] = useState(false);
  return (
    <div className={`bj-preview bj-preview--${id}`} data-motion="mask">
      <span className="bj-preview-label">
        ILLUSTRATIVE CONCEPT / TRY THE IDEA
      </span>
      {id === "creator" && (
        <>
          <div
            className={`bj-creator-frame bj-creator-frame--${format.toLowerCase()}`}
          >
            <img
              src="/images/mountain.jpg"
              alt="Mountain landscape in an illustrative creator edit"
              width="1400"
              height="933"
              loading="lazy"
            />
            <div>
              <span>THE OUTSIDE JOURNAL</span>
              <strong>
                Less ordinary.
                <br />
                More you.
              </strong>
              <small>
                {format === "Reel"
                  ? "9:16 / SHORT-FORM"
                  : "16:9 / EPISODE TEASER"}
              </small>
            </div>
          </div>
          <div
            className="bj-preview-controls"
            role="group"
            aria-label="Creator content format"
          >
            {["Reel", "Teaser"].map((value) => (
              <button
                key={value}
                aria-pressed={format === value}
                onClick={() => setFormat(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </>
      )}
      {id === "local" && (
        <>
          <div className="bj-cafe-preview">
            <img
              src="/images/coffee.jpg"
              alt="Coffee shared around a table, used in a café website concept"
              width="1200"
              height="800"
              loading="lazy"
            />
            <div>
              <span>STILL / CAFÉ CONCEPT</span>
              <strong>
                A little pause.
                <br />A place for you.
              </strong>
            </div>
          </div>
          <div className="bj-booking-mini">
            <span>Try a sample table time</span>
            <div role="group" aria-label="Sample café booking time">
              {["10:00", "12:30", "15:00"].map((slot) => (
                <button
                  key={slot}
                  aria-pressed={time === slot}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
            <p role="status">
              {time
                ? `${time} selected. This is a preview; no table is booked.`
                : "A simple next step, right inside the website."}
            </p>
          </div>
        </>
      )}
      {id === "startup" && (
        <div className="bj-startup-preview">
          <div className="bj-landing-nav">
            <strong>FORM.</strong>
            <span>FICTIONAL PRODUCT / LANDING PAGE</span>
          </div>
          <div
            className="bj-landing-layout"
            data-motion="editorial"
            data-motion-key={landingPanel}
          >
            <div>
              <span>
                {landingPanel === "story"
                  ? "A PLACE FOR THE NEXT IDEA"
                  : "DESIGNED AROUND THE DAY"}
              </span>
              <h3>
                {landingPanel === "story" ? (
                  <>
                    Make space
                    <br />
                    for the idea.
                  </>
                ) : (
                  <>
                    One space.
                    <br />
                    More possibility.
                  </>
                )}
              </h3>
              {landingPanel === "story" ? (
                <p>
                  A focused place to introduce a product and make the next step
                  clear.
                </p>
              ) : (
                <ul>
                  <li>Flexible working spaces</li>
                  <li>Considered shared areas</li>
                  <li>A simple way to plan a visit</li>
                </ul>
              )}
              <button
                onClick={() =>
                  setLandingPanel((value) =>
                    value === "story" ? "details" : "story",
                  )
                }
              >
                {landingPanel === "story"
                  ? "Explore the concept"
                  : "Back to the introduction"}
                <ArrowRight size={17} />
              </button>
            </div>
            <div className="bj-landing-art" aria-hidden="true">
              <i />
              <i />
              <span>
                ROOM
                <br />
                FOR MORE.
              </span>
            </div>
          </div>
          <p className="bj-landing-note">
            A working page preview. No visit is booked or inquiry sent.
          </p>
        </div>
      )}
      {id === "store" && (
        <>
          <div className="bj-store-preview">
            <div>
              <span>ARC / PRODUCT CONCEPT</span>
              <strong>
                Sound.
                <br />
                Considered.
              </strong>
              <p>A fictional portable speaker.</p>
            </div>
            <ProductObject finish={finish} />
          </div>
          <div className="bj-store-tools">
            <div role="group" aria-label="Speaker finish">
              {(["violet", "ink"] as const).map((value) => (
                <button
                  key={value}
                  aria-pressed={finish === value}
                  onClick={() => {
                    setFinish(value);
                    setBag(false);
                  }}
                >
                  {value === "violet" ? "Violet" : "Ink"}
                </button>
              ))}
            </div>
            <button onClick={() => setBag((value) => !value)}>
              {bag ? "Remove from sample bag" : "Add to sample bag"}
              {bag ? <Check size={15} /> : <Plus size={15} />}
            </button>
            <p role="status">
              {bag
                ? `${finish === "violet" ? "Violet" : "Ink"} speaker in the sample bag. No order or payment.`
                : "Explore a finish, then try the shopping interaction."}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export function AudienceSection() {
  const [active, setActive] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    ...journeys[0].services,
  ]);
  const { setProject } = useProject();
  const navigate = useNavigate();
  const journey = journeys[active];
  function continueJourney() {
    const note = `Starting point: ${journey.label}. Recommendations are optional and editable.`;
    setProject((project) => ({
      ...project,
      services: [...new Set([...project.services, ...selectedServices])],
      goal: project.goal || journey.goal,
      notes: project.notes.split("\n").includes(note)
        ? project.notes
        : [project.notes, note].filter(Boolean).join("\n"),
      brief: "",
    }));
    navigate("/contact");
  }
  return (
    <section
      className="bj-section bj-audience"
      id="solutions"
      data-surface="light"
      aria-labelledby="v14-audience-title"
    >
      <div className="bj-wrap">
        <header className="bj-heading">
          <span className="bj-kicker">04 / YOUR WORLD, REIMAGINED</span>
          <h2 id="v14-audience-title" data-motion="typography">
            Made for what
            <br />
            you’re building.
          </h2>
          <p>
            A creator’s next chapter. A business’s first impression. Start with
            what matters to you.
          </p>
        </header>
        <div className="bj-audience-layout">
          <div
            className="bj-audience-index"
            role="group"
            aria-label="Choose your business type"
          >
            {journeys.map((item, index) => (
              <button
                key={item.id}
                aria-pressed={active === index}
                onClick={() => {
                  setActive(index);
                  setSelectedServices([...item.services]);
                }}
              >
                <span>0{index + 1}</span>
                <strong>{item.label}</strong>
                <ArrowUpRight size={21} />
              </button>
            ))}
          </div>
          <div className="bj-audience-story">
            <JourneyPreview key={journey.id} id={journey.id} />
            <div
              className="bj-audience-copy"
              data-motion="editorial"
              data-motion-key={journey.id}
            >
              <div>
                <h3>{journey.title}</h3>
                <p>{journey.description}</p>
              </div>
              <div className="bj-recommendations">
                <span className="bj-kicker">
                  A STARTING POINT, NOT A FIXED PACKAGE
                </span>
                {[...journey.services, ...journey.optional].map((id) => (
                  <label key={id}>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(id)}
                      onChange={() =>
                        setSelectedServices((previous) =>
                          previous.includes(id)
                            ? previous.filter((value) => value !== id)
                            : [...previous, id],
                        )
                      }
                    />
                    {services.find((service) => service.id === id)?.short}
                    {id.startsWith("M") && (
                      <small className="bj-beta-label">
                        Optional · BETA / COMING SOON
                      </small>
                    )}
                  </label>
                ))}
                <button className="bj-action" onClick={continueJourney}>
                  Start a Project
                  <ArrowRight size={17} />
                </button>
                <Link to="/studios">
                  Explore Services <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCafe() {
  const [page, setPage] = useState("Story");
  return (
    <article className="bj-work-cafe">
      <div className="bj-work-web" data-motion="mask">
        <div className="bj-work-web-top">
          <strong>still.</strong>
          <div role="group" aria-label="Café concept pages">
            {["Story", "Menu"].map((value) => (
              <button
                key={value}
                aria-pressed={page === value}
                onClick={() => setPage(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <span>FICTIONAL CAFÉ</span>
        </div>
        <div className="bj-work-web-body">
          <div>
            <span>COFFEE & COMPANY</span>
            {page === "Story" ? (
              <>
                <h3>
                  A little pause.
                  <br />A lot of good.
                </h3>
                <p>For slow mornings and good conversations.</p>
              </>
            ) : (
              <>
                <h3>
                  Your daily
                  <br />
                  ritual.
                </h3>
                <ul>
                  <li>Espresso</li>
                  <li>Flat white</li>
                  <li>Seasonal filter</li>
                </ul>
              </>
            )}
          </div>
          <img
            src="/images/coffee.jpg"
            alt="Coffee imagery in the Still fictional café design"
            width="1200"
            height="800"
            loading="lazy"
          />
        </div>
        <div className="bj-work-web-foot">
          <span>THOUGHTFULLY MADE</span>
          <span>DESIGNED AROUND PEOPLE</span>
        </div>
      </div>
      <div className="bj-work-caption">
        <div>
          <span>WEBSITE / INTERACTIVE CONCEPT</span>
          <h3>Still. A welcome, translated.</h3>
        </div>
        <Link
          to="/services/T1"
          aria-label="Explore website design for a project like Still"
        >
          <ArrowUpRight size={23} />
        </Link>
      </div>
      <p className="bj-work-disclosure">
        An original website concept, not a client commission. Explore the story
        and menu above.
      </p>
    </article>
  );
}
function WorkType() {
  const [outline, setOutline] = useState(false);
  const [composition, setComposition] = useState(0);
  const lines = [
    ["MAKE", "ROOM", "FOR MORE."],
    ["GIVE", "IDEAS", "A VOICE."],
    ["MOVE", "WITH", "INTENT."],
  ][composition];
  return (
    <article className="bj-work-type">
      <div className={`bj-type-poster${outline ? " is-outline" : ""}`}>
        <div className="bj-type-top">
          <span>
            MAKENDLESS
            <br />
            MOTION STUDY 01
          </span>
          <span>
            ORIGINAL
            <br />
            COMPOSITION
          </span>
        </div>
        <div
          className="bj-type-art"
          data-motion="typography"
          data-motion-key={`${outline}-${composition}`}
          aria-label={`Type composition: ${lines.join(" ")}`}
        >
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <i aria-hidden="true" />
        </div>
        <div className="bj-type-tools">
          <button
            onClick={() => setOutline((value) => !value)}
            aria-pressed={outline}
          >
            {outline ? "Use filled type" : "Use outline type"}
          </button>
          <button
            onClick={() => setComposition((value) => (value + 1) % 3)}
            aria-label="Next type composition"
          >
            Next composition
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
      <div className="bj-work-caption">
        <div>
          <span>MOTION / ORIGINAL TYPE STUDY</span>
          <h3>A few words. A distinct voice.</h3>
        </div>
        <Link
          to="/services/V5"
          aria-label="Explore motion graphics for a project like this type study"
        >
          <ArrowUpRight size={23} />
        </Link>
      </div>
      <p className="bj-work-disclosure">
        A browser motion composition with a reduced-motion still. No client
        result is implied.
      </p>
    </article>
  );
}
export function WorkSection() {
  return (
    <section
      className="bj-section bj-work"
      id="work"
      data-surface="dark"
      aria-labelledby="v14-work-title"
    >
      <div className="bj-wrap">
        <header className="bj-heading">
          <span className="bj-kicker">05 / A FEW POSSIBILITIES</span>
          <h2 id="v14-work-title" data-motion="typography">
            Work worth
            <br />
            <em>remembering.</em>
          </h2>
          <p>
            Original explorations of what an idea can become. Clearly labeled
            concepts, ready to interact with.
          </p>
        </header>
        <div className="bj-work-grid">
          <WorkCafe />
          <WorkType />
        </div>
        <div className="bj-work-end">
          <p>Different disciplines. The same attention to the details.</p>
          <Link to="/work">
            Explore the concept archive <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const packages = [
  {
    title: "Video Editing",
    subtitle: "Give your story its rhythm.",
    scope:
      "For creators and businesses turning existing footage into a considered set of edits.",
    ids: ["V1", "V4"],
    deliverables: [
      "Short-form edits and selected cutdowns",
      "Caption treatment and framing",
      "Agreed platform-ready exports",
    ],
    factors:
      "Source footage, edit length, quantity, graphic complexity and the formats you need.",
    additions: ["V2", "V5"],
  },
  {
    title: "Website Development",
    subtitle: "Build a useful digital home.",
    scope:
      "For businesses that need a clear website, or a more tailored customer experience.",
    ids: ["T1"],
    deliverables: [
      "Responsive interface design",
      "Agreed pages and functionality",
      "Launch and handover preparation",
    ],
    factors:
      "Page count, content readiness, features, integrations, hosting and ongoing support.",
    additions: ["T2", "T6", "T3", "T5"],
  },
  {
    title: "Digital Marketing — Beta",
    subtitle: "The next chapter, taking shape.",
    scope:
      "For businesses exploring future campaign creative, social content, local visibility and clear reporting. These services are not launched.",
    ids: ["M1"],
    deliverables: [
      "Illustrative campaign and creative direction",
      "Social content and local presence planning",
      "Proposed analytics and reporting approach",
    ],
    factors:
      "Audience, channels, creative needs, reporting requirements and confirmed future availability. No campaign launches or paid-service commitments are made here.",
    additions: ["M2", "M3", "M4"],
  },
];
export function PackagesSection() {
  const [active, setActive] = useState(0);
  const [additions, setAdditions] = useState<string[]>([]);
  const { setProject } = useProject();
  const navigate = useNavigate();
  const selected = packages[active];
  const beta = active === 2;
  function requestQuote() {
    const line = `Project starting point: ${selected.title}. Optional additions: ${additions.map((id) => services.find((service) => service.id === id)?.short).join(", ") || "none selected"}. Scope and costs to be discussed.`;
    setProject((project) => ({
      ...project,
      services: [
        ...new Set([...project.services, ...selected.ids, ...additions]),
      ],
      notes: project.notes.split("\n").includes(line)
        ? project.notes
        : [project.notes, line].filter(Boolean).join("\n"),
      brief: "",
    }));
    navigate("/contact");
  }
  return (
    <section
      className="bj-section bj-packages"
      id="packages"
      data-surface="light"
      aria-labelledby="v14-packages-title"
    >
      <div className="bj-wrap">
        <header className="bj-heading">
          <span className="bj-kicker">05 / PROJECTS & PRICING</span>
          <h2 id="v14-packages-title" data-motion="typography">
            Find your
            <br />
            starting point.
          </h2>
          <p>
            The right scope starts with your idea. Choose a direction, then
            shape the details together.
          </p>
        </header>
        <div className="bj-package-layout">
          <div
            className="bj-package-index"
            role="group"
            aria-label="Project package direction"
          >
            {packages.map((item, index) => (
              <button
                key={item.title}
                aria-pressed={active === index}
                onClick={() => {
                  setActive(index);
                  setAdditions([]);
                }}
              >
                <span>0{index + 1}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </div>
                <ArrowUpRight size={23} />
              </button>
            ))}
          </div>
          <div
            className="bj-package-detail"
            data-motion="editorial"
            data-motion-key={active}
          >
            <span className="bj-kicker">
              {beta ? "BETA / COMING SOON" : "A SCOPE TO SHAPE TOGETHER"}
            </span>
            <h3>{selected.subtitle}</h3>
            <p>{selected.scope}</p>
            <h4>
              {beta
                ? "Planned scope — subject to availability"
                : "Typical deliverables"}
            </h4>
            <ul>
              {selected.deliverables.map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
            {!beta && (
              <details className="bj-package-additions">
                <summary>
                  Optional additions <Plus size={18} />
                </summary>
                <div>
                  {selected.additions.map((id) => (
                    <label key={id}>
                      <input
                        type="checkbox"
                        checked={additions.includes(id)}
                        onChange={() =>
                          setAdditions((previous) =>
                            previous.includes(id)
                              ? previous.filter((value) => value !== id)
                              : [...previous, id],
                          )
                        }
                      />
                      {services.find((service) => service.id === id)?.short}
                    </label>
                  ))}
                </div>
              </details>
            )}
            {beta && (
              <ul className="bj-beta-scope">
                {selected.additions.map((id) => (
                  <li key={id}>
                    {services.find((service) => service.id === id)?.name} · Beta
                  </li>
                ))}
              </ul>
            )}
            <div className="bj-package-factors">
              <h4>
                {beta ? "What we are considering" : "What shapes your quote"}
              </h4>
              <p>{selected.factors}</p>
            </div>
            {beta ? (
              <Link className="bj-action" to="/studios/grow">
                Explore Beta
                <ArrowRight size={18} />
              </Link>
            ) : (
              <button className="bj-action" onClick={requestQuote}>
                Request Quote
                <ArrowRight size={18} />
              </button>
            )}
            {beta && (
              <p className="bj-beta-notice">
                BETA / COMING SOON. Explore illustrative concepts only. No
                service is purchased, campaign launched or interest submitted.
              </p>
            )}
          </div>
        </div>
        <div className="bj-package-note">
          <span>NO ONE-SIZE-FITS-ALL PRICE.</span>
          <p>
            Costs, timing, third-party fees and revision terms are confirmed
            around an agreed scope. Your selections start the conversation; they
            are not a purchase.
          </p>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section
      className="bj-section bj-about"
      id="about"
      data-surface="light"
      aria-labelledby="v14-about-title"
    >
      <div className="bj-wrap">
        <div className="bj-about-top">
          <span className="bj-kicker">08 / BEHIND MAKENDLESS</span>
          <span className="bj-about-signature" aria-hidden="true">
            M<span>↗</span>
          </span>
        </div>
        <h2 id="v14-about-title" data-motion="typography">
          Creative minds.
          <br />
          <span>Technical thinking.</span>
        </h2>
        <div className="bj-about-bottom">
          <p className="bj-about-statement">
            We care about the way
            <br />
            it <em>feels.</em>
            <br />
            And the way it <em>works.</em>
          </p>
          <div>
            <p>
              MAKENDLESS brings video editing and website development into one
              creative conversation, with digital marketing in Beta / Coming
              Soon. A strong idea deserves both a distinctive expression and
              thoughtful execution.
            </p>
            <dl>
              <div>
                <dt>01 / Clarity</dt>
                <dd>Make the message easy to understand.</dd>
              </div>
              <div>
                <dt>02 / Craft</dt>
                <dd>Give the details a reason to exist.</dd>
              </div>
              <div>
                <dt>03 / Connection</dt>
                <dd>Keep the people using it at the center.</dd>
              </div>
            </dl>
            <Link className="bj-text-action" to="/about">
              Get to know the studio <ArrowUpRight size={19} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
const process = [
  {
    name: "Discover",
    title: "Start with the right questions.",
    text: "Your goals, your audience and the work you already have. Find the useful starting point.",
  },
  {
    name: "Design",
    title: "Give the idea a direction.",
    text: "Shape the story, interface or campaign concept. Agree what the project needs to do.",
  },
  {
    name: "Create",
    title: "Make. Review. Refine.",
    text: "Bring the direction to life, with room for considered feedback against the agreed scope.",
  },
  {
    name: "Deliver",
    title: "Ready for its next chapter.",
    text: "Prepare the agreed outputs, access and handover details. Discuss what comes next.",
  },
];
const faqs = [
  {
    question: "How do I start a project?",
    answer:
      "Tell us your name, email and a little about the idea through Start a Project. You can bring a package selection or a Project Lab brief. The current inquiry form prepares a local draft; it does not send a message.",
  },
  {
    question: "What should I prepare?",
    answer:
      "Your goal, references you like and any existing brand assets are useful. For editing, describe your source footage. For a website, think about the content and features you need. A finished brief is not required.",
  },
  {
    question: "How does pricing work?",
    answer:
      "The estimate depends on scope, source material, complexity, integrations and timing. No fixed prices are published here. Costs, inclusions and external fees need to be agreed before work begins.",
  },
  {
    question: "What about revisions?",
    answer:
      "Review rounds and how changes are handled should be agreed in the project scope. This site does not promise a fixed or unlimited revision allowance.",
  },
  {
    question: "What happens at delivery?",
    answer:
      "Handover follows the agreed outputs: edited files, website access or agreed creative materials, for example. Confirm formats, responsibilities, hosting and any training as part of the scope.",
  },
  {
    question: "Can we discuss ongoing support?",
    answer:
      "Yes. Website Redesign & Maintenance is part of the service catalogue. Updates and support requirements can be scoped for your website; an ongoing plan is not added automatically.",
  },
];
export function ProcessSection() {
  return (
    <section
      className="bj-section bj-process"
      id="process"
      data-surface="light"
      aria-labelledby="v14-process-title"
    >
      <div className="bj-wrap">
        <header className="bj-heading">
          <span className="bj-kicker">06 / A CLEAR WAY FORWARD</span>
          <h2 id="v14-process-title" data-motion="typography">
            From idea
            <br />
            to delivery.
          </h2>
          <p>
            Good work starts with a good conversation. Here’s the shape of the
            journey.
          </p>
        </header>
        <ol className="bj-process-steps">
          {process.map((step, index) => (
            <li key={step.name}>
              <div>
                <span>0{index + 1}</span>
                <ArrowRight size={20} aria-hidden="true" />
              </div>
              <h3>{step.name}</h3>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="bj-faq">
          <div>
            <span className="bj-kicker">BEFORE WE BEGIN</span>
            <h3>
              A little clarity
              <br />
              goes a long way.
            </h3>
            <Link to="/contact">
              Talk about your idea <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="bj-faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary>
                  <span>0{index + 1}</span>
                  <strong>{faq.question}</strong>
                  <Plus size={19} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
            <Link className="bj-faq-more" to="/faq">
              More questions, answered <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
