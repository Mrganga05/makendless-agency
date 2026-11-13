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
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { services, worldInfo } from "../data";
import { useProject } from "../project";
import ServiceDemo from "../components/ServiceDemo";
import "../supporting.css";

const concepts = [
  {
    number: "01",
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
    name: "A little less busywork.",
    type: "Automation & human oversight",
    className: "automation",
    service: "T4",
    description:
      "An example inquiry workflow that helps organize requests, prepare a draft and keep the final decision with a person.",
    deliverables: ["Workflow concept", "Inquiry routing", "Human review step"],
  },
];

function ConceptArt({ kind }: { kind: string }) {
  if (kind === "film")
    return (
      <div className="concept-art concept-art-film" aria-hidden="true">
        <div className="concept-film-meta">
          <span>MAKENDLESS / MOTION STUDY</span>
          <span>01:24</span>
        </div>
        <div className="concept-orbit orbit-one" />
        <div className="concept-orbit orbit-two" />
        <div className="concept-orbit orbit-three" />
        <div className="concept-film-title">
          Make
          <br />
          <em>a little</em>
          <br />
          noise.
        </div>
        <div className="concept-film-track">
          {Array.from({ length: 20 }, (_, i) => (
            <i key={i} style={{ height: `${10 + ((i * 17) % 27)}px` }} />
          ))}
        </div>
        <div className="concept-art-caption">FORM / FEELING / FORWARD</div>
      </div>
    );
  if (kind === "website")
    return (
      <div className="concept-art concept-art-website" aria-hidden="true">
        <div className="concept-browser">
          <div className="concept-browser-bar">
            <i />
            <i />
            <i />
            <span>YOUR BUSINESS, REIMAGINED</span>
          </div>
          <div className="concept-mini-site">
            <div className="concept-mini-nav">
              <b>The everyday studio.</b>
              <span>Explore ↗</span>
            </div>
            <div className="concept-mini-hero">
              <span>ROOM FOR SOMETHING NEW</span>
              <strong>
                A little space.
                <br />A fresh start.
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
      <div className="concept-automation-kicker">THOUGHTFUL CONNECTIONS</div>
      <div className="concept-flow-node">
        <span className="concept-node-icon">
          <CircleHelp size={19} />
        </span>
        <div>
          <small>01 / CUSTOMER INQUIRY</small>
          <b>A new possibility.</b>
        </div>
      </div>
      <div className="concept-flow-line" />
      <div className="concept-flow-node">
        <span className="concept-node-icon">
          <GitBranch size={19} />
        </span>
        <div>
          <small>02 / ORGANIZE & PREPARE</small>
          <b>A clearer next step.</b>
        </div>
      </div>
      <div className="concept-flow-line" />
      <div className="concept-flow-node concept-human-node">
        <span className="concept-node-icon">
          <Check size={19} />
        </span>
        <div>
          <small>03 / HUMAN REVIEW</small>
          <b>People stay in the loop.</b>
        </div>
      </div>
      <div className="concept-art-caption">SIMULATED WORKFLOW</div>
    </div>
  );
}

export function Work() {
  return (
    <div className="page-shell supporting-page">
      <header className="page-heading supporting-heading">
        <p className="eyebrow">OUR WORK / STUDIO EXPLORATIONS</p>
        <h1>
          Possibilities,
          <br />
          <span className="supporting-soft">made visible.</span>
        </h1>
        <p>
          Explore the thinking behind what we create. These original concept
          projects demonstrate our approach to design and technology.
        </p>
        <div className="concept-disclaimer">
          <Layers size={17} />
          <span>Concept projects — not commissioned client work.</span>
        </div>
      </header>
      <section className="concept-projects" aria-label="Concept projects">
        {concepts.map((c) => (
          <article
            className={`concept-project concept-project-${c.className}`}
            key={c.number}
          >
            <div className="concept-project-visual">
              <ConceptArt kind={c.className} />
              <span className="concept-label">CONCEPT PROJECT</span>
            </div>
            <div className="concept-project-info">
              <div className="concept-project-category">
                <span>
                  {c.number} / {c.type}
                </span>
                <ArrowUpRight size={22} />
              </div>
              <h2>{c.name}</h2>
              <p>{c.description}</p>
              <ul className="concept-deliverables">
                {c.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <Link
                className="supporting-text-link"
                to={`/services/${c.service}`}
              >
                Explore the capability <ArrowRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <aside className="supporting-end-cta">
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

export function About() {
  return (
    <div className="page-shell supporting-page">
      <header className="page-heading supporting-heading">
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
      <section className="about-manifesto" aria-label="Our philosophy">
        <div className="about-word-art" aria-hidden="true">
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
      <section className="about-divisions" aria-label="Our three divisions">
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
      <Process />
      <aside className="supporting-end-cta">
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
  return (
    <div className="page-shell supporting-page faq-page">
      <header className="page-heading supporting-heading">
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
          {faqs.map(([q, a], i) => (
            <details key={q}>
              <summary>
                <span className="faq-index">
                  {String(i + 1).padStart(2, "0")}
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
    <div className="page-shell supporting-page service-detail">
      <header className="page-heading supporting-heading">
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
      <section
        className="service-detail-demo"
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
      <section className="service-deliverables">
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
