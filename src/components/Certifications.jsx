import React from 'react';
import { Award, Briefcase, ExternalLink, Calendar, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: 'Top 15 Finalist',
    issuer: 'Vibe-A-Thon Hackathon 2026',
    date: '2026',
    type: 'Hackathon Award',
    badge: '🏆',
    color: 'border-cyber-cyan text-cyber-cyan shadow-cyber-cyan/10'
  },
  {
    title: 'Associate Cloud Engineer',
    issuer: 'Google Cloud Platform (GCP)',
    date: 'In Progress',
    type: 'Professional Certification',
    badge: '☁️',
    color: 'border-cyber-violet text-cyber-violet shadow-cyber-violet/10'
  },
  {
    title: 'ML Foundation & EDA',
    issuer: 'Infosys Springboard',
    date: '2025',
    type: 'Technical Coursework',
    badge: '📊',
    color: 'border-cyber-green text-cyber-green shadow-cyber-green/10'
  },
  {
    title: 'Java Foundation & UNIX Basics',
    issuer: 'Infosys & Cisco Academy',
    date: '2024',
    type: 'Foundational Coursework',
    badge: '☕',
    color: 'border-orange-500 text-orange-400 shadow-orange-500/10'
  }
];

export default function Certifications() {
  // Double the array to make the infinite scroll smooth
  const carouselItems = [...certifications, ...certifications, ...certifications];

  return (
    <section id="certifications" className="relative py-24 z-20 overflow-hidden bg-cyber-dark/40 border-y border-white/5">
      {/* Title */}
      <div className="flex flex-col items-center mb-16 text-center px-6">
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-wide uppercase text-white">
          Achievements & <span className="text-gradient-cyan-violet">Certifications</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-violet mt-4 rounded-full"></div>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full flex items-center">
        {/* Shadow overlays for smooth fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B1120] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B1120] to-transparent z-10 pointer-events-none" />

        {/* Carousel Track */}
        <div className="flex w-max gap-6 py-4 animate-scroll-track hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
          {carouselItems.map((cert, idx) => (
            <div
              key={idx}
              className={`w-[290px] md:w-[320px] flex-shrink-0 glass-card p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full flex items-center justify-center font-bold text-2xl">
                {cert.badge}
              </div>

              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                {cert.type}
              </span>

              <h3 className="font-display font-bold text-base md:text-lg text-white mt-5 mb-2 leading-snug">
                {cert.title}
              </h3>
              
              <p className="text-sm text-gray-300 font-medium mb-4">
                {cert.issuer}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {cert.date}
                </span>
                <span className="flex items-center gap-1 text-cyber-cyan font-semibold">
                  <CheckCircle size={12} className="text-cyber-green" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind custom animation injected directly inline to guarantee it executes correctly */}
      <style>{`
        @keyframes scroll-track {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-320px * 4 - 24px * 4));
          }
        }
        .animate-scroll-track {
          animation: scroll-track 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
