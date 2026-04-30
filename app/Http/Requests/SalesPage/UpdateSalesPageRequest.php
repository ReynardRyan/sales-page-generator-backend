<?php

namespace App\Http\Requests\SalesPage;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSalesPageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_name' => ['sometimes', 'string', 'min:2', 'max:255'],
            'description' => ['sometimes', 'string', 'min:10', 'max:2000'],
            'key_features' => ['sometimes', 'array', 'min:1', 'max:10'],
            'key_features.*' => ['required_with:key_features', 'string', 'max:255'],
            'target_audience' => ['sometimes', 'string', 'min:5', 'max:500'],
            'price' => ['sometimes', 'string', 'max:100'],
            'unique_selling_points' => ['sometimes', 'string', 'min:10', 'max:1000'],
            'headline' => ['sometimes', 'string', 'max:500'],
            'subheadline' => ['sometimes', 'string', 'max:500'],
            'benefits' => ['sometimes', 'array'],
            'benefits.*' => ['required_with:benefits', 'string'],
            'features_output' => ['sometimes', 'array'],
            'social_proof' => ['sometimes', 'string', 'max:1000'],
            'pricing_text' => ['sometimes', 'string', 'max:500'],
            'cta_text' => ['sometimes', 'string', 'max:255'],
        ];
    }
}
