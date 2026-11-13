import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import "../../v14-studios.css";

/** Large native destinations; preview controls stay outside the links. */
export function StudioDestinations() {
  const [active, setActive] = useState("create");
  const [cut, setCut] = useState<"frame" | "story">("story");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [chapter, setChapter] = useState(0);
  const growth = [
    {
      name: "Plan",
      title: "A clear point of view.",
      detail: "One idea. A considered campaign direction.",
    },
    {
      name: "Tell",
      title: "A story worth sharing.",
      detail: "A concept social creative, shaped for its placement.",
    },
    {
      name: "Connect",
      title: "Make your presence count.",
      detail: "An illustrative local campaign. No results claimed.",
    },
  ];
  return (
    <div className="v16-world-grid" aria-label="Choose your studio">
      <article
        className={`v16-world v16-world-create ${active === "create" ? "is-active" : ""}`}
        aria-labelledby="create-world-title"
      >
        <Link
          className="v16-world-destination"
          to="/studios/create"
          aria-label="Enter CREATE studio"
          onFocus={() => setActive("create")}
          onPointerEnter={() => setActive("create")}
        >
          <span className="v16-world-index">
            01 / THE CREATIVE STUDIO <ArrowUpRight size={24} />
          </span>
          <div
            className={`v16-world-film is-${cut}`}
            data-motion="mask"
            data-motion-key={cut}
          >
            <svg viewBox="0 0 440 330" aria-hidden="true">
              <circle
                cx="220"
                cy="165"
                r="125"
                fill="none"
                stroke="currentColor"
              />
              <circle
                cx="220"
                cy="165"
                r="85"
                fill="none"
                stroke="currentColor"
              />
              {Array.from({ length: 23 }, (_, i) => (
                <path
                  key={i}
                  d={`M${45 + i * 16} ${165 - Math.sin(i * 0.44) ** 2 * 100}v${Math.sin(i * 0.44) ** 2 * 200 + 1}`}
                  stroke="currentColor"
                  strokeWidth="6"
                />
              ))}
            </svg>
            {cut === "story" ? (
              <div>
                <span>A LITTLE RHYTHM.</span>
                <strong>
                  A lasting
                  <br />
                  <em>feeling.</em>
                </strong>
                <small>ORIGINAL TITLE-SEQUENCE CONCEPT</small>
              </div>
            ) : (
              <span className="v16-world-raw">
                THE ARTWORK / BEFORE THE STORY
              </span>
            )}
            <div className="v16-world-timeline" aria-hidden="true">
              <i />
              <i />
              <i />
              <b />
            </div>
          </div>
          <div className="v16-world-name">
            <h3 id="create-world-title">CREATE</h3>
            <p>Video Editing</p>
          </div>
          <span className="v16-world-enter">
            Enter the creative studio <ArrowUpRight size={18} />
          </span>
        </Link>
        <div
          className="v16-world-controls"
          role="group"
          aria-label="CREATE title treatment"
        >
          {(["frame", "story"] as const).map((value) => (
            <button
              key={value}
              aria-pressed={cut === value}
              onClick={() => {
                setCut(value);
                setActive("create");
              }}
            >
              The {value}
            </button>
          ))}
        </div>
      </article>
      <article
        className={`v16-world v16-world-build ${active === "build" ? "is-active" : ""}`}
        aria-labelledby="build-world-title"
      >
        <Link
          className="v16-world-destination"
          to="/studios/build"
          aria-label="Enter BUILD studio"
          onFocus={() => setActive("build")}
          onPointerEnter={() => setActive("build")}
        >
          <span className="v16-world-index">
            02 / THE WEBSITE STUDIO <ArrowUpRight size={24} />
          </span>
          <div
            className={`v16-world-device is-${device}`}
            data-motion="spatial"
            data-motion-key={device}
          >
            <div className="v16-world-browser">
              <span>form.</span>
              <i />
              <i />
              <i />
            </div>
            <div className="v16-world-site">
              <div>
                <small>SPACE FOR THE NEXT IDEA.</small>
                <strong>
                  Room for
                  <br />
                  more.
                </strong>
                <span>A fictional workspace website.</span>
              </div>
              <div className="v16-world-site-art" aria-hidden="true">
                <i />
                <b />
              </div>
            </div>
            <div className="v16-world-site-foot">
              THOUGHTFULLY BUILT / {device.toUpperCase()}
            </div>
          </div>
          <div className="v16-world-name">
            <h3 id="build-world-title">BUILD</h3>
            <p>Website Development</p>
          </div>
          <span className="v16-world-enter">
            Enter the website studio <ArrowUpRight size={18} />
          </span>
        </Link>
        <div
          className="v16-world-controls"
          role="group"
          aria-label="BUILD responsive preview"
        >
          {(["desktop", "mobile"] as const).map((value) => (
            <button
              key={value}
              aria-pressed={device === value}
              onClick={() => {
                setDevice(value);
                setActive("build");
              }}
            >
              {value === "desktop" ? (
                <Monitor size={15} />
              ) : (
                <Smartphone size={15} />
              )}{" "}
              {value === "desktop" ? "Desktop" : "Mobile"}
            </button>
          ))}
        </div>
      </article>
      <article
        className={`v16-world v16-world-grow ${active === "grow" ? "is-active" : ""}`}
        aria-labelledby="grow-world-title"
      >
        <Link
          className="v16-world-destination"
          to="/studios/grow"
          aria-label="Enter GROW studio — Digital Marketing Beta / Coming Soon"
          onFocus={() => setActive("grow")}
          onPointerEnter={() => setActive("grow")}
        >
          <span className="v16-world-index">
            03 / THE NEXT CHAPTER <ArrowUpRight size={24} />
          </span>
          <div
            className={`v16-world-campaign campaign-${chapter}`}
            data-motion="editorial"
            data-motion-key={chapter}
          >
            <span>STUDIO CONCEPT / SOCIAL CREATIVE</span>
            <div className="v16-campaign-mark" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <strong>{growth[chapter].title}</strong>
            <p>{growth[chapter].detail}</p>
          </div>
          <div className="v16-world-name">
            <h3 id="grow-world-title">GROW</h3>
            <p>Digital Marketing</p>
            <small>BETA / COMING SOON</small>
          </div>
          <span className="v16-world-enter">
            Explore the beta studio <ArrowUpRight size={18} />
          </span>
        </Link>
        <div
          className="v16-world-controls"
          role="group"
          aria-label="GROW content direction"
        >
          {growth.map((item, i) => (
            <button
              key={item.name}
              aria-pressed={chapter === i}
              onClick={() => {
                setChapter(i);
                setActive("grow");
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </article>
    </div>
  );
}

export default function StudioWorlds() {
  return (
    <section
      id="studios"
      className="v14-studio-worlds"
      aria-labelledby="worlds-title"
      data-surface="light"
    >
      <div className="v14-worlds-heading">
        <div>
          <span className="v14-world-eyebrow">02 / FIND YOUR WORLD</span>
          <h2 id="worlds-title" data-motion="typography">
            Three worlds.
            <br />
            <span>Endless possibilities.</span>
          </h2>
        </div>
        <p>
          Video Editing. Website Development. Digital Marketing in Beta / Coming
          Soon. Three distinct ways to move an idea forward.
        </p>
      </div>
      <StudioDestinations />
    </section>
  );
}
