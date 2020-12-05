module.exports = {
  plugins: [
    require('postcss-easy-import')({ prefix: '_' }),
    require('autoprefixer')({
      /* ...options */
    }), // so imports are auto-prefixed too
  ],
};