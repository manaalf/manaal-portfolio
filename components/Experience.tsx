"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ENTRIES = [
  {
    isCurrent: false,
    date: "Jan 2026 – June 2026",
    role: "Student Consultant — Project Manager & Analytics Lead",
    company: "PAN Group (UCI Capstone)",
    companyUrl: null,
    bullets: [
      "Led a 6-month consulting engagement for an Australian VC firm to quantify whether purpose-driven companies outperform peers — spanning methodology design, NLP pipeline development, statistical analysis, and client delivery.",
      "Built an LLM scoring pipeline via Anthropic Batch API to process SEC filings across 904 NYSE companies and 20 GICS sectors; OLS regression established statistically significant purpose-performance correlation (r = 0.265, p < 0.001).",
      "Delivered quadrant classification framework and interactive Tableau dashboard scoped for immediate redeployment in client due diligence.",
    ],
  },
  {
    isCurrent: true,
    date: "Feb 2025 – May 2025",
    role: "Project Trainee",
    company: "Habib Bank Limited",
    companyUrl: "https://www.hbl.com",
    bullets: [
      "Embedded core values into employee behavior via an internal intervention campaign and environmental nudges.",
      "Managed a talent portfolio of 2,000+ applicants for The League program, streamlining selection and onboarding.",
    ],
  },
  
  {
    isCurrent: false,
    date: "Jun 2023 – Jul 2023",
    role: "Intern",
    company: "Engro Corporation",
    companyUrl: "https://www.engro.com",
    bullets: [
      "Developed a policy framework with actionable guidelines for stakeholder management and legislative navigation.",
      "Delivered a tailored stakeholder package for 80+ provincial officials, enhancing outreach and policy communication.",
    ],
  },
  {
    isCurrent: false,
    date: "Jun 2022 – Aug 2022",
    role: "Intern",
    company: "Habib Bank Limited",
    companyUrl: "https://www.hbl.com",
    bullets: [
      "Spearheaded launch of the Employee Volunteering Program, mobilizing 250+ employees within its first two sessions.",
      "Built a database of 300+ candidates with disabilities to strengthen inclusive recruitment pipelines.",
    ],
  },
  {
    isCurrent: false,
    date: "Jun 2021",
    role: "Intern",
    company: "Solis Energy",
    companyUrl: null,
    bullets: [
      "Managed budgeting activities using Excel and Xero, ensuring accurate financial tracking and reporting.",
      "Processed and monitored Purchase Orders, resolving discrepancies to maintain smooth procurement workflows.",
    ],
  },
];

const CERTS = [
  { name: "Google Data Analytics Certificate", issuer: "Google",    year: "2025" },
  { name: "Claude Code Certification",          issuer: "Anthropic", year: "2026" },
  { name: "Cowork Certification",               issuer: "Anthropic", year: "2026" },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);
  const certsRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(Array.from(headerRef.current.children),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true } }
      );
    }
    if (listRef.current) {
      gsap.fromTo(Array.from(listRef.current.children),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 82%", once: true } }
      );
    }
    if (certsRef.current) {
      gsap.fromTo(Array.from(certsRef.current.children),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: certsRef.current, start: "top 88%", once: true } }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ backgroundColor: "var(--cream)", padding: "120px 0", position: "relative", zIndex: 2 }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        <div ref={headerRef} style={{ marginBottom: 72 }}>
          <span className="section-label" style={{ color: "var(--teal-muted)", display: "block", marginBottom: 16 }}>
            Experience
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, color: "var(--forest)", margin: 0, lineHeight: 1.1 }}>
            Career Journey
          </h2>
        </div>

        {/* Experience entries */}
        <div ref={listRef} style={{ display: "flex", flexDirection: "column" }}>
          {ENTRIES.map((entry, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: 40,
                padding: "36px 0",
                borderTop: "1px solid rgba(28,61,53,0.1)",
              }}
              className="exp-row"
            >
              <div>
                <span style={{ fontSize: 13, color: "var(--slate-light)", lineHeight: 1.5 }}>
                  {entry.date}
                </span>
                {entry.isCurrent && (
                  <span style={{
                    display: "inline-block", marginTop: 8,
                    fontSize: 10, fontWeight: 600,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    backgroundColor: "var(--teal)", color: "var(--forest)",
                    padding: "3px 8px", borderRadius: 3,
                  }}>
                    Recent
                  </span>
                )}
              </div>

              <div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--charcoal)", margin: "0 0 4px", lineHeight: 1.3 }}>
                  {entry.role}
                </h3>
                {entry.companyUrl ? (
                  <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 14, color: "var(--teal-muted)", fontWeight: 500, transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--forest)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--teal-muted)")}>
                    {entry.company}
                  </a>
                ) : (
                  <span style={{ fontSize: 14, color: "var(--teal-muted)", fontWeight: 500 }}>{entry.company}</span>
                )}
                <ul style={{ margin: "12px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {entry.bullets.map((bullet, bi) => (
                    <li key={bi} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--teal)", marginTop: 7, fontSize: 7, flexShrink: 0 }}>◆</span>
                      <span style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.75 }}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Closing line */}
          <div style={{ borderTop: "1px solid rgba(28,61,53,0.1)", paddingTop: 24 }}>
            <p style={{ fontSize: 14, fontStyle: "italic", color: "var(--teal-muted)", margin: 0 }}>
              Seeking full-time roles in AI strategy, analytics, consulting, and product management · Graduating June 2026
            </p>
          </div>
        </div>

        {/* Certifications — moved here from Skills */}
        <div style={{ marginTop: 80 }}>
          <span className="section-label" style={{ color: "var(--teal-muted)", display: "block", marginBottom: 28 }}>
            Certifications
          </span>
          <div ref={certsRef} style={{ display: "flex", flexDirection: "column" }}>
            {CERTS.map((cert, i) => (
              <div
                key={cert.name}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "18px 0",
                  borderTop: "1px solid rgba(28,61,53,0.08)",
                  borderBottom: i === CERTS.length - 1 ? "1px solid rgba(28,61,53,0.08)" : "none",
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--charcoal)" }}>{cert.name}</span>
                <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "var(--slate-light)" }}>{cert.issuer}</span>
                  <span style={{ fontSize: 13, color: "var(--teal-muted)", fontWeight: 600 }}>{cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .exp-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  );
}
