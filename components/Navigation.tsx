"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home",       id: "home"       },
  { label: "About",      id: "about"      },
  { label: "Skills",     id: "skills"     },
  { label: "Work",       id: "work"       },
  { label: "Experience", id: "experience" },
  { label: "Contact",    id: "contact"    },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // ── 1. Active section detection via scroll position ──────────────────────
  // On every scroll event, measure each section's center distance from the
  // viewport midpoint and mark whichever is closest as active.
  // This is deterministic: no firing-order ambiguity when sections of
  // varying height overlap the same trigger band simultaneously.
  useEffect(() => {
    const detect = () => {
      const mid = window.innerHeight / 2;
      let closest = { id: "home", dist: Infinity };

      NAV_LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const { top, bottom } = el.getBoundingClientRect();
        const dist = Math.abs((top + bottom) / 2 - mid);
        if (dist < closest.dist) closest = { id, dist };
      });

      setActiveSection(closest.id);
    };

    detect(); // run once on mount so initial state is correct
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, []);

  // ── 2. Subtle border reveal on scroll ────────────────────────────────────
  // Adds a faint bottom border once the user scrolls past the very top,
  // visually separating the nav from the hero content.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── 3. Smooth scroll to section on link click ────────────────────────────
  // Uses native scrollIntoView. Lenis (added later) will automatically
  // intercept this and apply its eased smooth-scroll behaviour.
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,                         // Above particles (z-index 1) and section content (z-index 2)
        backgroundColor: "rgba(10,15,30,0.9)", // #0A0F1E at 90% opacity
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)", // Safari support
        borderBottom: scrolled
          ? "1px solid rgba(30,58,95,0.6)"  // #1E3A5F at 60% — subtle separator
          : "1px solid transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#00D4AA",
            letterSpacing: "0.05em",
            textDecoration: "none",
            lineHeight: 1,
          }}
        >
          MF
        </a>

        {/* ── Nav links (desktop) ── */}
        <ul
          style={{
            display: "flex",
            gap: 8,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map(({ label, id }) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    padding: "6px 12px",
                    fontSize: 14,
                    fontWeight: 500,
                    color: isActive ? "#00D4AA" : "#94A3B8",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  // Hover colour handled inline via onMouseEnter/Leave to avoid
                  // needing a CSS class — keeps the component self-contained.
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#94A3B8";
                  }}
                >
                  {label}

                  {/* Teal underline indicator for active section */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      height: 2,
                      borderRadius: 1,
                      backgroundColor: "#00D4AA",
                      // Animate width: 0 → 100% when active, 100% → 0 when not
                      width: isActive ? "80%" : "0%",
                      transition: "width 0.25s ease",
                    }}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
