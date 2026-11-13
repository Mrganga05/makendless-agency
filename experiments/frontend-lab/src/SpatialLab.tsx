import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLabSettings } from "./settings";
import { labPalettes } from "./theme";
import type { SpatialOptions, SpatialRenderer } from "./spatial-renderer";
import "./spatial.css";

function prefersLightweight(reducedMotion: boolean) {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return (
    reducedMotion ||
    connection?.saveData === true ||
    window.matchMedia("(max-width: 700px)").matches
  );
}

function SpatialFallback({ options }: { options: SpatialOptions }) {
  const id = useId().replace(/:/g, "");
  const {
    palette: p,
    material,
    roughness,
    transmission,
    camera,
    light,
  } = options;
  return (
    <svg
      className="spatial-fallback"
      viewBox="0 0 1000 650"
      role="img"
      aria-label={`Interface display illustration, ${material} material, ${camera} camera. This is the non-WebGL fallback.`}
    >
      <defs>
        <pattern
          id={`${id}-bands`}
          width="21"
          height="21"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-16)"
        >
          <rect width="9" height="21" fill={p.paper} />
        </pattern>
        <clipPath id={`${id}-art`}>
          <circle cx="690" cy="275" r="113" />
        </clipPath>
        <linearGradient id={`${id}-glass`} x1="0" x2="1" y1="0" y2="1">
          <stop
            stopColor={light === "warm" ? p.accentLight : p.aqua}
            stopOpacity=".6"
          />
          <stop offset=".52" stopColor={p.paper} stopOpacity=".13" />
          <stop offset="1" stopColor={p.paper} stopOpacity=".65" />
        </linearGradient>
      </defs>
      <ellipse cx="500" cy="565" rx="270" ry="13" fill={p.ink} opacity=".08" />
      <g
        transform={
          camera === "perspective"
            ? "translate(35 35) skewY(-3) scale(.93)"
            : "translate(0 10)"
        }
      >
        <path d="M465 449h70v84h65v17H400v-17h65Z" fill={p.ink} />
        <rect x="166" y="91" width="680" height="375" rx="19" fill={p.ink} />
        <rect x="178" y="103" width="656" height="350" rx="8" fill={p.night} />
        <text x="208" y="139" fill={p.paper} fontSize="14" fontWeight="700">
          MAKENDLESS
        </text>
        <text x="647" y="139" fill={p.paper} fontSize="9">
          CREATE / BUILD / GROW
        </text>
        <path d="M208 157H800" stroke={p.mutedDark} />
        <g fill={p.paper} fontWeight="700" fontSize="57">
          <text x="208" y="230">
            Make
          </text>
          <text x="208" y="290">
            what’s
          </text>
          <text x="208" y="350">
            next.
          </text>
        </g>
        <circle cx="690" cy="275" r="113" fill={p.accent} />
        <rect
          x="560"
          y="150"
          width="260"
          height="260"
          fill={`url(#${id}-bands)`}
          clipPath={`url(#${id}-art)`}
        />
        <text x="210" y="381" fill={p.paper} fontSize="12">
          Ideas into experiences.
        </text>
        <rect x="210" y="395" width="145" height="31" fill={p.accentLight} />
        <text x="220" y="415" fill={p.night} fontSize="10" fontWeight="600">
          EXPLORE THE WORK ↗
        </text>
        <rect
          x="594"
          y="174"
          width="204"
          height="240"
          rx="25"
          fill={material === "glass" ? `url(#${id}-glass)` : p.aqua}
          fillOpacity={
            material === "glass"
              ? 0.3 + (1 - transmission) * 0.7 + roughness * 0.2
              : 1
          }
          stroke={p.paper}
          strokeWidth="2"
        />
        <path
          d="M611 198v187"
          stroke={p.paper}
          opacity=".65"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {material === "satin" && (
          <text
            x="696"
            y="299"
            textAnchor="middle"
            fill={p.ink}
            fontSize="17"
            fontWeight="600"
          >
            SATIN / 01
          </text>
        )}
      </g>
    </svg>
  );
}

