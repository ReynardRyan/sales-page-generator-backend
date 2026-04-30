import { useNavigate } from 'react-router-dom';
import { PlusCircle, Zap, FileText, TrendingUp } from 'lucide-react';
import { useSalesPages } from '@/features/sales-page/hooks/useSalesPages';
import { useDeleteSalesPage } from '@/features/sales-page/hooks/useSalesPages';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { SalesPageCard } from '@/features/sales-page/components/SalesPageCard';
import { SalesPageCardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/constants';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading } = useSalesPages({ per_page: 6 });
  const deleteMutation = useDeleteSalesPage();

  const pages = data?.data ?? [];
  const total = data?.meta?.total ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="mt-1 text-slate-500">Here's what's happening with your sales pages.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
            <FileText className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Pages</p>
            <p className="text-2xl font-bold text-slate-900">{total}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
            <Zap className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">AI Generated</p>
            <p className="text-2xl font-bold text-slate-900">{total}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <TrendingUp className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">This Month</p>
            <p className="text-2xl font-bold text-slate-900">{pages.length}</p>
          </div>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent Sales Pages</h2>
          <Button
            size="sm"
            leftIcon={<PlusCircle className="h-4 w-4" />}
            onClick={() => navigate(ROUTES.CREATE)}
          >
            New Page
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => <SalesPageCardSkeleton key={i} />)}
          </div>
        ) : pages.length === 0 ? (
          <EmptyState
            title="No sales pages yet"
            description="Generate your first AI-powered sales page to get started."
            actionLabel="Create Sales Page"
            onAction={() => navigate(ROUTES.CREATE)}
            icon={<Zap className="h-8 w-8 text-slate-400" />}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <SalesPageCard
                key={page.id}
                page={page}
                onDelete={(id) => deleteMutation.mutate(id)}
                isDeleting={deleteMutation.isPending && deleteMutation.variables === page.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
