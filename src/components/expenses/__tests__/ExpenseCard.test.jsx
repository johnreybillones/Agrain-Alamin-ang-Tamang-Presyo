import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExpenseCard from '../ExpenseCard.jsx';

const mockExpense = {
  name: 'Pataba',
  emoji: '🧪',
  amount: 2500,
  date: 'June 01, 2025',
  dateTime: 'June 01, 2025 - 10:00 AM',
  photo: null,
};

describe('ExpenseCard', () => {
  it('renders without crashing given a valid expense object', () => {
    render(<ExpenseCard expense={mockExpense} index={0} onDelete={() => {}} />);
  });

  it('displays the expense amount formatted with ₱', () => {
    render(<ExpenseCard expense={mockExpense} index={0} onDelete={() => {}} />);
    expect(screen.getByText('₱2,500')).toBeInTheDocument();
  });

  it('displays the category name', () => {
    render(<ExpenseCard expense={mockExpense} index={0} onDelete={() => {}} />);
    expect(screen.getByText('Pataba')).toBeInTheDocument();
  });

  it('has a delete button', () => {
    render(<ExpenseCard expense={mockExpense} index={0} onDelete={() => {}} />);
    expect(screen.getByLabelText('Alisin sa listahan')).toBeInTheDocument();
  });

  it('shows emoji when no photo', () => {
    render(<ExpenseCard expense={mockExpense} index={0} onDelete={() => {}} />);
    expect(screen.getByText('🧪')).toBeInTheDocument();
  });
});
