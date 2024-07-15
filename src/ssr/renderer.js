import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { createFrontloadState, frontloadServerRender } from 'react-frontload';
import { minify } from 'html-minifier';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider
} from 'react-router-dom/server';
import serialize from 'serialize-javascript';
import path from 'path';
import * as env from '../../shared/env';
import * as paths from '../../shared/paths';
import html from '../static/html';
import * as services from '../services';
import routes from '../routes';
import App from '../components/App';

function createHtmlPageContent(data) {
  if (env.isDevelopment) {
    return html(data);
  }

  return minify(html(data), {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    trimCustomFragments: true
  });
}

function createFetchRequest(req, res) {
  const origin = `${req.protocol}://${req.get('host')}`;

  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  res.on('close', () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init = {
    headers,
    method: req.method,
    signal: controller.signal
  };

  if (!['GET', 'HEAD'].includes(req.method)) {
    init.body = req.body;
  }

  return new Request(url.href, init);
}

export default function renderer() {
  const { query, dataRoutes } = createStaticHandler(routes);

  return async (req, res, next) => {
    try {
      const fetchRequest = createFetchRequest(req, res);
      const context = await query(fetchRequest);

      // If we got a redirect response, short circuit and let our Express server
      // handle that directly
      if (context instanceof Response) {
        if ([301, 302, 303, 307, 308].includes(context.status)) {
          return res.redirect(context.status, context.headers.get('Location'));
        }
        throw context;
      }

      const router = createStaticRouter(dataRoutes, context);

      const statsFile = path.join(paths.build, 'loadable-stats.json');
      const extractor = new ChunkExtractor({ statsFile });

      const frontloadState = createFrontloadState.server({
        context: services
      });

      // Wrap your application using "collectChunks"
      const jsx = extractor.collectChunks(
        <App frontloadState={frontloadState}>
          <StaticRouterProvider router={router} context={context} />
        </App>
      );

      // Render your application
      const { rendered, data } = await frontloadServerRender({
        frontloadState,
        render() {
          return renderToString(jsx);
        }
      });
      const frontloadData = serialize(data, { isJSON: true });

      const scriptTags = extractor.getScriptTags();
      const styleTags = extractor.getStyleTags();

      const helmet = Helmet.renderStatic();

      res.status(200);
      res.send(
        createHtmlPageContent({
          helmet,
          styleTags,
          scriptTags,
          rendered,
          frontloadData
        })
      );
    } catch (err) {
      next(new Error(err));
    }
  };
}
