<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SalesPageController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Public Auth Routes
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/me', [AuthController::class, 'me']);

        Route::prefix('sales-pages')->group(function () {
            Route::post('/generate', [SalesPageController::class, 'generate'])
                ->middleware('throttle:' . env('RATE_LIMIT_GENERATE', 10) . ',1');
            Route::get('/', [SalesPageController::class, 'index']);
            Route::get('/{id}', [SalesPageController::class, 'show']);
            Route::put('/{id}', [SalesPageController::class, 'update']);
            Route::delete('/{id}', [SalesPageController::class, 'destroy']);
        });
    });
});
