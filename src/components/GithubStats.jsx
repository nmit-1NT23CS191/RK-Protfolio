import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, GitCommit } from 'lucide-react';
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

// Seeded fallback grid (original implementation)
function generateFallbackGrid() {
  const cols = 35;
  const rows = 7;
  const cells = [];
  const values = [
    'bg-white/5',
    'bg-[#00E5FF]/10',
    'bg-[#00E5FF]/30',
    'bg-[#8B5CF6]/50',
    'bg-[#00FF88]/70',
    'bg-[#00FF88]',
  ];

  for (let i = 0; i < cols * rows; i++) {
    const seed = Math.sin(i) * 10000;
    const val = Math.floor((seed - Math.floor(seed)) * values.length);
    cells.push(values[val]);
  }
  return cells;
}

// Map event count to a color class
function countToColor(count) {
  if (count === 0) return 'bg-white/5';
  if (count <= 2) return 'bg-[#00E5FF]/10';
  if (count <= 4) return 'bg-[#00E5FF]/30';
  if (count <= 6) return 'bg-[#8B5CF6]/50';
  if (count <= 9) return 'bg-[#00FF88]/70';
  return 'bg-[#00FF88]';
}

export default function GithubStats() {
  const [gridCells, setGridCells] = useState(generateFallbackGrid);
  const [stats, setStats] = useState({ commits: 140, repos: 10 });
  const [isRealData, setIsRealData] = useState(false);

  useEffect(() => {
    const username = 'nmit-1NT23CS191';

    async function fetchGitHubData() {
      try {
        // Fetch repo count first so we update it even if there are no recent events
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        let fetchedRepos = 10;
        if (userRes.ok) {
          const userData = await userRes.json();
          fetchedRepos = Math.max(userData.public_repos || 0, 10);
          setStats(prev => ({
            ...prev,
            repos: fetchedRepos
          }));
        }

        // Fetch recent public events (up to 300 via 3 pages) for contribution grid & commits count
        const events = [];
        for (let page = 1; page <= 3; page++) {
          const res = await fetch(
            `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`
          );
          if (!res.ok) break;
          const data = await res.json();
          if (data.length === 0) break;
          events.push(...data);
        }

        if (events.length > 0) {
          // Count push events per day over last 35 weeks (245 days)
          const now = new Date();
          const daysBack = 245;
          const dayCounts = new Array(daysBack).fill(0);

          events.forEach((ev) => {
            if (ev.type === 'PushEvent') {
              const evDate = new Date(ev.created_at);
              const diffMs = now.getTime() - evDate.getTime();
              const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
              if (diffDays >= 0 && diffDays < daysBack) {
                dayCounts[diffDays] += ev.payload?.commits?.length || 1;
              }
            }
          });

          // Build grid (35 cols × 7 rows, column-major like GitHub)
          const cols = 35;
          const rows = 7;
          const cells = [];
          for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
              const dayIndex = col * 7 + row;
              cells.push(countToColor(dayCounts[daysBack - 1 - dayIndex] || 0));
            }
          }

          setGridCells(cells);
          setIsRealData(true);

          const totalPushCommits = events
            .filter((e) => e.type === 'PushEvent')
            .reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0);
          
          setStats({
            commits: Math.max(totalPushCommits, 140),
            repos: fetchedRepos,
          });
        } else {
          // No events found, but profile fetching was successful or fallback is used
          setStats({
            commits: 140,
            repos: fetchedRepos,
          });
        }
      } catch {
        // Fallback: keep seeded grid + default stats
      }
    }

    fetchGitHubData();
  }, []);

  const statItems = [
    {
      label: 'Total Commits',
      value: stats.commits,
      suffix: '+',
      icon: <GitCommit className="text-cyber-cyan" size={24} />
    },
    {
      label: 'Repositories',
      value: stats.repos,
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
        {/* Left Side: GitHub Grid */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <a
                href="https://github.com/nmit-1NT23CS191"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-bold text-lg text-white flex items-center gap-2 hover:text-cyber-cyan transition-colors group"
              >
                <Github size={20} className="text-cyber-cyan group-hover:scale-110 transition-transform" />
                nmit-1NT23CS191 / Contributions
              </a>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${isRealData ? 'text-cyber-green bg-cyber-green/5 border border-cyber-green/30' : 'text-gray-400 bg-white/5 border border-white/10'}`}>
                {isRealData ? 'Live Data' : 'Active Streak'}
              </span>
            </div>
            
            <p className="text-sm text-gray-400 mb-8">
              {isRealData
                ? 'Live contribution data fetched from the GitHub API.'
                : 'Daily code contributions and updates synced across multi-cloud structures.'}
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
          className="lg:col-span-5 flex flex-col justify-between gap-4"
        >
          <div className="grid grid-cols-2 gap-4 h-full">
            {statItems.map((stat) => (
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
          </div>

          <a
            href="https://github.com/nmit-1NT23CS191"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyber-cyan text-white text-sm font-semibold tracking-wide uppercase transition-all duration-300 group"
          >
            <Github size={18} className="text-cyber-cyan group-hover:rotate-12 transition-transform" />
            <span>Visit GitHub Profile</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
