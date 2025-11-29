import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { ChatMessage, PortfolioData } from '../types';
import { getChatResponse, setSystemContext } from '../services/geminiService';

interface ChatBotProps {
  data: PortfolioData;
}

export const ChatBot: React.FC<ChatBotProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Systems Online. I am Abhi's Digital Twin. Query me about his tech stack or projects.", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Context with Data
  useEffect(() => {
    if (data) {
      const context = `
        You are "Abhi's Digital Twin", an AI embodied in Abhi's portfolio.
        Goal: Impress visitors with Abhi's skills as an AI Engineer.
        
        BIO: ${data.bio.name}, ${data.bio.role}. ${data.bio.about}
        
        SKILLS: ${data.skills.map(c => `${c.category}: ${c.items.join(', ')}`).join('; ')}
        
        EXPERIENCE: ${data.experience.map(e => `${e.role} at ${e.company} (${e.period}): ${e.description.join(' ')}`).join('; ')}

        EDUCATION: ${data.education.map(e => `${e.degree} from ${e.institution} (${e.period})`).join('; ')}
        
        PROJECTS: ${data.projects.map(p => `${p.title}: ${p.description} [Tags: ${p.tags.join(', ')}]`).join('; ')}
        
        RESUME LINK: ${data.bio.resume}
        
        Style: Concise, tech-savvy, professional yet enthusiastic.
        If asked about contact, provide: ${data.bio.social.email || 'the contact form'}.
        If asked about resume, direct them to the resume button or provide the link.
      `;
      setSystemContext(context);
    }
  }, [data]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isMinimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await getChatResponse(inputValue);
    
    const botMessage: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-110 transition-all z-50 group"
      >
        <Bot size={28} className="group-hover:animate-pulse" />
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-72 bg-slate-900 border border-cyan-500/30 rounded-lg shadow-2xl overflow-hidden animate-fade-in">
        <div className="p-3 bg-slate-950 flex items-center justify-between cursor-pointer" onClick={() => setIsMinimized(false)}>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            ABHI_AI_ASSISTANT
          </div>
          <div className="flex items-center gap-2 text-slate-400">
             <Maximize2 size={14} />
             <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}><X size={14} /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-slate-950 border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden animate-slide-up backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-cyan-950/50 flex items-center justify-center border border-cyan-500/30">
            <Bot size={18} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="font-bold text-slate-200 text-sm font-mono">ABHI_AI_TWIN</h3>
            <p className="text-xs text-cyan-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(true)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded"><Minimize2 size={16} /></button>
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded"><X size={16} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-cyan-900/30 text-cyan-100 border border-cyan-800/50' 
                : 'bg-slate-900 text-slate-300 border border-slate-800'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-cyan-500" />
              <span className="text-xs text-slate-500 font-mono">PROCESSING_QUERY...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-900/50 border-t border-slate-800 shrink-0">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Send a command..."
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 placeholder-slate-600 font-mono text-sm transition-all"
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-cyan-500 hover:text-cyan-400 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};