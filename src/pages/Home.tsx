import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Film,
  Monitor,
  Sparkles,
  Check,
  Play,
} from "lucide-react";
import LiveShowcase from "../components/LiveShowcase";
import { Process } from "./Supporting";
export function StudioCards() {
  return (
    <div className="service-collection">
      <article className="service-feature service-video">
        <div className="service-photo">
          <img
            src="/images/mountain.jpg"
            alt="Mountain landscape used in a storytelling concept"
            width="1400"
            height="933"
            loading="lazy"
          />
          <span className="service-art-label">CREATE / VIDEO & CREATIVE</span>
          <div className="service-photo-title">
            Every frame.
            <br />
            <em>A feeling.</em>
          </div>
          <Link
            to="/studios/create"
            className="service-play"
            aria-label="Explore video editing demos"
          >
            <Play size={24} fill="currentColor" />
          </Link>
          <div className="photo-wave" aria-hidden="true">
            {Array.from({ length: 45 }, (_, i) => (
              <i key={i} style={{ height: `${8 + ((i * 13) % 28)}px` }} />
            ))}
          </div>
        </div>
        <div className="service-description">
          <Film size={22} />
          <h3>
            Videos people
            <br />
            actually feel.
          </h3>
          <p>
            From a quick scroll-stopper to a full-length story. We bring the
            rhythm, clarity and craft.
          </p>
          <div className="service-tags">
            <span>Reels & shorts</span>
            <span>Podcasts</span>
            <span>Ads & motion</span>
          </div>
          <Link className="text-link" to="/studios/create">
            Explore video editing <ArrowUpRight size={19} />
          </Link>
        </div>
      </article>
      <article className="service-feature service-digital">
        <div className="service-description">
          <Monitor size={22} />
          <h3>
            A better home
            <br />
            for your business.
          </h3>
          <p>
            Websites that welcome. Booking flows that work. AI tools that make
            the everyday easier.
          </p>
          <div className="service-tags">
            <span>Websites & stores</span>
            <span>Booking systems</span>
            <span>AI & automation</span>
          </div>
          <Link className="text-link" to="/studios/build">
            Explore websites & AI <ArrowUpRight size={19} />
          </Link>
        </div>
        <div className="digital-art">
          <div className="digital-window">
            <div className="digital-browser">
              <span>● ● ●</span> a little idea, brought to life.
            </div>
            <div className="digital-cafe">
              <img
                src="/images/coffee.jpg"
                alt="Coffee shop website concept"
                width="1200"
                height="800"
                loading="lazy"
              />
              <div>
                <strong>still.</strong>
                <h4>
                  Good things
                  <br />
                  start here.
                </h4>
                <span>COFFEE & COMPANY ↗</span>
              </div>
            </div>
          </div>
          <div className="digital-toast">
            <span>
              <Check size={19} />
            </span>
            <div>
              <strong>One less thing to think about.</strong>
              <small>Website + booking + automation</small>
            </div>
          </div>
        </div>
      </article>
      <div className="grow-announcement">
        <Sparkles size={21} />
        <div>
          <strong>Next up: helping your business grow.</strong>
          <p>Digital marketing is in development. Explore what’s coming.</p>
        </div>
        <Link to="/studios/grow">
          GROW · Coming soon <ArrowUpRight size={17} />
        </Link>
      </div>
    </div>
  );
}
export function Studios() {
  return (
    <div className="page-shell services-page">
      <header className="page-heading">
        <span className="eyebrow">OUR SERVICES</span>
        <h1>
          What do you
          <br />
          want to make?
        </h1>
        <p>
          Choose a starting point. Explore the services, try a demo, and tell us
          what you have in mind.
        </p>
      </header>
      <StudioCards />
      <div className="help-choose">
        <div>
          <h2>A little help choosing?</h2>
          <p>Answer five quick questions to find a useful starting point.</p>
        </div>
        <Link className="button button-primary" to="/find-solution">
          Help me choose <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <>
      <section className="new-hero section-wrap">
        <div className="new-hero-copy">
          <span className="hero-kicker">
            <i /> CREATIVE MINDS. PRACTICAL MAGIC.
          </span>
          <h1>
            Good ideas.
            <br />
            Great <span>execution.</span>
          </h1>
          <p>
            We turn your ideas into videos people feel,
            <br className="desktop-break" /> websites people love, and tools
            that work.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/contact">
              Let’s make it happen <ArrowUpRight size={19} />
            </Link>
            <a className="text-link" href="#services">
              See what we do <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-service-list">
            <span>Video editing</span>
            <i />
            <span>Websites</span>
            <i />
            <span>AI solutions</span>
          </div>
        </div>
        <LiveShowcase />
      </section>
      <div className="intro-line section-wrap">
        <span>MAKENDLESS / CREATIVE & TECHNOLOGY STUDIO</span>
        <p>
          From “what if”
          <ArrowRight size={18} />
          to “here it is.”
        </p>
      </div>
      <section className="home-services section-wrap" id="services">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHAT WE DO</span>
            <h2>
              Make an impression.
              <br />
              <span>Make it work.</span>
            </h2>
          </div>
          <p>
            One creative partner.
            <br />
            From your first idea to the final detail.
          </p>
        </div>
        <StudioCards />
      </section>
      <section className="work-band">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A FEW POSSIBILITIES</span>
              <h2>
                See the idea.
                <br />
                Feel the difference.
              </h2>
            </div>
            <Link className="text-link" to="/work">
              View concept projects <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="new-work-grid">
            <Link to="/services/V3" className="new-work-card">
              <div className="work-image work-mountain">
                <img
                  src="/images/mountain.jpg"
                  alt="Outdoor storytelling concept in a mountain valley"
                  width="1400"
                  height="933"
                  loading="lazy"
                />
                <span className="work-stamp">CONCEPT / 01</span>
                <strong>
                  Outside
                  <br />
                  the ordinary.
                </strong>
                <span className="work-arrow">
                  <ArrowUpRight size={24} />
                </span>
              </div>
              <div className="work-info">
                <h3>A little adventure. A lasting impression.</h3>
                <p>Video direction · Promotional editing</p>
              </div>
            </Link>
            <Link to="/services/T1" className="new-work-card">
              <div className="work-image work-coffee">
                <img
                  src="/images/coffee.jpg"
                  alt="A café experience concept with coffee and company"
                  width="1200"
                  height="800"
                  loading="lazy"
                />
                <span className="work-stamp">CONCEPT / 02</span>
                <strong>
                  Meet your
                  <br />
                  new favourite.
                </strong>
                <span className="work-arrow">
                  <ArrowUpRight size={24} />
                </span>
              </div>
              <div className="work-info">
                <h3>A neighbourhood café, reimagined online.</h3>
                <p>Web design · Booking experience</p>
              </div>
            </Link>
          </div>
          <p className="work-honesty">
            Studio explorations, not client commissions. A glimpse of how we
            think and make.
          </p>
        </div>
      </section>
      <section className="home-process section-wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SIMPLE FROM THE START</span>
            <h2>
              Good work starts
              <br />
              with a conversation.
            </h2>
          </div>
          <p>
            You bring the idea. We bring the questions,
            <br />
            the craft, and a clear way forward.
          </p>
        </div>
        <Process />
        <div className="planner-entry">
          <Sparkles size={24} />
          <div>
            <h3>Still piecing your idea together?</h3>
            <p>
              Try our project planner. Choose what you need and leave with an
              editable brief.
            </p>
          </div>
          <Link className="text-link" to="/project-lab">
            Plan my project <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>
      <section className="new-cta section-wrap">
        <span className="eyebrow">BIG IDEA? SMALL QUESTION? BOTH WELCOME.</span>
        <h2>
          Let’s make
          <br />
          <span>your next move.</span>
        </h2>
        <Link className="button button-primary" to="/contact">
          Start a Project <ArrowUpRight size={20} />
        </Link>
        <div className="cta-word" aria-hidden="true">
          MAKENDLESS
        </div>
      </section>
    </>
  );
}
