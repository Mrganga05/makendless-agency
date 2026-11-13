import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Plus, Check, Sparkles } from "lucide-react";
import { services, worldInfo, type World } from "../data";
import { useProject } from "../project";
import ServiceDemo from "../components/ServiceDemo";
import LiveShowcase from "../components/LiveShowcase";
import "../studios.css";
import "../studio-worlds.css";
function StudioWorld({ world }: { world: World }) {
  const list = services.filter((s) => s.world === world);
  const [selected, setSelected] = useState(list[0].id);
  const [spatialOpen, setSpatialOpen] = useState(false);
  const service = list.find((s) => s.id === selected)!;
  const info = worldInfo[world];
  const { project, toggleService } = useProject();
  const added = project.services.includes(selected);
  return (
    <div className={`page-shell studio-page studio-${world}`}>
      <div className="studio-breadcrumb">
        <Link to="/studios">All services</Link>
        <span>/</span>
        <span>{info.label}</span>
      </div>
      <header className="studio-header" data-motion="editorial">
        <div>
          <span className="eyebrow">
            <span className="studio-world-dot" />
            {info.label} STUDIO{" "}
            {world === "grow" && (
              <span className="beta-tag">BETA / COMING SOON</span>
            )}
          </span>
          <h1 className="page-heading" data-motion="typography">
            {info.title}
          </h1>
          <p className="studio-subtitle">{info.subtitle}</p>
        </div>
        <div className="studio-header-aside">
          <div className={`world-motif motif-${world}`} aria-hidden="true">
            <span>
              {world === "create"
                ? "THE SHAPE OF A STORY"
                : world === "build"
                  ? "FROM IDEA TO INTERFACE"
                  : "THE NEXT CHAPTER"}
            </span>
            <div>
              {Array.from({ length: world === "grow" ? 7 : 5 }, (_, i) => (
                <i key={i}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                </i>
              ))}
            </div>
          </div>
          <p className="studio-intro">
            {info.intro}
            <br />
            <span>Choose a service below and try its interactive example.</span>
          </p>
        </div>
      </header>
      {world === "grow" && (
        <div className="studio-beta-note">
          <Sparkles size={19} />
          <p>
            These services are in development. Explore the concepts and register
            your interest in a future conversation. Availability is not yet
            confirmed.
          </p>
        </div>
      )}
      <section
        className="studio-experience"
        aria-label={`${info.label} service demonstrations`}
      >
        <div
          className="studio-service-selector"
          role="group"
          aria-label="Choose a service"
        >
          {list.map((s, i) => (
            <button
              className={selected === s.id ? "selected" : ""}
              key={s.id}
              onClick={() => setSelected(s.id)}
              aria-pressed={selected === s.id}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{s.name}</strong>
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
        <div className="studio-demo-main">
          <div className="studio-demo-title">
            <div>
              <span className="eyebrow">
                {service.id} / EXPLORE THE POSSIBILITIES
              </span>
              <h2 key={selected} data-motion="typography">
                {service.short}
              </h2>
            </div>
            <Link to={`/services/${selected}`} className="studio-detail-link">
              Service details <ArrowUpRight size={16} />
            </Link>
          </div>
          <ServiceDemo key={selected} id={selected} />
          <div className="studio-demo-footer">
            <details className="world-service-context">
              <summary>What we can make together</summary>
              <p>{service.description}</p>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
            <button
              className={`button ${added ? "button-secondary" : "button-primary"}`}
              onClick={() => toggleService(selected)}
            >
              {added ? <Check size={17} /> : <Plus size={17} />}{" "}
              {added
                ? "Added · remove"
                : world === "grow"
                  ? "Add future interest"
                  : "Add to my project"}
            </button>
          </div>
        </div>
      </section>
      {world !== "grow" && (
        <details
          className="world-spatial-study"
          onToggle={(e) => setSpatialOpen(e.currentTarget.open)}
        >
          <summary>
            <span className="eyebrow">ANOTHER PERSPECTIVE</span>
            <strong>
              Explore {world === "create" ? "the edit" : "the website"} in space
            </strong>
            <Plus size={18} />
          </summary>
          {spatialOpen && (
            <div className="world-spatial-content">
              <p>
                A closer look at the{" "}
                {world === "create"
                  ? "source, edit and timeline"
                  : "desktop and mobile composition"}
                . The same controls work in the flat preview.
              </p>
              <LiveShowcase
                initialMode={world}
                variant="study"
                showModeSwitch={false}
              />
            </div>
          )}
        </details>
      )}
      <div className="world-direct-inquiry">
        <span>
          {world === "grow"
            ? "Interested in what’s coming?"
            : "Have a project in mind?"}
        </span>
        <Link
          to="/contact"
          className="text-link"
          onClick={() => {
            if (!added) toggleService(selected);
          }}
        >
          {world === "create"
            ? "Start a Video Project"
            : world === "build"
              ? "Start a Build Project"
              : "Share your interest"}{" "}
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <section className="studio-next" data-motion="editorial">
        <div>
          <span className="eyebrow">GOOD IDEAS WORK BETTER TOGETHER</span>
          <h2>
            Make it part of
            <br />
            something bigger.
          </h2>
        </div>
        <div>
          <p>
            Combine services in the Project Lab and see your idea take shape.
          </p>
          <Link to="/project-lab" className="button button-secondary">
            Plan your project <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <nav className="studio-other-worlds" aria-label="Other studios">
        {Object.entries(worldInfo)
          .filter(([key]) => key !== world)
          .map(([key, w]) => (
            <Link key={key} to={`/studios/${key}`}>
              <span className="eyebrow">EXPLORE {w.label}</span>
              <strong>{w.subtitle}</strong>
              <ArrowUpRight />
            </Link>
          ))}
      </nav>
    </div>
  );
}
export default function Studio({ world }: { world: World }) {
  return <StudioWorld key={world} world={world} />;
}
