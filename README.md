# AI Sales Page Generator — Backend

REST API untuk generate sales page menggunakan AI. Dibangun dengan Laravel 11.

## Tech Stack

- PHP 8.2 + Laravel 11
- Laravel Sanctum (token-based auth)
- SQLite (default)
- Redis (cache)
- OpenAI / Google Gemini API
- L5-Swagger (API documentation)
- Docker + Nginx + Supervisor

## Requirements

- Docker & Docker Compose

## Getting Started

### 1. Konfigurasi environment

Buat file `.env` dan sesuaikan variabel berikut:

```env
# Pilih provider AI: openai atau gemini
AI_PROVIDER=

OPENAI_API_KEY=
OPENAI_MODEL=

GEMINI_API_KEY=
GEMINI_MODEL=
```

### 2. Jalankan dengan Docker

```bash
docker compose up --build
```

Saat pertama kali jalan, container otomatis:

- Menjalankan migrasi database
- Mengisi data awal (seeder)
- Mempublikasi asset Swagger
- Mengenerate dokumentasi API

## Akses

| Service      | URL                                     |
| ------------ | --------------------------------------- |
| API          | http://localhost:8000/api/v1            |
| Swagger Docs | http://localhost:8000/api/documentation |

## API Endpoints

Base URL: `http://localhost:8000/api/v1`

### Auth

| Method | Endpoint         | Akses     |
| ------ | ---------------- | --------- |
| POST   | `/auth/register` | Public    |
| POST   | `/auth/login`    | Public    |
| POST   | `/auth/logout`   | Protected |
| GET    | `/auth/me`       | Protected |

### Sales Pages

| Method | Endpoint                | Keterangan                             |
| ------ | ----------------------- | -------------------------------------- |
| POST   | `/sales-pages/generate` | Generate dengan AI (maks 10 req/menit) |
| GET    | `/sales-pages`          | List semua halaman (paginated)         |
| GET    | `/sales-pages/{id}`     | Detail halaman                         |
| PUT    | `/sales-pages/{id}`     | Update halaman                         |
| DELETE | `/sales-pages/{id}`     | Hapus halaman                          |

Protected endpoints membutuhkan header:

```
Authorization: Bearer <token>
```

## Struktur Project

```
backend/
├── app/
│   ├── Actions/                # GenerateSalesPageAction
│   ├── Http/
│   │   ├── Controllers/Api/    # AuthController, SalesPageController
│   │   ├── Requests/           # Form request validation
│   │   └── Resources/          # API response formatting
│   ├── Models/                 # User, SalesPage
│   ├── Repositories/           # UserRepository, SalesPageRepository
│   └── Services/               # AuthService, SalesPageService, AiGenerationService
├── database/
│   ├── migrations/
│   └── seeders/
├── docker/
│   ├── entrypoint.sh
│   ├── nginx/default.conf
│   ├── php/php.ini
│   └── supervisor/supervisord.conf
├── routes/
│   └── api.php
├── Dockerfile
├── docker-compose.yml
└── .env
```

## Perintah Docker Berguna

```bash
# Jalankan container
docker compose up -d --build

# Stop container
docker compose down

# Lihat log
docker logs sales_backend

# Jalankan artisan command
docker exec sales_backend php artisan <command>

# Reset database
docker exec sales_backend php artisan migrate:fresh --seed

# Recreate container (reload .env)
docker compose up -d --force-recreate app
```
