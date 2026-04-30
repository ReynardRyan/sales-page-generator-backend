export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface SalesPage {
  id: number;
  product_name: string;
  description: string;
  key_features: string[];
  target_audience: string;
  price: string;
  unique_selling_points: string;
  headline: string;
  subheadline: string;
  benefits: string[];
  features_output: FeatureItem[];
  social_proof: string;
  pricing_text: string;
  cta_text: string;
  full_content: string;
  created_at: string;
  updated_at: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface SalesPageFormData {
  product_name: string;
  description: string;
  key_features: string[];
  target_audience: string;
  price: string;
  unique_selling_points: string;
}
