#!/bin/sh
set -e

# Create sqlite database if not exists
mkdir -p /var/www/html/database
touch /var/www/html/database/database.sqlite

# Set permissions
chown -R www-data:www-data /var/www/html/storage /var/www/html/database
chmod -R 775 /var/www/html/storage /var/www/html/database

# Run migrations and seed
php artisan migrate --force
php artisan db:seed --force

# Publish swagger assets & generate docs
php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider" --force --quiet
php artisan l5-swagger:generate

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
