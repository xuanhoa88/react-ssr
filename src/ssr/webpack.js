import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotClientMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import webpackClientConfig from '../../tools/webpack.client';
import webpackServerConfig from '../../tools/webpack.server';

export default function webpackMiddlewares() {
  // reload=true: Enable auto reloading when changing JS files or content
  // timeout=1000: Time from disconnecting from server to reconnecting
  webpackClientConfig.entry.main.unshift(
    'webpack-hot-middleware/client?reload=true&timeout=1000'
  );

  // add HMR plugin
  webpackClientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // configure compilation
  const compiler = webpack([webpackClientConfig, webpackServerConfig]);

  return {
    // mount webpack dev middleware
    dev: webpackDevMiddleware(compiler, {
      serverSideRender: true,
      publicPath: webpackClientConfig.output.publicPath,
      writeToDisk: filePath => /loadable-stats\.json$/.test(filePath)
    }),
    // mount webpack hot reloading middleware
    clientHRM: webpackHotClientMiddleware(
      compiler.compilers.find(({ name }) => name === 'client')
    ),
    // server hot updates must be placed after client hot reload
    serverHMR: webpackHotServerMiddleware(compiler)
  };
}
