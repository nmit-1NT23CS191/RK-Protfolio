import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Library, ShieldAlert, GitBranch, Car } from 'lucide-react';
import { Github } from './Icons';
import projectLibraryImg from '../assets/project-library.png';
import projectVeraclaimImg from '../assets/project-veraclaim.png';
import projectCicdImg from '../assets/project-cicd.png';
import projectTrafficImg from '../assets/project-traffic.png';

const projects = [
  {
    title: 'Virtual 3D Library Management System',
    description: 'A revolutionary library system combining interactive 3D navigation with advanced data management and cloud deployment.',
    featured: true,
    icon: <Library className="text-cyber-cyan" size={28} />,
    image: projectLibraryImg,
    tags: ['React Three Fiber', 'MongoDB', 'SQL Pipelines', 'AI Recommendation', 'AWS Deploy'],
    features: [
      'Interactive 3D Library visual environment',
      'Dual SQL & MongoDB pipelines for robust cataloging',
      'AI recommendation engine based on user borrow habits',
      'Cloud deployment with high-availability scaling'
    ],
    github: 'https://github.com/nmit-1NT23CS191/Virtual-3D-Library',
    live: '#'
  },
  {
    title: 'VeraClaim AI',
    description: 'An AI-powered healthcare assistant simplifying insurance claims with predictive analysis and data extraction.',
    featured: false,
    icon: <ShieldAlert className="text-cyber-violet" size={24} />,
    image: projectVeraclaimImg,
    tags: ['Python', 'OCR Extraction', 'Machine Learning', 'Healthcare'],
    features: [
      'Top 15 Finalist at Vibe-A-Thon 2026',
      'Instant OCR claim document data extraction',
      'VeraScore: predictive risk modeling algorithm'
    ],
    github: 'https://github.com/nmit-1NT23CS191/VeraClaim-AI',
    live: '#'
  },
  {
    title: 'Automated CI/CD Pipeline',
    description: 'Enterprise-grade continuous integration and continuous delivery pipeline for modern containerized software.',
    featured: false,
    icon: <GitBranch className="text-cyber-green" size={24} />,
    image: projectCicdImg,
    tags: ['Jenkins', 'AWS EC2', 'Docker', 'SonarQube', 'Trivy'],
    features: [
      'Automated code build and verification flow',
      'Deep static analysis via SonarQube quality gates',
      'Container vulnerability scanning with Trivy',
      'AWS EC2 hosting and container orchestration'
    ],
    github: 'https://github.com/nmit-1NT23CS191/Automated-CICD-Pipeline',
    live: '#'
  },
  {
    title: 'Dynamic Traffic Congestion Prediction',
    description: 'Intelligent traffic analyzer predicting vehicular traffic congestion using advanced weather and historical patterns.',
    featured: false,
    icon: <Car className="text-orange-400" size={24} />,
    image: projectTrafficImg,
    tags: ['Python', 'Scikit-Learn', 'Pandas', 'EDA Analysis'],
    features: [
      '92% prediction accuracy achieved in validations',
      'Integration of weather and historical traffic matrices',
      'Exploratory Data Analysis reporting dashboard'
    ],
    github: 'https://github.com/nmit-1NT23CS191/Traffic-Congestion-Prediction',
    live: '#'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 max-w-7xl mx-auto z-20">
      {/* Title */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-wide uppercase text-white">
          Featured <span className="text-gradient-cyan-violet">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-violet mt-4 rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => {
          const colSpanClass = project.featured ? 'md:col-span-2 lg:col-span-2' : 'md:col-span-1 lg:col-span-1';
          
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className={`glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden group glass-card-hover ${colSpanClass}`}
            >
              {/* Highlight Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyber-cyan/5 via-transparent to-cyber-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Project Screenshot Banner */}
                {project.image && (
                  <div className="-mx-8 -mt-8 mb-6 h-40 overflow-hidden rounded-t-2xl relative">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B1120]/90 pointer-events-none" />
                  </div>
                )}

                {/* Header Icon + Actions */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                    {project.icon}
                  </div>
                  
                  {/* Actions Links revealed on hover */}
                  <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 hover:bg-cyber-cyan/10 transition-all duration-300"
                      title="GitHub Repository"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={project.live}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 hover:bg-cyber-cyan/10 transition-all duration-300"
                      title="Live Demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-cyber-cyan transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-8">
                  {project.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-xs text-gray-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-cyber-green mt-1">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags Cloud */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-300 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
