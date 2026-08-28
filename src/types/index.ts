export interface ProjectDetail {
  description: string[];
  howIBuiltIt: string[];
  results: string[];
  technologies: string[];
}

export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  period?: string; // undefined -> TODO in data file
  featured: boolean;
  tags: string[];
  problem: string;
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
}

export interface SkillGroupData {
  category: string;
  skills: string[];
}
