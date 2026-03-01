import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExpensesPage from '../ExpensesPage.jsx';

vi.mock('../../context/SeasonContext.jsx', () => ({
  useSeason: vi.fn(),
}));
// Mock getUserMedia for LogModal → CameraCapture
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: { getUserMedia: vi.fn().mockResolvedValue({ getTracks: () => [{ stop: vi.fn() }] }) },
  writable: true,
  configurable: true,
});
HTMLVideoElement.prototype.play = vi.fn();

import { useSeason } from '../../context/SeasonContext.jsx';

const baseContextValue = {
  expenses: [],
  totalExpenses: 0,
  refresh: vi.fn(),
  showToast: vi.fn(),
  season: { id: 'test-season' },
};

describe('ExpensesPage', () => {
  it('renders without crashing', () => {
    useSeason.mockReturnValue(baseContextValue);
    render(<MemoryRouter><ExpensesPage /></MemoryRouter>);
    // Button text appears in the header — at least one match is sufficient
    expect(screen.getAllByText(/Maglista ng Gastos/).length).toBeGreaterThan(0);
  });

  it('shows the total expenses header', () => {
    useSeason.mockReturnValue({ ...baseContextValue, totalExpenses: 2500 });
    render(<MemoryRouter><ExpensesPage /></MemoryRouter>);
    expect(screen.getByText(/Kabuuang gastos/i)).toBeTruthy();
  });

  it('shows empty state in expense list when no expenses', () => {
    useSeason.mockReturnValue(baseContextValue);
    render(<MemoryRouter><ExpensesPage /></MemoryRouter>);
    expect(screen.getByText(/Walang nakalista/)).toBeTruthy();
  });

  it('renders the Mga gastos section header', () => {
    useSeason.mockReturnValue(baseContextValue);
    render(<MemoryRouter><ExpensesPage /></MemoryRouter>);
    expect(screen.getByText(/Mga gastos:/)).toBeTruthy();
  });
});
