FROM bitnami/laravel:latest

WORKDIR /app

COPY . .

RUN cp .env.example .env \
    && composer install --optimize-autoloader --no-dev \
    && php artisan key:generate
