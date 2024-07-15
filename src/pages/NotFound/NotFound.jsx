import { Page, HttpStatus } from '../../components';

export default function NotFound() {
  return (
    <Page title="Not Found">
      <HttpStatus>
        <h3>404 - Page Not Found.</h3>
      </HttpStatus>
    </Page>
  );
}
