import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-cyber-dark py-12 px-6 border-t border-white/5 z-20 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-36 bg-gradient-to-t from-cyber-cyan/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative">
        {/* Branding */}
        <div className="text-center md:text-left">
          <p className="font-display font-bold text-sm tracking-widest text-white uppercase">
            Ravikiran M S
          </p>
          <p className="text-xs text-gray-500 mt-1">
            © {new Date().getFullYear()} NMIT CSE. All rights reserved.
          </p>
        </div>

        {/* Quick Socials */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/nmit-1NT23CS191"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-cyber-cyan transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/ravikiran-m-s/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-cyber-violet transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:msravikiran11@gmail.com"
            className="text-gray-500 hover:text-cyber-green transition-colors"
            aria-label="Email Address"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      {/* Floating back-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full glass-card border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan hover:bg-cyber-cyan/10 hover:border-cyber-cyan hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 z-50 group"
            aria-label="Scroll to top"
          >
            {/* Pulsing visual border ring */}
            <span className="absolute inset-0 rounded-full border border-cyber-cyan/20 animate-ping group-hover:hidden"></span>
            <ArrowUp size={20} className="transform group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
