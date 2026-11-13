import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import "../../v14-studios.css";

/** Three deliberately different compositions, with ordinary HTML controls. */
export function StudioDestinations() {
  const [cut, setCut] = useState<"frame" | "story">("story");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [chapter, setChapter] = useState(0);
  const growth = [
    {
      name: "Plan",
      title: "Start with a point of view.",
      detail: "A considered direction for your content.",
    },
    {
      name: "Tell",
      title: "Give your story a rhythm.",
      detail: "Connected posts, shaped around one idea.",
    },
    {
      name: "Connect",
      title: "Make your presence count.",
      detail: "A clearer way for people to find your business.",
    },
  ];
  return (
    <div className="v14-world-grid">
      <article
        className="v14-world-create"
        aria-labelledby="create-world-title"
      >
        <div className="v14-world-topline">
          <span>01 / THE CREATIVE STUDIO</span>
          <span>FRAME → FEELING</span>
        </div>
        <div
          className={`v14-world-film is-${cut}`}
          data-motion="mask"
          data-motion-key={cut}
        >
          <svg
            viewBox="0 0 640 480"
            role="img"
            aria-label="Original sound and typography artwork for a concept title sequence"
          >
            <circle
              cx="320"
              cy="240"
              r="170"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="320"
              cy="240"
              r="125"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            {Array.from({ length: 31 }, (_, i) => (
              <path
                key={i}
                d={`M${80 + i * 16} ${240 - Math.sin(i * 0.42) ** 2 * 115}v${Math.sin(i * 0.42) ** 2 * 230 + 1}`}
                stroke="currentColor"
                strokeWidth="7"
              />
            ))}
          </svg>
          {cut === "story" ? (
            <div className="v14-world-film-type">
              <span>A LITTLE RHYTHM.</span>
              <strong>
                A lasting
                <br />
                <em>feeling.</em>
              </strong>
              <span>ORIGINAL MOTION-TITLE CONCEPT</span>
            </div>
          ) : (
            <span className="v14-world-raw-label">
              THE ARTWORK / BEFORE THE STORY
            </span>
          )}
          <div className="v14-world-film-scrim" aria-hidden="true" />
        </div>
        <div
          className="v14-world-create-controls"
          role="group"
          aria-label="CREATE title treatment"
        >
          <button
            aria-pressed={cut === "frame"}
            onClick={() => setCut("frame")}
          >
            The frame
          </button>
          <button
            aria-pressed={cut === "story"}
            onClick={() => setCut("story")}
          >
            The story
          </button>
          <span>Try the title treatment ↑</span>
        </div>
        <div className="v14-world-bottom">
          <div>
            <h3 id="create-world-title">CREATE</h3>
            <p>Video Editing & Creative Production</p>
          </div>
          <Link to="/studios/create" aria-label="Enter CREATE studio">
            <ArrowUpRight />
            <span>Enter studio</span>
          </Link>
        </div>
      </article>
      <article className="v14-world-build" aria-labelledby="build-world-title">
        <div className="v14-world-topline">
          <span>02 / THE DIGITAL STUDIO</span>
          <span>IDEA → INTERFACE</span>
        </div>
        <div
          className={`v14-world-device is-${device}`}
          data-motion="spatial"
          data-motion-key={device}
        >
          <div className="v14-world-browser">
            <i />
            <i />
            <i />
            <span>form / a concept space</span>
          </div>
          <div className="v14-world-site">
            <div>
              <small>SPACES TO THINK.</small>
              <strong>
                Room for
                <br />
                <em>your next idea.</em>
              </strong>
              <span>A fictional workspace website.</span>
            </div>
            <div className="v14-world-site-art" aria-hidden="true">
              <i />
              <b />
              <span />
            </div>
          </div>
        </div>
        <div
          className="v14-world-device-controls"
          role="group"
          aria-label="BUILD responsive preview"
        >
          <button
            aria-pressed={device === "desktop"}
            onClick={() => setDevice("desktop")}
          >
            <Monitor size={15} /> Desktop
          </button>
          <button
            aria-pressed={device === "mobile"}
            onClick={() => setDevice("mobile")}
          >
            <Smartphone size={15} /> Mobile
          </button>
        </div>
        <div className="v14-world-bottom">
          <div>
            <h3 id="build-world-title">BUILD</h3>
            <p>Websites, Applications & AI</p>
          </div>
          <Link to="/studios/build" aria-label="Enter BUILD studio">
            <ArrowUpRight />
            <span>Enter studio</span>
          </Link>
        </div>
      </article>
      <article className="v14-world-grow" aria-labelledby="grow-world-title">
        <div className="v14-world-topline">
          <span>03 / THE NEXT CHAPTER</span>
          <span className="v14-world-beta">BETA / COMING SOON</span>
        </div>
        <div className="v14-world-grow-body">
          <div>
            <h3 id="grow-world-title">GROW</h3>
            <p>Digital Marketing</p>
          </div>
          <div
            className="v14-world-content-study"
            key={chapter}
            data-motion="editorial"
          >
            <span>0{chapter + 1} / CONTENT DIRECTION</span>
            <strong>{growth[chapter].title}</strong>
            <p>{growth[chapter].detail}</p>
          </div>
        </div>
        <div className="v14-world-grow-foot">
          <div role="group" aria-label="GROW content direction">
            {growth.map((item, i) => (
              <button
                key={item.name}
                aria-pressed={chapter === i}
                onClick={() => setChapter(i)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <Link to="/studios/grow">
            Explore what’s coming <ArrowUpRight size={17} />
          </Link>
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
          From the first frame to your next digital product. Find the people and
          possibilities behind your idea.
        </p>
      </div>
      <StudioDestinations />
    </section>
  );
}
