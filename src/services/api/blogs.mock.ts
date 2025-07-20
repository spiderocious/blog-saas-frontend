// Mock blog service for development
import { Blog, BlogListResponse, BlogDetailResponse, BlogPartsResponse } from '@/lib/types';

// Mock data generator
const generateMockBlogs = (): Blog[] => [
  {
    id: '1',
    title: 'Building Scalable React Applications with TypeScript',
    subtitle: 'Advanced patterns for enterprise-grade development',
    slug: 'building-scalable-react-applications-typescript',
    content: `
      <h2>Introduction to Scalable React Architecture</h2>
      <p>Building scalable React applications requires careful consideration of architecture, patterns, and tooling. In this comprehensive guide, we'll explore advanced techniques used in enterprise environments.</p>
      
      <h3>Core Principles</h3>
      <ul>
        <li>Component composition over inheritance</li>
        <li>Unidirectional data flow</li>
        <li>Type safety with TypeScript</li>
        <li>Performance optimization strategies</li>
      </ul>
      
      <pre><code class="language-typescript">
interface ComponentProps {
  data: UserData;
  onUpdate: (data: UserData) => void;
  loading?: boolean;
}

const UserComponent: React.FC<ComponentProps> = ({ 
  data, 
  onUpdate, 
  loading = false 
}) => {
  // Component implementation
};
      </code></pre>
      
      <h3>Advanced Patterns</h3>
      <p>We'll cover render props, compound components, and custom hooks that enable code reuse and maintainability at scale.</p>
    `,
    excerpt: 'Learn advanced React patterns and architectural decisions for building scalable, enterprise-grade applications with TypeScript.',
    skills: ['React', 'TypeScript', 'Architecture', 'Performance'],
    category: 'frontend',
    isPart: false,
    publishedAt: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    isPublished: true,
    readingTime: 12,
    views: 2847,
    likes: 134,
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    metaTitle: 'Building Scalable React Applications - DevFeranmi',
    metaDescription: 'Learn advanced React patterns and architectural decisions for building scalable enterprise applications.',
    metaKeywords: ['React', 'TypeScript', 'Scalability', 'Architecture']
  },
  {
    id: '2',
    title: 'Micro-Frontend Architecture Guide',
    subtitle: 'Part 1: Foundation and Strategy',
    slug: 'micro-frontend-architecture-guide-part-1',
    content: `
      <h2>Understanding Micro-Frontend Architecture</h2>
      <p>Micro-frontends extend the concept of microservices to frontend development, enabling teams to work independently on different parts of a web application.</p>
      
      <h3>Why Micro-Frontends?</h3>
      <p>As applications grow, monolithic frontends become increasingly difficult to maintain. Micro-frontends offer solutions to common scaling challenges.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Independent deployments</li>
        <li>Team autonomy</li>
        <li>Technology diversity</li>
        <li>Incremental upgrades</li>
      </ul>
    `,
    excerpt: 'Introduction to micro-frontend concepts and strategies for breaking down monolithic frontend applications.',
    skills: ['Architecture', 'Microservices', 'React', 'Module Federation'],
    category: 'architecture',
    isPart: true,
    partId: 'micro-frontend-series',
    partNumber: 1,
    partTitle: 'Foundation and Strategy',
    publishedAt: '2024-01-20T10:00:00Z',
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-01-20T09:00:00Z',
    isPublished: true,
    readingTime: 8,
    views: 1923,
    likes: 76,
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    metaTitle: 'Micro-Frontend Architecture Guide Part 1 - DevFeranmi',
    metaDescription: 'Learn the foundations of micro-frontend architecture and strategies for implementation.',
    metaKeywords: ['Micro-Frontend', 'Architecture', 'Microservices']
  },
  {
    id: '3',
    title: 'Micro-Frontend Architecture Guide',
    subtitle: 'Part 2: Implementation Strategies',
    slug: 'micro-frontend-architecture-guide-part-2',
    content: `
      <h2>Implementing Micro-Frontend Solutions</h2>
      <p>Now that we understand the foundations, let's explore practical implementation approaches for micro-frontend architecture.</p>
      
      <h3>Implementation Approaches</h3>
      <p>There are several ways to implement micro-frontends, each with its own trade-offs.</p>
    `,
    excerpt: 'Practical implementation approaches and patterns for micro-frontend architecture.',
    skills: ['Architecture', 'Webpack', 'Module Federation', 'React'],
    category: 'architecture',
    isPart: true,
    partId: 'micro-frontend-series',
    partNumber: 2,
    partTitle: 'Implementation Strategies',
    publishedAt: '2024-01-25T10:00:00Z',
    createdAt: '2024-01-25T09:00:00Z',
    updatedAt: '2024-01-25T09:00:00Z',
    isPublished: true,
    readingTime: 15,
    views: 1567,
    likes: 89,
    featuredImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    metaTitle: 'Micro-Frontend Architecture Guide Part 2 - DevFeranmi',
    metaDescription: 'Practical implementation approaches and patterns for micro-frontend architecture.',
    metaKeywords: ['Micro-Frontend', 'Implementation', 'Webpack', 'Module Federation']
  },
  {
    id: '4',
    title: 'Advanced TypeScript Patterns for React Development',
    subtitle: 'Leveraging the type system for better DX',
    slug: 'advanced-typescript-patterns-react',
    content: `
      <h2>Advanced TypeScript in React</h2>
      <p>TypeScript's powerful type system can significantly improve the developer experience when building React applications.</p>
    `,
    excerpt: 'Deep dive into advanced TypeScript patterns that improve React development experience and code quality.',
    skills: ['TypeScript', 'React', 'Design Patterns'],
    category: 'frontend',
    isPart: false,
    publishedAt: '2024-02-01T10:00:00Z',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-01T09:00:00Z',
    isPublished: true,
    readingTime: 10,
    views: 2134,
    likes: 98,
    featuredImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    metaTitle: 'Advanced TypeScript Patterns for React - DevFeranmi',
    metaDescription: 'Learn advanced TypeScript patterns to improve React development experience.',
    metaKeywords: ['TypeScript', 'React', 'Patterns', 'Development']
  },
  {
    id: '5',
    title: 'Career Growth as a Senior Frontend Engineer',
    subtitle: 'Navigating the path from senior to staff engineer',
    slug: 'career-growth-senior-frontend-engineer',
    content: `
      <h2>The Senior Engineer Journey</h2>
      <p>Moving beyond senior engineer requires more than just technical skills. Here's what I've learned in my journey.</p>
    `,
    excerpt: 'Insights on career progression, technical leadership, and growing beyond the senior engineer role.',
    skills: ['Leadership', 'Career', 'Mentoring'],
    category: 'career',
    isPart: false,
    publishedAt: '2024-02-05T10:00:00Z',
    createdAt: '2024-02-05T09:00:00Z',
    updatedAt: '2024-02-05T09:00:00Z',
    isPublished: true,
    readingTime: 7,
    views: 3421,
    likes: 145,
    featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    metaTitle: 'Career Growth as a Senior Frontend Engineer - DevFeranmi',
    metaDescription: 'Navigate your career path from senior to staff engineer with practical insights.',
    metaKeywords: ['Career', 'Leadership', 'Senior Engineer', 'Growth']
  }
];

