import apiClient from '@/lib/axios';
import type { ApiResponse, PaginatedResponse, SalesPage, SalesPageFormData } from '@/types';

export interface SalesPageListParams {
  page?: number;
  per_page?: number;
  search?: string;
}

const salesPageService = {
  async getAll(params?: SalesPageListParams): Promise<PaginatedResponse<SalesPage>> {
    const response = await apiClient.get('/sales-pages', { params });
    return response.data;
  },

  async getById(id: number): Promise<ApiResponse<SalesPage>> {
    const response = await apiClient.get(`/sales-pages/${id}`);
    return response.data;
  },

  async generate(data: SalesPageFormData): Promise<ApiResponse<SalesPage>> {
    const response = await apiClient.post('/sales-pages/generate', data);
    return response.data;
  },

  async update(id: number, data: Partial<SalesPageFormData>): Promise<ApiResponse<SalesPage>> {
    const response = await apiClient.put(`/sales-pages/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/sales-pages/${id}`);
  },
};

export default salesPageService;
