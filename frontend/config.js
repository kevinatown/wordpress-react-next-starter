let wpUrl = `https://cdn.kevintownsend.dev/index.php/wp-json`;

// If we're running on Docker, use the WordPress container hostname instead of localhost.
if (process.env.HOME === '/home/node') {
  wpUrl = 'http://wp-headless:8080/wp-json';
}
const Config = {
  apiUrl: wpUrl,
};

export default Config;
