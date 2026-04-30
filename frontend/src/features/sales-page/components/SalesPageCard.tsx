import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2, Calendar } from 'lucide-react';
import type { SalesPage } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate, truncate } from '@/lib/utils';
import { ROUTES } from '@/constants';

interface SalesPageCardProps {
  page: SalesPage;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export function SalesPageCard({ page, onDelete, isDeleting }: SalesPageCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{page.product_name}</h3>
          {page.headline && (
            <p className="mt-1 text-sm text-slate-500 line-clamp-2">
              {truncate(page.headline, 80)}
            </p>
          )}
        </div>
        <Badge variant="success" className="ml-2 shrink-0">Generated</Badge>
      </div>

      <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
        <Calendar className="h-3 w-3" />
        {formatDate(page.created_at)}
      </p>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          leftIcon={<Eye className="h-3.5 w-3.5" />}
          onClick={() => navigate(ROUTES.PREVIEW(page.id))}
        >
          View
        </Button>
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<Edit className="h-3.5 w-3.5" />}
          onClick={() => navigate(ROUTES.EDIT(page.id))}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<Trash2 className="h-3.5 w-3.5 text-red-400" />}
          onClick={() => onDelete(page.id)}
          isLoading={isDeleting}
          className="ml-auto text-red-500 hover:bg-red-50"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
