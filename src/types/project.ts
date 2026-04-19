export interface ProjectCaseStudy {
  title: string;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  category: string;
  featured?: boolean;
  comingSoon?: boolean;
  problem: string;
  solution: string;
  architecture: string;
  keyFeatures: string[];
  challenges: string[];
  outcome: string;
  techStack: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    deployment?: string[];
  };
}
