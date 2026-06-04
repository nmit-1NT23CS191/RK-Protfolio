import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cloud, Brain, Database } from 'lucide-react';
import SkillSphere3D from './SkillSphere3D';
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
  TerraformLogo,
  MachineLearningLogo,
  NLPLogo,
  EDALogo,
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
      { name: 'Python', logo: <PythonLogo size={28} />, desc: 'Scripting, backend and ML integration.' },
      { name: 'Java', logo: <JavaLogo size={28} />, desc: 'Object-oriented logic & data structures.' },
      { name: 'JavaScript', logo: <JavaScriptLogo size={28} />, desc: 'Dynamic logic, SDE & React.' },
      { name: 'HTML & CSS', logo: <HTMLLogo size={28} />, desc: 'Premium responsive design layouts.' },
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: <Cloud className="text-cyber-violet" size={24} />,
    color: 'from-cyber-violet/15 via-cyber-violet/5 to-transparent',
    borderColor: 'hover:border-cyber-violet/30 shadow-cyber-violet/5',
    skills: [
      { name: 'AWS (EC2)', logo: <AWSLogo size={28} />, desc: 'Instances, networking & VPC configurations.' },
      { name: 'GCP', logo: <GCPLogo size={28} />, desc: 'Cloud storage, scaling & environment deployment.' },
      { name: 'Jenkins', logo: <JenkinsLogo size={28} />, desc: 'Automated CI/CD code delivery pipelines.' },
      { name: 'Docker', logo: <DockerLogo size={28} />, desc: 'Container isolation & reproducible builds.' },
      { name: 'SonarQube', logo: <SonarQubeLogo size={28} />, desc: 'Static code auditing & security scans.' },
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
      { name: 'EDA & Analysis', logo: <EDALogo size={28} />, desc: 'Exploratory data analysis & metrics graphing.' },
      { name: 'Prompt Engineering', logo: <PromptLogo size={28} />, desc: 'Instruction optimization & LLM pipelines.' },
    ]
  },
  {
    title: 'Database Management',
    icon: <Database className="text-orange-400" size={24} />,
    color: 'from-orange-400/15 via-orange-400/5 to-transparent',
    borderColor: 'hover:border-orange-400/30 shadow-orange-400/5',
    skills: [
      { name: 'SQL', logo: <SQLLogo size={28} />, desc: 'Query structures, schemas & optimizations.' },
      { name: 'MongoDB', logo: <MongoDBLogo size={28} />, desc: 'NoSQL structures & JSON data pipelines.' },
    ]
  }
];

const containerVariantsLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.06,
      when: "beforeChildren"
    }
  }
};

const containerVariantsRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.06,
      when: "beforeChildren"
    }
  }
};

const containerVariantsUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.06,
      when: "beforeChildren"
    }
  }
};

const containerVariantsScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.06,
      when: "beforeChildren"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 14
    }
  }
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 max-w-7xl mx-auto z-20">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-16 text-center"
      >
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-wide uppercase text-white">
          Technical <span className="text-gradient-cyan-violet">Skills</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-violet mt-4 rounded-full"></div>
      </motion.div>

      {/* 3D Interactive Skill Tag Sphere */}
      <SkillSphere3D />

      {/* Grid of Categories */}
      <div className="space-y-16">
        {skillCategories.map((category, catIdx) => {
          // Define category-specific entrance variants and hover motions
          let containerVariants = containerVariantsLeft;
          let hoverAnim = { y: -8, scale: 1.03 };

          if (category.title.includes('Programming')) {
            containerVariants = containerVariantsLeft;
            hoverAnim = { y: -8, scale: 1.04, boxShadow: '0 0 25px rgba(0,229,255,0.45)' };
          } else if (category.title.includes('Cloud')) {
            containerVariants = containerVariantsRight;
            hoverAnim = { y: -8, rotate: 2, boxShadow: '0 0 25px rgba(139,92,246,0.45)' };
          } else if (category.title.includes('AI')) {
            containerVariants = containerVariantsUp;
            hoverAnim = { y: -8, scale: 1.05, boxShadow: '0 0 25px rgba(0,255,136,0.45)' };
          } else if (category.title.includes('Database')) {
            containerVariants = containerVariantsScale;
            hoverAnim = { y: -8, rotate: -2, scale: 1.02, boxShadow: '0 0 25px rgba(251,146,60,0.45)' };
          }

          return (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-[inset_0_0_8px_rgba(255,255,255,0.05)]">
                  {category.icon}
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* Grid of Individual Skill Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={cardVariants}
                    whileHover={hoverAnim}
                    className={`glass-card p-6 rounded-2xl border border-white/5 bg-gradient-to-br ${category.color} ${category.borderColor} transition-all duration-300 shadow flex flex-col justify-between relative group overflow-hidden`}
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
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
