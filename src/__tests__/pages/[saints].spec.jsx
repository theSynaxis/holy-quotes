import React from 'react';
import { render } from '@testing-library/react';
import Saint from '../../pages/[saint]';

describe('Saint Page Test', () => {
  test('Shallow Render', async () => {
    const { getByText } = render(<Saint />);
    const title = getByText('Saint Kosmas Aitolos');
    expect(title).toBeInTheDocument();
  });
});
