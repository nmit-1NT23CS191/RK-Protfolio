import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, GitCommit, Award, HardDrive } from 'lucide-react';
import { Github } from './Icons';

// Count-up helper component
function CountUp({ end, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function GithubStats() {
  // Generate random data for contribution squares
  const cols = 35; // 35 weeks
  const rows = 7;  // 7 days
  const gridCells = [];

  // A seeded pseudorandom color selector to make it consistent across mounts
  const getContributionColor = (index) => {
    const values = [
      'bg-white/5', // empty
      'bg-[#00E5FF]/10', // very light cyan
      'bg-[#00E5FF]/30', // light cyan
      'bg-[#8B5CF6]/50', // medium violet
      'bg-[#00FF88]/70', // heavy green
      'bg-[#00FF88]',    // full neon green
    ];
    // Seeded selection
    const seed = Math.sin(index) * 10000;
    const val = Math.floor((seed - Math.floor(seed)) * values.length);
    return values[val];
  };

  for (let i = 0; i < cols * rows; i++) {
    gridCells.push(getContributionColor(i));
  }

  const statItems = [
    {
      label: 'Total Commits',
      value: 140,
      suffix: '+',
      icon: <GitCommit className="text-cyber-cyan" size={24} />
    },
    {
      label: 'Repositories',
      value: 10,
      suffix: '+',
      icon: <GitPullRequest className="text-cyber-violet" size={24} />
    },
     
     
  ];

  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto z-20">
      {/* Title */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-wide uppercase text-white">
          Coding Activity & <span className="text-gradient-cyan-violet">Stats</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-violet mt-4 rounded-full"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Mock GitHub Grid */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Github size={20} className="text-cyber-cyan animate-pulse" />
                nmit-1NT23CS191 / Contributions
              </h3>
              <span className="text-xs text-cyber-green font-semibold bg-cyber-green/5 border border-cyber-green/30 px-2 py-0.5 rounded">
                Active Streak
              </span>
            </div>
            
            <p className="text-sm text-gray-400 mb-8">
              Daily code contributions and updates synced across multi-cloud structures.
            </p>

            {/* Grid Container */}
            <div className="overflow-x-auto no-scrollbar p-1 bg-black/20 rounded-xl border border-white/5">
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[500px]">
                {gridCells.map((colorClass, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.3, zIndex: 10 }}
                    className={`w-3.5 h-3.5 rounded-[3px] ${colorClass} transition-colors duration-200 cursor-pointer`}
                    title="Code Commits"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Graph Legend */}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-6 pt-4 border-t border-white/5">
            <span>Less</span>
            <div className="flex gap-1.5 items-center">
              <div className="w-3 h-3 rounded-[2px] bg-white/5" />
              <div className="w-3 h-3 rounded-[2px] bg-[#00E5FF]/10" />
              <div className="w-3 h-3 rounded-[2px] bg-[#00E5FF]/30" />
              <div className="w-3 h-3 rounded-[2px] bg-[#8B5CF6]/50" />
              <div className="w-3 h-3 rounded-[2px] bg-[#00FF88]" />
            </div>
            <span>More</span>
          </div>
        </motion.div>

        {/* Right Side: Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 grid grid-cols-2 gap-4"
        >
          {statItems.map((stat, idx) => (
            <div
              key={stat.label}
              className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                {stat.icon}
              </div>
              <div className="mt-8">
                <span className="font-display font-black text-3xl text-white">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </span>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
