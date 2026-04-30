import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import salesPageService from '@/services/salesPageService';
import type { SalesPageFormData } from '@/types';
import { QUERY_KEYS, ROUTES } from '@/constants';
import { getApiErrorMessage } from '@/lib/utils';

export function useGenerateSalesPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SalesPageFormData) => salesPageService.generate(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.salesPages });
      toast.success('Sales page generated!');
      navigate(ROUTES.PREVIEW(response.data.id));
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
