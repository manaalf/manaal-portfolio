"use client";

import { useEffect, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particleOptions: ISourceOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  interactivity: {
    events: { onHover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 120, links: { opacity: 0.3 } } },
  },
  particles: {
    color: { value: "#3EBFA0" },
    links: { color: "#3EBFA0", distance: 140, enable: true, opacity: 0.15, width: 1 },
    move: { enable: true, speed: 0.6, direction: "none", random: true, outModes: { default: "bounce" } },
    number: { density: { enable: true }, value: 45 },
    opacity: { value: 0.25 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2.5 } },
  },
  detectRetina: true,
};

export default function ParticleBackground() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  return (
    <Particles
      id="tsparticles"
      style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
      options={particleOptions}
    />
  );
}
