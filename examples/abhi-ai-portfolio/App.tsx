import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { ChatBot } from './components/ChatBot';
import { PortfolioData } from './types';
import { portfolioData } from './data';
import { Terminal } from 'lucide-react';

function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [bootSequence, setBootSequence] = useState<string[]>([]);

  useEffect(() => {
    // Simulate system boot
    const bootSteps = [
      "Initializing kernel...",
      "Loading neural modules...",
      "Mounting file system...",
      "Connecting to satellite uplink...",
      "Decrypting profile data...",
      "System READY."
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < bootSteps.length) {
        setBootSequence(prev => [...prev, bootSteps[step]]);
        step++;
      } else {
        clearInterval(interval);
        // Load data immediately after boot sequence
        setData(portfolioData);
        setTimeout(() => setLoading(false), 800);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-8">
        <div className="max-w-lg w-full">
          <div className="flex items-center gap-2 mb-4 border-b border-green-900 pb-2">
            <Terminal size={20} />
            <span className="font-bold">ABHI_OS v2.5.0 BOOTLOADER</span>
          </div>
          <div className="space-y-2">
            {bootSequence.map((msg, i) => (
              <div key={i} className="opacity-0 animate-fade-in">
                <span className="text-green-700 mr-2">[{new Date().toLocaleTimeString()}]</span>
                {msg}
              </div>
            ))}
            <div className="animate-pulse">_</div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <main className="bg-cyber-darker min-h-screen text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar social={data.bio.social} />
      <Hero bio={data.bio} />
      <About bio={data.bio} skills={data.skills} />
      <Experience experience={data.experience} />
      <Education education={data.education} />
      <Projects projects={data.projects} />
      <Contact social={data.bio.social} />
      <ChatBot data={data} />
    </main>
  );
}

export default App;