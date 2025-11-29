import React from 'react';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { SocialLinks } from '../types';

interface ContactProps {
  social: SocialLinks;
}

export const Contact: React.FC<ContactProps> = ({ social }) => {
  return (
    <section id="contact" className="py-24 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Initialize Handshake</h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-12 text-lg">
          Ready to collaborate on next-generation AI systems? Signal strength is high.
        </p>
        
        <div className="flex justify-center gap-6 mb-16">
          {social.email && (
            <a href={social.email} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 group">
              <Mail size={28} className="group-hover:animate-pulse" />
            </a>
          )}
          {social.github && (
            <a href={social.github} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-white/50 hover:-translate-y-1 transition-all duration-300">
              <Github size={28} />
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300">
              <Linkedin size={28} />
            </a>
          )}
          {social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-sky-500/50 hover:-translate-y-1 transition-all duration-300">
              <Twitter size={28} />
            </a>
          )}
        </div>
        
        <div className="border-t border-slate-900 pt-8">
          <p className="text-slate-600 font-mono text-sm">
            &copy; {new Date().getFullYear()} ABHI.SYSTEMS // ALL_RIGHTS_RESERVED
          </p>
        </div>
      </div>
    </section>
  );
};
