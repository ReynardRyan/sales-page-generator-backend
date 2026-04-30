import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Zap, User } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from '@/features/auth/hooks/useAuth';
import authService from '@/services/authService';
import { Button } from '@/components/ui/Button';
import { APP_NAME, ROUTES } from '@/constants';

export function Navbar() {
  const { user, clearAuth } = useAuth();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth();
      toast.success('Logged out successfully.');
      navigate(ROUTES.LOGIN);
    },
  });

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-slate-900">{APP_NAME}</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{user?.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => logoutMutation.mutate()}
            isLoading={logoutMutation.isPending}
            leftIcon={<LogOut className="h-4 w-4" />}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
