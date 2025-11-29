import React, { useEffect, useState, useRef } from 'react';
import { BioData } from '../types';
import { Cpu, ChevronDown, Terminal as TerminalIcon, FileText } from 'lucide-react';

interface HeroProps {
  bio: BioData;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export const Hero: React.FC<HeroProps> = ({ bio }) => {
  const [text, setText] = useState('');
  const fullText = bio.tagline;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [fullText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    // Reduced particle count for cleaner look
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    const connectionDistance = 150;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const isNode = Math.random() > 0.8;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: isNode ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.5,
          color: isNode ? '#06b6d4' : '#64748b'
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 250) {
          const force = (250 - distance) / 250;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 1.5;
          p.y += Math.sin(angle) * force * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#020617]">
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent h-32 bottom-0"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Status Indicator - Recruiter Signal */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-950/30 border border-green-500/30 backdrop-blur-sm text-green-400 text-xs font-mono font-bold tracking-wider animate-fade-in">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              AVAILABLE FOR HIRE
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-4 animate-slide-up">
              {bio.name}
              <span className="text-cyan-500">.AI</span>
            </h1>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-8"></div>
            <h2 className="text-2xl md:text-3xl text-slate-300 font-light animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {bio.role}
            </h2>
          </div>

          <div className="h-20 flex items-start justify-center mb-10">
            <p className="text-lg text-cyan-100/70 font-mono animate-slide-up max-w-2xl text-center leading-relaxed" style={{ animationDelay: '0.2s' }}>
              <span className="text-cyan-500 mr-2">$</span>
              {text}
              <span className="animate-pulse inline-block w-2 h-5 bg-cyan-500 ml-1 align-middle"></span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {bio.resume && (
              <a 
                href={bio.resume}
                target="_blank"
                rel="noopener noreferrer" 
                className="group relative px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded overflow-hidden transition-all w-48 text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] hover:animate-[shimmer_1.5s_infinite]"></div>
                <FileText size={18} />
                <span className="font-bold tracking-wide">RESUME</span>
              </a>
            )}

            <a 
              href="#projects" 
              className="px-8 py-3 rounded border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 font-mono transition-all hover:bg-cyan-500/10 w-48 text-center flex items-center justify-center gap-2"
            >
              <Cpu size={18} />
              PROJECTS
            </a>
            
            <a 
              href="#contact" 
              className="px-8 py-3 rounded border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 font-mono transition-all hover:bg-slate-800/50 w-48 text-center flex items-center justify-center gap-2"
            >
              <TerminalIcon size={18} />
              CONTACT
            </a>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float text-slate-500 hover:text-cyan-400 transition-colors">
        <ChevronDown size={24} />
      </a>
    </section>
  );
};