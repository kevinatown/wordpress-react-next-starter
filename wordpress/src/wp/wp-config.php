<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'wordpress' );

/** MySQL database password */
define( 'DB_PASSWORD', 'wordpress' );

/** MySQL hostname */
define( 'DB_HOST', 'db_headless' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          't~8y*!8(?&pH(6HozR&Qj?_0$Ji<Ht{I+]>rx,:[%X@X|T`d>ahN3yt*&T6po<4!' );
define( 'SECURE_AUTH_KEY',   'i}SqikO+7&0.sG`4W_kQUIG)4/Nf/o!DD48cHE.F>w9c4QXrD2VQ@)w1dZ*Ls 8 ' );
define( 'LOGGED_IN_KEY',     '9q2f*s=nLkkXoc`X*^aGx15TgBYoKFaM{Z=W!N63JSePy5~I8r;FC0M[tLc1+C;k' );
define( 'NONCE_KEY',         ',}[*?uyvf-`}P#]0ZR?FH~o(SY]]#<y`w3OURE(d3uk@g16qtY/RBj|yR+_`xq@6' );
define( 'AUTH_SALT',         'ySCsu}09:EQ2H4&ahI#Yk~Oc/_LW&R-+J.n}j}3!{8v?cvBP4tl>i(4_H}[y@M]Z' );
define( 'SECURE_AUTH_SALT',  'whibwoh T6vvE{:.rOQ^]yz6V%xtPYNoSVvzj1_ZDLw#76adu:CXFJm3G<#)vyE7' );
define( 'LOGGED_IN_SALT',    'IO=r|c?^u3,r|4jI,l@~Q*.h$abX;R@Q!HhM955_9[)}-FZX3R~K}5LE$oTM^Is ' );
define( 'NONCE_SALT',        '9>,s)KoI0 Hh_AX+-*< g+]Z9dim[Q]sBmui7BI^y2f1K5n-<EP%:[n2)-/IS)Xt' );
define( 'WP_CACHE_KEY_SALT', 'd8)ljil#VVU&@Y3$j9AU719`]nm>F(O/Zi#IN,yH(>9&W]5+FNP-&#ZPCt@M2_K?' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';



if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
  $_SERVER['HTTPS'] = 'on';
}


define( 'WP_DEBUG', 'true' );
define( 'WP_DEBUG_LOG', 'true' );
define( 'WP_DEBUG_DISPLAY', 'true' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
