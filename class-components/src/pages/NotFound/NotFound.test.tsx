import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from './NotFound';

test('renders NotFound component correctly', () => {
  const { container } = render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});
