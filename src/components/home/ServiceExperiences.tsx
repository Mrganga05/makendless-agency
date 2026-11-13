import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Film,
  Monitor,
  Pause,
  Play,
  Smartphone,
  Megaphone,
} from "lucide-react";
import "../../home-services.css";

const ServiceDemo = lazy(() => import("../ServiceDemo"));
const posterFrames = [
  {
    title: (
      <>
        A GOOD
        <br />
        IDEA.
      </>
    ),
    cue: "01 / FIND THE MOMENT",
    caption: "It starts with something worth saying.",
  },
  {
    title: (
      <>
        GIVE IT
        <br />
        RHYTHM.
      </>
    ),
    cue: "02 / SHAPE THE STORY",
    caption: "The right cut. The right words. The right pace.",
  },
  {
    title: (
      <>
        MAKE IT
        <br />
        MATTER.
      </>
    ),
    cue: "03 / LEAVE A FEELING",
    caption: "An original motion-graphics concept.",
  },
];

function GalleryFilm() {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!playing) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => setPlaying(false);
    const hidden = () => {
      if (document.hidden) stop();
    };
    const motionChange = () => {
      if (preference.matches) stop();
    };
    let nextFrame = 0;
    const timer = window.setInterval(() => {
      nextFrame += 1;
      if (nextFrame > 2) stop();
      else setFrame(nextFrame);
    }, 1400);
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) stop();
          })
        : null;
    if (host.current) observer?.observe(host.current);
    document.addEventListener("visibilitychange", hidden);
    preference.addEventListener("change", motionChange);
    return () => {
      window.clearInterval(timer);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", hidden);
      preference.removeEventListener("change", motionChange);
    };
  }, [playing]);
  return (
    <>
      <div className={`hp-film-art hp-film-frame-${frame}`} ref={host}>
        <span className="hp-art-cue">
          ORIGINAL TYPE FILM / NO CLIENT COMMISSION
        </span>
        <div className="hp-film-rails" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div
          key={frame}
          className="hp-film-type"
          data-motion="typography"
          aria-hidden="true"
        >
          {posterFrames[frame].title}
        </div>
        <span className="hp-film-cue">{posterFrames[frame].cue}</span>
        <div className="hp-film-controls">
          <button
            onClick={() => {
              if (
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ) {
                setFrame((f) => (f + 1) % 3);
                setPlaying(false);
              } else if (playing) setPlaying(false);
              else {
                setFrame(0);
                setPlaying(true);
              }
            }}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}{" "}
            {playing ? "Pause sequence" : "Preview sequence"}
          </button>
          <div role="group" aria-label="Type film frames">
            {posterFrames.map((_, i) => (
              <button
                key={i}
                aria-label={`Show film frame ${i + 1}`}
                aria-pressed={frame === i}
                onClick={() => {
                  setPlaying(false);
                  setFrame(i);
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="hp-gallery-art-note" role="status">
        {posterFrames[frame].caption}
      </p>
    </>
  );
}
function GalleryWebsite() {
  const [mobile, setMobile] = useState(false);
  const [collection, setCollection] = useState(false);
  return (
    <>
      <div className={`hp-gallery-site-stage ${mobile ? "is-mobile" : ""}`}>
        <span className="hp-art-cue">FORM / FICTIONAL OBJECT STUDIO</span>
        <div className="hp-gallery-site">
          <div className="hp-gallery-site-nav">
            <b>form.</b>
            <span>OBJECTS WITH INTENTION</span>
          </div>
          {collection ? (
            <div className="hp-gallery-collection" data-motion="transform">
              <small>THE EVERYDAY COLLECTION</small>
              <strong>Less, but considered.</strong>
              <div>
                <span>
                  <i className="hp-form-vase" />
                  The vessel
                </span>
                <span>
                  <i className="hp-form-disc" />
                  The desk light
                </span>
              </div>
              <button onClick={() => setCollection(false)}>
                Back to the homepage <ArrowRight size={13} />
              </button>
            </div>
          ) : (
            <div className="hp-gallery-site-hero" data-motion="mask">
              <div>
                <small>ROOM FOR THE ESSENTIAL.</small>
                <strong>
                  Good things.
                  <br />
                  Simply made.
                </strong>
                <button onClick={() => setCollection(true)}>
                  Explore the objects <ArrowUpRight size={13} />
                </button>
              </div>
              <div className="hp-form-object" aria-hidden="true">
                <i className="hp-form-vase" />
                <i className="hp-form-shadow" />
              </div>
            </div>
          )}
          <div className="hp-gallery-site-bottom">
            A small business. A thoughtful digital home.
          </div>
        </div>
      </div>
      <div
        className="hp-gallery-device-controls"
        role="group"
        aria-label="Gallery website viewport"
      >
        <span>Responsive by design</span>
        <button aria-pressed={!mobile} onClick={() => setMobile(false)}>
          <Monitor size={15} /> Desktop
        </button>
        <button aria-pressed={mobile} onClick={() => setMobile(true)}>
          <Smartphone size={14} /> Mobile
        </button>
      </div>
    </>
  );
}
function GalleryGrowth() {
  const [stage, setStage] = useState(0);
  const titles = [
    "A plan with a purpose.",
    "A story worth sharing.",
    "A clear next experiment.",
  ];
  return (
    <div className="hp-gallery-growth">
      <div className="hp-growth-copy">
        <span className="hp-gallery-beta">BETA / COMING SOON</span>
        <h4>{titles[stage]}</h4>
        <p>
          {
            [
              "Connect your message, content and local presence.",
              "Explore a concept post before anything is published.",
              "Review the essentials before planning what comes next.",
            ][stage]
          }
        </p>
        <div role="group" aria-label="Growth concept stages">
          {["Plan", "Create", "Review"].map((name, i) => (
            <button
              key={name}
              aria-pressed={stage === i}
              onClick={() => setStage(i)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div
        className="hp-growth-preview"
        data-motion="editorial"
        data-motion-key={stage}
      >
        {stage === 0 ? (
          <div className="hp-growth-plan">
            <span>ILLUSTRATIVE CONTENT PLAN</span>
            {[
              "Tell your story",
              "Share your process",
              "Start a conversation",
            ].map((text, i) => (
              <div key={text}>
                <small>0{i + 1}</small>
                <strong>{text}</strong>
                <i style={{ width: `${58 + i * 14}%` }} />
              </div>
            ))}
          </div>
        ) : stage === 1 ? (
          <div className="hp-growth-post">
            <span>CONCEPT POST / NOT PUBLISHED</span>
            <strong>
              There’s a story
              <br />
              in what you do.
            </strong>
            <div aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <small>A moment from behind the scenes.</small>
          </div>
        ) : (
          <div className="hp-growth-review">
            <span>ILLUSTRATIVE REVIEW</span>
            {[
              "Consistent business details",
              "A focused content direction",
              "An idea to explore next",
            ].map((text) => (
              <p key={text}>
                <Check size={17} />
                {text}
              </p>
            ))}
            <small>No performance results are implied.</small>
          </div>
        )}
      </div>
    </div>
  );
}
export function ServiceGallery() {
  return (
    <section
      className="hp-service-gallery"
      data-surface="light"
      id="services"
      aria-labelledby="hp-services-title"
    >
      <div className="hp-section-inner">
        <header className="hp-gallery-heading">
          <span className="hp-section-label">02 / WHAT WE OFFER</span>
          <h2 id="hp-services-title" data-motion="typography">
            Different disciplines.
            <br />
            One creative partner.
          </h2>
          <p>
            From the first frame to your next digital product. Choose the kind
            of work you want to make.
          </p>
        </header>
        <div className="hp-gallery-grid">
          <article className="hp-gallery-create">
            <div className="hp-gallery-item-heading">
              <span>01</span>
              <div>
                <h3>CREATE</h3>
                <p>Video Editing & Creative Production</p>
              </div>
              <Link to="/studios/create" aria-label="Explore CREATE services">
                <ArrowUpRight size={25} />
              </Link>
            </div>
            <GalleryFilm />
            <Link className="hp-gallery-service-link" to="/studios/create">
              Make your content count <ArrowRight size={17} />
            </Link>
          </article>
          <article className="hp-gallery-build">
            <div className="hp-gallery-item-heading">
              <span>02</span>
              <div>
                <h3>BUILD</h3>
                <p>Website Development</p>
              </div>
              <Link to="/studios/build" aria-label="Explore BUILD services">
                <ArrowUpRight size={25} />
              </Link>
            </div>
            <GalleryWebsite />
            <Link className="hp-gallery-service-link" to="/studios/build">
              Build a better digital experience <ArrowRight size={17} />
            </Link>
          </article>
          <article className="hp-gallery-grow">
            <div className="hp-gallery-item-heading">
              <span>03</span>
              <div>
                <h3>GROW</h3>
                <p>Digital Marketing — Beta / Coming Soon</p>
              </div>
              <Link to="/studios/grow" aria-label="Explore GROW beta services">
                <ArrowUpRight size={25} />
              </Link>
            </div>
            <GalleryGrowth />
            <Link className="hp-gallery-service-link" to="/studios/grow">
              Explore what’s coming <ArrowRight size={17} />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
const transformations = [
  {
    id: "V1",
    name: "Edit a reel",
    from: "Raw illustration",
    to: "A story with rhythm",
    Icon: Film,
  },
  {
    id: "T1",
    name: "Build a website",
    from: "Wireframe",
    to: "A digital experience",
    Icon: Monitor,
  },
  {
    id: "M1",
    name: "Preview a campaign — Beta",
    from: "A campaign idea",
    to: "A simulated placement",
    Icon: Megaphone,
  },
];
class DemoBoundary extends Component<
  { children: ReactNode; id: string },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="hp-transform-loading" role="alert">
        <p>This demonstration could not load.</p>
        <Link to={`/services/${this.props.id}`}>
          Open the service <ArrowRight size={17} />
        </Link>
      </div>
    ) : (
      this.props.children
    );
  }
}
export function TransformationStage() {
  const [active, setActive] = useState("V1");
  const [enabled, setEnabled] = useState(false);
  const host = useRef<HTMLElement>(null);
  const selected = transformations.find((item) => item.id === active)!;
  useEffect(() => {
    if (!host.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: "220px 0px" },
    );
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      className="hp-transformation"
      data-surface="dark"
      ref={host}
      aria-labelledby="hp-transform-title"
    >
      <div className="hp-section-inner">
        <header className="hp-transformation-heading">
          <span className="hp-section-label">
            03 / THE DIFFERENCE IS IN THE MAKING
          </span>
          <h2 id="hp-transform-title" data-motion="typography">
            Don’t just imagine it.
            <br />
            Change something.
          </h2>
          <p>Try the tools. See how an idea becomes a finished experience.</p>
        </header>
        <div
          className="hp-transform-tabs"
          role="group"
          aria-label="Choose a transformation"
        >
          {transformations.map(({ id, name, Icon }, i) => (
            <button
              key={id}
              aria-pressed={active === id}
              onClick={() => {
                setActive(id);
                setEnabled(true);
              }}
            >
              <span>0{i + 1}</span>
              <Icon size={17} />
              {name}
            </button>
          ))}
        </div>
        <div className="hp-transform-statement">
          <span>{selected.from}</span>
          <i aria-hidden="true" />
          <ArrowRight size={19} />
          <strong>{selected.to}</strong>
        </div>
        <div
          className="hp-transform-stage"
          data-motion="mask"
          data-motion-key={active}
        >
          {enabled ? (
            <DemoBoundary key={active} id={active}>
              <Suspense
                fallback={
                  <div className="hp-transform-loading" role="status">
                    Preparing the demonstration…
                  </div>
                }
              >
                <ServiceDemo key={active} id={active} />
              </Suspense>
            </DemoBoundary>
          ) : (
            <div className="hp-transform-loading">
              <div className="hp-transform-outline" aria-hidden="true">
                <span>RAW</span>
                <i />
                <strong>
                  MAKE
                  <br />
                  IT MOVE.
                </strong>
                <span>EDITED</span>
              </div>
              <button onClick={() => setEnabled(true)}>
                <Play size={17} /> Open the interactive demonstration
              </button>
            </div>
          )}
        </div>
        <div className="hp-transform-footer">
          <p>Original concepts and simulated interactions. Explore freely.</p>
          <Link to={`/services/${active}`}>
            Explore this service <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
