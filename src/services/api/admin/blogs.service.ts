import { apiClient } from '../client';

// Types
export interface AdminBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readingTime: number;
  isPublished: boolean;
  views: number;
  likes: number;
  seoTitle?: string;
  seoDescription?: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AdminBlogsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    blogs: AdminBlog[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  timestamp: string;
}

export interface AdminBlogsParams {
  page?: number;
  limit?: number;
}

export interface ApiError {
  success: boolean;
  statusCode: number;
  message: string;
  error?: string;
  timestamp: string;
}

// Admin Blogs Service
export const adminBlogsService = {
  /**
   * Get all blogs for admin
   */
  async getBlogs(params: AdminBlogsParams = {}): Promise<AdminBlogsResponse> {
    try {
      const { page = 1, limit = 1000 } = params;
      
      const response = await apiClient.get<AdminBlogsResponse>(
        '/api/v1/admin/blogs',
        {
          params: { page, limit }
        }
      );
      
      return response.data;
    } catch (error: unknown) {
      // Handle API errors
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: ApiError } };
        if (axiosError.response?.data) {
          throw axiosError.response.data;
        }
      }
      
      // Handle network/other errors
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw {
        success: false,
        statusCode: 500,
        message: 'Network error or server unavailable',
        error: errorMessage,
        timestamp: new Date().toISOString()
      } as ApiError;
    }
  },

  /**
   * Get single blog by ID for editing
   */
  async getBlogById(id: string): Promise<AdminBlog> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        statusCode: number;
        message: string;
        data: AdminBlog;
        timestamp: string;
      }>(`/api/v1/admin/blogs/${id}`);
      
      return response.data.data;
    } catch (error: unknown) {
      // Handle API errors
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: ApiError } };
        if (axiosError.response?.data) {
          throw axiosError.response.data;
        }
      }
      
      // Handle network/other errors
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw {
        success: false,
        statusCode: 500,
        message: 'Network error or server unavailable',
        error: errorMessage,
        timestamp: new Date().toISOString()
      } as ApiError;
    }
  },

  /**
   * Update blog by ID
   */
  async updateBlog(id: string, blogData: {
    title: string;
    excerpt: string;
    content: string;
    featuredImage?: string;
    category: string;
    tags: string[];
    author: string;
    isPublished: boolean;
    seoTitle?: string;
    seoDescription?: string;
    publishedAt?: string;
  }): Promise<AdminBlog> {
    try {
      const response = await apiClient.put<{
        success: boolean;
        statusCode: number;
        message: string;
        data: AdminBlog;
        timestamp: string;
      }>(`/api/v1/admin/blogs/${id}`, blogData);
      
      return response.data.data;
    } catch (error: unknown) {
      // Handle API errors
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: ApiError } };
        if (axiosError.response?.data) {
          throw axiosError.response.data;
        }
      }
      
      // Handle network/other errors
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw {
        success: false,
        statusCode: 500,
        message: 'Network error or server unavailable',
        error: errorMessage,
        timestamp: new Date().toISOString()
      } as ApiError;
    }
  },

  /**
   * Delete blog by ID
   */
  async deleteBlog(id: string): Promise<void> {
    try {
      await apiClient.delete(`/api/v1/admin/blogs/${id}`);
    } catch (error: unknown) {
      // Handle API errors
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: ApiError } };
        if (axiosError.response?.data) {
          throw axiosError.response.data;
        }
      }
      
      // Handle network/other errors
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw {
        success: false,
        statusCode: 500,
        message: 'Network error or server unavailable',
        error: errorMessage,
        timestamp: new Date().toISOString()
      } as ApiError;
    }
  },

  /**
   * Create a new blog
   */
  async createBlog(blogData: {
    title: string;
    excerpt: string;
    content: string;
    featuredImage?: string;
    category: string;
    tags: string[];
    author: string;
    isPublished?: boolean;
    seoTitle?: string;
    seoDescription?: string;
    publishedAt?: string;
  }): Promise<AdminBlog> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        statusCode: number;
        message: string;
        data: AdminBlog;
        timestamp: string;
      }>('/api/v1/admin/blogs', blogData);
      
      return response.data.data;
    } catch (error: unknown) {
      // Handle API errors
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: ApiError } };
        if (axiosError.response?.data) {
          throw axiosError.response.data;
        }
      }
      
      // Handle network/other errors
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw {
        success: false,
        statusCode: 500,
        message: 'Network error or server unavailable',
        error: errorMessage,
        timestamp: new Date().toISOString()
      } as ApiError;
    }
  }
};
