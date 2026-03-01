import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NegotiationSlider from '../NegotiationSlider.jsx';

describe('NegotiationSlider', () => {
  const defaultProps = {
    value: 20,
    onChange: vi.fn(),
    breakEvenPrice: 20,
    isProfitable: true,
  };

  it('renders without crashing', () => {
    render(<NegotiationSlider {...defaultProps} />);
    expect(screen.getByLabelText('Alok ng Mamimili')).toBeTruthy();
  });

  it('renders the title label', () => {
    render(<NegotiationSlider {...defaultProps} />);
    expect(screen.getByText(/Magkano ang alok ng buyer/)).toBeTruthy();
  });

  it('shows SULIT! when profitable', () => {
    render(<NegotiationSlider {...defaultProps} isProfitable={true} />);
    expect(screen.getByText('SULIT!')).toBeTruthy();
  });

  it('shows LUGI! when not profitable', () => {
    render(<NegotiationSlider {...defaultProps} isProfitable={false} />);
    expect(screen.getByText('LUGI!')).toBeTruthy();
  });

  it('displays the offer value formatted with ₱/kg', () => {
    render(<NegotiationSlider {...defaultProps} value={25.5} />);
    expect(screen.getByText(/₱25\.50\/kg/)).toBeTruthy();
  });

  it('renders a range input', () => {
    render(<NegotiationSlider {...defaultProps} />);
    const slider = screen.getByLabelText('Alok ng Mamimili');
    expect(slider.getAttribute('type')).toBe('range');
  });
});
