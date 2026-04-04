"use client";

import { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleBackground() {
  // Track whether the tsParticles engine has been initialised
  const [engineReady, setEngineReady] = useState(false);

  // Controls the CSS opacity of the canvas wrapper.
  // Hero section → 1.0 (full opacity)
  // Any other section → 0.3
  const [opacity, setOpacity] = useState(1);

  // ── 1. Boot tsParticles engine once ──────────────────────────────────────
  // loadSlim bundles only the features we actually use, keeping the bundle
  // small compared to the full "loadFull" preset.
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  // ── 2. Opacity based on scroll position ──────────────────────────────────
  // We measure the hero section height (first section = 100vh) and fade
  // the fixed canvas from 1 → 0.3 once the user scrolls past it.
  useEffect(() => {
    const handleScroll = () => {
      // heroThreshold: distance the user must scroll before opacity drops.
      // Using window.innerHeight so it matches a 100vh hero.
      const heroThreshold = window.innerHeight * 0.8;
      const scrollY = window.scrollY;

      if (scrollY < heroThreshold) {
        setOpacity(1);
      } else {
        setOpacity(0.3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── 3. Particle configuration ─────────────────────────────────────────────
  // particlesLoaded is required by the Particles component API.
  const particlesLoaded = useCallback(async () => {}, []);

  const options: ISourceOptions = {
    fullScreen: { enable: false }, // We handle positioning ourselves via CSS
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: {
        value: 80,
        density: { enable: true }, // Distribute evenly across canvas area
      },
      color: {
        value: "#00D4AA", // Accent teal
      },
      opacity: {
        value: 0.35, // Individual particle opacity (separate from wrapper opacity)
      },
      size: {
        value: { min: 1, max: 2.5 }, // Small round dots
      },
      shape: {
        type: "circle", // Round dots, NOT squares
      },
      links: {
        enable: true,       // Draw thin connecting lines between nearby particles
        distance: 140,      // Max px distance before link disappears
        color: "#00D4AA",
        opacity: 0.18,      // Very subtle lines
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.6,         // Slow, ambient drift
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",     // Particles cluster gently toward cursor
        },
      },
      modes: {
        grab: {
          distance: 180,    // Grab radius around cursor
          links: { opacity: 0.45 },
        },
      },
    },
    detectRetina: true,
  };

  if (!engineReady) return null;

  return (
    // Fixed layer at z-index: 1 so it floats above section backgrounds
    // (position:relative, no z-index) but below section content (z-index: 2+).
    // CSS transition smoothly fades between hero opacity (1) and
    // background opacity (0.15) as the user scrolls.
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        opacity,
        transition: "opacity 0.6s ease",
        pointerEvents: "none", // Never block clicks on content above
      }}
    >
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
