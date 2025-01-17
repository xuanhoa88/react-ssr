import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary({ children }) {
  const error = useRouteError();

  if (!error) {
    return <>{children}</>;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
