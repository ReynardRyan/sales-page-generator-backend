#!/bin/sh
set -e

echo "==> Starting AI Sales Page Generator API..."

# Generate app key if not set (export agar tidak perlu tulis ke .env)
if [ -z "$APP_KEY" ]; then
    echo "==> Generating application key..."
    export APP_KEY=$(php -r "echo 'base64:' . base64_encode(random_bytes(32));")
    echo "==> APP_KEY generated."
fi

# Storage permissions
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Discover packages (needed because composer ran with --no-scripts)
echo "==> Discovering packages..."
php artisan package:discover --ansi

# Cache config (skip in dev to allow .env hot-reload)
if [ "$APP_ENV" = "production" ]; then
    echo "==> Caching configuration..."
    php artisan config:cache
    php artisan route:cache
fi

# Run migrations (non-fatal — container starts even if DB is unreachable)
echo "==> Running database migrations..."
php artisan migrate --force || echo "==> WARNING: Migration failed. Check DB connection."

echo "==> Starting services via Supervisor..."
exec supervisord -c /etc/supervisor/conf.d/supervisord.conf
