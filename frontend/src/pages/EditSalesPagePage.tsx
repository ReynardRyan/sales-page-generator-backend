import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useSalesPage, useUpdateSalesPage } from '@/features/sales-page/hooks/useSalesPages';
import { useGenerateSalesPage } from '@/features/sales-page/hooks/useGenerateSalesPage';
import { SalesPageForm } from '@/features/sales-page/components/SalesPageForm';
import { PreviewSkeleton } from '@/components/ui/Skeleton';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { SalesPageFormValues } from '@/features/sales-page/types/salesPage.types';

export function EditSalesPagePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pageId = Number(id);

  const { data, isLoading } = useSalesPage(pageId);
  const updateMutation = useUpdateSalesPage(pageId);
  const regenerateMutation = useGenerateSalesPage();

  if (isLoading) return <PreviewSkeleton />;

  const page = data?.data;
  if (!page) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Sales page not found.</p>
      </div>
    );
  }

  const handleUpdate = (formData: SalesPageFormValues) => {
    updateMutation.mutate(formData);
  };

  const handleRegenerate = (formData: SalesPageFormValues) => {
    regenerateMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Sales Page</h1>
          <p className="text-sm text-slate-500">{page.product_name}</p>
        </div>
      </div>

      <Card>
        <CardHeader
          title="Update Product Information"
          subtitle="Save changes or regenerate the entire page with AI."
          action={
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RefreshCw className="h-4 w-4" />}
              isLoading={regenerateMutation.isPending}
              onClick={() => {
                const values: SalesPageFormValues = {
                  product_name: page.product_name,
                  description: page.description,
                  key_features: page.key_features,
                  target_audience: page.target_audience,
                  price: page.price,
                  unique_selling_points: page.unique_selling_points,
                };
                handleRegenerate(values);
              }}
            >
              Regenerate
            </Button>
          }
        />
        <SalesPageForm
          defaultValues={page}
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel="Save Changes"
        />
      </Card>
    </div>
  );
}
