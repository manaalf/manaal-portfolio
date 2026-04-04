"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ENTRIES = [
  {
    isCurrent: true,
    date: "Feb 2025 – May 2025",
    role: "Project Trainee",
    company: "Habib Bank Limited",
    companyUrl: "https://www.hbl.com",
    description: "[PLACEHOLDER — add your description of the work, responsibilities, and impact here]",
  },
  {
    isCurrent: false,
    date: "Jun 2023 – Jul 2023",
    role: "Intern",
    company: "Engro Corporation",
    companyUrl: "https://www.engro.com",
    description: "[PLACEHOLDER — add your description of the work, responsibilities, and impact here]",
  },
  {
    isCurrent: false,
    date: "Jun 2022",
    role: "Intern",
    company: "Habib Bank Limited",
    companyUrl: "https://www.hbl.com",
    description: "[PLACEHOLDER — add your description of the work, responsibilities, and impact here]",
  },
  {
    isCurrent: false,
    date: "Jun 2021",
    role: "Intern",
    company: "Solis Energy",
    companyUrl: null,
    description: "[PLACEHOLDER — add your description of the work, responsibilities, and impact here]",
  },
];

export default function Experience() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const listRef      = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (headerRef.current) {
        gsap.fromTo(
          Array.from(headerRef.current.children),
          { y: 32, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true },
          }
        );
      }

      if (listRef.current) {
        gsap.fromTo(
          Array.from(listRef.current.children),
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: listRef.current, start: "top 82%", once: true },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ backgroundColor: "#0A0F1E", padding: "120px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 64 }}
        >
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00D4AA" }}>
            EXPERIENCE
          </span>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.15 }}>
            Career Journey
          </h2>
        </div>

        {/* ── Entry list — wraps timeline + rows ── */}
        <div style={{ position: "relative" }}>

          {/*
            Vertical timeline line — 1px, runs the full height of the list,
            positioned at 8px (half of 16px column) to bisect the dots.
            The 16px left margin below accounts for dot column width.
          */}
          <div
            style={{
              position: "absolute",
              left: 7,           // centers on the 16px dot column (8px dot / 2 = 4px + 3px visual offset)
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: "rgba(0,212,170,0.2)",
              pointerEvents: "none",
            }}
          />

          <div ref={listRef}>
            {ENTRIES.map((entry, i) => (
              <div
                key={i}
                style={{
                  borderTop: i === 0 ? "none" : "1px dotted rgba(0,212,170,0.2)",
                  padding: "28px 0",
                  display: "flex",
                  gap: 0,
                  alignItems: "flex-start",
                }}
              >
                {/* Timeline dot column — 16px wide, holds the dot above the line */}
                <div
                  style={{
                    width: 16,
                    flexShrink: 0,
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 3,   // aligns dot with first line of date text
                    marginRight: 20,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      flexShrink: 0,
                      backgroundColor: entry.isCurrent ? "#00D4AA" : "transparent",
                      border: "1.5px solid #00D4AA",
                      boxShadow: entry.isCurrent ? "0 0 6px rgba(0,212,170,0.6)" : "none",
                    }}
                  />
                </div>

                {/* Left zone — date, fixed width */}
                <div style={{ width: 180, flexShrink: 0 }}>
                  <span style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.5 }}>
                    {entry.date}
                  </span>
                </div>

                {/* Middle zone — role, company, description */}
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF", lineHeight: 1.3 }}>
                    {entry.role}
                  </span>

                  {entry.companyUrl ? (
                    <a
                      href={entry.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 14, color: "#00D4AA", textDecoration: "none", transition: "opacity 0.2s ease" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                    >
                      {entry.company}
                    </a>
                  ) : (
                    <span style={{ fontSize: 14, color: "#00D4AA" }}>{entry.company}</span>
                  )}

                  <p style={{ fontSize: 14, color: "#94A3B8", margin: "6px 0 0", lineHeight: 1.7, maxWidth: 560 }}>
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Closing line */}
            <div style={{ borderTop: "1px dotted rgba(0,212,170,0.2)" }} />

            {/* Seeking roles tagline */}
            <p
              style={{
                marginTop: 24,
                fontSize: 14,
                fontStyle: "italic",
                color: "#00D4AA",
                paddingLeft: 36,   // aligns with the date column (dot 16px + gap 20px)
              }}
            >
              Seeking full-time roles in AI strategy, analytics, consulting, and product management · Graduating June 2026
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
