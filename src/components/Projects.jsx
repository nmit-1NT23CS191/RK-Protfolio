import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Library, ShieldCheck, Calculator, ShoppingCart, Sparkles } from 'lucide-react';
import { Github } from './Icons';
import projectLibraryImg from '../assets/project-library.png';
import projectVeraClaimImg from '../assets/project-veraclaim.png';
import projectAimlGameImg from '../assets/project-cicd.png';
import projectIntelliGroceryImg from '../assets/project-traffic.png';
import projectColloquiumImg from '../assets/hero.png'; // placeholder — replace with real screenshot

const projects = [
  {
    title: 'Colloquium AI',
    fullTitle: 'AI-Powered Smart Campus GPT for Colloquium Event Management',
    description: 'An intelligent event management and student query system leveraging RAG to parse academic event PDFs and assist students through interactive voice and text chat.',
    ongoing: true,
    icon: <Sparkles className="text-cyber-cyan" size={24} />,
    accentColor: 'rgba(0, 229, 255, 0.5)',
    image: projectColloquiumImg,
    tags: ['FastAPI', 'React', 'OpenAI GPT-4o', 'Ollama (Llama 3)', 'SQLite', 'RAG', 'Tailwind CSS'],
    features: [
      'Automated circular parsing and text extraction from PDFs using pypdf, Tesseract, and pdf2image',
      'AI-powered metadata extraction (Topic, Speaker, Date, Venue) with Regex & LLM fallbacks',
      'Interactive student chat interface with built-in voice support (Speech-to-Text query recognition)',
      'Dual LLM backend supporting cloud-based OpenAI GPT models and local Ollama integrations',
      'Admin control panel with CRUD operations, duplicate event detection, and file management tools',
      'Data analysis visualisations, system activity logs, and export mechanisms for CSV and Excel sheets',
    ],
    github: 'https://github.com/nmit-1NT23CS191/nmit_colloquium_AI.git',
    live: '#',
  },
  {
    title: 'RK Library',
    fullTitle: 'RK Library — Smart Digital Library System',
    description: 'A comprehensive, multi-platform smart library ecosystem featuring an interactive Three.js 3D explorer, 2D floor maps with A* pathfinding, real-time seat tracking, an AI assistant, and a Flask REST API integrated with a Unity 3D client.',
    ongoing: false,
    icon: <Library className="text-cyber-cyan" size={24} />,
    accentColor: 'rgba(108, 99, 255, 0.6)',
    image: projectLibraryImg,
    tags: ['Three.js', 'Flask API', 'MySQL', 'Unity 3D', 'A* Pathfinding', 'AI Chatbot', 'JWT Auth'],
    features: [
      'Interactive browser-based 3D library explorer using Three.js with multi-floor inspectability',
      'Intelligent 2D navigation system with A* pathfinding and step-by-step rack directions',
      'Context-aware AI Chatbot Assistant for natural language book search and recommendations',
      'Real-time seat availability matrix tracking silent zones and occupied desks',
      'Evacuation routing and interactive emergency alerting systems',
      'Robust Python Flask backend with JWT token-based authentication and MySQL/SQLite support',
      'Seamless integration with a AAA-quality Unity 3D Client for first-person library navigation',
    ],
    github: 'https://github.com/nmit-1NT23CS191/rk-lib',
    live: '#',
  },
  {
    title: 'VeraClaim AI',
    fullTitle: 'VeraClaim AI — Automated Claims Verification',
    description: 'Intelligent claims adjudication and fraud detection system automating medical document OCR, registry verification, and algorithmic risk profiling.',
    ongoing: false,
    icon: <ShieldCheck className="text-emerald-400" size={24} />,
    accentColor: 'rgba(16, 185, 129, 0.5)',
    image: projectVeraClaimImg,
    tags: ['React', 'Node.js', 'MongoDB', 'Tesseract.js OCR', 'Hugging Face NLP', 'Tailwind CSS'],
    features: [
      'Automated document parsing using Tesseract.js and Jimp image validation',
      'Real-time verification against national GST & Medical Registry databases',
      'Heuristic fraud detection scanning for digital tampering and high-velocity claims',
      'Algorithmic risk engine automating claim triage and multi-stage payment releases',
    ],
    github: 'https://github.com/nmit-1NT23CS191/health_care',
    live: '#',
  },
  {
    title: 'AIML Game',
    fullTitle: 'AI-Powered Arithmetic Challenge (CI/CD Pipeline)',
    description: 'A desktop arithmetic challenge game built with Python and Tkinter where players compete against a simulated AI opponent, featuring an automated Jenkins verification pipeline.',
    ongoing: false,
    icon: <Calculator className="text-cyber-green" size={24} />,
    accentColor: 'rgba(57, 255, 20, 0.5)',
    image: projectAimlGameImg,
    tags: ['Python', 'Tkinter', 'Jenkins', 'SonarQube', 'Trivy'],
    features: [
      'Interactive desktop GUI with dynamic difficulty selection (Easy, Medium, Hard)',
      'Simulated AI opponent with randomized response times and configurable accuracy levels',
      'Real-time scoring and response time measurement to determine the match winner',
      'Jenkins CI/CD pipeline integrated with Trivy security scans and SonarQube quality gates',
    ],
    github: 'https://github.com/nmit-1NT23CS191/AIML-game',
    live: '#',
  },
  {
    title: 'IntelliGrocery',
    fullTitle: 'IntelliGrocery-Pro: AI-Powered Grocery Management & Analytics',
    description: 'A full-stack, AI-powered intelligent grocery management and analytics platform integrating real-time analytics, demand forecasting, and market basket analysis.',
    ongoing: false,
    icon: <ShoppingCart className="text-lime-400" size={24} />,
    accentColor: 'rgba(34, 197, 94, 0.5)',
    image: projectIntelliGroceryImg,
    tags: ['React', 'Node.js', 'FastAPI', 'Python', 'SQLite', 'Docker', 'Socket.IO'],
    features: [
      'Real-time KPI tracking and interactive analytics dashboard using Recharts and Socket.IO',
      'Advanced data mining using Apriori, FP-Growth, and Association Rule Mining',
      'ML services for demand forecasting, customer segmentation (K-Means), and sequential pattern mining',
      'Containerized multi-service deployment flow via Docker Compose',
    ],
    github: 'https://github.com/nmit-1NT23CS191/Intelligrocery-DM-',
    live: '#',
  },
];

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <>
    <section id="projects" className="relative py-24 px-10 max-w-[3000px] mx-auto z-20">
      {/* Title */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-wide uppercase text-white">
          Featured <span className="text-gradient-cyan-violet">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-violet mt-4 rounded-full"></div>
      </div>

      {/* Flex Accordion Row */}
      <div className="flex flex-col lg:flex-row w-full gap-4 h-[800px] lg:h-[600px]">
        {projects.map((project, idx) => {
          const isActive = activeIdx === idx;
          return (
            <motion.div
              key={project.title}
              layout
              animate={{ flex: isActive ? 6 : 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 1 }}
              onMouseEnter={() => setActiveIdx(idx)}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                minWidth: isMobile ? undefined : (isActive ? 0 : '76px'),
                minHeight: isMobile ? (isActive ? 0 : '76px') : undefined,
                border: isActive
                  ? `1px solid ${project.accentColor}`
                  : '1px solid rgba(255,255,255,0.07)',
                boxShadow: isActive
                  ? `0 0 32px ${project.accentColor}, 0 8px 32px rgba(0,0,0,0.5)`
                  : '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                  backgroundImage: `url(${project.image})`,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              />

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: isActive
                    ? 'linear-gradient(to top, rgba(11,17,32,0.98) 45%, rgba(11,17,32,0.55) 80%, rgba(11,17,32,0.25) 100%)'
                    : 'linear-gradient(to top, rgba(11,17,32,0.97) 60%, rgba(11,17,32,0.7) 100%)',
                }}
              />

              {/* ── COLLAPSED VIEW: Vertical rotated title ── */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-end pb-8 pointer-events-none"
                  >
                    {/* Ongoing badge on collapsed strip */}
                    {project.ongoing && (
                      <div className="absolute top-4 left-1/2 -translate-x-1/2">
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/40 text-cyber-cyan text-[9px] font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                          Live
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="writing-mode-vertical text-white font-display font-bold text-sm tracking-widest uppercase opacity-90 select-none"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                      >
                        {project.title}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        {project.icon}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── EXPANDED VIEW: Full content ── */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute inset-0 flex flex-col p-6"
                  >
                    {/* ── TOP BAR: Icon + Buttons (always pinned) ── */}
                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur-sm">
                        {React.cloneElement(project.icon, { size: 26 })}
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-gray-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 hover:bg-cyber-cyan/10 transition-all duration-300 backdrop-blur-sm"
                          title="GitHub"
                        >
                          <Github size={17} />
                        </a>
                        <button
                          onClick={(e) => { e.stopPropagation(); setModalProject(project); }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-cyber-cyan/15 border border-cyber-cyan/30 text-cyber-cyan text-xs font-semibold hover:bg-cyber-cyan/25 transition-all duration-300 backdrop-blur-sm"
                          title="More Details"
                        >
                          <ExternalLink size={12} /> More Details
                        </button>
                      </div>
                    </div>

                    {/* ── SCROLLABLE CONTENT ── */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col justify-start gap-0">
                      {/* Title & Description */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-display font-black text-base lg:text-lg text-white leading-snug line-clamp-3">
                          {project.fullTitle}
                        </h3>
                        {project.ongoing && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/40 text-cyber-cyan text-[9px] font-bold uppercase tracking-wider flex-shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                            Ongoing
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Feature Bullets — first 3 only */}
                      <ul className="space-y-2 mb-4">
                        {project.features.slice(0, 3).map((f, fIdx) => (
                          <li key={fIdx} className="text-sm text-gray-200 flex items-start gap-2 leading-snug">
                            <span className="text-cyber-green mt-1 flex-shrink-0">✦</span>
                            <span>{f}</span>
                          </li>
                        ))}
                        {project.features.length > 3 && (
                          <li className="text-xs text-gray-400 pl-5 italic">+{project.features.length - 3} more — click <span className="text-cyber-cyan">More Details</span></li>
                        )}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-200 uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>

    {/* ── PROJECT DETAIL MODAL ── */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(5,10,24,0.88)', backdropFilter: 'blur(12px)' }}
            onClick={() => setModalProject(null)}
          >
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col scrollbar-hide"
              style={{
                background: 'linear-gradient(145deg, rgba(11,17,32,0.98) 0%, rgba(18,26,48,0.98) 100%)',
                border: `1px solid ${modalProject.accentColor}`,
                boxShadow: `0 0 48px ${modalProject.accentColor}, 0 24px 64px rgba(0,0,0,0.7)`,
              }}
            >
              {/* Modal header image */}
              <div className="relative h-48 md:h-64 lg:h-72 overflow-hidden rounded-t-2xl flex-shrink-0">
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105"
                  style={{ backgroundImage: `url(${modalProject.image})` }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,17,32,1) 10%, rgba(11,17,32,0.4) 100%)' }} />
                {/* Close button */}
                <button
                  onClick={() => setModalProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 md:bottom-6 left-6 md:left-8 flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur-sm">
                    {React.cloneElement(modalProject.icon, { size: isMobile ? 26 : 32 })}
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mb-1">Project</p>
                    <h3 className="font-display font-black text-xl md:text-2xl lg:text-3xl text-white leading-tight">{modalProject.fullTitle}</h3>
                  </div>
                </div>
              </div>

              {/* Modal body */}
              <div className="p-6 md:p-8 flex flex-col gap-5 md:gap-7">
                {/* Description */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">{modalProject.description}</p>

                {/* All features */}
                <div>
                  <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 md:mb-4">Key Features</p>
                  <ul className="space-y-2.5 md:space-y-3">
                    {modalProject.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 md:gap-3 text-sm md:text-base text-gray-200 leading-snug">
                        <span className="text-cyber-green mt-0.5 md:mt-1 flex-shrink-0">✦</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 md:mb-4">Tech Stack</p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {modalProject.tags.map((tag) => (
                      <span key={tag} className="px-3 md:px-4 py-1.5 rounded-md bg-white/5 border border-white/10 text-[11px] md:text-xs font-semibold text-gray-200 uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <a
                    href={modalProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/15 text-sm md:text-base text-white hover:bg-cyber-cyan/10 hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all duration-300"
                  >
                    <Github size={isMobile ? 16 : 18} /> View on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}