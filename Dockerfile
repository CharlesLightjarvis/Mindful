# =============================================================================
# Stage 1 — PHP + Composer dependencies
# =============================================================================
FROM php:8.4-cli-alpine AS composer-deps

RUN apk add --no-cache \
        git curl zip unzip \
        libpng-dev libjpeg-turbo-dev freetype-dev \
        icu-dev libzip-dev oniguruma-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        bcmath exif gd intl mbstring pcntl pdo pdo_mysql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Install dependencies before copying source (layer cache optimization)
COPY composer.json composer.lock ./
RUN composer install \
        --no-dev \
        --no-scripts \
        --no-interaction \
        --optimize-autoloader \
        --prefer-dist

COPY . .

# Discover packages (|| true — APP_KEY not needed at this stage)
RUN php artisan package:discover --ansi 2>/dev/null || true

# =============================================================================
# Stage 2 — Node.js asset + SSR bundle build
# =============================================================================
FROM node:22 AS node-build

WORKDIR /app

# PHP is required during Vite build because @laravel/vite-plugin-wayfinder
# runs: php artisan wayfinder:generate --with-form
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        php-cli \
        php-mbstring \
        php-xml \
        php-curl \
        php-zip \
        php-mysql \
        php-sqlite3 \
        php-bcmath \
        php-intl \
        unzip \
        git \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci --prefer-offline

COPY --from=composer-deps /app .

# Builds both client bundle (public/build) and SSR bundle (bootstrap/ssr)
RUN npm run build:ssr

# =============================================================================
# Stage 3 — Production image (PHP-FPM + Nginx + Supervisor)
# =============================================================================
FROM php:8.4-fpm-alpine AS production

LABEL maintainer="pmindfull"

# Runtime system dependencies
RUN apk add --no-cache \
        nginx \
        supervisor \
        curl \
        libstdc++ \
        libpng libjpeg-turbo freetype \
        icu-libs libzip oniguruma \
    && rm -rf /var/cache/apk/*

# PHP extensions (build deps removed after install to keep image lean)
RUN apk add --no-cache --virtual .build-deps \
        libpng-dev libjpeg-turbo-dev freetype-dev \
        icu-dev libzip-dev oniguruma-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        bcmath exif gd intl mbstring pcntl pdo pdo_mysql opcache zip \
    && apk del .build-deps \
    && rm -rf /var/cache/apk/*

# Node.js binary needed at runtime by `php artisan inertia:start-ssr`
# Both images are Alpine-based (musl libc) so the binary is compatible
COPY --from=node:22-alpine /usr/local/bin/node /usr/local/bin/node

# PHP configuration
COPY docker/php/php.ini        "$PHP_INI_DIR/conf.d/99-app.ini"
COPY docker/php/opcache.ini    "$PHP_INI_DIR/conf.d/10-opcache.ini"
COPY docker/php/php-fpm.conf   /usr/local/etc/php-fpm.d/www.conf

# Nginx
COPY docker/nginx/nginx.conf   /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf

# Supervisor
COPY docker/supervisor/supervisord.conf /etc/supervisord.conf
COPY docker/supervisor/conf.d/          /etc/supervisor/conf.d/

WORKDIR /var/www/html

# Application source (copied in order of change frequency)
COPY --chown=www-data:www-data . .
COPY --from=composer-deps --chown=www-data:www-data /app/vendor        ./vendor
COPY --from=node-build    --chown=www-data:www-data /app/public/build  ./public/build
COPY --from=node-build    --chown=www-data:www-data /app/bootstrap/ssr ./bootstrap/ssr

# Ensure storage directories exist with correct permissions
RUN mkdir -p \
        storage/app/public \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/testing \
        storage/framework/views \
        storage/logs \
        bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 755 storage bootstrap/cache \
    && mkdir -p /run/nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD curl -fsSL http://localhost/ > /dev/null || exit 1

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]
