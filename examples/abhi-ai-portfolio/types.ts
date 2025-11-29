export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface BioData {
  name: string;
  role: string;
  tagline: string;
  about: string;
  social: SocialLinks;
  resume?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  links: ProjectLinks;
}

export interface PortfolioData {
  bio: BioData;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}