import React from 'react';
import { ProjectItem } from '../types';
import { SectionHeading } from './SectionHeading';
import { Github, ExternalLink, Code, Database } from 'lucide-react';

interface ProjectsProps {
  projects: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-24 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <SectionHeading title="System Modules" subtitle="Deployed intelligence and experimental architectures." />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-all hover:transform hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
              {/* Image Overlay */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent z-20"></div>
              </div>

              <div className="relative p-6 z-30 -mt-12">
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-slate-950/80 backdrop-blur p-2 rounded-lg border border-slate-800 shadow-lg">
                    <Database size={24} className="text-cyan-400" />
                  </div>
                  <div className="flex gap-2">
                    {project.links.github && (
                      <a href={project.links.github} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-cyan-600 transition-colors">
                        <Github size={18} />
                      </a>
                    )}
                    {project.links.demo && (
                      <a href={project.links.demo} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-violet-600 transition-colors">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-slate-800/50 text-cyan-200/70 border border-slate-700/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
