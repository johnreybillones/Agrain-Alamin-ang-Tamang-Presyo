import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AmountInput from '../TierPicker.jsx';

describe('AmountInput', () => {
  it('renders without crashing', () => {
    render(<AmountInput value="" onChange={() => {}} />);
  });

  it('renders a number input', () => {
    render(<AmountInput value="" onChange={() => {}} />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('has the correct placeholder text', () => {
    render(<AmountInput value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Halimbawa: 100')).toBeInTheDocument();
  });

  it('calls onChange with a number when a valid value is typed', () => {
    const handleChange = vi.fn();
    render(<AmountInput value="" onChange={handleChange} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '500' } });
    expect(handleChange).toHaveBeenCalledWith(500);
  });

  it('calls onChange with empty string when input is cleared', () => {
    const handleChange = vi.fn();
    render(<AmountInput value="500" onChange={handleChange} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('does not call onChange for non-numeric input', () => {
    const handleChange = vi.fn();
    render(<AmountInput value="" onChange={handleChange} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).not.toHaveBeenCalled();
  });
});
