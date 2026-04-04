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
];

const PARA_1 = `I have always needed to know why before I could figure out what. It started at the dinner table, asking questions nobody had invited. It continued through an economics degree, where I discovered that the most interesting problems lived not in the numbers but in the behavior behind them. Why do people make irrational decisions? What makes a consumer choose one thing over another? What does the data not say that the person behind it is screaming?`;

const PARA_2 = `Economics gave me the framework. But the world was changing faster than any framework could keep up with. AI was not coming. It was already here, quietly rewriting how decisions get made, how stories get told, how businesses understand their customers. I saw it and I made a choice. I moved to the United States, enrolled in UCI's MS in Business Analytics, and deliberately built the technical skills I knew I would need. Because understanding the technology and knowing what to do with it are two very different skills. I wanted both.`;

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Heading fades up first
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 32, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
          }
        );
      }
      // Card animates in as one unit shortly after
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 48, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: cardRef.current, start: "top 82%", once: true },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const bodyStyle: React.CSSProperties = {
    fontSize: 15,
    color: "#94A3B8",
    margin: 0,
    lineHeight: 1.8,
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ backgroundColor: "#0D1526", padding: "120px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Heading — outside the card, left-aligned ── */}
        <div ref={headingRef} style={{ marginBottom: 32 }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#00D4AA",
              marginBottom: 12,
            }}
          >
            ABOUT
          </span>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "#FFFFFF",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            The thinking behind the work
          </h2>
        </div>

        {/*
          ── Full-width card — sharp corners, teal border, gradient fill ──
          The gradient runs top-left (faint teal) → bottom-right (near-solid navy),
          giving the card depth without competing with the content.
        */}
        <div
          ref={cardRef}
          style={{
            background: "linear-gradient(135deg, rgba(0,212,170,0.06) 0%, rgba(17,29,53,0.95) 100%)",
            border: "1px solid #00D4AA",
            borderRadius: 0,
            padding: "48px",
          }}
        >
          {/*
            3-column grid, 2-row implicit rows.
            Z reading path:
              [Para 1 — top left]   [Photo — center, both rows]   [empty — top right]
              [empty — bottom left] [Photo continues]              [Para 2 — bottom right]

            On mobile: single column, order: para1 → photo+stats → para2
          */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-8">

            {/* Para 1 — top of left column */}
            <div className="order-1 lg:col-start-1 lg:row-start-1 flex items-start">
              <p style={bodyStyle}>{PARA_1}</p>
            </div>

            {/* Center column — photo + stat boxes, spans both rows, centered */}
            <div
              className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col items-center justify-center gap-5"
              style={{
                background: "rgba(0,212,170,0.06)",
                borderLeft: "1px solid rgba(0,212,170,0.3)",
                borderRight: "1px solid rgba(0,212,170,0.3)",
                padding: "32px 24px",
              }}
            >
              <img
                src="/photo.jpg"
                alt="Manaal Fatima"
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  boxShadow: "0 0 40px rgba(0,212,170,0.18)",
                  border: "2px solid rgba(0,212,170,0.5)",
                  flexShrink: 0,
                }}
              />

              {STAT_BOXES.map(({ value, label }) => (
                <div
                  key={value}
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(10,15,30,0.6)",
                    border: "1px solid #1E3A5F",
                    borderRadius: 8,
                    padding: "14px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: 26, fontWeight: 700, color: "#00D4AA", lineHeight: 1 }}>
                    {value}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 400, color: "#FFFFFF" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Empty spacer — top right on desktop, hidden on mobile */}
            <div className="hidden lg:block lg:col-start-3 lg:row-start-1" aria-hidden />

            {/* Para 2 — bottom of right column */}
            <div className="order-3 lg:col-start-3 lg:row-start-2 flex items-end">
              <p style={bodyStyle}>{PARA_2}</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
