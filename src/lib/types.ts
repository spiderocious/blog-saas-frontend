// Core type definitions for the blog platform

export interface Blog {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content: string;
  excerpt: string;
  
  // SEO & Meta
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  
  // Content Organization
  skills: string[];
  tags?: string[];
  category: 'frontend' | 'backend' | 'devops' | 'architecture' | 'tutorial' | 'opinion' | 'career';
  
  // Multi-part Support
  isPart: boolean;
  partId?: string;
  partNumber?: number;
  partTitle?: string;
  
  // Media
  featuredImage?: string;
  images?: string[];
  videos?: string[];
  
  // Publishing
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  
  // Analytics
  readingTime: number;
  views?: number;
  likes?: number;
  author?: string;
}

export interface BlogSeries {
  partId: string;
  title: string;
  description: string;
  totalParts: number;
  parts: Blog[];
}

export interface CreateBlogRequest {
  title: string;
  subtitle?: string;
  content: string;
  skills: string[];
  category: string;
  isPart: boolean;
  partId?: string;
  partNumber?: number;
  partTitle?: string;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  featuredImage?: string;
  isPublished?: boolean;
}

export interface BlogListResponse {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface BlogDetailResponse {
  blog: Blog;
  recommendations: Blog[];
  parts?: Blog[];
}

export interface BlogPartsResponse {
  parts: Blog[];
  mainBlog: {
    id: string;
    title: string;
    partId: string;
    totalParts: number;
  };
}

export interface AuthResponse {
  valid: boolean;
  message: string;
}

// Skill categories for filtering
export const SKILL_CATEGORIES = {
  frontend: ['React', 'TypeScript', 'Next.js', 'Vue', 'Angular', 'Svelte', 'CSS', 'HTML', 'JavaScript'],
  backend: ['Node.js', 'Python', 'Java', 'Go', 'Rust', 'C#', 'PHP', 'Ruby', 'Express', 'FastAPI'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'CI/CD', 'Terraform', 'Jenkins'],
  database: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Supabase', 'Firebase'],
  tools: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest', 'Cypress'],
  concepts: ['Architecture', 'Performance', 'Security', 'Testing', 'Design Patterns', 'Microservices']
} as const;

export const BLOG_CATEGORIES = [
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'devops', label: 'DevOps & Infrastructure' },
  { value: 'architecture', label: 'Software Architecture' },
  { value: 'tutorial', label: 'Tutorials & Guides' },
  { value: 'opinion', label: 'Opinion & Analysis' },
  { value: 'career', label: 'Career Development' }
] as const;