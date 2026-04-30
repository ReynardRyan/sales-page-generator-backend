import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SalesPageForm } from '@/features/sales-page/components/SalesPageForm';
import { useGenerateSalesPage } from '@/features/sales-page/hooks/useGenerateSalesPage';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function CreateSalesPagePage() {
  const navigate = useNavigate();
  const generateMutation = useGenerateSalesPage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create Sales Page</h1>
          <p className="text-sm text-slate-500">Fill in your product details to generate an AI-powered sales page.</p>
        </div>
      </div>

      <Card>
        <CardHeader
          title="Product Information"
          subtitle="The more detail you provide, the better the AI output."
        />
        <SalesPageForm
          onSubmit={(data) => generateMutation.mutate(data)}
          isLoading={generateMutation.isPending}
        />
      </Card>
    </div>
  );
}
