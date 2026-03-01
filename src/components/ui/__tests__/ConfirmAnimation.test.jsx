import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConfirmAnimation from '../ConfirmAnimation.jsx';

describe('ConfirmAnimation', () => {
  it('renders without crashing when visible is true', () => {
    render(<ConfirmAnimation visible={true} />);
  });

  it('does not render visible content when visible is false', () => {
    const { container } = render(<ConfirmAnimation visible={false} />);
    expect(container.innerHTML).toBe('');
  });

  it('displays checkmark when visible', () => {
    render(<ConfirmAnimation visible={true} />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('displays "Nailista na" text when visible', () => {
    render(<ConfirmAnimation visible={true} />);
    expect(screen.getByText('Nailista na')).toBeInTheDocument();
  });
});
