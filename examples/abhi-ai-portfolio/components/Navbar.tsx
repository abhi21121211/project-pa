import React, { useState, useEffect } from 'react';
import { Menu, X, Bot } from 'lucide-react';
import { SocialLinks } from '../types';

interface NavbarProps {
  social: SocialLinks;
}

export const Navbar: React.FC<NavbarProps> = ({ social }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['home', 'about', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -300 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'SYSTEM', href: '#about', id: 'about' },
    { name: 'MODULES', href: '#projects', id: 'projects' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-[#020617]/90 backdrop-blur-md border-cyan-900/30 py-3' : 'bg-transparent border-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="group flex items-center gap-2 text-xl font-bold text-white font-mono tracking-tighter">
          <div className="relative flex items-center justify-center w-8 h-8 rounded bg-cyan-950/50 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
             <Bot size={18} className="text-cyan-400 group-hover:animate-pulse" />
          </div>
          <span>ABHI<span className="text-cyan-500">.DEV</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1 bg-slate-900/50 p-1 rounded-full border border-slate-800/50 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`relative px-5 py-2 rounded-full text-xs font-bold font-mono tracking-wider transition-all duration-300 ${
                activeSection === link.id 
                  ? 'text-black bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                  : 'text-slate-400 hover:text-cyan-400'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#020617] border-b border-slate-800 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-4 space-y-2">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-mono font-bold tracking-wider transition-colors ${
                activeSection === link.id 
                  ? 'bg-cyan-950/30 text-cyan-400 border border-cyan-900/50' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
