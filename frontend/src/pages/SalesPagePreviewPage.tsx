import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useSalesPage, useDeleteSalesPage } from '@/features/sales-page/hooks/useSalesPages';
import { SalesPagePreview } from '@/features/sales-page/components/SalesPagePreview';
import { PreviewSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';

export function SalesPagePreviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pageId = Number(id);

  const { data, isLoading, error } = useSalesPage(pageId);
  const deleteMutation = useDeleteSalesPage();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PreviewSkeleton />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Sales page not found.</p>
        <Button className="mt-4" onClick={() => navigate(ROUTES.HISTORY)}>
          Back to History
        </Button>
      </div>
    );
  }

  const page = data.data;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this sales page?')) {
      deleteMutation.mutate(pageId, {
        onSuccess: () => navigate(ROUTES.HISTORY),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h2 className="text-sm font-semibold text-slate-700 truncate hidden sm:block">
          {page.product_name}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Edit className="h-3.5 w-3.5" />}
            onClick={() => navigate(ROUTES.EDIT(pageId))}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<Trash2 className="h-3.5 w-3.5 text-red-400" />}
            onClick={handleDelete}
            isLoading={deleteMutation.isPending}
            className="text-red-500 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <SalesPagePreview page={page} />
      </div>
    </div>
  );
}
