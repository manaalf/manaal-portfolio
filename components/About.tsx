"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const STAT_BOXES = [
  { value: "MSBA",  label: "Paul Merage School of Business, UC Irvine · June 2026" },
  { value: "5+",    label: "Projects" },
  { value: "2026",  label: "Graduating" },
  { value: "CA",    label: "Based in California" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (leftRef.current) {
      gsap.fromTo(leftRef.current,
        { x: -32, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 82%", once: true } }
      );
    }
    if (rightRef.current) {
      gsap.fromTo(Array.from(rightRef.current.children),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 82%", once: true } }
      );
    }
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} style={{ backgroundColor: "var(--cream)", padding: "120px 0", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        <span className="section-label" style={{ color: "var(--teal-muted)", display: "block", marginBottom: 12 }}>
          About
        </span>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="about-grid">

          {/* Left — photo + stats */}
          <div ref={leftRef} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, color: "var(--forest)", margin: 0, lineHeight: 1.1 }}>
              The thinking<br />behind the work
            </h2>

            {/* Photo — clean, no border box */}
            <img
              src="/photo.jpg"
              alt="Manaal Fatima"
              style={{
                width: "100%", maxWidth: 340,
                aspectRatio: "4/5", objectFit: "cover",
                objectPosition: "center top",
                borderRadius: 4,
                display: "block",
              }}
            />

            {/* Stat grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              {STAT_BOXES.map(({ value, label }) => (
                <div key={value} style={{ backgroundColor: "var(--forest)", padding: "20px 22px" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--teal)", display: "block", lineHeight: 1 }}>
                    {value}
                  </span>
                  <span style={{ fontSize: 12, color: "rgba(245,240,232,0.8)", marginTop: 6, display: "block", lineHeight: 1.4 }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — body text */}
          <div ref={rightRef} style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 80 }}>
            <blockquote style={{ margin: 0, padding: "0 0 0 20px", borderLeft: "3px solid var(--teal)" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 19, fontStyle: "italic", color: "var(--forest)", margin: 0, lineHeight: 1.5 }}>
                &ldquo;I don&apos;t pick up the tool until I know what I&apos;m trying to say with it.&rdquo;
              </p>
            </blockquote>

            <p style={{ fontSize: 16, color: "var(--slate)", margin: 0, lineHeight: 1.85 }}>
              I have always needed to know why before I could figure out what. It started through an economics degree, where I discovered the most interesting problems lived not in the numbers but in the behavior behind them.
            </p>

            <p style={{ fontSize: 16, color: "var(--slate)", margin: 0, lineHeight: 1.85 }}>
              AI was already here, quietly rewriting how decisions get made. I moved to the United States, enrolled in UCI&apos;s MSBA, and deliberately built the technical skills I knew I would need — because understanding the technology and knowing what to do with it are two very different skills. I wanted both.
            </p>

            <p style={{ fontSize: 16, color: "var(--slate)", margin: 0, lineHeight: 1.85 }}>
              At UCI I built AI systems, ran consulting engagements, and shipped products that solved real problems — from insurance navigation to job matching to corporate purpose scoring. I tend to notice the unassigned problem and build for it.
            </p>

            <p style={{ fontSize: 15, color: "var(--slate-light)", margin: 0, lineHeight: 1.8, fontStyle: "italic" }}>
              Outside of all of this: watching Barcelona, following the WNBA more seriously than most people think is reasonable, and reading about something that has nothing to do with any of this — then finding out it has everything to do with all of it.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
