import { render } from '@testing-library/react';

import Login from '../src/app/auth/login/page';

it('renders homepage unchanged', () => {
  const { container } = render(<Login />);
  expect(container).toMatchSnapshot();
});
