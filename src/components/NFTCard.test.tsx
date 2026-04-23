import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NFTCard from './NFTCard';

describe('NFTCard', () => {
  it('renders NFT details correctly', () => {
    const props = {
      id: '1',
      name: 'Test NFT',
      image: 'https://example.com/image.png',
      description: 'Test Description'
    };

    render(<NFTCard {...props} />);

    expect(screen.getByText('Test NFT')).toBeDefined();
    expect(screen.getByText('Test Description')).toBeDefined();
    expect(screen.getByText('Token ID: #1')).toBeDefined();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', props.image);
    expect(img).toHaveAttribute('alt', props.name);
  });
});
