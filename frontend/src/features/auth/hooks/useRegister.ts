import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '@/services/authService';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { RegisterFormData } from '@/features/auth/types/auth.types';
import { getApiErrorMessage } from '@/lib/utils';
import { ROUTES } from '@/constants';

export function useRegister() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: RegisterFormData) => authService.register(data),
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.token);
      toast.success('Account created successfully!');
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
