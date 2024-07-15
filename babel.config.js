const env = require('./shared/env');

module.exports = function (api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { corejs: 3, useBuiltIns: 'usage' }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ];

  const plugins = [
    '@loadable/babel-plugin',
    '@babel/plugin-transform-strict-mode',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-dynamic-import',
    '@babel/plugin-transform-modules-commonjs'
  ];

  return {
    presets,
    plugins: env.isDevelopment
      ? [...plugins]
      : ['transform-react-remove-prop-types', ...plugins]
  };
};
