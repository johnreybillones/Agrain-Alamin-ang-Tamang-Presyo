import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExpenseList from '../ExpenseList.jsx';

const mockExpenses = [
  { name: 'Pataba', emoji: '🧪', amount: 2500, date: 'June 01, 2025', dateTime: 'June 01, 2025 - 10:00 AM', photo: null },
  { name: 'Binhi', emoji: '🌱', amount: 500, date: 'June 02, 2025', dateTime: 'June 02, 2025 - 08:00 AM', photo: null },
  { name: 'Kagamitan', emoji: '🚜', amount: 7000, date: 'June 03, 2025', dateTime: 'June 03, 2025 - 02:00 PM', photo: null },
];

describe('ExpenseList', () => {
  it('renders without crashing with an empty array', () => {
    render(<ExpenseList expenses={[]} onDelete={() => {}} />);
  });

  it('renders correct number of ExpenseCard components for a given array', () => {
    render(<ExpenseList expenses={mockExpenses} onDelete={() => {}} />);
    // Each card has a delete button with aria-label "Alisin sa listahan"
    const deleteButtons = screen.getAllByLabelText('Alisin sa listahan');
    expect(deleteButtons).toHaveLength(3);
  });

  it('shows empty state message when array is empty', () => {
    render(<ExpenseList expenses={[]} onDelete={() => {}} />);
    expect(screen.getByText(/Walang nakalista/i)).toBeInTheDocument();
  });

  it('shows empty state message when expenses is null', () => {
    render(<ExpenseList expenses={null} onDelete={() => {}} />);
    expect(screen.getByText(/Walang nakalista/i)).toBeInTheDocument();
  });
});
