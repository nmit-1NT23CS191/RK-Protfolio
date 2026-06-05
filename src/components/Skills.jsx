import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cloud, Brain, Database, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  PythonLogo,
  JavaLogo,
  JavaScriptLogo,
  HTMLLogo,
  CSSLogo,
  AWSLogo,
  GCPLogo,
  JenkinsLogo,
  DockerLogo,
  SonarQubeLogo,
  TrivyLogo,
  MachineLearningLogo,
  NLPLogo,
  PromptLogo,
  SQLLogo,
  MongoDBLogo
} from './TechLogos';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <Code className="text-cyber-cyan" size={24} />,
    color: 'from-cyber-cyan/15 via-cyber-cyan/5 to-transparent',
    borderColor: 'hover:border-cyber-cyan/30 shadow-cyber-cyan/5',
    skills: [
      { name: 'Python', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'Scripting, backend and ML integration.' },
      { name: 'Java', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'Object-oriented logic & data structures.' },
      { name: 'JavaScript', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'Dynamic logic, SDE & React.' },
      { name: 'HTML5', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML5" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'Semantic web structure and accessibility.' },
      { name: 'CSS3', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS3" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'Premium responsive design & styling.' },
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: <Cloud className="text-cyber-violet" size={24} />,
    color: 'from-cyber-violet/15 via-cyber-violet/5 to-transparent',
    borderColor: 'hover:border-cyber-violet/30 shadow-cyber-violet/5',
    skills: [
      { name: 'AWS (EC2)', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'Instances, networking & VPC configurations.' },
      { name: 'GCP', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" alt="GCP" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'Cloud storage, scaling & environment deployment.' },
      { name: 'Jenkins', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg" alt="Jenkins" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'Automated CI/CD code delivery pipelines.' },
      { name: 'Docker', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'Container isolation & reproducible builds.' },
      { name: 'SonarQube', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sonarqube/sonarqube-original.svg" alt="SonarQube" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'Static code auditing & security scans.' },
      { name: 'Trivy', logo: <TrivyLogo size={28} />, desc: 'Container security scan definitions.' },
      
    ]
  },
  {
    title: 'AI & Data Integration',
    icon: <Brain className="text-cyber-green" size={24} />,
    color: 'from-cyber-green/15 via-cyber-green/5 to-transparent',
    borderColor: 'hover:border-cyber-green/30 shadow-cyber-green/5',
    skills: [
      { name: 'Machine Learning', logo: <MachineLearningLogo size={28} />, desc: 'Classification models & predictive accuracy.' },
      { name: 'NLP & OCR', logo: <NLPLogo size={28} />, desc: 'Text recognition and text processing engines.' },
      { name: 'Prompt Engineering', logo: <PromptLogo size={28} />, desc: 'Instruction optimization & LLM pipelines.' },
    ]
  },
  {
    title: 'Database Management',
    icon: <Database className="text-orange-400" size={24} />,
    color: 'from-orange-400/15 via-orange-400/5 to-transparent',
    borderColor: 'hover:border-orange-400/30 shadow-orange-400/5',
    skills: [
      { name: 'SQL', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" alt="SQL" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'Query structures, schemas & optimizations.' },
      { name: 'MongoDB', logo: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />, desc: 'NoSQL structures & JSON data pipelines.' },
      { name: 'PostgreSQL', logo: <SQLLogo size={28} />, desc: 'Advanced relational DB with ACID compliance.' }
    ]
  }
];

const allSkills = skillCategories.flatMap(category => 
  category.skills.map(skill => ({
    ...skill,
    categoryTitle: category.title,
    color: category.color,
    borderColor: category.borderColor,
  }))
);

const getHoverAnim = (categoryTitle) => {
  if (categoryTitle.includes('Programming')) {
    return { y: -8, scale: 1.04, boxShadow: '0 0 25px rgba(0,229,255,0.45)' };
  } else if (categoryTitle.includes('Cloud')) {
    return { y: -8, rotate: 2, boxShadow: '0 0 25px rgba(139,92,246,0.45)' };
  } else if (categoryTitle.includes('AI')) {
    return { y: -8, scale: 1.05, boxShadow: '0 0 25px rgba(0,255,136,0.45)' };
  } else if (categoryTitle.includes('Database')) {
    return { y: -8, rotate: -2, scale: 1.02, boxShadow: '0 0 25px rgba(251,146,60,0.45)' };
  }
  return { y: -8, scale: 1.03 };
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  // Responsive screen checker
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter skills based on category
  const filteredSkills = React.useMemo(() => {
    if (activeCategory === 'All') return allSkills;
    return allSkills.filter(skill => skill.categoryTitle === activeCategory);
  }, [activeCategory]);

  // Center the active card initially when skills list changes
  React.useEffect(() => {
    setActiveIndex(Math.floor(filteredSkills.length / 2));
  }, [filteredSkills]);

  const handlePrev = React.useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? filteredSkills.length - 1 : prev - 1));
  }, [filteredSkills.length]);

  const handleNext = React.useCallback(() => {
    setActiveIndex((prev) => (prev === filteredSkills.length - 1 ? 0 : prev + 1));
  }, [filteredSkills.length]);

  // Auto-play carousel
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const cardWidth = isMobile ? 260 : 320;
  const cardHeight = isMobile ? 180 : 200;
  const xSpacing = isMobile ? 70 : 120;

  return (
    <section id="skills" className="relative py-24 px-6 max-w-7xl mx-auto z-20 overflow-visible" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-10 text-center"
      >
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-wide uppercase text-white">
          Technical <span className="text-gradient-cyan-violet">Skills</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-violet mt-4 rounded-full"></div>
      </motion.div>

      {/* Category Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-3xl mx-auto px-2 z-30 overflow-x-auto scrollbar-hide">
        {[
          { id: 'All', label: 'All Skills' },
          { id: 'Programming Languages', label: 'Languages' },
          { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
          { id: 'AI & Data Integration', label: 'AI & Data' },
          { id: 'Database Management', label: 'Databases' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-full font-display font-medium text-xs md:text-sm transition-all duration-300 border backdrop-blur-md active:scale-95 shadow-md ${
              activeCategory === tab.id
                ? 'bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3D Coverflow Slider Viewport */}
      <div className="relative flex flex-col items-center justify-center w-full select-none">
        {/* Slider Row container positioning arrows on edges */}
        <div 
          className="relative flex items-center justify-center w-full max-w-6xl mx-auto px-4 md:px-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-[#0B1120]/60 backdrop-blur-md text-white flex items-center justify-center hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.1)] active:scale-95 z-50 cursor-pointer"
            aria-label="Previous skill"
          >
            <ChevronLeft size={isMobile ? 20 : 24} />
          </button>

          {/* Perspective Viewport Wrapper */}
          <div 
            className="relative flex items-center justify-center w-full overflow-visible h-[200px] md:h-[260px] mx-10 md:mx-16"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {/* Cards Track Container */}
            <div 
              className="relative flex items-center justify-center w-full h-full overflow-visible"
              style={{ transformStyle: "preserve-3d" }}
            >
              {filteredSkills.map((skill, idx) => {
                const offset = idx - activeIndex;
                const absOffset = Math.abs(offset);
                const isActive = idx === activeIndex;
                
                // Only render visible cards near the active index to keep layout clean
                const isVisible = absOffset <= (isMobile ? 1 : 2);
                if (!isVisible) return null;

                const xOffset = offset * xSpacing;
                const rotateY = offset * -25;
                const translateZ = absOffset * -150;
                const scale = isActive ? 1.0 : 0.8;
                const opacity = isActive ? 1.0 : (absOffset === 1 ? 0.5 : 0.15);
                const zIndex = 30 - absOffset;
                const hoverAnim = getHoverAnim(skill.categoryTitle);

                return (
                  <motion.div
                    key={skill.name}
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      transformStyle: "preserve-3d",
                      pointerEvents: isActive ? 'auto' : (absOffset === 1 ? 'auto' : 'none'),
                      cursor: isActive ? 'default' : 'pointer',
                      zIndex: zIndex,
                    }}
                    animate={{
                      x: xOffset,
                      scale: scale,
                      opacity: opacity,
                      rotateY: rotateY,
                      z: translateZ,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, info) => {
                      const threshold = 50;
                      if (info.offset.x < -threshold) {
                        handleNext();
                      } else if (info.offset.x > threshold) {
                        handlePrev();
                      }
                    }}
                    onClick={() => {
                      if (!isActive) {
                        setActiveIndex(idx);
                      }
                    }}
                    whileHover={isActive ? hoverAnim : {}}
                    className={`absolute glass-card p-6 rounded-2xl border border-white/5 bg-gradient-to-br ${skill.color} ${skill.borderColor} transition-all duration-300 shadow flex flex-col justify-between relative group overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-colors pointer-events-none" />
                    
                    <div>
                      {/* Card Header (Icon Logo Component) */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shadow-[inset_0_0_6px_rgba(255,255,255,0.05)] border border-white/10 group-hover:scale-105 transition-transform">
                          {skill.logo}
                        </div>
                      </div>

                      {/* Skill Title */}
                      <h4 className="font-display font-bold text-base text-white tracking-wide mb-2 group-hover:text-cyber-cyan transition-colors">
                        {skill.name}
                      </h4>
                      
                      {/* Skill Description */}
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {skill.desc}
                      </p>
                    </div>
                    
                    {/* Subtle Accent Glow Indicator at the bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] opacity-20 group-hover:opacity-60 transition-opacity bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-green" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-[#0B1120]/60 backdrop-blur-md text-white flex items-center justify-center hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.1)] active:scale-95 z-50 cursor-pointer"
            aria-label="Next skill"
          >
            <ChevronRight size={isMobile ? 20 : 24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8 z-40">
          {filteredSkills.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex 
                  ? 'bg-cyber-cyan w-6 shadow-[0_0_8px_rgba(0,229,255,0.8)]' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to skill slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
