<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesPage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'product_name',
        'description',
        'key_features',
        'target_audience',
        'price',
        'unique_selling_points',
        'headline',
        'subheadline',
        'benefits',
        'features_output',
        'social_proof',
        'pricing_text',
        'cta_text',
        'full_content',
    ];

    protected function casts(): array
    {
        return [
            'benefits' => 'array',
            'features_output' => 'array',
            'key_features' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
