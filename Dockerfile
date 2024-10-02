FROM jekyll/jekyll AS build
COPY --chown=jekyll:jekyll . /srv/jekyll/
RUN jekyll build

FROM php:8.3-apache
COPY docker/mumalab-website.conf /etc/apache2/conf-available/mumalab-website.conf
COPY --from=build /srv/jekyll/_site /var/www/html
RUN a2enconf mumalab-website && \
    a2enmod proxy proxy_http ssl && a2enmod rewrite && \
    pecl install apcu && docker-php-ext-enable apcu