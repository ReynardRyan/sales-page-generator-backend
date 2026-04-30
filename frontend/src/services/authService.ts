import apiClient from '@/lib/axios';
import type { ApiResponse, User } from '@/types';
import type { LoginFormData, RegisterFormData } from '@/features/auth/types/auth.types';

export interface AuthResponse {
  user: User;
  token: string;
}

const authService = {
  async login(data: LoginFormData): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterFormData): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async getMe(): Promise<ApiResponse<User>> {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

export default authService;
