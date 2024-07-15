const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackCommon = require('./webpack.common');
const env = require('../shared/env');
const paths = require('../shared/paths');

const isAnalyze = Boolean(process.env.ANALYZE_MODE) === true;

module.exports = merge(webpackCommon('client'), {
  target: 'web',
  name: 'client',
  entry: {
    main: ['./src/client.js']
  },
  output: {
    libraryTarget: 'umd',
    filename: '[name].client.js'
  },
  optimization: {
    // @see: https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
    // @see: https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#options
    minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()]
  },
  // for more about performance hints
  // @see: https://webpack.js.org/configuration/performance/#performance
  performance: env.isDevelopment
    ? { hints: false }
    : {
        maxEntrypointSize: 400000,
        maxAssetSize: 400000,
        assetFilter: assetFilename => !/\.map$/.test(assetFilename)
      },
  plugins: [
    new webpack.ProgressPlugin(),
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(paths.assets, '**/*'),
          to: paths.build
        }
      ]
    }),
    ...(env.isDevelopment
      ? [new ReactRefreshWebpackPlugin()]
      : [
          new BundleAnalyzerPlugin({
            analyzerMode: isAnalyze ? 'server' : 'disabled',
            openAnalyzer: isAnalyze
          })
        ])
  ]
});
