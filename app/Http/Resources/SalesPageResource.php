<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesPageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_name' => $this->product_name,
            'description' => $this->description,
            'key_features' => $this->key_features,
            'target_audience' => $this->target_audience,
            'price' => $this->price,
            'unique_selling_points' => $this->unique_selling_points,
            'headline' => $this->headline,
            'subheadline' => $this->subheadline,
            'benefits' => $this->benefits,
            'features_output' => $this->features_output,
            'social_proof' => $this->social_proof,
            'pricing_text' => $this->pricing_text,
            'cta_text' => $this->cta_text,
            'full_content' => $this->full_content,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
