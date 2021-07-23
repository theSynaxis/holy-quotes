import React from 'react';
import { render, screen } from '@testing-library/react';
import Saint from '../../pages/saints/[id]';

describe('Saint Page Test', () => {
  test('Saint Page Renders', async () => {
    const { getByText } = render(<Saint />);
    const title = getByText('Saint Kosmas Aitolos');
    expect(title).toBeInTheDocument();
  });

  test('Header Layout Renders', async () => {
    render(<Saint />);
    const heading = screen.getByText('The Synaxis');
    expect(heading).toBeInTheDocument();
  });
});
