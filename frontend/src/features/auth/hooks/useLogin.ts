import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '@/services/authService';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { LoginFormData } from '@/features/auth/types/auth.types';
import { getApiErrorMessage } from '@/lib/utils';
import { ROUTES } from '@/constants';

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.token);
      toast.success('Welcome back!');
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
