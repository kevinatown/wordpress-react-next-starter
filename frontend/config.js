let wpUrl = `https://cdn.<domain>/wp-json`;

// If we're running on Docker, use the WordPress container hostname instead of localhost.
if (process.env.HOME === '/home/node' || process.env.IS_LOCAL) {
  wpUrl = 'http://0.0.0.0:8080/wp-json';
}
const Config = {
  apiUrl: wpUrl,
};

export default Config;
