// Production blog service
import { apiClient } from './client';
import { BlogListResponse, BlogDetailResponse, BlogPartsResponse, CreateBlogRequest, Blog } from '@/lib/types';

export const blogsService = {
  async getBlogs(params?: {
    page?: number;
    limit?: number;
    tag?: string;
    category?: string;
    search?: string;
  }): Promise<BlogListResponse> {
    const response = await apiClient.get('/api/blogs', { params });
    return response.data;
  },

  async getBlogBySlug(slug: string): Promise<BlogDetailResponse> {
    const response = await apiClient.get(`/api/blogs/${slug}`);
    return response.data;
  },

  async getBlogParts(partId: string): Promise<BlogPartsResponse> {
    const response = await apiClient.get(`/api/blogs/parts/${partId}`);
    return response.data;
  },

  // Admin endpoints
  async getAdminBlogs(): Promise<{ blogs: Blog[]; drafts: Blog[]; total: number }> {
    const response = await apiClient.get('/api/admin/blogs');
    return response.data;
  },

  async createBlog(data: CreateBlogRequest): Promise<Blog> {
    const response = await apiClient.post('/api/admin/blogs', data);
    return response.data;
  },

  async updateBlog(id: string, data: Partial<CreateBlogRequest>): Promise<Blog> {
    const response = await apiClient.put(`/api/admin/blogs/${id}`, data);
    return response.data;
  },

  async deleteBlog(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/blogs/${id}`);
  },

  // Get single blog by ID for editing
  async getBlogById(id: string): Promise<Blog> {
    const response = await apiClient.get(`/api/admin/blogs/${id}`);
    return response.data;
  }
};