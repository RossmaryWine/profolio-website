export interface ProjectDetail {
  overview: string;
  problem: string;
  architecture: string[];
  implementation: string[];
  challenges: string[];
  keyComponents: { name: string; description: string }[];
  results: string[];
  technologies: string[];
  whatILearned?: string; // omitted (TODO) until supplied — never fabricated
}

export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  period?: string; // undefined -> TODO in data file
  featured: boolean;
  tags: string[];
  problem: string;
  contribution?: string; // undefined -> TODO in data file
  technologies: string[];
  accomplishments: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  github?: string;
  demo?: string;
  detail?: ProjectDetail;
}

export interface Experience {
  company: string;
  title: string;
  location: string;
  dateRange: string;
  description: string;
  accomplishments: string[];
  technologies: string[];
  emphasize?: boolean;
}

export interface SkillGroupData {
  category: string;
  skills: string[];
}
