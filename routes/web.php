<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'success' => true,
        'message' => 'AI Sales Page Generator API',
        'version' => '1.0.0',
    ]);
});
