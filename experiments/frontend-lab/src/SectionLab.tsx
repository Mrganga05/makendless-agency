import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { useLabSettings } from "./settings";
import "./sections.css";

const offerings = [
  {
    name: "CREATE",
    label: "Video & creative production",
    title: "Give the idea a voice.",
    text: "Editing, repurposing and motion graphics turn raw material into a clear story.",
    detail: "A caption-led edit with purpose and pacing.",
  },
  {
    name: "BUILD",
    label: "Websites & AI solutions",
    title: "Make it useful. Make it yours.",
    text: "Thoughtful websites and considered automation make a business easier to understand and interact with.",
    detail: "A responsive product page with a working next step.",
  },
  {
    name: "GROW",
    label: "Digital marketing · Beta / Coming Soon",
    title: "A considered next chapter.",
    text: "Planning concepts for content and digital presence. These services are not yet generally available.",
    detail: "An illustrative plan, not a live campaign.",
  },
];
export default function SectionLab() {
  const [cut, setCut] = useState("Tight");
  const [offering, setOffering] = useState(0);
  const [included, setIncluded] = useState<string[]>(["Website"]);
  const [slot, setSlot] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [reply, setReply] = useState(false);
  const [brief, setBrief] = useState("");
  const { reducedMotion } = useLabSettings();
  const active = offerings[offering];
  const toggle = (name: string) => {
    setIncluded((p) =>
      p.includes(name) ? p.filter((item) => item !== name) : [...p, name],
    );
    setBrief("");
    setConfirmed(false);
    setSlot("");
    setReply(false);
  };
  return (
    <div className="sl-lab" data-reduced={reducedMotion}>
      <header className="sl-intro">
        <span>EXPERIMENT 05 / SECTION COMPOSITION</span>
        <h2>
          Three rhythms.
          <br />
          One studio.
        </h2>
        <p>
          Compare a cinematic statement, an editorial service gallery and a
          useful project assembly. Each composition earns its space by doing
          something different.
        </p>
      </header>
      <section className="sl-cinema" aria-labelledby="sl-cinema-title">
        <div className="sl-cinema-copy">
          <span>01 / CINEMATIC DARK STUDIO</span>
          <h3 id="sl-cinema-title">
            A pause.
            <br />A point of view.
          </h3>
          <p>
            A fictional identity film told through type and a deliberately
            framed object.
          </p>
          <div role="group" aria-label="Compare cinematic framing">
            {["Wide", "Tight"].map((name) => (
              <button
                key={name}
                aria-pressed={cut === name}
                onClick={() => setCut(name)}
              >
                {name} cut
              </button>
            ))}
          </div>
          <p className="sl-cut-note" role="status">
            {cut === "Tight"
              ? "Tight cut: one subject carries the message."
              : "Wide cut: context becomes part of the story."}
          </p>
        </div>
        <div className={`sl-cinema-art sl-cut-${cut.toLowerCase()}`}>
          <div className="sl-film-object" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span className="sl-art-top">MAKENDLESS / ORIGINAL COMPOSITION</span>
          <strong>
            {cut === "Tight" ? "LESS.\nBUT BETTER." : "A LITTLE\nPERSPECTIVE."}
          </strong>
          <span className="sl-art-bottom">
            CONCEPT STUDY / NO CLIENT COMMISSION
          </span>
        </div>
      </section>
      <section className="sl-editorial" aria-labelledby="sl-editorial-title">
        <header>
          <span>02 / BRIGHT EDITORIAL DISCOVERY</span>
          <h3 id="sl-editorial-title">
            What do you
            <br />
            want to make?
          </h3>
          <p>Clear labels. Room for the work. A useful way into each studio.</p>
        </header>
        <div className="sl-editorial-layout">
          <div
            className="sl-service-index"
            role="group"
            aria-label="Explore studio capabilities"
          >
            {offerings.map((service, i) => (
              <button
                key={service.name}
                aria-pressed={offering === i}
                onClick={() => setOffering(i)}
              >
                <span>0{i + 1}</span>
                <strong>{service.name}</strong>
                <ArrowUpRight size={20} />
                <small>{service.label}</small>
              </button>
            ))}
          </div>
          <div
            className={`sl-service-feature sl-feature-${active.name.toLowerCase()}`}
            key={active.name}
          >
            <div className="sl-service-art" aria-hidden="true">
              {offering === 0 ? (
                <>
                  <span>WORD / FRAME / RHYTHM</span>
                  <strong>
                    MAKE
                    <br />A MARK<span>.</span>
                  </strong>
                  <div className="sl-edit-bars">
                    <i />
                    <i />
                    <i />
                  </div>
                </>
              ) : offering === 1 ? (
                <>
                  <div className="sl-browser-top">
                    parallel. <span>HELLO / WORK / CONTACT</span>
                  </div>
                  <div className="sl-browser-page">
                    <strong>
                      A good idea.
                      <br />
                      Well built.
                    </strong>
                    <div className="sl-page-window">
                      <i />
                      <i />
                    </div>
                    <span>From intention to interaction.</span>
                  </div>
                </>
              ) : (
                <>
                  <span>BETA / COMING SOON</span>
                  <div className="sl-plan-lines">
                    {["Understand", "Plan", "Review"].map((name, i) => (
                      <div key={name}>
                        <span>0{i + 1}</span>
                        <strong>{name}</strong>
                        <i />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <h4>{active.title}</h4>
            <p>{active.text}</p>
            <p className="sl-detail">{active.detail}</p>
            <a href="#live">
              Try a working component <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <section className="sl-project" aria-labelledby="sl-project-title">
        <div className="sl-project-controls">
          <span>03 / INTERACTIVE PROJECT PRESENTATION</span>
          <h3 id="sl-project-title">
            Small choices.
            <br />A working picture.
          </h3>
          <p>
            This local experiment starts with a website example. Choose what to
            include; no service is purchased or added to the main website.
          </p>
          <div role="group" aria-label="Project study components">
            {["Website", "Booking", "Assistant"].map((name) => (
              <button
                key={name}
                aria-pressed={included.includes(name)}
                onClick={() => toggle(name)}
              >
                {included.includes(name) ? (
                  <Check size={17} />
                ) : (
                  <Plus size={17} />
                )}{" "}
                {name}
              </button>
            ))}
          </div>
          <button
            className="sl-create-brief"
            onClick={() =>
              setBrief(
                included.length
                  ? `Project study: ${included.join(" + ")}. Scope and pricing remain to be discussed.`
                  : "Project study: no components selected. Start with a conversation.",
              )
            }
          >
            Describe this project <ArrowRight size={17} />
          </button>
          <p role="status">
            {brief ||
              `${included.length} ${included.length === 1 ? "component" : "components"} in this local example.`}
          </p>
        </div>
        <div
          className="sl-project-preview"
          aria-label="Assembled project preview"
        >
          {included.length === 0 ? (
            <div className="sl-project-empty">
              <strong>Start with a need.</strong>
              <p>
                Add a component when you are ready. The controls stay available.
              </p>
            </div>
          ) : null}
          {included.includes("Website") && (
            <article className="sl-module sl-module-site">
              <span>PARALLEL / A FICTIONAL BUSINESS</span>
              <h4>A clear introduction.</h4>
              <p>
                A useful place to explain what you do, show the details and
                invite a conversation.
              </p>
              <div aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </article>
          )}
          {included.includes("Booking") && (
            <article className="sl-module sl-module-booking">
              <span>MOCK APPOINTMENT</span>
              <h4>Choose a conversation.</h4>
              <div role="group" aria-label="Sample appointment time">
                {["10:00", "14:00"].map((time) => (
                  <button
                    key={time}
                    aria-pressed={slot === time}
                    onClick={() => {
                      setSlot(time);
                      setConfirmed(false);
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <button disabled={!slot} onClick={() => setConfirmed(true)}>
                Preview appointment
              </button>
              <p role="status">
                {confirmed
                  ? `Example appointment at ${slot}. Nothing is booked.`
                  : "Choose a time to preview. No calendar is connected."}
              </p>
            </article>
          )}
          {included.includes("Assistant") && (
            <article className="sl-module sl-module-chat">
              <span>SCRIPTED ASSISTANT</span>
              <h4>A helpful starting point.</h4>
              <p>
                {reply
                  ? "Share your goal, content and preferred timing. A person can then discuss the right scope."
                  : "Hello. I can explain what to prepare for a project conversation."}
              </p>
              <button onClick={() => setReply((value) => !value)}>
                {reply ? "Reset conversation" : "What should I prepare?"}
              </button>
            </article>
          )}
        </div>
      </section>
      <aside className="sl-study-note">
        <strong>Comparison hypothesis</strong>
        <p>
          The dark composition establishes mood, the light gallery clarifies the
          offer, and the project view makes scope concrete. These are original
          experiments; visual quality and mobile composition still require real
          browser review.
        </p>
      </aside>
    </div>
  );
}
