FROM bitnami/laravel

WORKDIR /app

COPY . .

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY .env.example .env

RUN php artisan key:generate

RUN composer install --optimize-autoloader

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
