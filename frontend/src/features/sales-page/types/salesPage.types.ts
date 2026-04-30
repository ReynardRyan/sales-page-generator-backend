import { z } from 'zod';

export const salesPageFormSchema = z.object({
  product_name: z.string().min(2, 'Product name must be at least 2 characters').max(255),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  key_features: z
    .array(z.string().min(1, 'Feature cannot be empty'))
    .min(1, 'Add at least one feature')
    .max(10, 'Maximum 10 features allowed'),
  target_audience: z.string().min(5, 'Describe your target audience').max(500),
  price: z.string().min(1, 'Price is required').max(100),
  unique_selling_points: z
    .string()
    .min(10, 'Describe what makes your product unique')
    .max(1000),
});

export type SalesPageFormValues = z.infer<typeof salesPageFormSchema>;
