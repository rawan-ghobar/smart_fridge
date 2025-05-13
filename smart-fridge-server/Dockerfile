FROM bitnami/laravel

WORKDIR /app

COPY ./smart-fridge-server /app/

RUN composer install --no-dev --optimize-autoloader \
    && php artisan config:cache \
    && php artisan route:cache
