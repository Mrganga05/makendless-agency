import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../../project";
import "../../home-packages.css";

type ProjectFormat = {
  name: string;
  services: string[];
  summary: string;
  deliverables: string[];
  factors: string;
};
const packageGroups: {
  name: string;
  note: string;
  formats: ProjectFormat[];
}[] = [
  {
    name: "Video Editing",
    note: "A single story or a whole body of work.",
    formats: [
      {
        name: "Single Reel / Short",
        services: ["V1"],
        summary: "Give one idea a focused, platform-ready edit.",
        deliverables: [
          "Edited short-form video",
          "Caption treatment",
          "Agreed platform exports",
        ],
        factors:
          "Source footage length, edit complexity, caption requirements and output formats.",
      },
      {
        name: "Content bundle",
        services: ["V4"],
        summary: "Shape one recording into a considered set of useful content.",
        deliverables: [
          "Selected reels or shorts",
          "Teaser cuts",
          "A coordinated export package",
        ],
        factors:
          "Number of source recordings, selected clips, aspect ratios and creative treatments.",
      },
      {
        name: "Long-form / podcast",
        services: ["V2"],
        summary: "Bring rhythm and clarity to a longer conversation.",
        deliverables: [
          "Edited episode",
          "Audio cleanup",
          "Agreed highlight selections",
        ],
        factors:
          "Episode length, number of camera or audio tracks, cleanup needs and highlight scope.",
      },
    ],
  },
  {
    name: "Website Development",
    note: "From your first page to a useful digital product.",
    formats: [
      {
        name: "Landing page",
        services: ["T1"],
        summary: "One clear destination for your offer, launch or next idea.",
        deliverables: [
          "Responsive page design",
          "Developed interface",
          "Launch preparation",
        ],
        factors:
          "Content readiness, page sections, forms, integrations and hosting requirements.",
      },
      {
        name: "Business website",
        services: ["T1"],
        summary:
          "A distinct digital home that makes your business easy to understand.",
        deliverables: [
          "Responsive website",
          "Accessible interface",
          "Agreed content and launch setup",
        ],
        factors:
          "Page count, content creation, CMS requirements, integrations and ongoing support.",
      },
      {
        name: "E-commerce solution",
        services: ["T2"],
        summary: "A shopping experience designed around your products.",
        deliverables: [
          "Product catalogue",
          "Cart experience",
          "Checkout integration planning",
        ],
        factors:
          "Catalogue size, product variations, payment and shipping needs, and platform costs.",
      },
      {
        name: "Booking solution",
        services: ["T3"],
        summary:
          "Make your availability and booking journey easier to navigate.",
        deliverables: [
          "Booking interface",
          "Scheduling workflow",
          "Application development",
        ],
        factors:
          "Services and staff, scheduling rules, notifications, payments and existing systems.",
      },
    ],
  },
  {
    name: "Digital Marketing — Beta / Coming Soon",
    note: "Illustrative project scopes for a future service. Not available to purchase.",
    formats: [
      {
        name: "Campaign planning — Beta",
        services: ["M1"],
        summary:
          "Explore a sample campaign direction. Beta / Coming Soon; no ads are launched.",
        deliverables: [
          "Objective planning",
          "Creative concept",
          "Placement approach",
        ],
        factors:
          "Proposed channels, creative requirements and reporting needs; scope remains to be confirmed.",
      },
      {
        name: "Social content planning — Beta",
        services: ["M2"],
        summary:
          "Explore a consistent content direction for a future service. Beta / Coming Soon.",
        deliverables: [
          "Content themes",
          "Example publishing plan",
          "Creative coordination",
        ],
        factors:
          "Channels, content formats, publishing frequency and approved assets.",
      },
      {
        name: "Local marketing & reporting — Beta",
        services: ["M3", "M4"],
        summary:
          "Discuss a clearer local presence and useful reporting. Beta / Coming Soon.",
        deliverables: [
          "Profile planning",
          "Reporting outline",
          "Measurement questions",
        ],
        factors:
          "Profile coverage, agreed reporting questions and available source data.",
      },
    ],
  },
];

export default function PackageGuide() {
  const [selection, setSelection] = useState({ group: 0, format: 0 });
  const chosen = packageGroups[selection.group].formats[selection.format];
  const { setProject } = useProject();
  const navigate = useNavigate();
  const requestEstimate = () => {
    if (selection.group === 2) {
      navigate("/studios/grow");
      return;
    }
    const projectLine = `Project format to discuss: ${chosen.name}.`;
    setProject((project) => ({
      ...project,
      services: [...new Set([...project.services, ...chosen.services])],
      notes: project.notes.split("\n").includes(projectLine)
        ? project.notes
        : [project.notes, projectLine].filter(Boolean).join("\n"),
      brief: "",
    }));
    navigate("/contact");
  };

  return (
    <section
      className="hp-packages"
      data-surface="light"
      id="packages"
      aria-labelledby="hp-packages-title"
    >
      <div className="hp-packages-inner">
        <header className="hp-packages-heading">
          <span className="hp-packages-kicker">05 / PROJECTS & PRICING</span>
          <h2 id="hp-packages-title" data-motion="typography">
            Start with the work.
            <br />
            <span>Define the scope together.</span>
          </h2>
          <p>
            Choose a starting point. Your estimate will depend on what you need,
            what you already have and the details we agree.
          </p>
        </header>
        <div className="hp-package-index">
          {packageGroups.map((group, groupIndex) => (
            <div
              className={`hp-package-row${selection.group === groupIndex ? " is-active" : ""}`}
              key={group.name}
            >
              <span className="hp-package-number">0{groupIndex + 1}</span>
              <div className="hp-package-name">
                <h3>{group.name}</h3>
                <p>{group.note}</p>
              </div>
              <div
                className="hp-package-formats"
                role="group"
                aria-label={`${group.name} project formats`}
              >
                {group.formats.map((format, formatIndex) => (
                  <button
                    key={format.name}
                    aria-pressed={
                      selection.group === groupIndex &&
                      selection.format === formatIndex
                    }
                    onClick={() =>
                      setSelection({ group: groupIndex, format: formatIndex })
                    }
                  >
                    {format.name}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="hp-package-scope" aria-live="polite">
          <div className="hp-package-summary">
            <span className="hp-packages-kicker">YOUR STARTING POINT</span>
            <h3>{chosen.name}</h3>
            <p>{chosen.summary}</p>
          </div>
          <div className="hp-package-deliverables">
            <h4>Typical deliverables</h4>
            <ul>
              {chosen.deliverables.map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hp-package-factors">
            <h4>What shapes the estimate</h4>
            <p>{chosen.factors}</p>
          </div>
        </div>
        <div className="hp-package-next">
          <div>
            <strong>A tailored estimate. A clear conversation.</strong>
            <p>
              Share your brief → clarify the scope → agree the details.
              <br />
              Confirm costs, timing, third-party fees and revision terms before
              work begins.
            </p>
          </div>
          <button className="hp-package-estimate" onClick={requestEstimate}>
            {selection.group === 2
              ? "Explore Beta"
              : "Request a tailored estimate"}{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
