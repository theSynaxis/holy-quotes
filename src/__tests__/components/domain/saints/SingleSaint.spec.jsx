import React from 'react';
import { render } from '@testing-library/react';
import SingleSaint from '../../../../components/domain/saints/SingleSaint';

describe('Single Saint Component Test', () => {
  test('Component Renders', async () => {
    const { getByText } = render(<SingleSaint />);
    const title = getByText('Saint Kosmas Aitolos');
    expect(title).toBeInTheDocument();
  });
});
