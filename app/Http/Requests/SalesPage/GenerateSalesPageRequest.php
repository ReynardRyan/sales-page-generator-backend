<?php

namespace App\Http\Requests\SalesPage;

use Illuminate\Foundation\Http\FormRequest;

class GenerateSalesPageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_name' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['required', 'string', 'min:10', 'max:2000'],
            'key_features' => ['required', 'array', 'min:1', 'max:10'],
            'key_features.*' => ['required', 'string', 'max:255'],
            'target_audience' => ['required', 'string', 'min:5', 'max:500'],
            'price' => ['required', 'string', 'max:100'],
            'unique_selling_points' => ['required', 'string', 'min:10', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'product_name.required' => 'Product name is required.',
            'description.required' => 'Description is required.',
            'key_features.required' => 'At least one key feature is required.',
            'target_audience.required' => 'Target audience is required.',
            'price.required' => 'Price is required.',
            'unique_selling_points.required' => 'Unique selling points are required.',
        ];
    }
}
