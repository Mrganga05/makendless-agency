import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Check, Pause, Play, RotateCcw } from "lucide-react";
import { useLabSettings } from "./settings";
import "./motion.css";

const chapters = [
  {
    label: "Find the signal",
    text: "A clear idea comes first. The first frame establishes one subject, one direction and one reason to care.",
    title: "ONE CLEAR IDEA.",
    progress: 20,
  },
  {
    label: "Give it a rhythm",
    text: "Type, image and a line move in sequence. Each layer has a job; motion does not compete with the message.",
    title: "A LITTLE RHYTHM.",
    progress: 60,
  },
  {
    label: "Leave a feeling",
    text: "The composition resolves. The final frame stays useful, and the visitor chooses what happens next.",
    title: "MAKE IT MATTER.",
    progress: 100,
  },
];

function Storytelling() {
  const [active, setActive] = useState(0);
  const host = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useLabSettings();
  useEffect(() => {
    if (!host.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entered = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (entered)
          setActive(Number((entered.target as HTMLElement).dataset.chapter));
      },
      { rootMargin: "-18% 0px -25% 0px", threshold: [0.1, 0.45, 0.75] },
    );
    host.current
      .querySelectorAll("[data-chapter]")
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <section
      className="ml-scroll-story"
      aria-labelledby="ml-scroll-title"
      data-reduced={reducedMotion}
    >
      <div className="ml-scroll-heading">
        <span className="ml-eyebrow">
          SCROLL CHOREOGRAPHY / NO SCROLL HIJACKING
        </span>
        <h3 id="ml-scroll-title">
          A narrative,
          <br />
          in three beats.
        </h3>
        <p>
          Scroll through the chapters, or select a step. The text remains
          readable without observation or animation.
        </p>
      </div>
      <div className="ml-scroll-layout" ref={host}>
        <div
          className="ml-sticky-story"
          aria-label="Current narrative composition"
        >
          <div className="ml-story-frame" key={active}>
            <span>0{active + 1} / FRAME STUDY</span>
            <strong>{chapters[active].title}</strong>
            <svg viewBox="0 0 240 55" aria-hidden="true">
              <path
                d="M10 35H63L87 12L116 43L145 21L171 35H230"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={100 - chapters[active].progress}
              />
            </svg>
          </div>
          <div
            className="ml-story-steps"
            role="group"
            aria-label="Select a narrative chapter"
          >
            {chapters.map((chapter, i) => (
              <button
                key={chapter.label}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                0{i + 1}
                <span>{chapter.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="ml-chapters">
          {chapters.map((chapter, i) => (
            <article
              key={chapter.label}
              data-chapter={i}
              className={active === i ? "is-active" : ""}
            >
              <span>0{i + 1}</span>
              <h4>{chapter.label}</h4>
              <p>{chapter.text}</p>
              <button onClick={() => setActive(i)}>
                Inspect this frame <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MotionLab() {
  const [progress, setProgress] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [scene, setScene] = useState("Film");
  const [headline, setHeadline] = useState("MAKE IT MATTER.");
  const [saved, setSaved] = useState(false);
  const [collection, setCollection] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const sceneHost = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useLabSettings();
  const phase =
    progress < 25
      ? "Establish"
      : progress < 55
        ? "Compose"
        : progress < 85
          ? "Connect"
          : "Resolve";
  const workflow = ["Inquiry", "Classify", "Route", "Draft", "Human review"];
  const workflowStep = Math.min(4, Math.floor(progress / 20));

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setInterval(
      () => setProgress((p) => Math.min(100, p + 1)),
      60,
    );
    const pause = () => setPlaying(false);
    const visibility = () => {
      if (document.hidden) pause();
    };
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            if (entry && !entry.isIntersecting) pause();
          });
    if (stage.current) observer?.observe(stage.current);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.clearInterval(timer);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [playing, reducedMotion]);
  useEffect(() => {
    if (progress === 100 || reducedMotion) setPlaying(false);
  }, [progress, reducedMotion]);
  useEffect(() => {
    const element = sceneHost.current;
    if (!element || reducedMotion || typeof element.animate !== "function")
      return;
    const animation = element.animate(
      [
        { clipPath: "inset(0 12% 0 0)", opacity: 0.6, translate: "8px 0" },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, translate: "0 0" },
      ],
      { duration: 520, easing: "cubic-bezier(.2,.7,.2,1)" },
    );
    const cancel = () => animation.cancel();
    element.addEventListener("focusin", cancel);
    return () => {
      animation.cancel();
      element.removeEventListener("focusin", cancel);
    };
  }, [scene, reducedMotion]);

  function play() {
    setSaved(false);
    if (reducedMotion) {
      setProgress((p) => (p >= 100 ? 0 : Math.min(100, p + 25)));
      return;
    }
    if (playing) setPlaying(false);
    else {
      if (progress === 100) setProgress(0);
      setPlaying(true);
    }
  }
  return (
    <div className="ml-lab" data-reduced={reducedMotion}>
      <header className="ml-intro">
        <span className="ml-eyebrow">EXPERIMENT 03 / MOTION GRAPHICS</span>
        <h2>
          One idea.
          <br />A considered sequence.
        </h2>
        <p>
          Type, mask, interface and SVG movement share one playhead. Scrub the
          composition, compare scenes, then inspect a scroll narrative.
        </p>
      </header>
      <div
        className="ml-controls-top"
        role="group"
        aria-label="Choose a motion scene"
      >
        {["Film", "Website", "Workflow"].map((name) => (
          <button
            key={name}
            aria-pressed={scene === name}
            onClick={() => {
              setScene(name);
              setPlaying(false);
              setSaved(false);
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div
        className={`ml-stage ml-scene-${scene.toLowerCase()}`}
        ref={stage}
        style={
          {
            "--ml-progress": progress,
            "--ml-reveal": `${100 - progress}%`,
          } as CSSProperties
        }
      >
        <div className="ml-stage-meta">
          <span>MAKENDLESS / ORIGINAL MOTION STUDY</span>
          <span>{phase}</span>
        </div>
        <div ref={sceneHost} className="ml-scene-content">
          {scene === "Film" ? (
            <>
              <div className="ml-film-art" aria-hidden="true">
                <svg viewBox="0 0 460 330">
                  <path
                    className="ml-ribbon-shadow"
                    d="M44 250L157 49L294 132L407 79L288 278L157 199Z"
                  />
                  <path
                    className="ml-ribbon-back"
                    d="M44 225L157 24L294 107L407 54L288 253L157 174Z"
                  />
                  <path
                    className="ml-ribbon-front"
                    d="M157 24L157 174L288 253L294 107Z"
                  />
                  <path
                    className="ml-ribbon-line"
                    d="M44 225L157 174L294 107L407 54"
                  />
                </svg>
                <span>
                  FRAME / 0{Math.min(3, Math.floor(progress / 34) + 1)}
                </span>
              </div>
              <div className="ml-type-composition">
                <span className="ml-type-code">
                  CREATE / A FILM WITHOUT FOOTAGE
                </span>
                <h3 aria-label={headline || "MAKE IT MATTER."}>
                  <span
                    style={{
                      clipPath: reducedMotion
                        ? undefined
                        : `inset(0 0 ${Math.max(0, 100 - progress * 3)}% 0)`,
                    }}
                    aria-hidden="true"
                  >
                    {headline || "MAKE IT MATTER."}
                  </span>
                </h3>
                <p>
                  {progress < 55
                    ? "An idea, waiting for its rhythm."
                    : "A clear message. A composed finish."}
                </p>
              </div>
            </>
          ) : scene === "Website" ? (
            <div
              className={`ml-website ${progress < 50 ? "is-structure" : "is-finished"}`}
            >
              <header>
                <strong>fold.</strong>
                <span>OBJECTS WITH INTENTION</span>
              </header>
              {collection ? (
                <div className="ml-site-collection">
                  <h3>A small collection.</h3>
                  <div>
                    {[
                      "The bookend",
                      "The letter tray",
                      "The standing frame",
                    ].map((name, i) => (
                      <article key={name}>
                        <i className={`ml-object ml-object-${i}`} />
                        <span>{name}</span>
                      </article>
                    ))}
                  </div>
                  <button onClick={() => setCollection(false)}>
                    Return to introduction <ArrowRight size={15} />
                  </button>
                </div>
              ) : (
                <div className="ml-site-body">
                  <div>
                    <span>A FICTIONAL DESIGN SHOP</span>
                    <h3>
                      Give everyday
                      <br />a little form.
                    </h3>
                    <p>
                      Original interface study. A working composition, not a
                      customer website.
                    </p>
                    <button onClick={() => setCollection(true)}>
                      Explore the collection <ArrowRight size={15} />
                    </button>
                  </div>
                  <div className="ml-site-sculpture" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              )}
              <footer>
                {progress < 50
                  ? "Structure: hierarchy before finish."
                  : "Finish: material, rhythm and a useful next step."}
              </footer>
            </div>
          ) : (
            <div className="ml-workflow">
              <div>
                <span>INQUIRY → HUMAN REVIEW</span>
                <h3>{workflow[workflowStep]}</h3>
                <p>
                  {
                    [
                      "A sample request arrives.",
                      "The request concerns a website.",
                      "It reaches the website planning queue.",
                      "A suggested response is prepared.",
                      "A person reviews the draft. Nothing is sent.",
                    ][workflowStep]
                  }
                </p>
              </div>
              <ol>
                {workflow.map((name, i) => (
                  <li
                    key={name}
                    className={i <= workflowStep ? "is-reached" : ""}
                  >
                    <span>
                      {i < workflowStep ? <Check size={17} /> : i + 1}
                    </span>
                    {name}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
        <svg
          className="ml-sequence-line"
          viewBox="0 0 1000 65"
          preserveAspectRatio="none"
          aria-label="Illustrative sequence path"
        >
          <path
            d="M15 45H220L260 15H440L480 45H670L710 15H985"
            pathLength="100"
          />
          <path
            d="M15 45H220L260 15H440L480 45H670L710 15H985"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - progress}
          />
        </svg>
      </div>
      <div className="ml-transport">
        <button onClick={play}>
          {reducedMotion ? (
            <ArrowRight size={16} />
          ) : playing ? (
            <Pause size={16} />
          ) : (
            <Play size={16} />
          )}{" "}
          {reducedMotion
            ? "Advance frame"
            : playing
              ? "Pause sequence"
              : progress === 100
                ? "Replay sequence"
                : "Play sequence"}
        </button>
        <label>
          Sequence position{" "}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            aria-valuetext={`${progress} percent, ${phase.toLowerCase()}`}
            onChange={(event) => {
              setPlaying(false);
              setProgress(Number(event.target.value));
              setSaved(false);
            }}
          />
        </label>
        <output aria-live="off" aria-label="Sequence progress">
          {progress}%
        </output>
        <button
          onClick={() => {
            setProgress(0);
            setPlaying(false);
            setSaved(false);
          }}
          aria-label="Reset sequence"
        >
          <RotateCcw size={17} />
        </button>
      </div>
      <div className="ml-editor">
        <label>
          Motion headline{" "}
          <input
            value={headline}
            maxLength={45}
            onChange={(event) => {
              setHeadline(event.target.value);
              setSaved(false);
            }}
          />
        </label>
        <button
          onClick={() => {
            setPlaying(false);
            setSaved(true);
          }}
        >
          {saved ? <Check size={16} /> : <ArrowRight size={16} />}{" "}
          {saved ? "Frame held" : "Hold this frame"}
        </button>
        <p role="status">
          {saved
            ? `Holding ${scene.toLowerCase()} at ${progress}%. This is a local study, not an exported file.`
            : "A six-second, silent, user-started sequence. No automatic loop."}
        </p>
      </div>
      <Storytelling />
    </div>
  );
}
