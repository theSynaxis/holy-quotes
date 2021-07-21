import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../pages/index';

describe('Index Page Test', () => {
  test('Shallow Render', async () => {
    const { getByText } = render(<Home />);
    const title = getByText('The Synaxis Holy Quotes App');
    expect(title).toBeInTheDocument();
  });
});
