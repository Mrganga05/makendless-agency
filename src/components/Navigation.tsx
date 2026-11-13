import { ArrowUpRight, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { worldInfo } from "../data";
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [studios, setStudios] = useState(false);
  const location = useLocation();
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const studioRef = useRef<HTMLDivElement>(null);
  const studioTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
    setStudios(false);
  }, [location.pathname]);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!studioRef.current?.contains(e.target as Node)) setStudios(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  useEffect(() => {
    if (!open && !studios) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setStudios(false);
        (open ? trigger : studioTrigger).current?.focus();
      }
      if (open && e.key === "Tab") {
        const els = panel.current?.querySelectorAll<HTMLElement>("a,button");
        if (!els?.length) return;
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    if (open) {
      panel.current?.querySelector<HTMLElement>("button")?.focus();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handle);
      document.body.style.overflow = "";
    };
  }, [open, studios]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-inner">
          <Link className="wordmark" to="/" aria-label="MAKENDLESS home">
            MAKENDLESS<span>✳</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <div className="studio-nav" ref={studioRef}>
              <button
                ref={studioTrigger}
                className={
                  location.pathname.startsWith("/studios")
                    ? "nav-button active"
                    : "nav-button"
                }
                aria-expanded={studios}
                aria-controls="studio-menu"
                onClick={() => setStudios(!studios)}
              >
                Studios <ChevronDown size={13} />
              </button>
              {studios && (
                <div className="studio-dropdown" id="studio-menu">
                  {Object.entries(worldInfo).map(([id, w]) => (
                    <Link key={id} to={`/studios/${id}`}>
                      <strong>{w.label}</strong>
                      <span>{w.subtitle}</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  ))}
                  <Link to="/studios">
                    Explore all studios <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </div>
            <NavLink to="/work">Our Work</NavLink>
            <NavLink to="/project-lab">Project Lab</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
          <Link className="nav-cta" to="/contact">
            Start a Project <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle"
            ref={trigger}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>
      {open && (
        <div
          className="mobile-menu"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          ref={panel}
        >
          <div className="mobile-menu-head">
            <span className="wordmark">MAKENDLESS</span>
            <button
              className="icon-button"
              aria-label="Close navigation"
              onClick={() => {
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              <X />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            <Link to="/studios">
              Explore Studios <ArrowUpRight />
            </Link>
            {Object.entries(worldInfo).map(([id, w]) => (
              <Link className="mobile-studio" key={id} to={`/studios/${id}`}>
                {w.label}
                <small>
                  {id === "grow"
                    ? "Marketing · Coming soon"
                    : id === "create"
                      ? "Video & creative"
                      : "Websites & AI"}
                </small>
              </Link>
            ))}
            <Link to="/work">Our Work</Link>
            <Link to="/project-lab">Project Lab</Link>
            <Link to="/find-solution">Find My Solution</Link>
            <Link to="/about">About</Link>
            <Link className="button button-primary" to="/contact">
              Start a Project <ArrowUpRight size={18} />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
