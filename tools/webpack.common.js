const env = require('../shared/env');
const paths = require('../shared/paths');

module.exports = target => {
  const sourceMap = env.isDevelopment && target === 'client';
  return {
    output: {
      path: paths.build,
      publicPath: process.env.PUBLIC_PATH || '/'
    },
    stats: 'minimal',
    mode: env.isProduction ? 'production' : 'development',
    devtool: env.isProduction ? 'source-map' : 'cheap-module-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: [/\.s[ac]ss$/i, /\.css$/i],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap,
                importLoaders: 2,
                modules: true
              }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap }
            }
          ]
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|webp)(\?v=\d+\.\d+\.\d+)?$/i,
          type: 'asset/resource'
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/i,
          type: 'asset/resource'
        },
        {
          test: /\.svg$/i,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }]
                },
                titleProp: true,
                ref: true
              }
            },
            'file-loader'
          ]
        }
      ]
    },
    plugins: []
  };
};
