import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
const links = [
  { to: "/studios", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab") {
        const items = panel.current?.querySelectorAll<HTMLElement>("button,a");
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    panel.current?.querySelector("button")?.focus();
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-inner">
          <Link className="wordmark" to="/" aria-label="MAKENDLESS home">
            MAKENDLESS<span aria-hidden="true">✳</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((l) => (
              <NavLink to={l.to} key={l.to}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <Link className="nav-cta" to="/contact">
            Start a Project <ArrowUpRight size={17} />
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
            {links.map((l, i) => (
              <Link to={l.to} key={l.to}>
                <small>0{i + 1}</small>
                {l.label}
                <ArrowUpRight />
              </Link>
            ))}
            <p>
              Have something in mind?
              <br />
              Let’s make it happen.
            </p>
            <Link className="button button-primary" to="/contact">
              Start a Project <ArrowUpRight size={18} />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
