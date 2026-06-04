import React from 'react';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import GithubStats from './components/GithubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#0B1120] text-white">
      {/* 3D background floating stars and shapes */}
      <Background3D />

      {/* Main UI layout */}
      <div className="relative z-10 w-full flex flex-col">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <GithubStats />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
