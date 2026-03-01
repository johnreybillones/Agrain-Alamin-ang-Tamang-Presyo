import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NegotiationPage from '../NegotiationPage.jsx';

vi.mock('../../context/SeasonContext.jsx', () => ({
  useSeason: vi.fn(),
}));
vi.mock('../../services/seasonService.js', () => ({
  updateSeason: vi.fn().mockResolvedValue(undefined),
}));

import { useSeason } from '../../context/SeasonContext.jsx';

const baseContextValue = {
  totalExpenses: 0,
  expenses: [],
  season: { id: 'test-season' },
  refresh: vi.fn(),
  showToast: vi.fn(),
};

describe('NegotiationPage', () => {
  it('renders without crashing', () => {
    useSeason.mockReturnValue(baseContextValue);
    render(<MemoryRouter><NegotiationPage /></MemoryRouter>);
    // Empty state shown when no expenses
    expect(screen.getByText(/Maglista muna ng gastos/i)).toBeTruthy();
  });

  it('shows the empty state when no expenses exist', () => {
    useSeason.mockReturnValue(baseContextValue);
    render(<MemoryRouter><NegotiationPage /></MemoryRouter>);
    expect(screen.getByText(/Para makita ang tamang presyo/)).toBeTruthy();
  });

  it('shows harvest input when there are expenses', () => {
    useSeason.mockReturnValue({ ...baseContextValue, totalExpenses: 5000 });
    render(<MemoryRouter><NegotiationPage /></MemoryRouter>);
    expect(screen.getByText(/Suriin ang tamang presyo/i)).toBeTruthy();
    expect(screen.getByText(/Ilang kilo ang ani/)).toBeTruthy();
  });

  it('shows the total cost when expenses exist', () => {
    useSeason.mockReturnValue({ ...baseContextValue, totalExpenses: 7500 });
    render(<MemoryRouter><NegotiationPage /></MemoryRouter>);
    expect(screen.getByText(/7,500/)).toBeTruthy();
  });
});
