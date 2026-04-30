<?php

namespace App\Actions;

use App\Services\AiGenerationService;

class GenerateSalesPageAction
{
    public function __construct(
        private readonly AiGenerationService $aiService
    ) {}

    public function execute(array $productData): array
    {
        $generated = $this->aiService->generate($productData);

        return [
            'headline' => $generated['headline'] ?? '',
            'subheadline' => $generated['subheadline'] ?? '',
            'benefits' => $generated['benefits'] ?? [],
            'features_output' => $generated['features'] ?? [],
            'social_proof' => $generated['social_proof'] ?? '',
            'pricing_text' => $generated['pricing_text'] ?? '',
            'cta_text' => $generated['cta_text'] ?? 'Get Started',
            'full_content' => $generated['full_content'] ?? '',
        ];
    }
}
