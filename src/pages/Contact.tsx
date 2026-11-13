import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Download,
  FileText,
  X,
} from "lucide-react";
import { useProject } from "../project";
import { services } from "../data";
import { generateBrief } from "../brief";
import "../flows.css";

export default function Contact() {
  const { project, setProject, toggleService } = useProject();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [descriptionOverride, setDescriptionOverride] = useState<string | null>(
    project.brief && project.brief !== generateBrief(project)
      ? project.brief
      : null,
  );
  const description =
    descriptionOverride ??
    (project.services.length || project.goal ? generateBrief(project) : "");
  const [preference, setPreference] = useState("Email");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState(false);
  function submit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter a valid email address.";
    if (!description.trim())
      next.description = "Tell us a little about your project.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document.getElementById(`contact-${first}`)?.focus();
      setPreview(false);
      return;
    }
    setProject((p) => ({ ...p, brief: description }));
    setPreview(true);
  }
  function download() {
    const content = [
      `MAKENDLESS — Inquiry draft\n`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Business: ${businessName || project.business}`,
      `Contact preference: ${preference}`,
      `Services: ${
        project.services
          .map((id) => {
            const s = services.find((s) => s.id === id);
            return `${s?.name}${s?.world === "grow" ? " (Beta / Coming Soon)" : ""}`;
          })
          .join("; ") || "To be discussed"
      }`,
      `Budget: ${project.budget || "To be discussed"}`,
      `Timeline: ${project.timeline || "To be discussed"}`,
      `\nProject description:\n${description}`,
      `\nAdditional details: ${details || "None"}`,
      `\nDraft only. This inquiry has not been sent.`,
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "makendless-inquiry-draft.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="page-shell contact-page">
      <div className="contact-layout">
        <aside className="contact-story">
          <p className="eyebrow">START A PROJECT</p>
          <h1>
            Something great
            <br />
            starts with
            <br />
            <span className="flow-accent">a conversation.</span>
          </h1>
          <p>
            Tell us what’s on your mind.
            <br />
            An idea, a challenge, a next chapter.
          </p>
          <div className="contact-process">
            <div>
              <span>01</span>
              <p>Share your idea</p>
            </div>
            <div>
              <span>02</span>
              <p>Shape the possibilities</p>
            </div>
            <div>
              <span>03</span>
              <p>Create something meaningful</p>
            </div>
          </div>
          <div className="contact-help">
            <FileText size={23} />
            <h2>Still connecting the dots?</h2>
            <p>
              Build a brief in the Project Lab, or find a starting point with a
              few simple questions.
            </p>
            <Link to="/find-solution" className="text-link">
              Find My Solution <ArrowUpRight size={16} />
            </Link>
          </div>
        </aside>
        <section className="contact-form-panel">
          <div className="demo-notice">
            <span>DEMO INQUIRY</span>
            <p>
              No delivery backend is connected. Preview or download your inquiry
              here; nothing will be sent.
            </p>
          </div>
          <form
            noValidate
            onSubmit={submit}
            onChange={() => preview && setPreview(false)}
          >
            <div className="flow-field-row">
              <label className="field" htmlFor="contact-name">
                <span>
                  Your name <span aria-hidden="true">*</span>
                </span>
                <input
                  id="contact-name"
                  autoComplete="name"
                  required
                  maxLength={120}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="What should we call you?"
                />
                {errors.name && (
                  <span id="name-error" className="field-error">
                    {errors.name}
                  </span>
                )}
              </label>
              <label className="field" htmlFor="contact-email">
                <span>
                  Email address <span aria-hidden="true">*</span>
                </span>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@yourbusiness.com"
                />
                {errors.email && (
                  <span id="email-error" className="field-error">
                    {errors.email}
                  </span>
                )}
              </label>
            </div>
            <label className="field">
              Business name (optional)
              <input
                autoComplete="organization"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Your business or brand"
              />
            </label>
            <fieldset className="contact-service-fieldset">
              <legend>
                I’m interested in <span>(optional)</span>
              </legend>
              <div className="inquiry-services">
                {services.map((service) => (
                  <button
                    type="button"
                    key={service.id}
                    className={
                      project.services.includes(service.id) ? "selected" : ""
                    }
                    aria-pressed={project.services.includes(service.id)}
                    onClick={() => {
                      toggleService(service.id);
                      setPreview(false);
                    }}
                  >
                    {project.services.includes(service.id) && (
                      <Check size={13} />
                    )}{" "}
                    {service.short}
                    {service.world === "grow" ? " · Beta / Coming Soon" : ""}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="field" htmlFor="contact-description">
              <span>
                Tell us about your project <span aria-hidden="true">*</span>
              </span>
              <textarea
                id="contact-description"
                required
                rows={7}
                value={description}
                onChange={(e) => setDescriptionOverride(e.target.value)}
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                placeholder="What are you hoping to create, build, or improve?"
              />
              {errors.description && (
                <span id="description-error" className="field-error">
                  {errors.description}
                </span>
              )}
            </label>
            <div className="flow-field-row">
              <label className="field">
                Budget range (optional)
                <input
                  value={project.budget}
                  onChange={(e) =>
                    setProject((p) => ({ ...p, budget: e.target.value }))
                  }
                  placeholder="Your range and currency"
                />
              </label>
              <label className="field">
                Preferred timeline (optional)
                <select
                  value={project.timeline}
                  onChange={(e) =>
                    setProject((p) => ({ ...p, timeline: e.target.value }))
                  }
                >
                  <option value="">Let’s discuss</option>
                  <option>Within a month</option>
                  <option>1–3 months</option>
                  <option>3+ months</option>
                  <option>Just exploring</option>
                </select>
              </label>
            </div>
            <details className="contact-more">
              <summary>A few more details (optional)</summary>
              <label className="field">
                Contact preference
                <select
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                >
                  <option>Email</option>
                  <option>Arrange a call by email</option>
                </select>
              </label>
              <label className="field">
                Additional details
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Anything else we should know?"
                />
              </label>
            </details>
            <p className="privacy-note">
              Your details stay in this browser’s memory for this demo and clear
              on refresh. No inquiry is sent or stored on a server. Read the{" "}
              <Link to="/privacy">draft privacy policy</Link>.
            </p>
            <button
              className="button button-primary contact-submit"
              type="submit"
            >
              Preview my inquiry <ArrowUpRight size={18} />
            </button>
          </form>
          {preview && (
            <div className="inquiry-preview" role="status">
              <div className="inquiry-preview-title">
                <Check size={21} />
                <h2>Your draft is ready.</h2>
                <button
                  aria-label="Close inquiry preview"
                  onClick={() => setPreview(false)}
                >
                  <X size={17} />
                </button>
              </div>
              <p>
                Thanks, {name.trim()}. This is a preview only—your inquiry has{" "}
                <strong>not been sent</strong>. Download it to keep a copy.
              </p>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>{email}</dd>
                </div>
                <div>
                  <dt>Selected services</dt>
                  <dd>{project.services.length || "To be discussed"}</dd>
                </div>
              </dl>
              <button className="button button-secondary" onClick={download}>
                <Download size={16} /> Download inquiry draft
              </button>
            </div>
          )}
        </section>
      </div>
      <div className="contact-footer-note">
        <span>CREATE • BUILD • GROW</span>
        <Link to="/studios" className="text-link">
          Explore what we can make together <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
