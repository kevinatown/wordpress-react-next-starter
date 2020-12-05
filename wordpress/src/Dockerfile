FROM wordpress:latest

# RUN mv "$PHP_INI_DIR"/php.ini-development "$PHP_INI_DIR"/php.ini

# Install unzip mariadb-client
RUN apt-get update; \
    apt-get install -y --no-install-recommends unzip mariadb-client sudo netcat

RUN curl -sL https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -o wp; \
  chmod +x wp; \
  mv wp /usr/local/bin/; \
  mkdir /var/www/.wp-cli; \
  chown www-data:www-data /var/www/.wp-cli

COPY ./setup/configure_wp.sh /usr/local/bin/
COPY ./setup/$WORDPRESS_XML_FILE /var/www/$WORDPRESS_XML_FILE
COPY ./setup/wp-cli.yml /var/www/
COPY ./setup/mod_twentytwenty.zip /var/www/mod_twentytwenty.zip

RUN rm -rf /usr/src/wordpress
RUN chown -R www-data:www-data /var/www/html

ENTRYPOINT ["configure_wp.sh"]
