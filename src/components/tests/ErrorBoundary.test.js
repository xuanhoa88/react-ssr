import renderer from 'react-test-renderer';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Routes>
            <Route errorElement={<ErrorBoundary />} />
          </Routes>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
