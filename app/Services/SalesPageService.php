<?php

namespace App\Services;

use App\Actions\GenerateSalesPageAction;
use App\Models\SalesPage;
use App\Repositories\SalesPageRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class SalesPageService
{
    public function __construct(
        private readonly SalesPageRepository $salesPageRepository,
        private readonly GenerateSalesPageAction $generateAction
    ) {}

    public function getUserPages(int $userId, int $perPage = 10, string $search = ''): LengthAwarePaginator
    {
        return $this->salesPageRepository->getPaginatedByUser($userId, $perPage, $search);
    }

    public function generate(int $userId, array $data): SalesPage
    {
        $aiContent = $this->generateAction->execute($data);

        return $this->salesPageRepository->create(array_merge($data, $aiContent, [
            'user_id' => $userId,
        ]));
    }

    public function getUserPage(int $userId, int $pageId): SalesPage
    {
        return $this->salesPageRepository->findByUserAndId($userId, $pageId);
    }

    public function update(int $userId, int $pageId, array $data): SalesPage
    {
        $page = $this->salesPageRepository->findByUserAndId($userId, $pageId);

        return $this->salesPageRepository->update($page, $data);
    }

    public function delete(int $userId, int $pageId): void
    {
        $page = $this->salesPageRepository->findByUserAndId($userId, $pageId);
        $this->salesPageRepository->delete($page);
    }
}
