import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { worldInfo, type World } from "../data";
import "../living-home.css";

export function StudioCards() {
  const [world, setWorld] = useState<World>("create");
  return (
    <div className="studio-portals" data-world={world}>
      <div
        className="portal-selector"
        role="group"
        aria-label="Choose a studio world"
      >
        {(["create", "build", "grow"] as World[]).map((id, i) => (
          <button
            key={id}
            aria-pressed={world === id}
            onClick={() => setWorld(id)}
          >
            <span>0{i + 1}</span>
            <div>
              <strong>{worldInfo[id].label}</strong>
              <small>
                {id === "create"
                  ? "Video Editing & Creative Production"
                  : id === "build"
                    ? "Websites, Apps & AI"
                    : "Digital Marketing · Beta / Coming Soon"}
              </small>
            </div>
            <ArrowUpRight size={22} />
          </button>
        ))}
        <p>
          Three connected worlds.
          <br />
          One place to bring your idea to life.
        </p>
      </div>
      <div
        className={`portal-stage portal-${world}`}
        key={world}
        data-motion="mask"
      >
        {world === "create" ? (
          <>
            <div className="portal-photo">
              <img
                src="/images/mountain.jpg"
                alt="A mountain photograph used in a concept video edit"
                width="1400"
                height="933"
                loading="lazy"
              />
              <span>01 / CREATE — A PHOTO-MOTION STUDY</span>
              <h3>
                A moment.
                <br />A story.
                <br />
                <em>A feeling.</em>
              </h3>
              <div className="portal-timeline" aria-hidden="true">
                {Array.from({ length: 28 }, (_, i) => (
                  <i key={i} style={{ height: `${8 + ((i * 17) % 25)}px` }} />
                ))}
              </div>
            </div>
          </>
        ) : world === "build" ? (
          <div className="portal-website">
            <div className="portal-browser">
              <span>● ● ●</span> YOUR BUSINESS, BROUGHT TO LIFE
            </div>
            <div className="portal-web-content">
              <img
                src="/images/coffee.jpg"
                alt="Café website concept"
                width="1200"
                height="800"
                loading="lazy"
              />
              <div>
                <strong>still.</strong>
                <h3>
                  A place for
                  <br />
                  good things.
                </h3>
                <span>WEBSITE + BOOKING + AUTOMATION</span>
              </div>
            </div>
            <div className="portal-booking">
              <Check size={17} />
              <span>
                A thoughtful experience.
                <small>From first visit to next appointment.</small>
              </span>
            </div>
          </div>
        ) : (
          <div className="portal-growth">
            <span className="beta-tag">BETA / COMING SOON</span>
            <h3>
              Your next
              <br />
              chapter of growth.
            </h3>
            <div className="growth-planner" aria-hidden="true">
              {["PLAN", "CREATE", "CONNECT"].map((t, i) => (
                <div key={t}>
                  <span>0{i + 1}</span>
                  <strong>{t}</strong>
                  <i style={{ width: `${45 + i * 20}%` }} />
                </div>
              ))}
            </div>
            <p>
              Campaign planning. Content. Local presence.
              <br />
              Explore the concepts while we develop the services.
            </p>
          </div>
        )}
        <Link to={`/studios/${world}`} className="portal-action">
          {world === "grow"
            ? "Explore what’s coming"
            : `Enter ${worldInfo[world].label}`}
          <ArrowUpRight size={20} />
        </Link>
      </div>
    </div>
  );
}
export default function Studios() {
  return (
    <div className="page-shell living-studios">
      <header className="page-heading" data-motion="typography">
        <span className="eyebrow">CREATE • BUILD • GROW</span>
        <h1>
          Find the world
          <br />
          for your next idea.
        </h1>
        <p>
          Choose a studio. Try its capabilities. Make it part of your project.
        </p>
      </header>
      <StudioCards />
      <div className="studio-assistance">
        <div>
          <h2>Not sure where to begin?</h2>
          <p>A few simple questions can help you find a starting point.</p>
        </div>
        <Link className="button button-secondary" to="/find-solution">
          Find My Solution <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
