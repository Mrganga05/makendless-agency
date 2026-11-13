import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { LabSettingsContext } from "./settings";
import { labPalettes } from "./theme";
const HeroLab = lazy(() => import("./HeroLab"));
const SpatialLab = lazy(() => import("./SpatialLab"));
const MotionLab = lazy(() => import("./MotionLab"));
const LiveLab = lazy(() => import("./LiveLab"));
const SectionLab = lazy(() => import("./SectionLab"));
const ResponsiveLab = lazy(() => import("./ResponsiveLab"));
const experiments = [
  {
    id: "heroes",
    name: "Hero directions",
    detail: "Three different first impressions",
    Component: HeroLab,
  },
  {
    id: "spatial",
    name: "Material & light",
    detail: "An interactive service display",
    Component: SpatialLab,
  },
  {
    id: "motion",
    name: "Motion language",
    detail: "Sequence, rhythm and response",
    Component: MotionLab,
  },
  {
    id: "live",
    name: "Live components",
    detail: "Three useful service demonstrations",
    Component: LiveLab,
  },
  {
    id: "sections",
    name: "Section compositions",
    detail: "Contrast through the scroll",
    Component: SectionLab,
  },
  {
    id: "responsive",
    name: "Responsive review",
    detail: "Viewport checks and a scorecard",
    Component: ResponsiveLab,
  },
];
function currentExperiment() {
  const id = window.location.hash.slice(1);
  return experiments.some((item) => item.id === id) ? id : "heroes";
}
class ExperimentBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="lab-load-error" role="alert">
        <h2>This experiment could not load.</h2>
        <p>The other experiments remain available.</p>
        <button onClick={() => window.location.reload()}>Reload the lab</button>
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function App() {
  const query = new URLSearchParams(window.location.search);
  const embedded = query.get("embed") === "1";
  const [active, setActive] = useState(currentExperiment);
  const [theme, setTheme] = useState<"glass" | "atelier">(
    query.get("theme") === "atelier" ? "atelier" : "glass",
  );
  const [reduce, setReduce] = useState(query.get("reduce") === "1");
  const [forceFallback, setForceFallback] = useState(
    query.get("fallback") === "1",
  );
  const [systemReduce, setSystemReduce] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const update = () => setActive(currentExperiment());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduce(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!embedded)
      document.getElementById("lab-content")?.focus({ preventScroll: true });
  }, [active, embedded]);
  const selected = experiments.find(
    (item) =>
      item.id === (embedded && active === "responsive" ? "heroes" : active),
  )!;
  const variables = Object.fromEntries(
    Object.entries(labPalettes[theme]).map(([key, value]) => [
      `--lab-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
      value,
    ]),
  ) as CSSProperties;
  const settings = {
    theme,
    reducedMotion: reduce || systemReduce,
    forceFallback,
  };
  return (
    <LabSettingsContext.Provider value={settings}>
      <div
        className={`creative-lab${embedded ? " lab-embedded" : ""}`}
        style={variables}
        data-lab-theme={theme}
        data-reduced-motion={settings.reducedMotion}
      >
        {!embedded && (
          <>
            <a
              className="lab-skip"
              href="#lab-content"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("lab-content")?.focus();
              }}
            >
              Skip to experiment
            </a>
            <header className="lab-header">
              <a href="#heroes" className="lab-wordmark">
                MAKENDLESS<span aria-hidden="true">✳</span>
              </a>
              <span>
                FRONTEND CREATIVE LAB <i /> RESEARCH BUILD 01
              </span>
              <a href="#responsive">Review the work ↗</a>
            </header>
            <div className="lab-introduction">
              <div>
                <span className="lab-eyebrow">
                  RESEARCH → PROTOTYPE → REVIEW
                </span>
                <h1>Make the craft visible.</h1>
              </div>
              <p>
                Working experiments in composition, motion and spatial
                storytelling. A place to compare ideas before they become a
                website.
              </p>
            </div>
            <div className="lab-settings" aria-label="Lab test settings">
              <label>
                Palette
                <select
                  value={theme}
                  onChange={(event) =>
                    setTheme(event.target.value as "glass" | "atelier")
                  }
                >
                  <option value="glass">Glass Prism — legacy</option>
                  <option value="atelier">Prism Atelier — proposal</option>
                </select>
              </label>
              <label className="lab-check">
                <input
                  type="checkbox"
                  checked={reduce}
                  onChange={(event) => setReduce(event.target.checked)}
                />
                Reduce motion
              </label>
              <label className="lab-check">
                <input
                  type="checkbox"
                  checked={forceFallback}
                  onChange={(event) => setForceFallback(event.target.checked)}
                />
                Force HTML fallback
              </label>
              <span>
                {systemReduce
                  ? "System reduced motion is active."
                  : "Experiments are proposals, not approved designs."}
              </span>
            </div>
          </>
        )}
        <div className="lab-layout">
          {!embedded && (
            <aside className="lab-index">
              <nav aria-label="Experiment gallery">
                {experiments.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={selected.id === item.id ? "page" : undefined}
                  >
                    <span>0{index + 1}</span>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.detail}</small>
                    </div>
                  </a>
                ))}
              </nav>
              <div className="lab-evidence-note">
                <span className="lab-eyebrow">REVIEW STATUS</span>
                <strong>Visual review pending.</strong>
                <p>
                  Automated checks can verify behavior. They cannot approve
                  composition, real GPU output or mobile finish.
                </p>
                <a href="#responsive">Open the review tools ↗</a>
              </div>
            </aside>
          )}
          <main id="lab-content" tabIndex={-1}>
            <ExperimentBoundary key={selected.id}>
              <Suspense
                fallback={
                  <div className="lab-loading" role="status">
                    Opening the experiment…
                  </div>
                }
              >
                <selected.Component />
              </Suspense>
            </ExperimentBoundary>
          </main>
        </div>
        {!embedded && (
          <footer className="lab-footer">
            <span>
              CREATE · BUILD · GROW <small>GROW — BETA / COMING SOON</small>
            </span>
            <p>
              Local prototypes. Original illustrative media. No client claims,
              payments or messages.
            </p>
            <span>RESEARCH → CONCEPT → TEST → REFINE</span>
          </footer>
        )}
      </div>
    </LabSettingsContext.Provider>
  );
}
