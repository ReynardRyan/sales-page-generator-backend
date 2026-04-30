import { useNavigate } from 'react-router-dom';
import { Home, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { APP_NAME } from '@/constants';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-primary-900 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-md">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 backdrop-blur mb-6">
          <Zap className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-8xl font-bold mb-4 text-white/20">404</h1>
        <h2 className="text-2xl font-bold mb-2">{APP_NAME}</h2>
        <p className="text-primary-200 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate('/')}
          size="lg"
          className="bg-white text-slate-900 hover:bg-slate-100"
          leftIcon={<Home className="h-4 w-4" />}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
