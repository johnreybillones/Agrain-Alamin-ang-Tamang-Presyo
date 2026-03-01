import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../HomePage.jsx';

// Mock useSeason so we control context values without needing the full provider stack
vi.mock('../../context/SeasonContext.jsx', () => ({
  useSeason: vi.fn(),
}));

import { useSeason } from '../../context/SeasonContext.jsx';

const baseContextValue = {
  totalExpenses: 0,
  expenses: [],
  loading: false,
  refresh: vi.fn(),
  showToast: vi.fn(),
  season: null,
};

describe('HomePage', () => {
  it('renders without crashing', () => {
    useSeason.mockReturnValue(baseContextValue);
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    // BucketVisual + page header — at least one match is fine
    expect(screen.getAllByText(/Kabuuang Gastos/i).length).toBeGreaterThan(0);
  });

  it('renders the log expense button', () => {
    useSeason.mockReturnValue(baseContextValue);
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getAllByText(/Maglista ng Gastos/).length).toBeGreaterThan(0);
  });

  it('renders the negotiation button', () => {
    useSeason.mockReturnValue(baseContextValue);
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByText(/Magkano dapat ang benta/)).toBeTruthy();
  });

  it('shows loading state when loading is true', () => {
    useSeason.mockReturnValue({ ...baseContextValue, loading: true });
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByText(/Naglo-load/)).toBeTruthy();
  });

  it('displays total expenses in the BucketVisual', () => {
    useSeason.mockReturnValue({ ...baseContextValue, totalExpenses: 5000 });
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByText('5,000')).toBeTruthy();
  });
});
