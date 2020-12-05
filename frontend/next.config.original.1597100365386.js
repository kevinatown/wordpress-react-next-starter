const path = require('path');
const glob = require('glob');

module.exports = {
  target: 'serverless',
   webpack: config => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [
                  { removeViewBox: false }
                ],
              }
            }
          },
        ]
      },
    );
    return config;
  }
};
