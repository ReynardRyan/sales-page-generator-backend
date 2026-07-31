<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiGenerationService
{
    private string $provider;

    public function __construct()
    {
        $this->provider = config('ai.provider', 'openai');
    }

    public function generate(array $productData): array
    {
        $prompt = $this->buildPrompt($productData);

        return match ($this->provider) {
            'gemini' => $this->generateWithGemini($prompt),
            'sumopod', 'mimo' => $this->generateWithSumopod($prompt),
            default => $this->generateWithOpenAi($prompt),
        };
    }

    /**
     * Base HTTP client for AI calls. Laravel's default 30s timeout is too short
     * for reasoning models, which spend most of that budget before emitting a
     * single byte, so every provider call gets an explicit timeout.
     */
    private function http(array $headers): \Illuminate\Http\Client\PendingRequest
    {
        return Http::withHeaders($headers)
            ->connectTimeout((int) config('ai.connect_timeout', 15))
            ->timeout((int) config('ai.timeout', 180));
    }

    private function buildPrompt(array $data): string
    {
        $features = is_array($data['key_features'])
            ? implode(', ', $data['key_features'])
            : $data['key_features'];

        return <<<PROMPT
You are an expert copywriter and sales page creator. Generate a compelling sales page content for the following product.

Product Information:
- Product Name: {$data['product_name']}
- Description: {$data['description']}
- Key Features: {$features}
- Target Audience: {$data['target_audience']}
- Price: {$data['price']}
- Unique Selling Points: {$data['unique_selling_points']}

Generate a JSON response with the following structure:
{
  "headline": "Main attention-grabbing headline (max 100 chars)",
  "subheadline": "Supporting subheadline that elaborates (max 150 chars)",
  "benefits": ["benefit 1", "benefit 2", "benefit 3", "benefit 4", "benefit 5"],
  "features": [
    {"title": "Feature Name", "description": "Feature description"},
    {"title": "Feature Name", "description": "Feature description"}
  ],
  "social_proof": "A compelling testimonial or social proof statement",
  "pricing_text": "Pricing section text with value proposition",
  "cta_text": "Call to action button text (max 50 chars)",
  "full_content": "Complete sales page content in HTML format"
}

Make it persuasive, professional, and conversion-focused. Return only valid JSON.
PROMPT;
    }

    private function generateWithOpenAi(string $prompt): array
    {
        $response = $this->http([
            'Authorization' => 'Bearer ' . config('ai.openai.key'),
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => config('ai.openai.model', 'gpt-4o-mini'),
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are an expert copywriter. Always respond with valid JSON only.',
                ],
                [
                    'role' => 'user',
                    'content' => $prompt,
                ],
            ],
            'temperature' => 0.7,
            'response_format' => ['type' => 'json_object'],
        ]);

        if ($response->failed()) {
            $errorMessage = $response->json('error.message') ?? 'AI generation failed. Please try again.';
            Log::error('OpenAI API error', ['response' => $response->body()]);
            throw new \RuntimeException($errorMessage);
        }

        $content = $response->json('choices.0.message.content');

        return json_decode($content, true) ?? $this->getFallbackContent();
    }

    private function generateWithGemini(string $prompt): array
    {
        $model = config('ai.gemini.model', 'gemini-2.0-flash');
        $response = $this->http([
            'Content-Type' => 'application/json',
        ])->post('https://generativelanguage.googleapis.com/v1/models/' . $model . ':generateContent?key=' . config('ai.gemini.key'), [
            'contents' => [
                ['parts' => [['text' => $prompt]]],
            ],
            'generationConfig' => [
                'temperature' => 0.7,
            ],
        ]);

        if ($response->failed()) {
            $errorMessage = $response->json('error.message') ?? 'AI generation failed. Please try again.';
            Log::error('Gemini API error', ['response' => $response->body()]);
            throw new \RuntimeException($errorMessage);
        }

        $content = $response->json('candidates.0.content.parts.0.text');

        return json_decode($content, true) ?? $this->getFallbackContent();
    }

    private function generateWithSumopod(string $prompt): array
    {
        $baseUrl = config('ai.sumopod.base_url', 'https://ai.sumopod.com/v1');
        $model = config('ai.sumopod.model', 'deepseek-v4-pro');
        $apiKey = config('ai.sumopod.key', '');

        $headers = ['Content-Type' => 'application/json'];
        if (!empty($apiKey)) {
            $headers['Authorization'] = 'Bearer ' . $apiKey;
        }

        $response = $this->http($headers)->post($baseUrl . '/chat/completions', [
            'model' => $model,
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are an expert copywriter. Always respond with valid JSON only.',
                ],
                [
                    'role' => 'user',
                    'content' => $prompt,
                ],
            ],
            'temperature' => 0.7,
            'max_tokens' => 16000,
            'response_format' => ['type' => 'json_object'],
        ]);

        if ($response->failed()) {
            $errorMessage = $response->json('error.message') ?? 'Sumopod AI generation failed. Please try again.';
            Log::error('Sumopod API error', ['response' => $response->body()]);
            throw new \RuntimeException($errorMessage);
        }

        $content = $response->json('choices.0.message.content');

        return json_decode($content, true) ?? $this->getFallbackContent();
    }

    private function getFallbackContent(): array
    {
        return [
            'headline' => 'Discover the Product That Will Transform Your Life',
            'subheadline' => 'Join thousands of satisfied customers who have already made the change',
            'benefits' => [
                'Save time and increase productivity',
                'Proven results backed by data',
                'Easy to use, no learning curve',
                '24/7 customer support',
                '30-day money back guarantee',
            ],
            'features' => [
                ['title' => 'Core Feature', 'description' => 'Main feature description'],
            ],
            'social_proof' => '"This product changed my business completely." - Happy Customer',
            'pricing_text' => 'Get started today and see results within 30 days',
            'cta_text' => 'Get Started Now',
            'full_content' => '<h1>Discover the Product That Will Transform Your Life</h1>',
        ];
    }
}
