import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Brain, Cloud } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

const focusAreas = [
  { name: 'Software Development Engineering (SDE)', color: 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/5' },
  { name: 'Cloud Infrastructure & Security', color: 'border-cyber-violet text-cyber-violet bg-cyber-violet/5' },
  { name: 'Cybersecurity', color: 'border-red-500 text-red-400 bg-red-500/5' },
  { name: 'Artificial Intelligence', color: 'border-cyber-green text-cyber-green bg-cyber-green/5' },
  { name: 'DevOps Pipelines', color: 'border-orange-500 text-orange-400 bg-orange-500/5' },
  { name: 'Data Engineering', color: 'border-yellow-500 text-yellow-400 bg-yellow-500/5' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 max-w-7xl mx-auto z-20">
      {/* Title */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-wide uppercase text-white">
          About <span className="text-gradient-cyan-violet">Me</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-violet mt-4 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Professional summary & stats */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 flex flex-col gap-6"
        >
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyber-cyan/10 to-transparent pointer-events-none rounded-tr-2xl" />
            
            {/* Profile Photo Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-6 border-b border-white/5">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-cyber-cyan/30 shadow-[0_0_15px_rgba(0,229,255,0.2)] group-hover:border-cyber-cyan/60 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 flex items-center justify-center">
                <img src={profileImg} alt="Ravikiran M S" className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-display font-black text-2xl text-white tracking-wide">Ravikiran M S</h3>
                <p className="text-cyber-cyan text-xs font-semibold uppercase tracking-wider mt-1">AI & Cloud Enthusiast · Software Engineer</p>
                <p className="text-gray-400 text-xs mt-1">Batch of 2027 • CSE Specialization</p>
              </div>
            </div>

            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Brain size={22} className="text-cyber-cyan" />
              Professional Overview
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
              Motivated Computer Science Engineering student (2027 Batch) with a robust portfolio spanning software development engineering (SDE), applied AI/ML, and cloud infrastructure. Seeking remote software engineering internships to design scalable applications and build data-driven solutions.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              I thrive at the intersection of systems infrastructure and software engineering, always focusing on writing secure, auditable code and establishing automated pipelines that ensure swift and safe deliveries.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-center">
              <span className="text-cyber-cyan font-display font-bold text-3xl mb-1">8.73</span>
              <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Current CGPA</span>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-center">
              <span className="text-cyber-violet font-display font-bold text-3xl mb-1">2027</span>
              <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Graduation Year</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Education & Focus Cloud */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 flex flex-col gap-6"
        >
          {/* Education Card */}
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group border border-white/5 flex-1 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyber-violet/10 to-transparent pointer-events-none rounded-tr-2xl" />
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
                <GraduationCap size={22} className="text-cyber-violet" />
                Education
              </h3>
              <div className="border-l-2 border-cyber-violet/30 pl-4 py-1">
                <h4 className="text-white font-semibold text-base">B.E. in Computer Science Engineering</h4>
                <p className="text-cyber-cyan text-sm font-medium mt-1">Nitte Meenakshi Institute of Technology (NMIT)</p>
                <p className="text-gray-400 text-xs mt-1">Bengaluru, Karnataka</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-500">
              Focus on Algorithms, Database Systems, Computer Networks, and Cryptography.
            </div>
          </div>

          {/* Interactive Tag Cloud */}
          <div className="glass-card p-8 rounded-2xl border border-white/5">
            <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
              <Cloud size={20} className="text-cyber-green" />
              Focus Areas
            </h3>
            <div className="flex flex-wrap gap-3">
              {focusAreas.map((tag, idx) => (
                <motion.span
                  key={tag.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wider cursor-default transition-all duration-300 ${tag.color} shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]`}
                >
                  {tag.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
