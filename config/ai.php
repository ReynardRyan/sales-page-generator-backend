<?php

return [
    'provider' => env('AI_PROVIDER', 'openai'),

    // Reasoning models (e.g. deepseek-v4-pro) can take well over Laravel's
    // default 30s HTTP timeout, so requests need a longer explicit budget.
    // Keep below php max_execution_time / nginx fastcgi_read_timeout (300s).
    'timeout' => (int) env('AI_TIMEOUT', 180),
    'connect_timeout' => (int) env('AI_CONNECT_TIMEOUT', 15),

    'openai' => [
        'key' => env('OPENAI_API_KEY'),
        'model' => env('OPENAI_MODEL', 'gpt-4o-mini'),
    ],

    'gemini' => [
        'key' => env('GEMINI_API_KEY'),
        'model' => env('GEMINI_MODEL', 'gemini-pro'),
    ],

    // Sumopod: OpenAI-compatible chat-completions endpoint.
    // The MIMO_* fallbacks keep already-deployed environments working after
    // the rename from the old "mimo" provider name.
    'sumopod' => [
        'key' => env('SUMOPOD_API_KEY', env('MIMO_API_KEY')),
        'model' => env('SUMOPOD_MODEL', env('MIMO_MODEL', 'deepseek-v4-pro')),
        'base_url' => env('SUMOPOD_BASE_URL', env('MIMO_BASE_URL', 'https://ai.sumopod.com/v1')),
    ],
];
