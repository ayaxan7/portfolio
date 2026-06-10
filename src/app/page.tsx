import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <div className="relative">
          <NeuralNetworkBackground />
          <Education />
          <Contact />
        </div>
      </main>
    </>
  );
}
