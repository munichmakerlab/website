FROM php:8.3-apache
COPY mumalab-website.conf /etc/apache2/conf-available/mumalab-website.conf
RUN a2enconf mumalab-website && \
    a2enmod proxy proxy_http ssl && a2enmod rewrite && \
    pecl install apcu && docker-php-ext-enable apcu