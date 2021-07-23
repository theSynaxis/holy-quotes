import React from 'react';
import { render } from '@testing-library/react';
import DailySaint from '../../../../components/domain/synaxarion/DailySaint';

describe('Daily Saint Component Test', () => {
  test('Component Renders', async () => {
    const { getByText } = render(<DailySaint />);
    const title = getByText('Saint Kosmas Aitolos');
    expect(title).toBeInTheDocument();
  });
});
