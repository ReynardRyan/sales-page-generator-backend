<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="AI Sales Page Generator API",
 *     version="1.0.0",
 *     description="API for generating AI-powered sales pages"
 * )
 * @OA\Server(url="http://localhost:8000/api/v1", description="Local")
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 * @OA\Schema(
 *     schema="UserResource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="email", type="string"),
 *     @OA\Property(property="created_at", type="string", format="date-time")
 * )
 * @OA\Schema(
 *     schema="SalesPageResource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="product_name", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="key_features", type="array", @OA\Items(type="string")),
 *     @OA\Property(property="target_audience", type="string"),
 *     @OA\Property(property="price", type="string"),
 *     @OA\Property(property="unique_selling_points", type="string"),
 *     @OA\Property(property="headline", type="string", nullable=true),
 *     @OA\Property(property="subheadline", type="string", nullable=true),
 *     @OA\Property(property="benefits", type="array", nullable=true, @OA\Items(type="string")),
 *     @OA\Property(property="features_output", type="array", nullable=true, @OA\Items(type="string")),
 *     @OA\Property(property="social_proof", type="string", nullable=true),
 *     @OA\Property(property="pricing_text", type="string", nullable=true),
 *     @OA\Property(property="cta_text", type="string", nullable=true),
 *     @OA\Property(property="full_content", type="string", nullable=true),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
abstract class Controller
{
    //
}
