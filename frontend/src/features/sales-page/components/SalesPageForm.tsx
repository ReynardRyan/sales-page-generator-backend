import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle, Trash2, Sparkles } from 'lucide-react';
import type { SalesPageFormValues } from '@/features/sales-page/types/salesPage.types';
import { salesPageFormSchema } from '@/features/sales-page/types/salesPage.types';
import type { SalesPage } from '@/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

// Internal form shape: wrap string features as objects for RHF useFieldArray
const internalSchema = salesPageFormSchema.extend({
  key_features: z
    .array(z.object({ value: z.string().min(1, 'Feature cannot be empty') }))
    .min(1, 'Add at least one feature')
    .max(10, 'Maximum 10 features allowed'),
});

type InternalFormValues = z.infer<typeof internalSchema>;

interface SalesPageFormProps {
  defaultValues?: Partial<SalesPage>;
  onSubmit: (data: SalesPageFormValues) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function SalesPageForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  submitLabel = 'Generate Sales Page',
}: SalesPageFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InternalFormValues>({
    resolver: zodResolver(internalSchema),
    defaultValues: {
      product_name: defaultValues?.product_name ?? '',
      description: defaultValues?.description ?? '',
      key_features: defaultValues?.key_features?.length
        ? defaultValues.key_features.map((v) => ({ value: v }))
        : [{ value: '' }],
      target_audience: defaultValues?.target_audience ?? '',
      price: defaultValues?.price ?? '',
      unique_selling_points: defaultValues?.unique_selling_points ?? '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'key_features',
  });

  const handleFormSubmit = (data: InternalFormValues) => {
    onSubmit({
      ...data,
      key_features: data.key_features.map((f) => f.value),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Input
        label="Product Name"
        placeholder="e.g. AI Analytics Dashboard"
        error={errors.product_name?.message}
        required
        {...register('product_name')}
      />

      <Textarea
        label="Product Description"
        placeholder="Describe your product in detail..."
        rows={4}
        error={errors.description?.message}
        required
        {...register('description')}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Key Features <span className="text-red-500">*</span>
        </label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input
              placeholder={`Feature ${index + 1}`}
              error={errors.key_features?.[index]?.value?.message}
              className="flex-1"
              {...register(`key_features.${index}.value`)}
            />
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            )}
          </div>
        ))}
        {errors.key_features?.message && (
          <p className="text-xs text-red-600">{errors.key_features.message}</p>
        )}
        {fields.length < 10 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ value: '' })}
            leftIcon={<PlusCircle className="h-4 w-4" />}
          >
            Add Feature
          </Button>
        )}
      </div>

      <Input
        label="Target Audience"
        placeholder="e.g. Small business owners, SaaS founders"
        error={errors.target_audience?.message}
        required
        {...register('target_audience')}
      />

      <Input
        label="Price"
        placeholder="e.g. $97/month, $997 one-time, Free"
        error={errors.price?.message}
        required
        {...register('price')}
      />

      <Textarea
        label="Unique Selling Points"
        placeholder="What makes your product stand out from the competition?"
        rows={3}
        error={errors.unique_selling_points?.message}
        required
        {...register('unique_selling_points')}
      />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isLoading}
        leftIcon={<Sparkles className="h-4 w-4" />}
      >
        {submitLabel}
      </Button>
    </form>
  );
}
