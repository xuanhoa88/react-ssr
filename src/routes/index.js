import { useRoutes } from 'react-router-dom';
import Root from '../pages/Root';
import Home from '../pages/Home';
import Todos from '../pages/Todos';
import NotFound from '../pages/NotFound';

import { ErrorBoundary, Page, HttpStatus } from '../components';

const initialRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: 'todos',
    element: <Todos />
  },
  {
    path: 'login',
    element: (
      <Page title="Login">
        <HttpStatus>
          <h3>Login</h3>
        </HttpStatus>
      </Page>
    )
  },
  {
    path: 'register',
    element: (
      <Page title="Register">
        <HttpStatus>
          <h3>Register</h3>
        </HttpStatus>
      </Page>
    )
  },

  {
    path: 'forgot-password',
    element: (
      <Page title="Forgot password">
        <HttpStatus>
          <h3>Forgot password</h3>
        </HttpStatus>
      </Page>
    )
  }
];

export function Routes() {
  const elements = useRoutes(initialRoutes);
  return elements;
}

export default [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [...initialRoutes]
  },
  {
    path: '*',
    element: <NotFound />
  }
];
