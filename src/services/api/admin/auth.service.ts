import { apiClient } from '../client';

// Types
export interface AdminLoginRequest {
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    authenticated: boolean;
    token: string;
    message: string;
  };
  timestamp: string;
}

export interface ApiError {
  success: boolean;
  statusCode: number;
  message: string;
  error?: string;
  timestamp: string;
}

// Admin Authentication Service
export const adminAuthService = {
  /**
   * Login admin user
   */
  async login(credentials: AdminLoginRequest): Promise<AdminLoginResponse> {
    try {
      const response = await apiClient.post<AdminLoginResponse>(
        '/api/v1/admin/auth/login',
        credentials
      );
      
      // Store token if login successful
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('admin-token', response.data.data.token);
      }
      
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
   * Logout admin user
   */
  logout(): void {
    localStorage.removeItem('admin-token');
  },

  /**
   * Check if admin is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('admin-token');
  },

  /**
   * Get stored admin token
   */
  getToken(): string | null {
    return localStorage.getItem('admin-token');
  }
};
