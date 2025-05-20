FROM bitnami/laravel:latest

WORKDIR /app

COPY . .

RUN composer install --optimize-autoloader --no-dev

RUN cp .env.example .env && php artisan key:generate && php artisan jwt:secret --force
