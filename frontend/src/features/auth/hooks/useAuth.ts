import { useAuthStore } from '@/features/auth/store/authStore';

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    clearAuth,
  };
}
