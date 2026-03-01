import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HarvestInput from '../HarvestInput.jsx';

describe('HarvestInput', () => {
  it('renders without crashing', () => {
    render(<HarvestInput value="" onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('(Halimbawa: 500)')).toBeTruthy();
  });

  it('renders the title label', () => {
    render(<HarvestInput value="" onChange={vi.fn()} />);
    expect(screen.getByText(/Ilang kilo ang ani/)).toBeTruthy();
  });

  it('renders the helper text', () => {
    render(<HarvestInput value="" onChange={vi.fn()} />);
    expect(screen.getByText(/Ilagay ang timbang/)).toBeTruthy();
  });

  it('does NOT call onChange while typing (deferred until blur)', () => {
    const onChange = vi.fn();
    render(<HarvestInput value="" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('(Halimbawa: 500)'), {
      target: { value: '500' },
    });
    // onChange must NOT fire mid-keystroke — only on blur/Enter
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange with committed value on blur', () => {
    const onChange = vi.fn();
    render(<HarvestInput value="" onChange={onChange} />);
    const input = screen.getByPlaceholderText('(Halimbawa: 500)');
    fireEvent.change(input, { target: { value: '500' } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith('500');
  });

  it('has an aria-label for accessibility', () => {
    render(<HarvestInput value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText('Timbang ng Ani (kg)')).toBeTruthy();
  });
});