export default function SpatialLab({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const { reducedMotion, forceFallback, theme } = useLabSettings();
  const [material, setMaterial] = useState<SpatialOptions["material"]>("glass");
  const [roughness, setRoughness] = useState(0.12);
  const [transmission, setTransmission] = useState(0.92);
  const [light, setLight] = useState<SpatialOptions["light"]>("studio");
  const [camera, setCamera] = useState<SpatialOptions["camera"]>("perspective");
  const [enabled, setEnabled] = useState(
    () => !prefersLightweight(reducedMotion),
  );
  const [status, setStatus] = useState<
    "idle" | "loading" | "ready" | "unavailable"
  >("idle");
  const [retry, setRetry] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const engine = useRef<SpatialRenderer | null>(null);
  const options = useMemo<SpatialOptions>(
    () => ({
      material,
      roughness,
      transmission,
      light,
      camera,
      reducedMotion,
      palette: labPalettes[theme],
    }),
    [material, roughness, transmission, light, camera, reducedMotion, theme],
  );
  const latest = useRef(options);
  latest.current = options;
  const active = enabled && !forceFallback;
  const showing3D = active && status === "ready";
  const controlId = useId();

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let loading = false;
    let observer: IntersectionObserver | undefined;
    const start = async () => {
      if (loading || cancelled) return;
      loading = true;
      setStatus("loading");
      try {
        const { createSpatialRenderer } = await import("./spatial-renderer");
        if (cancelled || !canvas.current) return;
        engine.current = createSpatialRenderer(
          canvas.current,
          latest.current,
          () => {
            if (!cancelled) {
              engine.current = null;
              setStatus("unavailable");
            }
          },
        );
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("unavailable");
      }
    };
    if (typeof IntersectionObserver !== "undefined" && stage.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            void start();
          }
        },
        { rootMargin: "120px" },
      );
      observer.observe(stage.current);
    } else void start();
    return () => {
      cancelled = true;
      observer?.disconnect();
      engine.current?.dispose();
      engine.current = null;
    };
  }, [active, retry]);

  useEffect(() => {
    engine.current?.update(options);
  }, [options]);

  const chooseMaterial = (next: SpatialOptions["material"]) => {
    setMaterial(next);
    setRoughness(next === "glass" ? 0.12 : 0.45);
  };
  const enable = () => {
    setEnabled(true);
    setRetry((value) => value + 1);
  };

  return (
    <section
      className={`spatial-lab${embedded ? " spatial-lab--embedded" : ""}`}
      aria-label="Spatial material study"
    >
      {!embedded && (
        <header className="spatial-heading">
          <p className="lab-eyebrow">EXPERIMENT 02 / SPATIAL MATERIALS</p>
          <h2>
            A digital idea.
            <br />
            <span>A physical presence.</span>
          </h2>
          <p>
            An original interface display with a material lens. Compare how
            surface, light, and perspective change the presentation of the same
            work.
          </p>
        </header>
      )}
      <figure className="spatial-figure">
        <div className="spatial-stage" ref={stage}>
          <div className="spatial-stage-label">
            <span>MAKENDLESS — BUILD</span>
            <span>{material === "glass" ? "GLASS / 01" : "SATIN / 02"}</span>
          </div>
          <div className="spatial-artwork" aria-hidden={showing3D}>
            <SpatialFallback options={options} />
          </div>
          <canvas
            ref={canvas}
            className={`spatial-canvas${showing3D ? " is-ready" : ""}`}
            aria-hidden="true"
          />
          <div className="spatial-stage-footer">
            <span>INTERFACE / MATERIAL STUDY</span>
            <span>
              {showing3D ? "WEBGL · ON DEMAND" : "SVG · LIGHTWEIGHT VIEW"}
            </span>
          </div>
        </div>
        <figcaption className="spatial-caption">
          <span role="status" aria-label="Rendering status">
            {forceFallback
              ? "Lightweight view is enabled in lab settings."
              : status === "unavailable"
                ? "3D is unavailable. The interactive illustration remains usable."
                : showing3D
                  ? "Live 3D. Change the lens material or viewing angle."
                  : status === "loading" && active
                    ? "Preparing the 3D material study…"
                    : "A lightweight illustration. Enable 3D to inspect real transmission."}
          </span>
          {!forceFallback && !showing3D && status !== "loading" && (
            <button className="spatial-link" onClick={enable}>
              {status === "unavailable" ? "Retry 3D ↗" : "Enable 3D ↗"}
            </button>
          )}
          {showing3D && (
            <button
              className="spatial-link"
              onClick={() => {
                setEnabled(false);
                setStatus("idle");
              }}
            >
              Use lightweight view ↗
            </button>
          )}
        </figcaption>
      </figure>
      <div className="spatial-controls">
        <fieldset>
          <legend>01 / Surface</legend>
          <div className="spatial-segment">
            <button
              aria-pressed={material === "glass"}
              onClick={() => chooseMaterial("glass")}
            >
              Glass
            </button>
            <button
              aria-pressed={material === "satin"}
              onClick={() => chooseMaterial("satin")}
            >
              Satin
            </button>
          </div>
        </fieldset>
        <fieldset>
          <legend>02 / Perspective</legend>
          <div className="spatial-segment">
            <button
              aria-pressed={camera === "perspective"}
              onClick={() => setCamera("perspective")}
            >
              Three-quarter
            </button>
            <button
              aria-pressed={camera === "front"}
              onClick={() => setCamera("front")}
            >
              Front
            </button>
          </div>
        </fieldset>
        {!embedded && (
          <>
            <fieldset>
              <legend>03 / Lighting</legend>
              <div className="spatial-segment">
                <button
                  aria-pressed={light === "studio"}
                  onClick={() => setLight("studio")}
                >
                  Studio
                </button>
                <button
                  aria-pressed={light === "warm"}
                  onClick={() => setLight("warm")}
                >
                  Warm
                </button>
              </div>
            </fieldset>
            <div className="spatial-range">
              <label htmlFor={`${controlId}-roughness`}>
                Roughness <output>{roughness.toFixed(2)}</output>
              </label>
              <input
                id={`${controlId}-roughness`}
                type="range"
                min="0"
                max="0.8"
                step="0.01"
                value={roughness}
                onChange={(event) => setRoughness(Number(event.target.value))}
              />
            </div>
            <div className="spatial-range">
              <label htmlFor={`${controlId}-transmission`}>
                Transmission{" "}
                <output>
                  {material === "glass" ? transmission.toFixed(2) : "—"}
                </output>
              </label>
              <input
                id={`${controlId}-transmission`}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={transmission}
                disabled={material !== "glass"}
                onChange={(event) =>
                  setTransmission(Number(event.target.value))
                }
              />
            </div>
          </>
        )}
      </div>
      {!embedded && (
        <p className="spatial-method">
          The glass lens uses physical transmission, thickness, and an
          environment map. The SVG view illustrates the composition; it does not
          simulate refraction. Camera changes settle, then rendering stops. On
          small screens, reduced-motion, or data-saving preferences, 3D starts
          only when requested.
        </p>
      )}
    </section>
  );
}
