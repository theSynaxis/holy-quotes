import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../../components/layout/Header';

describe('Header Layout Component Test', () => {
  test('Header Renders', async () => {
    const { getByText } = render(<Home />);
    const title = getByText('The Synaxis');
    expect(title).toBeInTheDocument();
  });
});
