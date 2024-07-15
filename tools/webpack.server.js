const webpack = require('webpack');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const webpackCommon = require('./webpack.common');
const env = require('../shared/env');

module.exports = merge(webpackCommon('server'), {
  target: 'node',
  name: 'server',
  externals: [
    nodeExternals({
      allowlist: [/^@loadable\/component/]
    })
  ],
  entry: {
    main: env.isDevelopment ? ['./src/ssr/renderer.js'] : ['./src/server.js']
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].server.js'
  },
  node: {
    __filename: true,
    __dirname: true
  },
  plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]
});
