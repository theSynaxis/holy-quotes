import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../pages/index';

describe('Index Page Test', () => {
  test('Homepage Renders', async () => {
    const { getByText } = render(<Home />);
    const title = getByText('The Synaxis Holy Quotes App');
    expect(title).toBeInTheDocument();
  });

  test('Daily Saint Component Renders', async () => {
    const { getByText } = render(<Home />);
    const title = getByText('Saint Kosmas Aitolos');
    expect(title).toBeInTheDocument();
  });
});
