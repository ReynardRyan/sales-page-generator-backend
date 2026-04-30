import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle } from 'lucide-react';
import { useSalesPages, useDeleteSalesPage } from '@/features/sales-page/hooks/useSalesPages';
import { SalesPageCard } from '@/features/sales-page/components/SalesPageCard';
import { SalesPageCardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';

export function HistoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSalesPages({ page, per_page: 9, search });
  const deleteMutation = useDeleteSalesPage();

  const pages = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sales Pages History</h1>
          <p className="mt-1 text-slate-500">
            {meta?.total ?? 0} total pages generated
          </p>
        </div>
        <Button
          leftIcon={<PlusCircle className="h-4 w-4" />}
          onClick={() => navigate(ROUTES.CREATE)}
        >
          New Page
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => <SalesPageCardSkeleton key={i} />)}
        </div>
      ) : pages.length === 0 ? (
        <EmptyState
          title={search ? 'No results found' : 'No sales pages yet'}
          description={
            search
              ? `No pages match "${search}". Try a different search term.`
              : 'Create your first AI-powered sales page.'
          }
          actionLabel={!search ? 'Create Sales Page' : undefined}
          onAction={!search ? () => navigate(ROUTES.CREATE) : undefined}
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((p) => (
              <SalesPageCard
                key={p.id}
                page={p}
                onDelete={(id) => deleteMutation.mutate(id)}
                isDeleting={deleteMutation.isPending && deleteMutation.variables === p.id}
              />
            ))}
          </div>

          {meta && meta.last_page > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-slate-500">
                Page {meta.current_page} of {meta.last_page}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === meta.last_page}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
