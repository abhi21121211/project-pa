import React from 'react';
import { ExperienceItem } from '../types';
import { SectionHeading } from './SectionHeading';
import { Briefcase, Calendar, Play } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Execution Log" subtitle="Chronological record of professional deployments." />
        
        <div className="max-w-4xl mx-auto">
          {experience.map((job, index) => (
            <div key={job.id} className="mb-12 relative pl-8 md:pl-0">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-slate-800 transform -translate-x-1/2"></div>
              
              <div className={`md:flex items-start justify-between ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Date Badge */}
                <div className={`hidden md:flex w-[calc(50%-2rem)] items-center ${index % 2 === 1 ? 'justify-start' : 'justify-end'}`}>
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-sm shadow-lg">
                     <Calendar size={14} />
                     {job.period}
                   </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] border-4 border-slate-950 transform md:-translate-x-1/2 mt-6 z-10"></div>

                {/* Content Card */}
                <div className="md:w-[calc(50%-2rem)] relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
                  <div className="relative bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                    
                    <div className="md:hidden text-cyan-400 text-xs font-mono mb-2 flex items-center gap-2">
                      <Calendar size={12} /> {job.period}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                    <div className="text-slate-400 text-sm mb-4 flex items-center gap-2">
                      <Briefcase size={14} />
                      {job.company}
                    </div>
                    
                    <ul className="space-y-3">
                      {job.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed group/item">
                          <Play size={10} className="mt-1.5 text-cyan-600 group-hover/item:text-cyan-400 transition-colors" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
