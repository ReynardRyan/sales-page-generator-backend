import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import salesPageService, { type SalesPageListParams } from '@/services/salesPageService';
import { QUERY_KEYS } from '@/constants';
import { getApiErrorMessage } from '@/lib/utils';

export function useSalesPages(params?: SalesPageListParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.salesPages, params],
    queryFn: () => salesPageService.getAll(params),
  });
}

export function useSalesPage(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.salesPage(id),
    queryFn: () => salesPageService.getById(id),
    enabled: Boolean(id),
  });
}

export function useDeleteSalesPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => salesPageService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.salesPages });
      toast.success('Sales page deleted.');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateSalesPage(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof salesPageService.update>[1]) =>
      salesPageService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.salesPage(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.salesPages });
      toast.success('Sales page updated!');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