const MOCK_BLOGS = generateMockBlogs();

// Add delay to simulate network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const blogsMockService = {
  async getBlogs(params?: {
    page?: number;
    limit?: number;
    tag?: string;
    category?: string;
    search?: string;
  }): Promise<BlogListResponse> {
    await delay(500);
    
    let filteredBlogs = [...MOCK_BLOGS];
    
    // Apply filters
    if (params?.tag) {
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.skills.some(skill => skill.toLowerCase().includes(params.tag!.toLowerCase()))
      );
    }
    
    if (params?.category) {
      filteredBlogs = filteredBlogs.filter(blog => blog.category === params.category);
    }
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredBlogs = filteredBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchLower) ||
        blog.content.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by published date (newest first)
    filteredBlogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
    
    return {
      blogs: paginatedBlogs,
      total: filteredBlogs.length,
      page,
      limit,
      hasNext: endIndex < filteredBlogs.length,
      hasPrev: page > 1
    };
  },

  async getBlogBySlug(slug: string): Promise<BlogDetailResponse> {
    await delay(300);
    
    const blog = MOCK_BLOGS.find(b => b.slug === slug);
    if (!blog) {
      throw new Error('Blog not found');
    }

    // Get recommended blogs - unified logic for both regular blogs and parts
    let recommendations: Blog[] = [];
    
    if (blog.isPart && blog.partId) {
      // For part blogs, recommend other parts in the series first, then related by skills
      const otherParts = MOCK_BLOGS
        .filter(b => b.partId === blog.partId && b.id !== blog.id)
        .slice(0, 2);
      
      const relatedBySkills = MOCK_BLOGS
        .filter(b => 
          b.id !== blog.id && 
          !b.partId && // Exclude other series parts
          b.skills.some(skill => blog.skills.includes(skill))
        )
        .slice(0, 3 - otherParts.length);
      
      recommendations = [...otherParts, ...relatedBySkills];
    } else {
      // For regular blogs, recommend by shared skills and category
      const bySkills = MOCK_BLOGS
        .filter(b => 
          b.id !== blog.id && 
          b.skills.some(skill => blog.skills.includes(skill))
        )
        .slice(0, 2);
      
      const byCategory = MOCK_BLOGS
        .filter(b => 
          b.id !== blog.id && 
          b.category === blog.category &&
          !bySkills.some(sb => sb.id === b.id)
        )
        .slice(0, 3 - bySkills.length);
      
      recommendations = [...bySkills, ...byCategory];
    }

    // Get parts if this is a part of a series (optional in unified response)
    const parts = blog.isPart && blog.partId
      ? MOCK_BLOGS.filter(b => b.partId === blog.partId).sort((a, b) => 
          (a.partNumber || 0) - (b.partNumber || 0)
        )
      : undefined;

    return {
      blog,
      recommendations,
      ...(parts && { parts })
    };
  },

  async getBlogParts(partId: string): Promise<BlogPartsResponse> {
    await delay(300);
    
    const parts = MOCK_BLOGS.filter(b => b.partId === partId)
      .sort((a, b) => (a.partNumber || 0) - (b.partNumber || 0));
    
    if (parts.length === 0) {
      throw new Error('Blog series not found');
    }

    const mainBlog = parts[0];
    
    return {
      parts,
      mainBlog: {
        id: mainBlog.id,
        title: mainBlog.title.split(' - Part')[0], // Remove part info from title
        partId,
        totalParts: parts.length
      }
    };
  },

  // Admin function to get a single blog by ID
  async getBlogById(id: string): Promise<Blog> {
    await delay(500);
    
    const blog = MOCK_BLOGS.find(b => b.id === id);
    
    if (!blog) {
      throw new Error('Blog not found');
    }

    return blog;
  }
};