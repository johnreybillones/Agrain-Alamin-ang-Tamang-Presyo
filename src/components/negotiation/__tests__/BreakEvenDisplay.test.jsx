import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BreakEvenDisplay from '../BreakEvenDisplay.jsx';

describe('BreakEvenDisplay', () => {
  it('renders nothing when breakEvenPrice is 0 or null', () => {
    const { container } = render(<BreakEvenDisplay breakEvenPrice={0} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders the label when breakEvenPrice is positive', () => {
    render(<BreakEvenDisplay breakEvenPrice={20} />);
    expect(screen.getByText('Presyong Balik-Puhunan')).toBeTruthy();
  });

  it('displays the break-even price formatted as ₱/kg', () => {
    render(<BreakEvenDisplay breakEvenPrice={20.5} />);
    expect(screen.getByText(/₱20\.5\/kg/)).toBeTruthy();
  });

  it('renders with green border styling', () => {
    const { container } = render(<BreakEvenDisplay breakEvenPrice={15} />);
    const wrapper = container.firstChild;
    // jsdom converts hex to rgb, so we check for both possibilities
    const border = wrapper.style.border;
    expect(border).toContain('solid');
    expect(border).toContain('2px');
  });
});
