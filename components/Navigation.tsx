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
    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Nav bg depends on which section we're in — forest sections get cream nav
  const isForestSection = ["home", "skills", "contact"].includes(activeSection);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        backgroundColor: isForestSection
          ? "rgba(28, 61, 53, 0.95)"
          : "rgba(245, 240, 232, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? isForestSection
            ? "1px solid rgba(62, 191, 160, 0.2)"
            : "1px solid rgba(28, 61, 53, 0.12)"
          : "1px solid transparent",
        transition: "background-color 0.4s ease, border-color 0.3s ease",
      }}
    >
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 32px",
        height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22, fontWeight: 700,
            color: isForestSection ? "var(--teal)" : "var(--forest)",
            letterSpacing: "0.02em",
          }}
        >
          MF
        </a>

        <ul style={{ display: "flex", gap: 4, listStyle: "none", margin: 0, padding: 0 }}>
          {NAV_LINKS.map(({ label, id }) => {
            const isActive = activeSection === id;
            const textColor = isForestSection
              ? isActive ? "var(--teal)" : "rgba(245,240,232,0.7)"
              : isActive ? "var(--forest)" : "var(--slate)";
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    padding: "6px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: textColor,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        isForestSection ? "var(--cream)" : "var(--charcoal)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color = textColor;
                    }
                  }}
                >
                  {label}
                  <span style={{
                    position: "absolute", bottom: 0, left: "50%",
                    transform: "translateX(-50%)",
                    height: 2, borderRadius: 1,
                    backgroundColor: "var(--teal)",
                    width: isActive ? "70%" : "0%",
                    transition: "width 0.25s ease",
                  }} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
