import ParticleBackgroundClient from "../components/ParticleBackgroundClient";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main style={{ position: "relative" }}>
      {/* Particles fixed behind everything — visible on forest green sections, 
          hidden on cream sections because cream bg covers them */}
      <ParticleBackgroundClient />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
