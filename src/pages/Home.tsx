import { useRef, useState, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  MoveDown,
  Plus,
  Check,
  Sparkles,
  Code2,
  Film,
  MousePointer2,
} from "lucide-react";
import ServiceDemo from "../components/ServiceDemo";
import { Process } from "./Supporting";
export function StudioCards() {
  return (
    <div className="world-grid">
      <Link className="world-card create-card" to="/studios/create">
        <div className="world-top">
          <span>01 / THE CREATIVE STUDIO</span>
          <ArrowUpRight size={21} />
        </div>
        <div className="world-art film-art" aria-hidden="true">
          <div className="film-frame">
            <span className="frame-corner">
              REC <i />
            </span>
            <div className="home-film-type">
              MAKE
              <br />
              <em>THEM</em>
              <br />
              FEEL.
            </div>
            <div className="home-film-play">
              <Play size={16} fill="currentColor" />
            </div>
            <span className="film-time">00:00:24:08</span>
          </div>
          <div className="film-timeline">
            {Array.from({ length: 15 }, (_, i) => (
              <i key={i} style={{ height: `${10 + ((i * 17) % 24)}px` }} />
            ))}
          </div>
          <span className="art-caption">
            FRAME BY FRAME. FEELING BY FEELING.
          </span>
        </div>
        <div className="world-bottom">
          <h3>
            CREATE<span>↗</span>
          </h3>
          <p>Video Editing & Creative Production</p>
          <small>Stories that move.</small>
        </div>
      </Link>
      <Link className="world-card build-card" to="/studios/build">
        <div className="world-top">
          <span>02 / THE DIGITAL STUDIO</span>
          <ArrowUpRight size={21} />
        </div>
        <div className="world-art web-art" aria-hidden="true">
          <div className="mini-window">
            <div className="window-bar">
              <i />
              <i />
              <i />
              <span>your-next-idea</span>
            </div>
            <div className="home-mini-site">
              <span>THE NEXT CHAPTER</span>
              <h4>
                Built to
                <br />
                <em>be different.</em>
              </h4>
              <div className="mini-button">Explore the possibilities ↗</div>
              <div className="mini-shape" />
            </div>
          </div>
          <span className="code-label">
            <Code2 size={13} /> Ideas, brought to life.
          </span>
          <MousePointer2 className="art-pointer" size={25} fill="#22D3EE" />
        </div>
        <div className="world-bottom">
          <h3>
            BUILD<span>↗</span>
          </h3>
          <p>Websites, IT & AI Solutions</p>
          <small>Ideas made real.</small>
        </div>
      </Link>
      <Link className="world-card grow-card" to="/studios/grow">
        <div className="world-top">
          <span>03 / THE NEXT CHAPTER</span>
          <ArrowUpRight size={21} />
        </div>
        <div className="world-art growth-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="growth-spark">✳</div>
          <span className="coming-pill">BETA / COMING SOON</span>
        </div>
        <div className="world-bottom">
          <h3>
            GROW<span>↗</span>
          </h3>
          <p>Digital Marketing</p>
          <small>The next chapter of your brand.</small>
        </div>
      </Link>
    </div>
  );
}
export function Studios() {
  return (
    <div className="page-shell studios-index">
      <div className="page-heading">
        <span className="eyebrow">ONE STUDIO. ENDLESS POSSIBILITIES.</span>
        <h1>Find your world.</h1>
        <p>
          Three connected worlds. One shared ambition: make your next idea
          matter.
        </p>
      </div>
      <StudioCards />
      <div className="studio-guidance">
        <Sparkles size={22} />
        <div>
          <h3>Not sure where to begin?</h3>
          <p>A few simple questions. A clearer starting point.</p>
        </div>
        <Link className="button button-secondary" to="/find-solution">
          Find My Solution <ArrowUpRight size={17} />
        </Link>
      </div>
    </div>
  );
}
function HomeLab() {
  const [selected, setSelected] = useState(["Website"]);
  return (
    <section className="home-lab section-wrap">
      <div className="lab-intro">
        <span className="eyebrow">
          <span className="small-cross">✳</span> THE LIVING PROJECT LAB
        </span>
        <h2>
          Your idea.
          <br />A little more <em>real.</em>
        </h2>
        <p>
          What happens when the right pieces come together? Build a small
          preview of your next big thing.
        </p>
        <Link className="text-link" to="/project-lab">
          Enter the Project Lab <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="home-lab-board">
        <div className="lab-board-top">
          <span>
            <i className="status-dot" /> LIVE CONCEPT PREVIEW
          </span>
          <span>MADE BY YOU ↗</span>
        </div>
        <div className="lab-board-body">
          <div className="lab-home-controls">
            <span>YOUR INGREDIENTS</span>
            {["Website", "Booking", "Video", "AI Assistant"].map((s, i) => (
              <button
                key={s}
                className={
                  selected.includes(s) ? "ingredient active" : "ingredient"
                }
                aria-pressed={selected.includes(s)}
                onClick={() =>
                  setSelected((p) =>
                    p.includes(s) ? p.filter((x) => x !== s) : [...p, s],
                  )
                }
              >
                <span>0{i + 1}</span>
                {s}
                {selected.includes(s) ? (
                  <Check size={14} />
                ) : (
                  <Plus size={14} />
                )}
              </button>
            ))}
          </div>
          <div className="live-concept" aria-live="polite">
            <div className="concept-header">
              <b>STUDIO / YOU</b>
              <span>✳</span>
            </div>
            {selected.length === 0 ? (
              <div className="concept-empty">
                A blank canvas.
                <br />
                <span>Add an ingredient to begin.</span>
              </div>
            ) : (
              <>
                <h3>
                  Room for
                  <br />
                  <em>your next idea.</em>
                </h3>
                {selected.includes("Website") && (
                  <div className="concept-web">
                    A digital home, shaped around you.{" "}
                    <ArrowUpRight size={14} />
                  </div>
                )}
                {selected.includes("Booking") && (
                  <div className="concept-book">
                    <span>YOUR NEXT VISIT</span>
                    <div>
                      Mon <b>Tue</b> Wed Thu Fri
                    </div>
                  </div>
                )}
                {selected.includes("Video") && (
                  <div className="concept-video">
                    <Play size={15} /> Your story, in motion
                  </div>
                )}
                {selected.includes("AI Assistant") && (
                  <div className="concept-chat">
                    <Sparkles size={14} /> Hello! What can we help you explore?
                  </div>
                )}
              </>
            )}
            <span className="concept-note">
              Illustrative preview · No live services
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  const artRef = useRef<HTMLDivElement>(null);
  function movePrism(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
    artRef.current?.style.setProperty("--prism-x", `${x}px`);
    artRef.current?.style.setProperty("--prism-y", `${y}px`);
  }
  const [capability, setCapability] = useState("V1");
  return (
    <>
      <section
        className="hero section-wrap"
        onPointerMove={movePrism}
        onPointerLeave={() => {
          artRef.current?.style.setProperty("--prism-x", "0px");
          artRef.current?.style.setProperty("--prism-y", "0px");
        }}
      >
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="status-dot" /> CREATIVE & TECHNOLOGY STUDIO
          </div>
          <h1>
            Make your
            <br />
            next idea
            <br />
            <span>unforgettable.</span>
          </h1>
          <p>
            Video editing, websites and AI solutions
            <br className="desktop-break" /> for ambitious brands and
            businesses.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/studios">
              Explore Studios <ArrowUpRight size={18} />
            </Link>
            <Link className="button button-secondary" to="/contact">
              Start a Project <ArrowUpRight size={18} />
            </Link>
          </div>
          <Link className="hero-discovery" to="/find-solution">
            A big idea. Not sure where to start?{" "}
            <span>
              Find my solution <ArrowRight size={14} />
            </span>
          </Link>
        </div>
        <div className="hero-art" ref={artRef}>
          <span className="prism-label label-top">
            THE SHAPE OF POSSIBILITY
          </span>
          <img
            src="/assets/prism.svg"
            alt="An original folded glass ribbon refracting aqua and violet light"
            fetchPriority="high"
            width="760"
            height="760"
          />
          <div className="art-coordinate coordinate-left">
            01 / IMAGINE
            <br />
            <span>02 / MAKE IT REAL</span>
          </div>
          <div className="prism-label label-bottom">
            <span className="tiny-cross">+</span> IDEAS WITHOUT LIMITS.
          </div>
        </div>
        <div className="hero-baseline">
          <div>
            <span>CREATE</span>
            <i />
            <span>BUILD</span>
            <i />
            <span className="grow-baseline">
              GROW <small>COMING SOON</small>
            </span>
          </div>
          <a href="#studios">
            SCROLL TO EXPLORE <MoveDown size={15} />
          </a>
        </div>
      </section>
      <section className="world-section section-wrap" id="studios">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / EXPLORE THE STUDIOS</span>
            <h2>
              Three worlds.
              <br />
              <span>Endless possibilities.</span>
            </h2>
          </div>
          <p>
            From the first frame to the next big launch.
            <br />
            Find the right space for your ambition.
          </p>
        </div>
        <StudioCards />
      </section>
      <section className="capabilities section-wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / LESS TALK. MORE POSSIBILITY.</span>
            <h2>
              Don’t just imagine it.
              <br />
              <span>Try it.</span>
            </h2>
          </div>
          <div
            className="capability-switch"
            role="group"
            aria-label="Choose a capability demo"
          >
            <button
              aria-pressed={capability === "V1"}
              onClick={() => setCapability("V1")}
            >
              <Film size={16} /> The edit
            </button>
            <button
              aria-pressed={capability === "T1"}
              onClick={() => setCapability("T1")}
            >
              <Code2 size={16} /> The build
            </button>
          </div>
        </div>
        <ServiceDemo key={capability} id={capability} />
        <div className="capability-foot">
          <span>
            Original, interactive demonstrations. A glimpse of what we can make.
          </span>
          <Link
            className="text-link"
            to={capability === "V1" ? "/studios/create" : "/studios/build"}
          >
            Explore this studio <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <HomeLab />
      <section className="home-work section-wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 / SELECTED EXPLORATIONS</span>
            <h2>
              A taste of <span>what’s possible.</span>
            </h2>
          </div>
          <Link className="text-link" to="/work">
            Explore Our Work <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="home-work-grid">
          <Link to="/work" className="home-project project-film">
            <div className="project-cover">
              <span className="concept-tag">CONCEPT PROJECT</span>
              <div className="motion-title">
                LESS
                <br />
                <em>SCROLL.</em>
                <br />
                MORE SOUL<span>↗</span>
              </div>
              <div className="project-lines" />
            </div>
            <div className="project-caption">
              <div>
                <h3>A story in every frame</h3>
                <p>Video Editing · Motion Design</p>
              </div>
              <ArrowUpRight size={22} />
            </div>
          </Link>
          <Link to="/work" className="home-project project-web">
            <div className="project-cover">
              <span className="concept-tag">CONCEPT PROJECT</span>
              <div className="portfolio-browser">
                <div className="portfolio-browser-bar">
                  FORM & STILL <span>MENU +</span>
                </div>
                <div className="portfolio-inner">
                  <small>A CONCEPT DIGITAL EXPERIENCE</small>
                  <h4>
                    Make space
                    <br />
                    for <em>better.</em>
                  </h4>
                  <div className="portfolio-sculpture" />
                  <span>DISCOVER THE COLLECTION ↗</span>
                </div>
              </div>
            </div>
            <div className="project-caption">
              <div>
                <h3>A new kind of digital home</h3>
                <p>Web Design · Development</p>
              </div>
              <ArrowUpRight size={22} />
            </div>
          </Link>
        </div>
      </section>
      <section className="home-process section-wrap">
        <span className="eyebrow">04 / FROM WHAT IF TO WHAT’S NEXT</span>
        <div className="section-heading">
          <h2>
            Great things.
            <br />
            <span>Made together.</span>
          </h2>
          <p>
            A clear process. A close collaboration.
            <br />A result that feels like you.
          </p>
        </div>
        <Process />
      </section>
      <section className="closing-cta section-wrap">
        <div className="cta-orb" aria-hidden="true">
          ✳
        </div>
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>
          Let’s make
          <br />
          <em>something matter.</em>
        </h2>
        <p>
          A spark, a sketch, or a fully formed plan. We’re ready to explore it.
        </p>
        <Link className="button button-primary" to="/contact">
          Start a Project <ArrowUpRight size={18} />
        </Link>
        <Link className="closing-secondary" to="/find-solution">
          Or let’s find your starting point <ArrowRight size={14} />
        </Link>
      </section>
    </>
  );
}
