import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Layers3,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  classifyInquiry,
  initialShowcaseState,
  workflowSteps,
  type ShowcaseMode,
} from "../showcase-state";
import { useProject } from "../project";
import { useSiteTheme } from "../theme-context";
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
    const gl = document
      .createElement("canvas")
      .getContext("webgl2", { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}
const modes = [
  {
    id: "create" as const,
    label: "CREATE",
    description: "Video editing",
    number: "01",
  },
  {
    id: "build" as const,
    label: "BUILD",
    description: "Websites",
    number: "02",
  },
  { id: "ai" as const, label: "AI", description: "Automation", number: "03" },
];
export default function LiveShowcase({
  initialMode = "create",
  variant = "hero",
  showModeSwitch = true,
  theme: providedTheme,
  showServiceActions = false,
  onModeChange,
}: {
  initialMode?: ShowcaseMode;
  variant?: "hero" | "study";
  showModeSwitch?: boolean;
  theme?: "glass" | "atelier";
  showServiceActions?: boolean;
  onModeChange?: (mode: ShowcaseMode) => void;
} = {}) {
  const { project, toggleService } = useProject();
  const { theme: siteTheme } = useSiteTheme();
  const theme = providedTheme ?? siteTheme;
  const [state, setState] = useState(() => ({
    ...initialShowcaseState,
    mode: initialMode,
  }));
  const [reviewed, setReviewed] = useState(false);
  const [view, setView] = useState<"auto" | "flat" | "spatial">("auto");
  const [supported, setSupported] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const host = useRef<HTMLDivElement>(null);
  const id = useId();
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
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!host.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "0px" },
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
    if (reduced || !visible || !pageVisible) {
      setState((s) => (s.playing ? { ...s, playing: false } : s));
      return;
    }
    if (!state.playing || state.mode !== "create") return;
    const timer = window.setInterval(
      () =>
        setState((s) => {
          const progress = Math.min(100, s.progress + 2);
          return { ...s, progress, playing: progress < 100 };
        }),
      120,
    );
    return () => clearInterval(timer);
  }, [state.playing, state.mode, visible, pageVisible, reduced]);
  const phrase =
    state.progress < 35
      ? "Go somewhere."
      : state.progress < 70
        ? "Feel something."
        : "Make it matter.";
  const comparison = state.comparison ?? 100;
  const classification = classifyInquiry(state.inquiry || "");
  const generatedDraft = `Thanks for reaching out. Let’s explore your ${classification.category.toLowerCase()} goals. What are you hoping to create, and what timeline do you have in mind?`;
  const spatialActive = enhance && ready;
  const serviceId =
    state.mode === "create" ? "V1" : state.mode === "build" ? "T1" : "T4";
  const added = project.services.includes(serviceId);
  const editComparison = (value: number) =>
    setState((s) => ({
      ...s,
      comparison: value,
      edited: value > 0,
      playing: false,
    }));
  const changeInquiry = (inquiry: string) => {
    setReviewed(false);
    setState((s) => ({
      ...s,
      inquiry,
      workflowCategory: classifyInquiry(inquiry).category,
      draft: undefined,
      step: 0,
    }));
  };
  return (
    <section
      className={`living-showcase living-showcase--${variant}`}
      data-showcase-mode={state.mode}
      data-showcase-theme={theme}
      aria-label="Living service showcase"
      ref={host}
    >
      {showModeSwitch && (
        <div
          className="living-mode-tabs"
          role="group"
          aria-label="Choose a service showcase"
        >
          {modes.map(({ id, label, description, number }) => (
            <button
              key={id}
              aria-pressed={state.mode === id}
              onClick={() => {
                setState((s) => ({ ...s, mode: id, playing: false }));
                onModeChange?.(id);
              }}
            >
              <span className="living-mode-number" aria-hidden="true">
                {number}
              </span>
              <span>
                <strong>{label}</strong>
                <small>{description}</small>
              </span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
      <div
        className={`living-stage mode-${state.mode} ${spatialActive ? "spatial-active" : ""}`}
      >
        {enhance && (
          <div className="living-spatial-layer" aria-hidden="true">
            <SceneBoundary onError={onError}>
              <Suspense fallback={null}>
                <SpatialScene
                  theme={theme}
                  state={{
                    ...state,
                    workflowCategory: classification.category,
                    draft: state.draft ?? generatedDraft,
                  }}
                  onReady={onReady}
                  onError={onError}
                />
              </Suspense>
            </SceneBoundary>
          </div>
        )}
        <div
          className="living-flat-preview"
          key={state.mode}
          data-motion="spatial"
          aria-label={`${modes.find((mode) => mode.id === state.mode)?.description} preview`}
        >
          {state.mode === "create" ? (
            <div
              className={`living-edit ${state.edited ? "is-edited" : "is-original"} crop-${state.crop} captions-${state.captions}`}
              data-comparison={comparison}
            >
              <div className="living-edit-surface">
                <img
                  src="/images/mountain.jpg"
                  alt="Mountain valley source photograph"
                  width="1400"
                  height="933"
                  fetchPriority={variant === "hero" ? "high" : "auto"}
                />
                <div
                  className="living-edited-layer"
                  style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }}
                >
                  <img
                    src="/images/mountain.jpg"
                    alt=""
                    width="1400"
                    height="933"
                    style={{
                      transform: `scale(${state.crop === "tight" ? 1.4 : 1.06 + state.progress * 0.0012}) translateY(${-state.progress * 0.02}%)`,
                    }}
                  />
                  {state.edited && state.captions !== "none" && (
                    <div
                      className="living-film-title"
                      key={Math.floor(state.progress / 35)}
                    >
                      <span>OUTSIDE THE ORDINARY</span>
                      <h2>{phrase}</h2>
                      <small>A MAKENDLESS MOTION CONCEPT</small>
                    </div>
                  )}
                  <span className="living-frame-count" aria-hidden="true">
                    0{Math.min(5, Math.floor(state.progress / 17)) + 1} / 06
                  </span>
                </div>
                {comparison > 0 && comparison < 100 && (
                  <div
                    className="living-comparison-line"
                    style={{ left: `${comparison}%` }}
                    aria-hidden="true"
                  >
                    <span>↔</span>
                  </div>
                )}
                <span className="living-frame-label">
                  {state.edited ? "THE EDIT" : "SOURCE VIEW"}
                </span>
                <div className="living-media-credit">
                  <span>FIELD NOTES</span>
                  <span>PHOTO / MOTION STUDY</span>
                </div>
              </div>
              <div className="living-film-strip" aria-hidden="true">
                <span>01 / THE OPENING</span>
                <i />
                <span>02 / THE FEELING</span>
                <i />
                <span>03 / THE RESOLVE</span>
              </div>
            </div>
          ) : state.mode === "build" ? (
            <div
              className={`living-build ${state.finished ? "is-finished" : "is-wireframe"} ${state.mobile ? "is-mobile" : "is-desktop"}`}
            >
              <div className="living-browser">
                <span>still.</span>
                <span>INDEPENDENT COFFEE / CONCEPT</span>
                <i aria-hidden="true">↗</i>
              </div>
              <div className="living-web-content">
                <div>
                  <small>
                    {state.sitePanel === "menu"
                      ? "THE SAMPLE MENU"
                      : "A SMALL PAUSE. A BETTER DAY."}
                  </small>
                  <h2>
                    {state.sitePanel === "menu" ? (
                      <>
                        A little
                        <br />
                        daily ritual.
                      </>
                    ) : (
                      <>
                        Good coffee.
                        <br />
                        Better company.
                      </>
                    )}
                  </h2>
                  {state.sitePanel === "menu" ? (
                    <ul className="living-menu">
                      <li>
                        Espresso <span>Bold & balanced</span>
                      </li>
                      <li>
                        Flat white <span>Soft & smooth</span>
                      </li>
                      <li>
                        Filter coffee <span>Slow & thoughtful</span>
                      </li>
                    </ul>
                  ) : (
                    <p>Your everyday place for something thoughtfully made.</p>
                  )}
                  <button
                    className="living-sample-action"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        sitePanel: s.sitePanel === "home" ? "menu" : "home",
                      }))
                    }
                  >
                    {state.sitePanel === "menu"
                      ? "Back to sample homepage"
                      : "Open the café menu"}
                    <ArrowRight size={15} />
                  </button>
                </div>
                <img
                  src="/images/coffee.jpg"
                  alt="Friends sharing coffee in a fictional café website"
                  width="1200"
                  height="800"
                  loading="lazy"
                />
              </div>
              <div className="living-web-footer">
                <span>
                  {state.finished
                    ? "FROM STRUCTURE TO CHARACTER"
                    : "START WITH THE STRUCTURE"}
                </span>
                <span>
                  {state.mobile ? "Mobile layout" : "Desktop layout"} ·{" "}
                  {state.finished ? "Finished design" : "Wireframe structure"}
                </span>
              </div>
            </div>
          ) : (
            <div className="living-ai">
              <div className="living-ai-topline">
                <span>ONE REQUEST. A CLEAR NEXT STEP.</span>
                <span>LOCAL SIMULATION</span>
              </div>
              <ol className="living-workflow" aria-label="Workflow stages">
                {workflowSteps.map((name, i) => (
                  <li
                    key={name}
                    className={`${i === state.step ? "active" : ""} ${i < state.step ? "complete" : ""}`}
                    aria-current={i === state.step ? "step" : undefined}
                  >
                    <span>
                      {i < state.step ? (
                        <Check size={13} />
                      ) : (
                        String(i + 1).padStart(2, "0")
                      )}
                    </span>
                    <small>
                      {["Inquiry", "Classify", "Route", "Draft", "Review"][i]}
                    </small>
                  </li>
                ))}
              </ol>
              <div
                className="living-ai-message"
                key={state.step}
                data-motion="transform"
              >
                <span>STEP {state.step + 1} / 5</span>
                <h2>{workflowSteps[state.step]}</h2>
                {state.step === 0 && (
                  <>
                    <p>“{state.inquiry}”</p>
                    <details className="living-inquiry-editor">
                      <summary>Try your own inquiry</summary>
                      <label htmlFor={`${id}-inquiry`}>Example inquiry</label>
                      <textarea
                        id={`${id}-inquiry`}
                        maxLength={360}
                        rows={3}
                        value={state.inquiry}
                        onChange={(event) => changeInquiry(event.target.value)}
                      />
                      {!state.inquiry?.trim() && (
                        <small>Write a request to begin.</small>
                      )}
                    </details>
                  </>
                )}
                {state.step === 1 && (
                  <>
                    <p>{classification.category}</p>
                    <small>
                      Classified by local keyword rules. No AI request is made.
                    </small>
                  </>
                )}
                {state.step === 2 && (
                  <>
                    <p>Routed to {classification.studio}.</p>
                    <small>
                      The request stays available for a person to check.
                    </small>
                  </>
                )}
                {state.step === 3 && (
                  <label className="living-draft-label">
                    Editable response draft
                    <textarea
                      rows={4}
                      value={state.draft ?? generatedDraft}
                      onChange={(event) => {
                        setReviewed(false);
                        setState((s) => ({ ...s, draft: event.target.value }));
                      }}
                    />
                  </label>
                )}
                {state.step === 4 && (
                  <>
                    <p>{state.draft ?? generatedDraft}</p>
                    <span className="living-human-check">
                      <Check size={15} />
                      {reviewed
                        ? "Reviewed locally. Nothing was sent."
                        : "Human decision required"}
                    </span>
                    <button
                      className="living-review-button"
                      disabled={
                        reviewed || !(state.draft ?? generatedDraft).trim()
                      }
                      onClick={() => setReviewed(true)}
                    >
                      {reviewed ? "Review recorded" : "Mark as reviewed"}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
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
            <Layers3 size={14} />
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
                  onClick={() => editComparison(0)}
                >
                  Original
                </button>
                <button
                  aria-pressed={comparison === 50}
                  onClick={() => editComparison(50)}
                >
                  Compare
                </button>
                <button
                  aria-pressed={comparison === 100}
                  onClick={() => editComparison(100)}
                >
                  Edited
                </button>
              </div>
              <button
                className="living-play"
                aria-label={
                  reduced
                    ? "Next still"
                    : state.playing
                      ? "Pause motion preview"
                      : "Play motion preview"
                }
                onClick={() =>
                  setState((s) =>
                    reduced
                      ? {
                          ...s,
                          edited: true,
                          comparison: 100,
                          progress: s.progress >= 70 ? 0 : s.progress + 35,
                          playing: false,
                        }
                      : {
                          ...s,
                          edited: true,
                          comparison: 100,
                          playing: !s.playing,
                          progress: s.progress >= 100 ? 0 : s.progress,
                        },
                  )
                }
              >
                {state.playing ? <Pause size={15} /> : <Play size={15} />}
                <span>
                  {reduced
                    ? "Next still"
                    : state.playing
                      ? "Pause"
                      : "Play the edit"}
                </span>
              </button>
            </div>
            <label className="living-scrubber">
              <span>Compare the edit</span>
              <input
                aria-label="Before and after comparison"
                type="range"
                min="0"
                max="100"
                value={comparison}
                aria-valuetext={`${comparison}% edited composition`}
                onChange={(e) => editComparison(Number(e.target.value))}
              />
              <span>{comparison}%</span>
            </label>
            <details
              className="living-refinements"
              open={variant === "study" || undefined}
            >
              <summary>
                Make it yours <span>Caption, framing & timing</span>
              </summary>
              <div className="living-refinement-grid">
                <label>
                  Caption style
                  <select
                    value={state.captions}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        captions: e.target.value as
                          "editorial" | "bold" | "none",
                      }))
                    }
                  >
                    <option value="editorial">Editorial</option>
                    <option value="bold">Bold statement</option>
                    <option value="none">No caption</option>
                  </select>
                </label>
                <label>
                  Framing
                  <select
                    value={state.crop}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        crop: e.target.value as "wide" | "tight",
                      }))
                    }
                  >
                    <option value="wide">Wide view</option>
                    <option value="tight">Closer crop</option>
                  </select>
                </label>
              </div>
              <label className="living-scrubber">
                <span>Scrub the edit</span>
                <input
                  aria-label="Edit timeline"
                  type="range"
                  min="0"
                  max="100"
                  value={state.progress}
                  aria-valuetext={`${Math.round(state.progress * 0.06)} seconds of six`}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      progress: Number(e.target.value),
                      playing: false,
                    }))
                  }
                />
                <span aria-hidden="true">
                  {Math.round(state.progress * 0.06)}s
                </span>
              </label>
            </details>
          </>
        ) : state.mode === "build" ? (
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
              className="living-segment"
              role="group"
              aria-label="Website viewport"
            >
              <button
                aria-pressed={!state.mobile}
                onClick={() => setState((s) => ({ ...s, mobile: false }))}
              >
                Desktop
              </button>
              <button
                aria-pressed={state.mobile}
                onClick={() => setState((s) => ({ ...s, mobile: true }))}
              >
                Mobile
              </button>
            </div>
          </div>
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
                disabled={
                  !state.inquiry?.trim() ||
                  (state.step === 3 && !(state.draft ?? generatedDraft).trim())
                }
                onClick={() => {
                  setReviewed(false);
                  setState((s) => ({
                    ...s,
                    step: s.step === 4 ? 0 : s.step + 1,
                  }));
                }}
              >
                {state.step === 4 ? (
                  <>
                    <RotateCcw size={15} />
                    Restart
                  </>
                ) : (
                  <>
                    Next step
                    <ArrowRight size={15} />
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
              : `${workflowSteps[state.step]} · Rule-based simulation. Nothing is sent.`}
          {failed || supported === false
            ? " Flat preview active; all controls still work."
            : ""}
        </p>
        {showServiceActions && (
          <div className="living-service-actions">
            <Link to={`/services/${serviceId}`}>
              Explore this service
              <ArrowRight size={14} />
            </Link>
            <button
              aria-pressed={added}
              onClick={() => toggleService(serviceId)}
            >
              {added ? (
                <>
                  <Check size={14} />
                  Added · remove
                </>
              ) : (
                <>
                  Add to my project
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
