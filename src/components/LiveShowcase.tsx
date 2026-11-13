import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Film,
  Layers3,
  Monitor,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Smartphone,
} from "lucide-react";
import {
  initialShowcaseState,
  workflowMessages,
  workflowSteps,
  type ShowcaseMode,
} from "../showcase-state";
import { Link } from "react-router-dom";
import { useProject } from "../project";
import "../showcase.css";
const SpatialScene = lazy(() => import("./SpatialScene"));
class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function useMedia(query: string) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}
function availableWebGL() {
  if (typeof window.WebGL2RenderingContext === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", {
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}
const modes: {
  id: ShowcaseMode;
  label: string;
  description: string;
  Icon: typeof Film;
}[] = [
  { id: "create", label: "CREATE", description: "Video editing", Icon: Film },
  { id: "build", label: "BUILD", description: "Websites", Icon: Monitor },
  { id: "ai", label: "AI", description: "Automation", Icon: Sparkles },
];
export default function LiveShowcase() {
  const { project, toggleService } = useProject();
  const [state, setState] = useState(initialShowcaseState);
  const [view, setView] = useState<"auto" | "flat" | "spatial">("auto");
  const [supported, setSupported] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const host = useRef<HTMLDivElement>(null);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const compact = useMedia("(max-width: 767px)");
  const saveData = Boolean(
    (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData,
  );
  const wantsSpatial =
    view === "spatial" ||
    (view === "auto" && !reduced && !compact && !saveData);
  const enhance =
    wantsSpatial && supported === true && !failed && visible && pageVisible;
  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => {
    setFailed(true);
    setReady(false);
  }, []);
  useEffect(() => {
    const show = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", show);
    return () => document.removeEventListener("visibilitychange", show);
  }, []);
  useEffect(() => {
    if (!host.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (wantsSpatial && visible && supported === null)
      setSupported(availableWebGL());
  }, [wantsSpatial, visible, supported]);
  useEffect(() => {
    if (!enhance) {
      setReady(false);
      return;
    }
    if (ready) return;
    const timeout = window.setTimeout(onError, 8000);
    return () => clearTimeout(timeout);
  }, [enhance, ready, onError]);
  useEffect(() => {
    if (!state.playing || state.mode !== "create" || !visible || !pageVisible)
      return;
    const timer = window.setInterval(
      () =>
        setState((s) => {
          const progress = Math.min(100, s.progress + 2);
          return { ...s, progress, playing: progress < 100 };
        }),
      200,
    );
    return () => clearInterval(timer);
  }, [state.playing, state.mode, visible, pageVisible]);
  const chooseMode = (mode: ShowcaseMode) =>
    setState((s) => ({ ...s, mode, playing: false }));
  const phrase =
    state.progress < 35
      ? "Go somewhere."
      : state.progress < 70
        ? "Feel something."
        : "Make it matter.";
  const spatialActive = enhance && ready;
  const serviceId =
    state.mode === "create" ? "V1" : state.mode === "build" ? "T1" : "T4";
  const added = project.services.includes(serviceId);
  return (
    <section
      className="living-showcase"
      aria-label="Living service showcase"
      ref={host}
    >
      <div
        className="living-mode-tabs"
        role="group"
        aria-label="Choose a service showcase"
      >
        {modes.map(({ id, label, description, Icon }) => (
          <button
            key={id}
            aria-pressed={state.mode === id}
            onClick={() => chooseMode(id)}
          >
            <Icon size={16} />
            <span>
              <strong>{label}</strong>
              <small>{description}</small>
            </span>
          </button>
        ))}
      </div>
      <div
        className={`living-stage mode-${state.mode} ${spatialActive ? "spatial-active" : ""}`}
      >
        <div
          className="living-flat-preview"
          aria-label={`${modes.find((mode) => mode.id === state.mode)?.description} preview`}
        >
          {state.mode === "create" ? (
            <div
              className={`living-edit ${state.edited ? "is-edited" : "is-original"} ${state.playing ? "is-playing" : ""}`}
            >
              <div className="living-source">
                <span>SOURCE FRAME</span>
                <img
                  src="/images/mountain.jpg"
                  alt="Mountain valley source photograph"
                  width="1400"
                  height="933"
                />
                <small>01 / ORIGINAL PHOTO</small>
              </div>
              <div className="living-edit-surface">
                <img
                  src="/images/mountain.jpg"
                  alt="Mountain valley used in an illustrative motion edit"
                  width="1400"
                  height="933"
                  fetchPriority="high"
                />
                <span className="living-frame-label">
                  {state.edited ? "THE EDIT" : "SOURCE VIEW"}
                </span>
                {state.edited && (
                  <div
                    className="living-film-title"
                    key={Math.floor(state.progress / 35)}
                  >
                    <span>OUTSIDE THE ORDINARY</span>
                    <h2>{phrase}</h2>
                    <small>A MAKENDLESS MOTION CONCEPT</small>
                  </div>
                )}
                <span className="living-frame-count">
                  00:{String(Math.floor(state.progress / 10)).padStart(2, "0")}{" "}
                  / 00:10
                </span>
              </div>
              <div className="living-timeline">
                <span>EDIT TIMELINE</span>
                <div className="living-timeline-tracks">
                  <i />
                  <i />
                  <i />
                  <b style={{ left: `${state.progress}%` }} />
                </div>
                <small>
                  {state.edited
                    ? "Image · Typography · Motion"
                    : "Original photograph"}
                </small>
              </div>
            </div>
          ) : state.mode === "build" ? (
            <div
              className={`living-build ${state.finished ? "is-finished" : "is-wireframe"} ${state.mobile ? "is-mobile" : "is-desktop"}`}
            >
              <span className="living-build-label">
                {state.finished
                  ? "FROM STRUCTURE TO CHARACTER"
                  : "START WITH THE STRUCTURE"}
              </span>
              <div className="living-website">
                <div className="living-browser">
                  <i />
                  <i />
                  <i />
                  <span>still / a fictional café</span>
                </div>
                <div className="living-web-nav">
                  <strong>still.</strong>
                  <span>COFFEE & COMPANY</span>
                </div>
                <div
                  className={`living-web-content ${state.sitePanel === "menu" ? "showing-menu" : ""}`}
                >
                  <div>
                    {state.sitePanel === "menu" ? (
                      <>
                        <small>THE SAMPLE MENU</small>
                        <h2>
                          A little
                          <br />
                          daily ritual.
                        </h2>
                        <ul>
                          <li>Espresso</li>
                          <li>Flat white</li>
                          <li>Filter coffee</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <small>YOUR DAILY MOMENT OF GOOD</small>
                        <h2>
                          Good coffee.
                          <br />
                          Better company.
                        </h2>
                        <p>A little pause. A place to come together.</p>
                        <span className="living-web-cta">
                          Find your moment ↗
                        </span>
                      </>
                    )}
                  </div>
                  <img
                    src="/images/coffee.jpg"
                    alt="Friends sharing coffee in a website design concept"
                    width="1200"
                    height="800"
                  />
                </div>
                <div className="living-web-footer">
                  <span>THOUGHTFULLY MADE</span>
                  <span>DESIGNED AROUND YOU</span>
                </div>
              </div>
              <span className="living-build-foot">
                {state.mobile ? "Mobile layout" : "Desktop layout"} ·{" "}
                {state.finished ? "Finished design" : "Wireframe structure"}
              </span>
            </div>
          ) : (
            <div className="living-ai">
              <span className="living-ai-eyebrow">
                A REQUEST. A CLEAR NEXT STEP.
              </span>
              <ol className="living-workflow" aria-label="Workflow stages">
                {workflowSteps.map((name, i) => (
                  <li
                    key={name}
                    className={`${i === state.step ? "active" : ""} ${i < state.step ? "complete" : ""}`}
                  >
                    <span>
                      {i < state.step ? (
                        <Check size={14} />
                      ) : (
                        String(i + 1).padStart(2, "0")
                      )}
                    </span>
                    <small>{name}</small>
                  </li>
                ))}
              </ol>
              <div className="living-ai-message">
                <span>STEP {state.step + 1} / 5</span>
                <h2>{workflowSteps[state.step]}</h2>
                <p>{workflowMessages[state.step]}</p>
                {state.step === 4 && (
                  <div className="living-human-check">
                    <Check size={16} /> Human decision required
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {enhance && (
          <div className="living-spatial-layer" aria-hidden="true">
            <SceneBoundary onError={onError}>
              <Suspense fallback={null}>
                <SpatialScene
                  state={state}
                  onReady={onReady}
                  onError={onError}
                />
              </Suspense>
            </SceneBoundary>
          </div>
        )}
        <div className="living-view-bar">
          <span>
            {spatialActive
              ? "SPATIAL PREVIEW"
              : enhance
                ? "Preparing spatial view…"
                : "FLAT PREVIEW"}
          </span>
          <button
            onClick={() => {
              setReady(false);
              setView(wantsSpatial ? "flat" : "spatial");
            }}
            disabled={failed || supported === false}
            aria-label={
              wantsSpatial && supported !== false && !failed
                ? "Use flat preview"
                : "Use spatial preview"
            }
          >
            <Layers3 size={13} />
            {wantsSpatial && supported !== false && !failed
              ? "Flat view"
              : "Spatial view"}
          </button>
        </div>
      </div>
      <div className="living-controls">
        {state.mode === "create" ? (
          <>
            <div className="living-control-row">
              <div
                className="living-segment"
                role="group"
                aria-label="Edit treatment"
              >
                <button
                  aria-pressed={!state.edited}
                  onClick={() => setState((s) => ({ ...s, edited: false }))}
                >
                  Original
                </button>
                <button
                  aria-pressed={state.edited}
                  onClick={() => setState((s) => ({ ...s, edited: true }))}
                >
                  Edited
                </button>
              </div>
              <button
                className="living-play"
                aria-label={
                  state.playing ? "Pause motion preview" : "Play motion preview"
                }
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    playing: !s.playing,
                    progress: s.progress >= 100 ? 0 : s.progress,
                  }))
                }
              >
                {state.playing ? <Pause size={15} /> : <Play size={15} />}
                <span>{state.playing ? "Pause" : "Play the edit"}</span>
              </button>
            </div>
            <label className="living-scrubber">
              <span>Scrub the edit</span>
              <input
                aria-label="Edit timeline"
                type="range"
                min="0"
                max="100"
                value={state.progress}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    progress: Number(e.target.value),
                    playing: false,
                  }))
                }
              />
              <output aria-live="off">
                {String(Math.floor(state.progress / 10)).padStart(2, "0")}s
              </output>
            </label>
          </>
        ) : state.mode === "build" ? (
          <>
            <div className="living-control-row">
              <div
                className="living-segment"
                role="group"
                aria-label="Website design treatment"
              >
                <button
                  aria-pressed={!state.finished}
                  onClick={() => setState((s) => ({ ...s, finished: false }))}
                >
                  Wireframe
                </button>
                <button
                  aria-pressed={state.finished}
                  onClick={() => setState((s) => ({ ...s, finished: true }))}
                >
                  Finished
                </button>
              </div>
              <div
                className="living-segment living-device-controls"
                role="group"
                aria-label="Website viewport"
              >
                <button
                  aria-pressed={!state.mobile}
                  onClick={() => setState((s) => ({ ...s, mobile: false }))}
                >
                  <Monitor size={15} /> Desktop
                </button>
                <button
                  aria-pressed={state.mobile}
                  onClick={() => setState((s) => ({ ...s, mobile: true }))}
                >
                  <Smartphone size={15} /> Mobile
                </button>
              </div>
            </div>
            <button
              className="living-sample-action"
              aria-pressed={state.sitePanel === "menu"}
              onClick={() =>
                setState((s) => ({
                  ...s,
                  sitePanel: s.sitePanel === "home" ? "menu" : "home",
                }))
              }
            >
              {state.sitePanel === "menu"
                ? "Back to sample homepage"
                : "Open the café menu"}{" "}
              <ArrowRight size={14} />
            </button>
          </>
        ) : (
          <div className="living-control-row">
            <span className="living-step-caption">
              {state.step + 1} of 5 · {workflowSteps[state.step]}
            </span>
            <div className="living-ai-controls">
              <button
                aria-label="Previous workflow step"
                disabled={state.step === 0}
                onClick={() => setState((s) => ({ ...s, step: s.step - 1 }))}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    step: s.step === 4 ? 0 : s.step + 1,
                  }))
                }
              >
                {state.step === 4 ? (
                  <>
                    <RotateCcw size={15} /> Restart
                  </>
                ) : (
                  <>
                    Next step <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        <p
          className="living-demo-note"
          role="status"
          aria-label="Showcase feedback"
        >
          {state.mode === "create"
            ? `${state.edited ? "Edited concept" : "Original photo"} · Photo-to-motion illustration, not client footage.`
            : state.mode === "build"
              ? `${state.mobile ? "Mobile" : "Desktop"} · ${state.finished ? "Finished" : "Wireframe"} website concept. No live business or booking.`
              : `${workflowSteps[state.step]} · Scripted workflow. Nothing is sent.`}
          {failed || supported === false
            ? " Flat preview active; all controls still work."
            : ""}
        </p>
        <div className="living-service-actions">
          <Link to={`/services/${serviceId}`}>
            Explore this service <ArrowRight size={14} />
          </Link>
          <button aria-pressed={added} onClick={() => toggleService(serviceId)}>
            {added ? (
              <>
                <Check size={14} /> Added · remove
              </>
            ) : (
              <>
                Add to my project <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
