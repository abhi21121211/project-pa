import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 relative inline-block">
        <span className="relative z-10">{title}</span>
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"></span>
      </h2>
      {subtitle && (
        <p className="text-slate-400 max-w-2xl mx-auto mt-4">{subtitle}</p>
      )}
    </div>
  );
};
