#!/bin/bash
set -euo pipefail


mysql_ready='nc -z db_headless 3306'

if [ "${IS_LOCAL:=false}" == "true" ] && ! $mysql_ready; then
    printf 'Waiting for MySQL..'
    while ! $mysql_ready
    do
        printf '.'
        sleep 1
    done
    
    echo "\n\n\n\n"
    echo "Found MySQL"
fi


if wp core is-installed --allow-root 
then
    echo "WordPress is already installed, exiting."
    exit 0
fi

# usage: file_env VAR [DEFAULT]
#    ie: file_env 'XYZ_DB_PASSWORD' 'example'
# (will allow for "$XYZ_DB_PASSWORD_FILE" to fill in the value of
#  "$XYZ_DB_PASSWORD" from a file, especially for Docker's secrets feature)
file_env() {
  local var="$1"
  local fileVar="${var}_FILE"
  local def="${2:-}"
  if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
    echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
    exit 1
  fi
  local val="$def"
  if [ "${!var:-}" ]; then
    val="${!var}"
  elif [ "${!fileVar:-}" ]; then
    val="$(< "${!fileVar}")"
  fi
  export "$var"="$val"
  unset "$fileVar"
}

cd /var/www/html

user="${APACHE_RUN_USER:-www-data}"
group="${APACHE_RUN_GROUP:-www-data}"

wp core download --force --allow-root

if [ ! -e index.php ] && [ ! -e wp-includes/version.php ]; then
  # if the directory exists and WordPress doesn't appear to be installed AND the permissions of it are root:root, let's chown it (likely a Docker-created directory)
  if [ "$(id -u)" = '0' ] && [ "$(stat -c '%u:%g' .)" = '0:0' ]; then
    chown "$user:$group" .
  fi
  if [ "$user" != '0' ]; then
    # avoid "tar: .: Cannot utime: Operation not permitted" and "tar: .: Cannot change mode to rwxr-xr-x: Operation not permitted"
    targetTarArgs+=( --no-overwrite-dir )
  fi
  if [ ! -e .htaccess ]; then
    # NOTE: The "Indexes" option is disabled in the php:apache base image
    cat > .htaccess <<-'EOF'
      # BEGIN WordPress
      <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.php$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.php [L]
      </IfModule>
      # END WordPress
EOF
    chown "$user:$group" .htaccess
  fi
fi

uniqueEnvs=(
    AUTH_KEY
    SECURE_AUTH_KEY
    LOGGED_IN_KEY
    NONCE_KEY
    AUTH_SALT
    SECURE_AUTH_SALT
    LOGGED_IN_SALT
    NONCE_SALT
  )
  envs=(
    WORDPRESS_DB_HOST
    WORDPRESS_DB_USER
    WORDPRESS_DB_PASSWORD
    WORDPRESS_DB_NAME
    WORDPRESS_DB_CHARSET
    WORDPRESS_DB_COLLATE
    "${uniqueEnvs[@]/#/WORDPRESS_}"
    WORDPRESS_TABLE_PREFIX
    WORDPRESS_DEBUG
    WORDPRESS_CONFIG_EXTRA
    WORDPRESS_URL
    WORDPRESS_TITLE
    WORDPRESS_ADMIN_USER
    WORDPRESS_ADMIN_PASSWORD
    WORDPRESS_ADMIN_EMAIL
  )
  haveConfig=
  for e in "${envs[@]}"; do
    file_env "$e"
    if [ -z "$haveConfig" ] && [ -n "${!e}" ]; then
      haveConfig=1
    fi
  done


# while ! wp core is-installed; do
#     echo "Waiting on wordpress..."
#     sleep 1
# done

[ -f wp-config.php ] || wp config create --allow-root \
  --dbhost="${WORDPRESS_DB_HOST:=mysql}" \
  --dbname="${WORDPRESS_DB_NAME:=wordpress}" \
  --dbuser="${WORDPRESS_DB_USER:=root}" \
  --dbpass="${WORDPRESS_DB_PASSWORD:=}" \
  --dbcharset="${WORDPRESS_DB_CHARSET:=utf8}" \
  --extra-php <<PHP
${WORDPRESS_CONFIG_EXTRA}
$(cat <<'ALT'
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
  $_SERVER['HTTPS'] = 'on';
}
ALT
)
PHP

echo 'WP config created'

php -- <<'EOPHP'
<?php
// database might not exist, so let's try creating it (just to be safe)
$stderr = fopen('php://stderr', 'w');
// https://codex.wordpress.org/Editing_wp-config.php#MySQL_Alternate_Port
//   "hostname:port"
// https://codex.wordpress.org/Editing_wp-config.php#MySQL_Sockets_or_Pipes
//   "hostname:unix-socket-path"
list($host, $socket) = explode(':', getenv('WORDPRESS_DB_HOST'), 2);
$port = 0;
if (is_numeric($socket)) {
  $port = (int) $socket;
  $socket = null;
}
$user = getenv('WORDPRESS_DB_USER');
$pass = getenv('WORDPRESS_DB_PASSWORD');
$dbName = getenv('WORDPRESS_DB_NAME');
$maxTries = 10;
do {
  $mysql = new mysqli($host, $user, $pass, '', $port, $socket);
  if ($mysql->connect_error) {
    fwrite($stderr, "\n" . 'MySQL Connection Error: (' . $mysql->connect_errno . ') ' . $mysql->connect_error . "\n");
    --$maxTries;
    if ($maxTries <= 0) {
      exit(1);
    }
    sleep(3);
  }
} while ($mysql->connect_error);
if (!$mysql->query('CREATE DATABASE IF NOT EXISTS `' . $mysql->real_escape_string($dbName) . '`')) {
  fwrite($stderr, "\n" . 'MySQL "CREATE DATABASE" Error: ' . $mysql->error . "\n");
  $mysql->close();
  exit(1);
}
$mysql->close();
EOPHP

echo 'db created'

wp core install \
    --url="$WORDPRESS_URL" \
    --title="$WORDPRESS_TITLE" \
    --admin_user="$WORDPRESS_ADMIN_USER" \
    --admin_password="$WORDPRESS_ADMIN_PASSWORD" \
    --admin_email="$WORDPRESS_ADMIN_EMAIL" \
    --skip-email --allow-root

# wp option update blogdescription "$WORDPRESS_DESCRIPTION"
# wp rewrite structure "$WORDPRESS_PERMALINK_STRUCTURE"

wp plugin install --activate --force --allow-root \
    amazon-s3-and-cloudfront \
    advanced-custom-fields \
    custom-post-type-ui \
    wordpress-importer \
    acf-to-wp-api \
    wp-rest-api-v2-menus #\
    # jwt-authentication-for-wp-rest-api \
    # https://github.com/wp-graphql/wp-graphql/archive/v0.3.6.zip \
    # https://github.com/wp-graphql/wp-graphql-jwt-authentication/archive/V0.3.2.zip

wp theme install --allow-root --activate /var/www/mod_twentytwenty.zip
wp theme delete --allow-root twentysixteen twentyseventeen twentynineteen twentytwenty

wp plugin delete --allow-root akismet hello

WP_MAX_MEMORY_LIMIT=128M wp import "/var/www/${WORDPRESS_XML_FILE}" \
  --authors=create \
  --skip-themes \
  --allow-root

wp rewrite structure "$WORDPRESS_PERMALINK_STRUCTURE" --allow-root --hard

echo 'WP is configured, moving appache to foreground'

chown -R www-data:www-data /var/www/html

apache2-foreground
