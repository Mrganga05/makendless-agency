import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { businesses, services } from "../data";
import { useProject } from "../project";
import { getPairings, recommendServices } from "../brief";
import "../flows.css";

const goals = [
  "Establish my online presence",
  "Tell my story through content",
  "Simplify everyday work",
  "Sell products online",
];
const discoveryServices = ["V1", "V3", "T1", "T2", "T3", "T4"];
const questions = [
  {
    eyebrow: "A LITTLE ABOUT YOU",
    title: "What kind of business are you building?",
    hint: "Choose the closest fit. Every project is different.",
  },
  {
    eyebrow: "THE BIG PICTURE",
    title: "What would you like to make happen?",
    hint: "Choose your main goal. We’ll help connect the dots.",
  },
  {
    eyebrow: "FOLLOW YOUR CURIOSITY",
    title: "What catches your interest?",
    hint: "Choose a few, or skip this step and let your goal guide us.",
  },
  {
    eyebrow: "A SENSE OF TIMING",
    title: "When are you hoping to begin?",
    hint: "A starting point, not a deadline. There’s room to talk.",
  },
  {
    eyebrow: "ROOM TO CREATE",
    title: "Have a budget in mind?",
    hint: "This helps frame the conversation. No fixed quote is implied.",
  },
];
export default function FindSolution() {
  const { project, setProject, toggleService } = useProject();
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);
  const [interests, setInterests] = useState<string[]>(project.services);
  const [reasons, setReasons] = useState<{ id: string; reason: string }[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [goal, setGoal] = useState(
    goals.includes(project.goal) ? project.goal : goals[0],
  );
  const [budgetChoice, setBudgetChoice] = useState(
    project.budget || "Let’s discuss",
  );
  const [customBudget, setCustomBudget] = useState("");
  const update = (key: "business" | "timeline", value: string) =>
    setProject((p) => ({ ...p, [key]: value, brief: "" }));
  const complete = () => {
    const recommended = recommendServices(goal, interests);
    setReasons(recommended);
    setProject((p) => ({
      ...p,
      goal,
      budget: budgetChoice === "Custom range" ? customBudget : budgetChoice,
      services: recommended.map((r) => r.id),
      brief: "",
    }));
    setStep(5);
  };
  const pairings = getPairings(project.services).filter(
    (pair) => !dismissed.includes(pair.id),
  );
  const heading = questions[Math.min(step, 4)];
  return (
    <div className="page-shell discovery-page">
      <header className="flow-intro">
        <p className="eyebrow">FIND MY SOLUTION</p>
        <Link to="/project-lab" className="text-link">
          Prefer to explore? Open the Project Lab <ArrowUpRight size={16} />
        </Link>
      </header>
      {step < 5 ? (
        <div className="discovery-layout">
          <aside className="discovery-aside">
            <span className="discovery-number">
              0{step + 1}
              <small>/ 05</small>
            </span>
            <div
              className="discovery-progress"
              aria-label={`Step ${step + 1} of 5`}
            >
              {questions.map((_, i) => (
                <span className={i <= step ? "active" : ""} key={i} />
              ))}
            </div>
            <p>
              Big possibilities.
              <br />A few small questions.
            </p>
            <span className="muted">
              No account needed.
              <br />
              Just a clearer way forward.
            </span>
            <div className="discovery-art" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </aside>
          <section
            className="discovery-question"
            aria-labelledby="discovery-title"
          >
            <p className="eyebrow">{heading.eyebrow}</p>
            <h1 id="discovery-title" ref={headingRef} tabIndex={-1}>
              {heading.title}
            </h1>
            <p className="muted">{heading.hint}</p>
            {step === 0 && (
              <div className="discovery-options">
                {businesses.map((business, i) => (
                  <button
                    key={business}
                    className={project.business === business ? "selected" : ""}
                    aria-pressed={project.business === business}
                    onClick={() => update("business", business)}
                  >
                    <span className="option-letter">0{i + 1}</span>
                    {business}
                    {project.business === business ? (
                      <Check size={18} />
                    ) : (
                      <ArrowUpRight size={17} />
                    )}
                  </button>
                ))}
              </div>
            )}
            {step === 1 && (
              <div className="discovery-options">
                {goals.map((g, i) => (
                  <button
                    key={g}
                    className={goal === g ? "selected" : ""}
                    aria-pressed={goal === g}
                    onClick={() => setGoal(g)}
                  >
                    <span className="option-letter">0{i + 1}</span>
                    {g}
                    {goal === g ? (
                      <Check size={18} />
                    ) : (
                      <ArrowUpRight size={17} />
                    )}
                  </button>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="discovery-options discovery-options-compact">
                {services
                  .filter((s) => discoveryServices.includes(s.id))
                  .map((service) => (
                    <button
                      key={service.id}
                      className={
                        interests.includes(service.id) ? "selected" : ""
                      }
                      aria-pressed={interests.includes(service.id)}
                      onClick={() =>
                        setInterests((old) =>
                          old.includes(service.id)
                            ? old.filter((id) => id !== service.id)
                            : [...old, service.id],
                        )
                      }
                    >
                      {service.short}
                      {interests.includes(service.id) ? (
                        <Check size={18} />
                      ) : (
                        <Plus size={18} />
                      )}
                    </button>
                  ))}
              </div>
            )}
            {step === 3 && (
              <div className="discovery-options">
                {[
                  "Within a month",
                  "1–3 months",
                  "3+ months",
                  "Just exploring",
                ].map((timeline) => (
                  <button
                    key={timeline}
                    className={project.timeline === timeline ? "selected" : ""}
                    aria-pressed={project.timeline === timeline}
                    onClick={() => update("timeline", timeline)}
                  >
                    {timeline}
                    {project.timeline === timeline ? (
                      <Check size={18} />
                    ) : (
                      <ArrowUpRight size={17} />
                    )}
                  </button>
                ))}
              </div>
            )}
            {step === 4 && (
              <>
                <div className="discovery-options">
                  {[
                    "Let’s discuss",
                    "Under ₹50,000",
                    "₹50,000–₹1 lakh",
                    "₹1 lakh+",
                    "Custom range",
                  ].map((budget) => (
                    <button
                      key={budget}
                      className={budgetChoice === budget ? "selected" : ""}
                      aria-pressed={budgetChoice === budget}
                      onClick={() => setBudgetChoice(budget)}
                    >
                      {budget}
                      {budgetChoice === budget ? (
                        <Check size={18} />
                      ) : (
                        <ArrowUpRight size={17} />
                      )}
                    </button>
                  ))}
                </div>
                {budgetChoice === "Custom range" && (
                  <label className="field custom-budget">
                    Your range and currency
                    <input
                      value={customBudget}
                      onChange={(e) => setCustomBudget(e.target.value)}
                      placeholder="e.g. USD 1,000–2,000"
                    />
                  </label>
                )}
              </>
            )}
            <div className="discovery-controls">
              <button
                className="button button-secondary"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                className="button button-primary"
                onClick={() => (step === 4 ? complete() : setStep(step + 1))}
              >
                {step === 4 ? "Find my starting point" : "Continue"}{" "}
                <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </div>
      ) : (
        <section className="recommendation-result">
          <div className="result-heading">
            <p className="eyebrow">
              <Sparkles size={16} /> YOUR STARTING POINT
            </p>
            <h1 ref={headingRef} tabIndex={-1}>
              Good ideas.
              <br />
              Made for your next step.
            </h1>
            <p className="muted">
              Based on your goal and interests, here are a few useful places to
              begin. These are simple rule-based suggestions, ready for you to
              edit.
            </p>
          </div>
          <div className="recommendation-list">
            {reasons.map(({ id, reason }) => {
              const service = services.find((s) => s.id === id)!;
              return (
                <button
                  key={id}
                  className={`recommendation-card ${project.services.includes(id) ? "selected" : ""}`}
                  aria-pressed={project.services.includes(id)}
                  onClick={() => toggleService(id)}
                >
                  <span className="recommendation-code">{service.id}</span>
                  <div>
                    <span className="eyebrow">
                      {service.world}
                      {service.world === "grow" ? " · Beta / Coming Soon" : ""}
                    </span>
                    <h2>{service.name}</h2>
                    <p>{reason}</p>
                  </div>
                  {project.services.includes(id) ? (
                    <Check size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>
              );
            })}
          </div>
          {pairings.length > 0 && (
            <div className="discovery-pairings">
              <h2>A useful companion?</h2>
              <p className="muted">Optional additions. Always your choice.</p>
              {pairings.map((pair) => (
                <div className="pairing-row" key={pair.id}>
                  <div>
                    <strong>
                      {services.find((s) => s.id === pair.id)?.short}
                    </strong>
                    <p>{pair.reason}</p>
                  </div>
                  <button
                    className="pairing-add"
                    aria-label={`Add ${services.find((s) => s.id === pair.id)?.name}`}
                    onClick={() => {
                      toggleService(pair.id);
                      setReasons((r) =>
                        r.some((item) => item.id === pair.id)
                          ? r
                          : [...r, pair],
                      );
                    }}
                  >
                    <Plus size={17} />
                  </button>
                  <button
                    className="pairing-dismiss"
                    onClick={() => setDismissed((d) => [...d, pair.id])}
                    aria-label={`Dismiss ${services.find((s) => s.id === pair.id)?.name}`}
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flow-actions">
            <Link to="/project-lab" className="button button-primary">
              Explore in Project Lab <ArrowUpRight size={17} />
            </Link>
            <Link to="/contact" className="button button-secondary">
              Start a Project <ArrowRight size={16} />
            </Link>
            <button className="text-link" onClick={() => setStep(0)}>
              Refine my answers
            </button>
          </div>
          <p className="muted">
            {project.services.length} solutions selected. You can change these
            at any time.
          </p>
        </section>
      )}
    </div>
  );
}
