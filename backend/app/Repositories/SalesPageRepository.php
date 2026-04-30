<?php

namespace App\Repositories;

use App\Models\SalesPage;
use Illuminate\Pagination\LengthAwarePaginator;

class SalesPageRepository
{
    public function getPaginatedByUser(int $userId, int $perPage, string $search): LengthAwarePaginator
    {
        return SalesPage::where('user_id', $userId)
            ->when($search, fn ($q) => $q->where('product_name', 'ilike', "%{$search}%"))
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }

    public function create(array $data): SalesPage
    {
        return SalesPage::create($data);
    }

    public function findByUserAndId(int $userId, int $pageId): SalesPage
    {
        return SalesPage::where('user_id', $userId)
            ->findOrFail($pageId);
    }

    public function update(SalesPage $page, array $data): SalesPage
    {
        $page->update($data);

        return $page->fresh();
    }

    public function delete(SalesPage $page): void
    {
        $page->delete();
    }
}
