import React from 'react';
import { BioData, SkillCategory } from '../types';
import { SectionHeading } from './SectionHeading';
import { Brain, Database, Code2, Globe, Terminal, Cpu, Layers } from 'lucide-react';

interface AboutProps {
  bio: BioData;
  skills: SkillCategory[];
}

export const About: React.FC<AboutProps> = ({ bio, skills }) => {
  return (
    <section id="about" className="py-24 bg-cyber-dark relative">
      <div className="container mx-auto px-6">
        <SectionHeading title="Professional Profile" subtitle="Overview of technical capabilities and expertise." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bio Card - Large */}
          <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Brain size={120} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal size={24} className="text-cyan-400" />
              About Me
            </h3>
            <p className="text-slate-400 leading-relaxed text-lg mb-6">
              {bio.about}
            </p>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                 <div className="text-cyan-400 font-mono text-sm mb-1">CURRENT ROLE</div>
                 <div className="text-slate-200 font-medium">{bio.role}</div>
               </div>
               <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                 <div className="text-violet-400 font-mono text-sm mb-1">AVAILABILITY</div>
                 <div className="text-slate-200 font-medium">Open for Hire</div>
               </div>
            </div>
          </div>

          {/* Tech Stack Summary */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col justify-center items-center text-center hover:border-violet-500/30 transition-all">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Layers className="text-violet-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Full Stack AI</h3>
            <p className="text-slate-500 text-sm">
              Capable of handling the entire lifecycle from data engineering and model training to frontend deployment.
            </p>
          </div>

          {/* Skills Grid - Dynamic */}
          {skills.map((category, idx) => (
            <div key={idx} className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900/50 transition-colors group">
              <h4 className="text-lg font-semibold text-cyan-100 mb-4 flex items-center gap-2">
                {idx === 0 && <Brain size={18} className="text-cyan-500" />}
                {idx === 1 && <Cpu size={18} className="text-cyan-500" />}
                {idx === 2 && <Globe size={18} className="text-cyan-500" />}
                {idx === 3 && <Code2 size={18} className="text-cyan-500" />}
                {category.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.items.slice(0, 6).map((skill, sIdx) => (
                  <span key={sIdx} className="text-xs px-2 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};