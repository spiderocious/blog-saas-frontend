import { apiClient } from '../client';

// Types for public blog API
export interface PublicBlog {
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

export interface PublicBlogsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    blogs: PublicBlog[];
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

export interface PublicBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tags?: string[];
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
}

/**
 * Public Blogs Service
 * Handles public blog listing and search functionality
 */
export const publicBlogsService = {
  /**
   * Get public blogs with optional filtering and pagination
   */
  async getBlogs(params: PublicBlogsParams = {}): Promise<PublicBlogsResponse> {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.category) queryParams.append('category', params.category);
      if (params.tags && params.tags.length > 0) {
        params.tags.forEach(tag => queryParams.append('tags', tag));
      }

      const queryString = queryParams.toString();
      const url = `/api/v1/blogs${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiClient.get<PublicBlogsResponse>(url);
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
   * Get blog by slug (for individual blog pages)
   */
  async getBlogBySlug(slug: string): Promise<{
    blog: PublicBlog;
    relatedBlogs: PublicBlog[];
  }> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        statusCode: number;
        message: string;
        data: {
          blog: PublicBlog;
          relatedBlogs: PublicBlog[];
        };
        timestamp: string;
      }>(`/api/v1/blogs/${slug}`);
      
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
