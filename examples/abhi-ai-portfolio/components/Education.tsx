import React from 'react';
import { EducationItem } from '../types';
import { SectionHeading } from './SectionHeading';
import { GraduationCap, Calendar } from 'lucide-react';

interface EducationProps {
  education: EducationItem[];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <section className="py-24 bg-[#020617] relative">
      <div className="container mx-auto px-6">
        <SectionHeading title="Knowledge Base" subtitle="Academic foundation and certifications." />
        
        <div className="max-w-4xl mx-auto grid gap-6">
          {education.map((item, index) => (
            <div key={item.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 shadow-lg shrink-0">
                <GraduationCap size={32} className="text-violet-400" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{item.institution}</h3>
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-900/50 w-fit mt-2 md:mt-0">
                    <Calendar size={12} />
                    {item.period}
                  </div>
                </div>
                <h4 className="text-lg text-slate-300 mb-3">{item.degree}</h4>
                {item.description && (
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};