import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TierPicker from '../TierPicker.jsx';

describe('TierPicker', () => {
  it('renders without crashing', () => {
    render(<TierPicker selected="" onSelect={() => {}} />);
  });

  it('renders exactly 3 tier buttons', () => {
    render(<TierPicker selected="" onSelect={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('each button displays correct label: MALIIT, KATAMTAMAN, MALAKI', () => {
    render(<TierPicker selected="" onSelect={() => {}} />);
    expect(screen.getByText('MALIIT')).toBeInTheDocument();
    expect(screen.getByText('KATAMTAMAN')).toBeInTheDocument();
    expect(screen.getByText('MALAKI')).toBeInTheDocument();
  });

  it('each button displays correct value from root tier values (₱500/₱2,500/₱7,000)', () => {
    render(<TierPicker selected="" onSelect={() => {}} />);
    // Check via aria-labels which contain the sub-text
    expect(screen.getByLabelText(/MALIIT/)).toBeInTheDocument();
    expect(screen.getByLabelText(/KATAMTAMAN/)).toBeInTheDocument();
    expect(screen.getByLabelText(/MALAKI/)).toBeInTheDocument();
  });

  it('calls onSelect callback with correct tier key when clicked', () => {
    const handleSelect = vi.fn();
    render(<TierPicker selected="" onSelect={handleSelect} />);

    fireEvent.click(screen.getByText('MALIIT'));
    expect(handleSelect).toHaveBeenCalledWith('S');

    fireEvent.click(screen.getByText('KATAMTAMAN'));
    expect(handleSelect).toHaveBeenCalledWith('M');

    fireEvent.click(screen.getByText('MALAKI'));
    expect(handleSelect).toHaveBeenCalledWith('L');
  });
});
