import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BRAND } from "../data";
import { PRIMARY_LINKS, STUDIO_LINKS, PROJECT_LINK } from "../navigation";
import "../navigation.css";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [studiosOpen, setStudiosOpen] = useState(false);
  const { pathname } = useLocation();
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const studioDisclosure = useRef<HTMLDivElement>(null);
  const studioTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    setOpen(false);
    setStudiosOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!studiosOpen) return;
    const outside = (event: PointerEvent) => {
      if (!studioDisclosure.current?.contains(event.target as Node))
        setStudiosOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [studiosOpen]);
  useEffect(() => {
    if (!open && !studiosOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setStudiosOpen(false);
        (open ? trigger : studioTrigger).current?.focus();
      }
      if (open && event.key === "Tab") {
        const items = panel.current?.querySelectorAll<HTMLElement>("button,a");
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, studiosOpen]);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector("button")?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="nav-inner">
          <Link className="wordmark" to="/" aria-label={`${BRAND.name} home`}>
            {BRAND.name}
            <span aria-hidden="true">✳</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <div
              className="studio-disclosure"
              ref={studioDisclosure}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null,
                  )
                )
                  setStudiosOpen(false);
              }}
            >
              <button
                className={`studio-disclosure-trigger ${pathname.startsWith("/studios") || pathname.startsWith("/services/") ? "is-active" : ""}`}
                ref={studioTrigger}
                aria-expanded={studiosOpen}
                aria-controls="desktop-studios"
                onClick={() => setStudiosOpen((value) => !value)}
              >
                Studios <ChevronDown size={14} />
              </button>
              {studiosOpen && (
                <div
                  id="desktop-studios"
                  className="studio-disclosure-panel"
                  data-motion="editorial"
                >
                  {STUDIO_LINKS.map((studio) => (
                    <Link key={studio.to} to={studio.to}>
                      <span className="studio-menu-name">{studio.name}</span>
                      <span className="studio-menu-description">
                        {studio.description}
                      </span>
                      <ArrowUpRight size={16} />
                      {"availability" in studio && (
                        <small>{studio.availability}</small>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {PRIMARY_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link className="nav-cta" to={PROJECT_LINK.to}>
            {PROJECT_LINK.label} <ArrowUpRight size={17} />
          </Link>
          <button
            className="menu-toggle"
            ref={trigger}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => {
              setStudiosOpen(false);
              setOpen(true);
            }}
          >
            <Menu />
          </button>
        </div>
      </header>
      {open && (
        <div
          className="mobile-menu studio-mobile-menu"
          data-motion="mask"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          ref={panel}
        >
          <div className="mobile-menu-head">
            <span className="wordmark">{BRAND.name}</span>
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
            <Link className="mobile-primary-link" to="/studios">
              Studios <ArrowUpRight size={22} />
            </Link>
            <div
              className="mobile-studio-links"
              aria-label="Studio destinations"
            >
              {STUDIO_LINKS.map((studio) => (
                <Link key={studio.to} to={studio.to}>
                  <span>{studio.name}</span>
                  <div>
                    {studio.description}
                    {"availability" in studio && (
                      <small>{studio.availability}</small>
                    )}
                  </div>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>
            {PRIMARY_LINKS.map((link) => (
              <Link className="mobile-primary-link" to={link.to} key={link.to}>
                {link.label}
                <ArrowUpRight size={22} />
              </Link>
            ))}
            <Link className="button button-primary" to={PROJECT_LINK.to}>
              {PROJECT_LINK.label} <ArrowUpRight size={18} />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
