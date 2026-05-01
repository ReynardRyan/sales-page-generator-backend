FROM php:8.2-fpm

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/

RUN apt-get update && apt-get install -y \
    nginx \
    supervisor \
    curl \
    zip \
    unzip \
    git \
    && install-php-extensions pdo pdo_sqlite mbstring exif pcntl bcmath gd zip opcache redis \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN mkdir -p storage/api-docs \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

COPY docker/nginx/default.conf /etc/nginx/sites-available/default
COPY docker/php/php.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
