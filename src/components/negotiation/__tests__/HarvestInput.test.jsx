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

  it('calls onChange on every keystroke (live update)', () => {
    const onChange = vi.fn();
    render(<HarvestInput value="" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('(Halimbawa: 500)'), {
      target: { value: '500' },
    });
    expect(onChange).toHaveBeenCalledWith('500');
  });

  it('does not call onChange when value exceeds 99999', () => {
    const onChange = vi.fn();
    render(<HarvestInput value="" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('(Halimbawa: 500)'), {
      target: { value: '100000' },
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has an aria-label for accessibility', () => {
    render(<HarvestInput value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText('Timbang ng Ani (kg)')).toBeTruthy();
  });
});
