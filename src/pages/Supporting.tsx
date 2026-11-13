import { lazy, Suspense, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Clapperboard,
  Code2,
  GitBranch,
  Layers,
  Plus,
  RotateCcw,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { services, worldInfo } from "../data";
import { useProject } from "../project";
import ServiceDemo from "../components/ServiceDemo";
import "../supporting.css";
const SpatialStudy = lazy(() => import("../components/LiveShowcase"));

const concepts = [
  {
    number: "01",
    anchor: "outside",
    name: "A moment, reimagined.",
    type: "Motion & visual storytelling",
    className: "film",
    service: "V3",
    description:
      "An original studio exercise in rhythm, composition and visual identity. An outdoor photograph becomes a typography-led motion concept.",
    deliverables: [
      "Visual treatment",
      "Motion direction",
      "Vertical & landscape concepts",
    ],
  },
  {
    number: "02",
    anchor: "still",
    name: "Small business. Big presence.",
    type: "Website & booking experience",
    className: "website",
    service: "T1",
    description:
      "An illustrative digital home for a neighborhood business, bringing thoughtful design and a simple booking journey together.",
    deliverables: ["Responsive interface", "Booking flow", "Design system"],
  },
  {
    number: "03",
    anchor: "workflow",
    name: "A little less busywork.",
    type: "Automation & human oversight",
    className: "automation",
    service: "T4",
    description:
      "An example inquiry workflow that helps organize requests, prepare a draft and keep the final decision with a person.",
    deliverables: ["Workflow concept", "Inquiry routing", "Human review step"],
  },
];

type ConceptKind = "film" | "website" | "automation";
const workflowNotes = [
  "A sample website inquiry arrives with a business name and project goal.",
  "The request is sorted into website planning. A suggested next step is prepared.",
  "A person checks the details and edits the draft. Nothing is sent automatically.",
];

function ConceptArt({
  kind,
  directed = true,
  mobile = false,
  step = 0,
}: {
  kind: ConceptKind;
  directed?: boolean;
  mobile?: boolean;
  step?: number;
}) {
  if (kind === "film")
    return (
      <div
        className={`concept-art concept-art-film ${directed ? "is-directed" : "is-source"}`}
        aria-hidden="true"
      >
        <img
          className="concept-film-image"
          src="/images/mountain.jpg"
          alt=""
          width="1400"
          height="933"
          loading="lazy"
        />
        <div className="concept-film-meta">
          <span>MAKENDLESS / MOTION STUDY</span>
          <span>
            {directed ? "THE VISUAL DIRECTION" : "THE SOURCE PHOTOGRAPH"}
          </span>
        </div>
        {directed && (
          <div className="concept-film-title" key="direction">
            A moment.
            <br />
            <em>A feeling.</em>
            <br />A story.
          </div>
        )}
        <div className="concept-film-track">
          {Array.from({ length: 32 }, (_, i) => (
            <i key={i} style={{ height: `${8 + ((i * 17) % 27)}px` }} />
          ))}
        </div>
        <div className="concept-art-caption">
          {directed ? "CROP / COLOUR / TYPOGRAPHY" : "UNTREATED SOURCE"}
        </div>
      </div>
    );
  if (kind === "website")
    return (
      <div
        className={`concept-art concept-art-website ${mobile ? "shows-mobile" : "shows-desktop"}`}
        aria-hidden="true"
      >
        <span className="concept-canvas-note">
          STILL. / A CAFÉ WEBSITE CONCEPT
        </span>
        <div className="concept-browser">
          <div className="concept-browser-bar">
            <i />
            <i />
            <i />
            <span>YOUR BUSINESS, REIMAGINED</span>
          </div>
          <div className="concept-mini-site">
            <div className="concept-mini-nav">
              <b>still.</b>
              <span>Good things, every day.</span>
            </div>
            <div className="concept-mini-hero">
              <img
                src="/images/coffee.jpg"
                alt=""
                width="1200"
                height="800"
                loading="lazy"
              />
              <span>A LITTLE SLOWER. A LITTLE BETTER.</span>
              <strong>
                A place for
                <br />
                good things.
              </strong>
              <div className="concept-mini-button">Find your moment ↗</div>
            </div>
            <div className="concept-mini-grid">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
        <div className="concept-phone">
          <span>YOUR NEXT VISIT</span>
          <b>
            Make time
            <br />
            for you.
          </b>
          <div className="concept-phone-days">
            <i>12</i>
            <i>13</i>
            <i>14</i>
          </div>
          <div className="concept-phone-slot">
            10:30 AM <Check size={12} />
          </div>
          <span>Illustrative booking</span>
        </div>
      </div>
    );
  return (
    <div className="concept-art concept-art-automation" aria-hidden="true">
      <div className="concept-automation-kicker">
        LESS BUSYWORK. MORE HUMAN.
      </div>
      {[
        {
          label: "CUSTOMER INQUIRY",
          title: "A new possibility.",
          Icon: CircleHelp,
        },
        {
          label: "ORGANIZE & PREPARE",
          title: "A clearer next step.",
          Icon: GitBranch,
        },
        {
          label: "HUMAN REVIEW",
          title: "People stay in the loop.",
          Icon: Check,
        },
      ].map(({ label, title, Icon }, i) => (
        <div className="concept-flow-step" key={label}>
          {i > 0 && (
            <div
              className={`concept-flow-line ${step >= i ? "is-connected" : ""}`}
            />
          )}
          <div
            className={`concept-flow-node ${step === i ? "is-current" : ""} ${step > i ? "is-complete" : ""}`}
          >
            <span className="concept-node-icon">
              <Icon size={19} />
            </span>
            <div>
              <small>
                0{i + 1} / {label}
              </small>
              <b>{title}</b>
            </div>
            {step > i && <Check className="concept-node-check" size={15} />}
          </div>
        </div>
      ))}
      <div className="concept-art-caption">
        SIMULATED WORKFLOW / STEP {step + 1} OF 3
      </div>
    </div>
  );
}

const caseNotes = [
  {
    question: "How can one photograph become a story?",
    approach:
      "Start with the feeling. A close crop gives the landscape a point of view; a restrained colour treatment and three short lines create a visual rhythm.",
    result:
      "A direction for a short promotional edit, with space for captions and a clear sequence of opening, build and close. The preview is a photo-motion study, not finished video footage.",
  },
  {
    question: "How does a first visit become a next visit?",
    approach:
      "Give the business a distinct digital home, then bring the useful actions close: discover the place, find the details and choose a visit. The layout adapts around the task on mobile.",
    result:
      "A responsive website and booking concept that can be scoped together. The illustrated time selection is a design example; the BUILD studio includes the working mock booking flow.",
  },
  {
    question: "What should happen after a new inquiry?",
    approach:
      "Make the handoff visible. Capture the request, organize it by need, and prepare a suggested next step. Keep the person who understands the business in control.",
    result:
      "A three-stage workflow prototype with an explicit human review point. No external service runs and no message is sent by this simulation.",
  },
];

function ConceptProject({
  concept,
  index,
  activeStudy,
  onStudyChange,
}: {
  concept: (typeof concepts)[number];
  index: number;
  activeStudy: string | null;
  onStudyChange: (study: string | null) => void;
}) {
  const [directed, setDirected] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [step, setStep] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const note = caseNotes[index];
  const kind = concept.className as ConceptKind;
  return (
    <article
      className={`concept-project concept-project-${kind}`}
      id={concept.anchor}
    >
      <div
        className="concept-project-visual"
        data-motion={
          kind === "film"
            ? "mask"
            : kind === "website"
              ? "spatial"
              : "transform"
        }
      >
        <ConceptArt
          kind={kind}
          directed={directed}
          mobile={mobile}
          step={step}
        />
        <span className="concept-label">CONCEPT PROJECT</span>
      </div>
      <div className="concept-project-info" data-motion="editorial">
        <div className="concept-project-category">
          <span>
            {concept.number} / {concept.type}
          </span>
          <ArrowUpRight size={22} />
        </div>
        <h2>{concept.name}</h2>
        <p>{concept.description}</p>
        <div
          className="concept-preview-controls"
          role="group"
          aria-label={`${concept.type} preview`}
        >
          {kind === "film" ? (
            <>
              <button
                aria-pressed={!directed}
                onClick={() => setDirected(false)}
              >
                Source
              </button>
              <button aria-pressed={directed} onClick={() => setDirected(true)}>
                Art direction
              </button>
            </>
          ) : kind === "website" ? (
            <>
              <button aria-pressed={!mobile} onClick={() => setMobile(false)}>
                Desktop composition
              </button>
              <button aria-pressed={mobile} onClick={() => setMobile(true)}>
                Mobile composition
              </button>
            </>
          ) : (
            <>
              <button
                disabled={step === 2}
                onClick={() => setStep((s) => Math.min(s + 1, 2))}
              >
                {step === 2 ? "Ready for human review" : "Follow the inquiry"}
                <ArrowRight size={15} />
              </button>
              <button
                aria-label="Reset concept workflow"
                onClick={() => setStep(0)}
              >
                <RotateCcw size={15} />
              </button>
            </>
          )}
        </div>
        <p className="concept-preview-note" role="status">
          {kind === "film"
            ? directed
              ? "Directed treatment: crop, colour and typography."
              : "Source view: the original landscape photograph."
            : kind === "website"
              ? mobile
                ? "Mobile composition: a focused view of the visit and booking concept."
                : "Desktop composition: the website and booking experience together."
              : workflowNotes[step]}
        </p>
        <button
          className="concept-study-toggle supporting-text-link"
          aria-expanded={expanded}
          aria-controls={expanded ? `case-study-${kind}` : undefined}
          onClick={() => {
            setExpanded(!expanded);
            if (expanded && activeStudy === kind) onStudyChange(null);
          }}
        >
          {expanded ? "Close the project notes" : "Inside the concept"}
          <Plus size={17} />
        </button>
      </div>
      {expanded && (
        <div className="concept-case-study" id={`case-study-${kind}`}>
          <div className="case-study-question">
            <span className="eyebrow">THE STARTING QUESTION</span>
            <h3>{note.question}</h3>
          </div>
          <div>
            <span className="eyebrow">THE CREATIVE DECISION</span>
            <p>{note.approach}</p>
            <span className="eyebrow">WHAT TAKES SHAPE</span>
            <p>{note.result}</p>
            <ul className="concept-deliverables">
              {concept.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <div className="case-study-actions">
              <Link
                className="supporting-text-link"
                to={`/services/${concept.service}`}
              >
                Try the capability <ArrowRight size={17} />
              </Link>
              <button
                className="supporting-text-link"
                aria-expanded={activeStudy === kind}
                onClick={() =>
                  onStudyChange(activeStudy === kind ? null : kind)
                }
              >
                {activeStudy === kind
                  ? "Close spatial study"
                  : "Open spatial study"}
                <Layers size={17} />
              </button>
            </div>
          </div>
          {activeStudy === kind && (
            <section
              className="case-spatial-study"
              aria-label={`${concept.type} spatial study`}
            >
              <p className="eyebrow">EXPLORE THE SERVICE IN SPACE</p>
              <p>
                A related interactive study of the capability behind this
                concept.
              </p>
              <Suspense fallback={<p role="status">Opening the study…</p>}>
                <SpatialStudy
                  key={kind}
                  initialMode={
                    kind === "film"
                      ? "create"
                      : kind === "website"
                        ? "build"
                        : "ai"
                  }
                  variant="study"
                  showModeSwitch={false}
                />
              </Suspense>
            </section>
          )}
        </div>
      )}
    </article>
  );
}

export function Work() {
  const [activeStudy, setActiveStudy] = useState<string | null>(null);
  return (
    <div className="page-shell supporting-page work-page">
      <header
        className="page-heading supporting-heading"
        data-motion="typography"
      >
        <p className="eyebrow">OUR WORK / STUDIO EXPLORATIONS</p>
        <h1>
          Possibilities,
          <br />
          <span className="supporting-soft">made visible.</span>
        </h1>
        <p>
          Three starting points. Three different ways to make an idea tangible.
          Explore the creative decisions, then try the possibilities yourself.
        </p>
        <div className="concept-disclaimer">
          <Layers size={17} />
          <span>Concept projects — not commissioned client work.</span>
        </div>
      </header>
      <nav className="work-index" aria-label="Explore concept projects">
        {concepts.map((c) => (
          <a key={c.number} href={`#${c.anchor}`}>
            <span>{c.number}</span>
            {c.type}
            <ArrowDown size={15} />
          </a>
        ))}
      </nav>
      <section className="concept-projects" aria-label="Concept projects">
        {concepts.map((concept, index) => (
          <ConceptProject
            key={concept.number}
            concept={concept}
            index={index}
            activeStudy={activeStudy}
            onStudyChange={setActiveStudy}
          />
        ))}
      </section>
      <aside className="supporting-end-cta" data-motion="prism">
        <p className="eyebrow">YOUR IDEA COULD BE NEXT</p>
        <h2>
          Let’s make something
          <br />
          that feels like you.
        </h2>
        <Link className="button button-primary" to="/project-lab">
          Shape your project <ArrowUpRight size={18} />
        </Link>
      </aside>
    </div>
  );
}

export function Process({ compact = false }: { compact?: boolean }) {
  const steps = [
    [
      "DISCOVER",
      "Your idea, understood.",
      "We listen, ask useful questions and agree on what matters.",
    ],
    [
      "DESIGN",
      "A direction, together.",
      "We shape the experience and find the right creative approach.",
    ],
    [
      "CREATE",
      "The details, considered.",
      "We build, share progress and refine with your feedback.",
    ],
    [
      "DELIVER",
      "Ready for what’s next.",
      "We check the work, prepare the handover and help you move forward.",
    ],
  ];
  return (
    <section
      className={`process-section ${compact ? "process-compact" : ""}`}
      aria-labelledby="process-heading"
    >
      <div className="process-heading-row">
        <div>
          <p className="eyebrow">HOW WE WORK</p>
          <h2 id="process-heading">
            From first thought.
            <br />
            To something real.
          </h2>
        </div>
        <p>
          A clear path. A shared vision.
          <br />
          Room for the good ideas.
        </p>
      </div>
      <ol className="process-steps">
        {steps.map(([title, subtitle, detail], index) => (
          <li key={title}>
            <div className="process-step-top">
              <span>0{index + 1}</span>
              {index === 3 ? <Check size={19} /> : <ArrowRight size={19} />}
            </div>
            <h3>{title}</h3>
            <strong>{subtitle}</strong>
            <p>{detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const principles = [
  {
    name: "Find the focus",
    title: "A good idea needs a clear point of view.",
    text: "Before we edit a frame or build a page, we agree on what the work should communicate and who it should help.",
    mark: "01 / INTENTION",
  },
  {
    name: "Make it useful",
    title: "The experience should earn its place.",
    text: "A beautiful transition, a booking flow or an automation should make the next step easier. We connect the creative idea to a practical purpose.",
    mark: "02 / PURPOSE",
  },
  {
    name: "Care for the details",
    title: "Small decisions make the whole feel right.",
    text: "We refine the rhythm, the wording and the way things respond. Then we check the result together and prepare a thoughtful handover.",
    mark: "03 / CRAFT",
  },
];
function StudioPrinciples() {
  const [active, setActive] = useState(0);
  const principle = principles[active];
  return (
    <section className="studio-principles" aria-labelledby="principles-title">
      <div className="principles-heading">
        <p className="eyebrow">OUR WORKING BELIEFS</p>
        <h2 id="principles-title">Thoughtful by intention.</h2>
      </div>
      <div
        className="principle-selector"
        role="group"
        aria-label="Explore our working beliefs"
      >
        {principles.map((p, i) => (
          <button
            key={p.name}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {p.name}
            <ArrowRight size={17} />
          </button>
        ))}
      </div>
      <div className="principle-story" aria-live="polite" key={active}>
        <span>{principle.mark}</span>
        <h3>{principle.title}</h3>
        <p>{principle.text}</p>
      </div>
    </section>
  );
}

export function About() {
  return (
    <div className="page-shell supporting-page about-page">
      <header
        className="page-heading supporting-heading"
        data-motion="typography"
      >
        <p className="eyebrow">ABOUT MAKENDLESS</p>
        <h1>
          Made of curiosity.
          <br />
          <span className="supporting-soft">Built on possibility.</span>
        </h1>
        <p>
          We are a developing creative and technology studio for people with
          something to make, a story to tell, or a business to move forward.
        </p>
      </header>
      <section
        className="about-manifesto"
        aria-label="Our philosophy"
        data-motion="editorial"
      >
        <div
          className="about-word-art"
          aria-hidden="true"
          data-motion="transform"
        >
          <span>MAKE</span>
          <div className="about-word-line" />
          <span>
            ENDLESS<span className="about-dot">.</span>
          </span>
          <small>ACTION × POSSIBILITY</small>
        </div>
        <div className="about-manifesto-copy">
          <p className="eyebrow">THE IDEA BEHIND THE NAME</p>
          <h2>
            Make is the action.
            <br />
            Endless is the ambition.
          </h2>
          <p>
            MAKENDLESS connects creativity and technology. We edit videos, build
            websites and develop useful digital solutions that help businesses
            communicate and work better.
          </p>
          <p>
            We believe good work comes from thoughtful decisions, open
            conversations and care for the details. No unnecessary complexity.
            Just a shared effort to make the right thing.
          </p>
        </div>
      </section>
      <section
        className="about-divisions"
        aria-label="Our three divisions"
        data-motion="editorial"
      >
        <Link to="/studios/create">
          <Clapperboard size={24} />
          <span>01 / CREATE</span>
          <h2>Stories that move.</h2>
          <p>
            Video editing and creative production that bring your ideas into
            focus.
          </p>
          <ArrowUpRight size={23} />
        </Link>
        <Link to="/studios/build">
          <Code2 size={24} />
          <span>02 / BUILD</span>
          <h2>Ideas made real.</h2>
          <p>
            Websites, custom applications and AI solutions with a useful
            purpose.
          </p>
          <ArrowUpRight size={23} />
        </Link>
        <Link to="/studios/grow">
          <GitBranch size={24} />
          <span>
            03 / GROW <small>BETA</small>
          </span>
          <h2>The next chapter.</h2>
          <p>Digital marketing services in development. Coming soon.</p>
          <ArrowUpRight size={23} />
        </Link>
      </section>
      <StudioPrinciples />
      <Process />
      <aside className="supporting-end-cta" data-motion="prism">
        <p className="eyebrow">LET’S FIND THE RIGHT START</p>
        <h2>
          You bring the idea.
          <br />
          We’ll bring the curiosity.
        </h2>
        <Link to="/contact" className="button button-primary">
          Start a project <ArrowUpRight size={18} />
        </Link>
      </aside>
    </div>
  );
}

const faqs = [
  [
    "What does MAKENDLESS do?",
    "MAKENDLESS is a creative and technology studio. CREATE covers five video editing and creative production services. BUILD covers business websites, e-commerce, booking systems, automation and maintenance. GROW is our digital marketing division, currently in beta and coming soon.",
  ],
  [
    "I am not sure which services I need. Where should I begin?",
    "Try Find My Solution for a short guided journey, or use the Project Lab to combine a website, booking system, promotional video and AI assistant. You can change or remove choices before preparing your project brief.",
  ],
  [
    "Can I combine video editing and website development?",
    "Yes. Choose services from different studios and bring them together in the Project Lab. Your brief will keep the selected services in one place so the project can be discussed as a whole.",
  ],
  [
    "Are the demos and portfolio projects real client work?",
    "The current demonstrations and portfolio projects are original illustrative concepts. They are clearly labeled and do not represent completed client engagements, verified results or live business systems. Demo bookings, payments and AI responses are simulated.",
  ],
  [
    "Are your digital marketing services available now?",
    "Not yet. All GROW services are Beta / Coming Soon. You may include interest in these services in a project brief, but that does not book work or confirm their availability.",
  ],
  [
    "How much will my project cost, and how long will it take?",
    "Scope, complexity, deliverables and timing affect every project. Share your goals, preferred timeline and approximate budget in the brief. The website does not generate binding quotes or guarantee delivery dates.",
  ],
  [
    "What should I prepare before starting?",
    "A short description of your business, the problem you want to solve, any existing brand assets or source footage, and your preferred timeline are useful starting points. You do not need a complete technical specification.",
  ],
  [
    "Does this website send my project inquiry?",
    "This version is a working website demonstration with no connected inquiry backend. You can prepare, preview and download your inquiry, but it is not delivered to MAKENDLESS. Do not include sensitive information. Your selections stay in memory during this browsing session and reset when the page reloads.",
  ],
  [
    "Can I use the website with a keyboard or reduced motion?",
    "Yes. Navigation and demo controls support keyboard use, and decorative motion respects your system’s reduced-motion preference. The experience remains usable without waiting for animation.",
  ],
];

export function FAQ() {
  const [query, setQuery] = useState("");
  const matching = faqs
    .map(([q, a], index) => ({ q, a, index }))
    .filter(({ q, a }) =>
      `${q} ${a}`.toLowerCase().includes(query.trim().toLowerCase()),
    );
  return (
    <div className="page-shell supporting-page faq-page">
      <header
        className="page-heading supporting-heading"
        data-motion="typography"
      >
        <p className="eyebrow">A LITTLE CLARITY</p>
        <h1>
          Good questions.
          <br />
          <span className="supporting-soft">Straight answers.</span>
        </h1>
        <p>
          A few things you might like to know before we make something together.
        </p>
      </header>
      <div className="faq-layout">
        <aside>
          <label className="faq-search">
            <span>Find an answer</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “booking” or “cost”…"
            />
          </label>
          <p className="faq-search-count" role="status">
            {query
              ? `${matching.length} matching ${matching.length === 1 ? "answer" : "answers"}`
              : "A guide to getting started"}
          </p>
          <CircleHelp size={34} />
          <h2>
            Still finding
            <br />
            your direction?
          </h2>
          <p>
            Turn a few simple answers into a starting point for your project.
          </p>
          <Link to="/find-solution" className="supporting-text-link">
            Find my solution <ArrowRight size={17} />
          </Link>
        </aside>
        <div className="faq-list">
          {matching.length === 0 && (
            <div className="faq-empty">
              <h2>No answer found yet.</h2>
              <p>
                Try a shorter phrase, or explore Find My Solution to choose a
                starting point.
              </p>
              <button
                className="supporting-text-link"
                onClick={() => setQuery("")}
              >
                Show all answers <ArrowRight size={17} />
              </button>
            </div>
          )}
          {matching.map(({ q, a, index }) => (
            <details key={q}>
              <summary>
                <span className="faq-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{q}</span>
                <Plus size={20} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <LegalLayout
      title="Privacy policy"
      intro="A plain-language description of this website’s current demo behavior. This draft needs legal review before a production launch."
    >
      <LegalSection title="1. This is a local website demo">
        The inquiry experience does not connect to a delivery service or
        database. Clicking “Preview inquiry” does not send a message to
        MAKENDLESS. Do not enter confidential, financial, medical or other
        sensitive information.
      </LegalSection>
      <LegalSection title="2. Information you enter">
        The website lets you enter a name, email, business details and project
        requirements. Form values and project selections are held in the running
        page’s memory. The application does not save them to local storage,
        cookies or a backend. Reloading or closing the page clears this
        application state.
      </LegalSection>
      <LegalSection title="3. Copying and downloading">
        When you choose to copy a brief, it is placed on your device’s
        clipboard. When you download an inquiry, it becomes a file on your
        device. You control those copies and any subsequent sharing.
      </LegalSection>
      <LegalSection title="4. Fonts, analytics and hosting">
        Syne is served with the website assets. This application does not
        include an analytics or advertising tracker. A future hosting provider
        may process ordinary connection information, such as IP addresses and
        request logs, under its own policies. Production hosting and retention
        practices have not yet been defined.
      </LegalSection>
      <LegalSection title="5. Before this becomes a live service">
        A production version will need verified business contact details,
        applicable legal disclosures, a defined delivery provider, retention
        rules and a way to make privacy requests. This draft does not claim that
        those arrangements are already in place.
      </LegalSection>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout
      title="Terms of service"
      intro="Draft terms for the current demonstration website. These are not finalized commercial terms and require legal review before production use."
    >
      <LegalSection title="1. About this experience">
        MAKENDLESS presents video editing, website development and AI solution
        capabilities through interactive demonstrations. All mock storefronts,
        bookings, campaign data and workflow responses are illustrative. They do
        not create real transactions, reservations or customer communications.
      </LegalSection>
      <LegalSection title="2. Project inquiries and estimates">
        Preparing or previewing an inquiry does not submit an order, form a
        service agreement, reserve capacity or guarantee a price or timeline. In
        this version, inquiries are not transmitted. A live engagement would
        require an agreed scope and commercial terms.
      </LegalSection>
      <LegalSection title="3. GROW availability">
        Digital marketing services are marked Beta / Coming Soon. Expressing
        interest is not a booking or a promise that a service will launch on a
        particular date.
      </LegalSection>
      <LegalSection title="4. Portfolio concepts and results">
        The showcased concept projects are design demonstrations, not
        commissioned customer work. No client relationships, testimonials,
        performance improvements or business results are implied.
      </LegalSection>
      <LegalSection title="5. Responsible use">
        Use the demonstrations for exploring ideas. Do not enter sensitive
        information or try to interfere with the website’s operation. Any
        content supplied for a future project must be used with appropriate
        permission.
      </LegalSection>
      <LegalSection title="6. Before a commercial launch">
        Final terms must define the verified business identity, applicable
        jurisdiction, payment arrangements, revisions, intellectual property,
        cancellation and support obligations. These details have not been
        supplied and are not invented in this draft.
      </LegalSection>
    </LegalLayout>
  );
}

function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page-shell supporting-page legal-page">
      <header className="page-heading">
        <p className="eyebrow">DRAFT / PENDING LEGAL REVIEW</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="legal-document">{children}</div>
      <Link to="/contact" className="supporting-text-link">
        Explore the inquiry demo <ArrowRight size={17} />
      </Link>
    </div>
  );
}
function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
}

export function ServiceDetail() {
  const { id } = useParams();
  const service = services.find(
    (s) => s.id.toLowerCase() === id?.toLowerCase(),
  );
  const { project, toggleService } = useProject();
  if (!service) return <NotFound />;
  const selected = project.services.includes(service.id);
  return (
    <div
      className={`page-shell supporting-page service-detail service-world-${service.world}`}
      data-service={service.id}
    >
      <header
        className="page-heading supporting-heading"
        data-motion="typography"
      >
        <Link className="service-back" to={`/studios/${service.world}`}>
          {worldInfo[service.world].label} STUDIO <ArrowUpRight size={15} />
        </Link>
        <p className="eyebrow">
          {service.id} /{" "}
          {service.world === "grow"
            ? "BETA / COMING SOON"
            : "EXPLORE THE CAPABILITY"}
        </p>
        <h1>{service.name}</h1>
        <p>{service.description}</p>
        <div className="service-detail-actions">
          <button
            className={`button ${selected ? "button-secondary" : "button-primary"}`}
            onClick={() => toggleService(service.id)}
          >
            {selected ? <Check size={18} /> : <Plus size={18} />}
            {selected
              ? "Remove from project"
              : service.world === "grow"
                ? "Add future interest"
                : "Add to my project"}
          </button>
          <Link className="button button-secondary" to="/project-lab">
            Open Project Lab <ArrowUpRight size={18} />
          </Link>
        </div>
        {service.world === "grow" && (
          <p className="service-beta-note">
            This service is not yet launched. Adding it records your interest
            only.
          </p>
        )}
      </header>
      <div className="service-intention">
        <span>THE IDEA</span>
        <p>
          {service.world === "create"
            ? "Give your story a form people can feel."
            : service.world === "build"
              ? "Turn a business need into a useful digital experience."
              : "Explore a considered direction for future growth."}
        </p>
        <a href="#service-experience">
          Experience it below <ArrowDown size={15} />
        </a>
      </div>
      <section
        id="service-experience"
        className="service-detail-demo"
        data-motion="spatial"
        aria-label={`${service.short} interactive demo`}
      >
        <div className="service-demo-heading">
          <span className="eyebrow">TRY THE IDEA</span>
          <span>
            Illustrative demonstration <ArrowDown size={15} />
          </span>
        </div>
        <ServiceDemo id={service.id} />
      </section>
      <section className="service-deliverables" data-motion="editorial">
        <div>
          <p className="eyebrow">WHAT WE CAN EXPLORE</p>
          <h2>
            {service.world === "grow"
              ? "The planned direction."
              : "A starting point for your project."}
          </h2>
          <p>Exact deliverables are defined together around your goals.</p>
        </div>
        <ul>
          {service.deliverables.map((d, index) => (
            <li key={d}>
              <span>0{index + 1}</span>
              {d}
              <Check size={18} />
            </li>
          ))}
        </ul>
      </section>
      <aside className="supporting-end-cta">
        <h2>Let’s make it yours.</h2>
        <Link className="button button-primary" to="/contact">
          Start a project <ArrowUpRight size={18} />
        </Link>
      </aside>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="page-shell not-found">
      <p className="eyebrow">404 / A LITTLE DETOUR</p>
      <h1>
        This page hasn’t
        <br />
        been made yet.
      </h1>
      <p>There’s plenty to explore. Let’s take you somewhere useful.</p>
      <div className="service-detail-actions">
        <Link className="button button-primary" to="/">
          Back to home <ArrowRight size={18} />
        </Link>
        <Link className="button button-secondary" to="/project-lab">
          Explore Project Lab
        </Link>
      </div>
    </div>
  );
}
