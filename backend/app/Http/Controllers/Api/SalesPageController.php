<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SalesPage\GenerateSalesPageRequest;
use App\Http\Requests\SalesPage\UpdateSalesPageRequest;
use App\Http\Resources\SalesPageResource;
use App\Services\SalesPageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SalesPageController extends Controller
{
    public function __construct(
        private readonly SalesPageService $salesPageService
    ) {}

    /**
     * @OA\Get(
     *     path="/sales-pages",
     *     tags={"Sales Pages"},
     *     summary="List all sales pages for authenticated user",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="per_page", in="query", required=false, @OA\Schema(type="integer", default=10)),
     *     @OA\Parameter(name="search", in="query", required=false, @OA\Schema(type="string")),
     *     @OA\Response(
     *         response=200,
     *         description="Sales pages retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Sales pages retrieved successfully."),
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/SalesPageResource")),
     *             @OA\Property(property="meta", type="object",
     *                 @OA\Property(property="current_page", type="integer"),
     *                 @OA\Property(property="last_page", type="integer"),
     *                 @OA\Property(property="per_page", type="integer"),
     *                 @OA\Property(property="total", type="integer")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $pages = $this->salesPageService->getUserPages(
            userId: $request->user()->id,
            perPage: $request->integer('per_page', 10),
            search: $request->string('search')->toString()
        );

        return response()->json([
            'success' => true,
            'message' => 'Sales pages retrieved successfully.',
            'data' => SalesPageResource::collection($pages),
            'meta' => [
                'current_page' => $pages->currentPage(),
                'last_page' => $pages->lastPage(),
                'per_page' => $pages->perPage(),
                'total' => $pages->total(),
            ],
        ]);
    }

    /**
     * @OA\Post(
     *     path="/sales-pages/generate",
     *     tags={"Sales Pages"},
     *     summary="Generate a new AI sales page",
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"product_name","description","key_features","target_audience","price","unique_selling_points"},
     *             @OA\Property(property="product_name", type="string", minLength=2, maxLength=255, example="My Product"),
     *             @OA\Property(property="description", type="string", minLength=10, maxLength=2000, example="A great product that solves problems."),
     *             @OA\Property(property="key_features", type="array", minItems=1, maxItems=10, @OA\Items(type="string"), example={"Fast", "Reliable", "Affordable"}),
     *             @OA\Property(property="target_audience", type="string", minLength=5, maxLength=500, example="Small business owners"),
     *             @OA\Property(property="price", type="string", maxLength=100, example="$99/month"),
     *             @OA\Property(property="unique_selling_points", type="string", minLength=10, maxLength=1000, example="The only tool that does X and Y.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Sales page generated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Sales page generated successfully."),
     *             @OA\Property(property="data", ref="#/components/schemas/SalesPageResource")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=422, description="Validation error"),
     *     @OA\Response(response=429, description="Too many requests")
     * )
     */
    public function generate(GenerateSalesPageRequest $request): JsonResponse
    {
        $salesPage = $this->salesPageService->generate(
            userId: $request->user()->id,
            data: $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Sales page generated successfully.',
            'data' => new SalesPageResource($salesPage),
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/sales-pages/{id}",
     *     tags={"Sales Pages"},
     *     summary="Get a specific sales page",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(
     *         response=200,
     *         description="Sales page retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Sales page retrieved successfully."),
     *             @OA\Property(property="data", ref="#/components/schemas/SalesPageResource")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $page = $this->salesPageService->getUserPage(
            userId: $request->user()->id,
            pageId: $id
        );

        return response()->json([
            'success' => true,
            'message' => 'Sales page retrieved successfully.',
            'data' => new SalesPageResource($page),
        ]);
    }

    /**
     * @OA\Put(
     *     path="/sales-pages/{id}",
     *     tags={"Sales Pages"},
     *     summary="Update a sales page",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="product_name", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="key_features", type="array", @OA\Items(type="string")),
     *             @OA\Property(property="target_audience", type="string"),
     *             @OA\Property(property="price", type="string"),
     *             @OA\Property(property="unique_selling_points", type="string"),
     *             @OA\Property(property="headline", type="string"),
     *             @OA\Property(property="subheadline", type="string"),
     *             @OA\Property(property="benefits", type="array", @OA\Items(type="string")),
     *             @OA\Property(property="social_proof", type="string"),
     *             @OA\Property(property="pricing_text", type="string"),
     *             @OA\Property(property="cta_text", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Sales page updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Sales page updated successfully."),
     *             @OA\Property(property="data", ref="#/components/schemas/SalesPageResource")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=404, description="Not found"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function update(UpdateSalesPageRequest $request, int $id): JsonResponse
    {
        $page = $this->salesPageService->update(
            userId: $request->user()->id,
            pageId: $id,
            data: $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Sales page updated successfully.',
            'data' => new SalesPageResource($page),
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/sales-pages/{id}",
     *     tags={"Sales Pages"},
     *     summary="Delete a sales page",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(
     *         response=200,
     *         description="Sales page deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Sales page deleted successfully.")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $this->salesPageService->delete(
            userId: $request->user()->id,
            pageId: $id
        );

        return response()->json([
            'success' => true,
            'message' => 'Sales page deleted successfully.',
        ]);
    }
}
