import { hydrateRoot } from 'react-dom/client';
import { loadableReady } from '@loadable/component';
import { createFrontloadState } from 'react-frontload';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import * as services from './services';
import App from './components/App';

const router = createBrowserRouter(routes);

const frontloadState = createFrontloadState.client({
  context: services,
  serverRenderedData: window.__UNIVERSSR_FRONTLOAD_DATA__
});

loadableReady(() =>
  hydrateRoot(
    document.getElementById('root'),
    <App frontloadState={frontloadState}>
      <RouterProvider router={router} />
    </App>
  )
);
