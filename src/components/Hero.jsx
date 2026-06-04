import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Download } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { useTypewriter } from '../hooks/useTypewriter';
import Profile3D from './Profile3D';

export default function Hero() {
  const words = [
    "Computer Science Engineering Student",
    "Software Development Engineer (SDE)",
    "Cloud Infrastructure & Security",
    "AI & Data Integration"
  ];
  
  const typedText = useTypewriter(words, 80, 40, 2000);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center px-6 overflow-hidden">
      {/* Visual Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0B1120_85%)] pointer-events-none z-10" />
      
      {/* Background Dots */}
      <div className="absolute inset-0 cyber-bg-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center z-20 w-full mt-16 lg:mt-0">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Cyber Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-4 py-1.5 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan text-xs font-semibold tracking-widest uppercase mb-6 shadow-[inset_0_0_10px_rgba(0,229,255,0.15)] flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse"></span>
            Engineering Student Portfolio
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 whitespace-nowrap"
          >
            RAVIKIRAN <span className="text-gradient-cyan-violet">M S</span>
          </motion.h1>

          {/* Subtitle / Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-12 md:h-16 flex items-center justify-center lg:justify-start mb-8 w-full"
          >
            <p className="text-lg md:text-2xl font-medium text-gray-300">
              {typedText}
              <span className="w-[3px] h-5 md:h-7 bg-cyber-cyan ml-1 inline-block animate-pulse">|</span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl text-gray-400 text-sm md:text-base leading-relaxed mb-12"
          >
            Specializing in Software Development Engineering (SDE), Cloud Infrastructure security, and Applied Machine Learning. Designing scalable solutions with enterprise-level automation and modern architectures.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full justify-center lg:justify-start"
          >
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, '#projects')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-medium text-black bg-gradient-to-r from-cyber-cyan to-cyber-green hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              View Projects
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-medium text-white border border-cyber-violet/50 bg-cyber-violet/10 hover:bg-cyber-violet/25 hover:border-cyber-violet transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-medium text-gray-300 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-6 justify-center lg:justify-start w-full"
          >
            <a
              href="https://github.com/nmit-1NT23CS191"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/ravikiran-m-s"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyber-violet hover:border-cyber-violet/50 hover:bg-cyber-violet/5 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D profile picture card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center items-center w-full"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl border border-cyber-cyan/20 p-2 bg-cyber-navy/30 backdrop-blur-sm shadow-[0_0_30px_rgba(0,229,255,0.1)] hover:border-cyber-cyan/50 hover:shadow-[0_0_40px_rgba(0,229,255,0.25)] transition-all duration-500 animate-float-medium flex items-center justify-center">
            <Profile3D />
          </div>
        </motion.div>
      </div>

      {/* Mouse scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <a
          href="#about"
          onClick={(e) => handleScrollTo(e, '#about')}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-cyber-cyan transition-colors"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-gray-600 flex justify-center p-1.5"
          >
            <div className="w-1 h-2 bg-cyber-cyan rounded-full"></div>
          </motion.div>
        </a>
      </div>
    </section>
  );
}
