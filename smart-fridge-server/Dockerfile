FROM bitnami/laravel

WORKDIR /app

COPY . .

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer install --optimize-autoloader

CMD["php", "artisan", "serve", "--host:0.0.0.0", "--port:8000"]
