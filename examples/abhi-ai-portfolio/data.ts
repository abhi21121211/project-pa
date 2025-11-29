import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  bio: {
    name: "Abhishek Dukare",
    role: "AI Engineer & Full Stack Developer",
    tagline: "Architecting scalable Generative AI solutions and high-performance web systems.",
    about: "I am a results-driven AI Engineer specializing in the transition from prototype to production. I bridge the gap between complex LLM research and reliable software engineering. My focus is on building cost-effective RAG pipelines, optimizing inference latency, and creating intuitive interfaces for autonomous agents.",
    social: {
      github: "https://github.com/abhi21121211",
      linkedin: "https://www.linkedin.com/in/abhishek-dukare/",
      twitter: "https://x.com/Abhi21121211",
      email: "mailto:abhishekdukare689@gmail.com"
    },
    resume: "https://drive.google.com/file/d/1rjTy9Emb8QX9xXWeBGjwQwgGYvUE56F2/view?usp=drive_link"
  },
  skills: [
    {
      category: "Generative AI & LLMs",
      items: ["RAG Architecture", "LangChain & LangGraph", "Prompt Engineering", "Model Fine-tuning (LoRA)", "Vector Databases (Pinecone)", "Gemini & OpenAI APIs"]
    },
    {
      category: "Machine Learning",
      items: ["PyTorch", "TensorFlow", "Computer Vision (YOLOv8)", "NLP", "Scikit-learn", "Predictive Analytics"]
    },
    {
      category: "Full Stack Engineering",
      items: ["React.js", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "Next.js"]
    },
    {
      category: "DevOps & Cloud",
      items: ["Docker", "Kubernetes", "AWS (SageMaker, Lambda)", "CI/CD Pipelines", "Git", "Linux Administration"]
    }
  ],
  experience: [
    {
      id: "1",
      role: "AI Solutions Developer",
      company: "Freelance / Independent",
      period: "2023 - Present",
      description: [
        "Engineered a custom RAG (Retrieval-Augmented Generation) system for legal document analysis, reducing manual review time by 60%.",
        "Developed autonomous agents using LangGraph to automate customer support workflows, handling 500+ interactions daily.",
        "Optimized open-source LLMs (Llama 3, Mistral) for edge deployment, achieving sub-100ms latency on consumer hardware."
      ]
    },
    {
      id: "2",
      role: "Machine Learning Intern",
      company: "Tech Internship",
      period: "2022 - 2023",
      description: [
        "Implemented a computer vision pipeline for quality control using YOLOv8, achieving 98.5% detection accuracy.",
        "Collaborated with senior engineers to migrate on-premise data processing scripts to AWS Lambda, improving scalability.",
        "Conducted data cleaning and preprocessing on datasets exceeding 1TB for predictive maintenance models."
      ]
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Technology (B.Tech) in Computer Science",
      institution: "Pune University (SPPU)",
      period: "2019 - 2023",
      description: "Focused on Artificial Intelligence, Data Structures, and Algorithms. Completed capstone project on 'Real-time Traffic Analysis using Deep Learning'."
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Neural Nexus Agent",
      description: "An advanced autonomous agent capable of breaking down complex user prompts into executable sub-tasks. Features a recursive reasoning loop and tool-calling capabilities.",
      tags: ["GenAI", "LangGraph", "Python", "FastAPI"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
      links: {
        github: "https://github.com/abhi21121211",
        demo: "https://github.com/abhi21121211"
      }
    },
    {
      id: "p2",
      title: "VisionGuard Edge",
      description: "A privacy-first security system that runs object detection locally. Eliminates the need for cloud processing, ensuring data privacy and zero latency.",
      tags: ["Computer Vision", "YOLOv8", "IoT", "PyTorch"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
      links: {
        github: "https://github.com/abhi21121211",
        demo: "https://github.com/abhi21121211"
      }
    },
    {
      id: "p3",
      title: "Enterprise Knowledge Bot",
      description: "A full-stack RAG application allowing users to chat with PDF documentation. Features citation tracking, hallucination safeguards, and a modern React UI.",
      tags: ["React", "RAG", "Vector DB", "Gemini API"],
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop",
      links: {
        github: "https://github.com/abhi21121211",
        demo: "https://abhi-ai-portfolio.web.app"
      }
    },
    {
      id: "p4",
      title: "RoomLoop",
      description: "RoomLoop is a modern AI-powered virtual events and meetups platform featuring real-time chat, live rooms, and an intelligent AI assistant named Ted. It offers seamless user presence, and context-aware AI assistance.",
      tags: ["fullstack"],
      image: "roomloop-dashboard",
      links: {
        github: "https://github.com/abhi21121211/roomloop-client",
        demo: "https://roomloop-client.vercel.app/"
      }
    },
    {
      id: "p5",
      title: "Electon",
      description: "Electone.com, your ultimate e-commerce website for purchasing top-quality electronic gadgets at affordable prices.",
      tags: ["basicweb"],
      image: "electon-home",
      links: {
        github: "https://github.com/thisiskmv/Electon-clone",
        demo: "https://electon.vercel.app/"
      }
    },
    {
      id: "p6",
      title: "Shopclues Clone",
      description: "ShopClues Clone, a meticulously crafted e-commerce platform that brings you the essence of India's leading online shopping website, ShopClues.com.",
      tags: ["basicweb"],
      image: "shopclues-home",
      links: {
        github: "https://github.com/ShubhamRaut187/Shopclues.com-Masai_Unit-5_CW",
        demo: "https://shopclues-clone-w5.netlify.app/"
      }
    },
    {
      id: "p7",
      title: "Bluefly Clone",
      description: "Bluefly.com website clone is a meticulously crafted online fashion retail platform inspired by the popular original.",
      tags: ["basicweb"],
      image: "bluefly-home",
      links: {
        github: "https://github.com/Mzsalmani02/bluefly_clone",
        demo: "https://bluefly-clone-team5.netlify.app/"
      }
    },
    {
      id: "p8",
      title: "Foodrocket",
      description: "It's Responsive Food and Restaurant Website using Bootstrap 5.",
      tags: ["basicweb"],
      image: "foodrocket-home",
      links: {
        github: "https://github.com/abhi21121211/FoodRocket",
        demo: "https://foodrocket-web.netlify.app/"
      }
    },
    {
      id: "p9",
      title: "Portfolio 1",
      description: "I proudly present my skills, accomplishments, and creative journey in the field of development.",
      tags: ["basicweb"],
      image: "portfolio1-home",
      links: {
        github: "https://github.com/abhi21121211/portfolio-1",
        demo: "https://abhishek-dukare-portfolio-1.vercel.app/"
      }
    },
    {
      id: "p10",
      title: "Portfolio 2",
      description: "I proudly present my skills, accomplishments, and creative journey in the field of development.",
      tags: ["basicweb"],
      image: "portfolio2-home",
      links: {
        github: "https://github.com/abhi21121211/Portfolio-2",
        demo: "https://abhishek-dukare-portfolio-2.netlify.app/"
      }
    },
    {
      id: "p11",
      title: "Portfolio 3",
      description: "I proudly present my skills, accomplishments, and creative journey in the field of development.",
      tags: ["basicweb"],
      image: "portfolio-3-home",
      links: {
        github: "https://github.com/abhi21121211/abhi21121211.github.io",
        demo: "https://abhi21121211.github.io/"
      }
    }
  ]
};