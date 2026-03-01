import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BucketVisual from '../BucketVisual.jsx';

describe('BucketVisual', () => {
  it('renders without crashing', () => {
    render(<BucketVisual totalExpenses={0} />);
    expect(screen.getByText('Kabuuang Gastos')).toBeTruthy();
  });

  it('displays the total expenses amount', () => {
    render(<BucketVisual totalExpenses={5000} />);
    expect(screen.getByText('5,000')).toBeTruthy();
  });

  it('renders the peso sign', () => {
    render(<BucketVisual totalExpenses={1000} />);
    expect(screen.getByText('₱')).toBeTruthy();
  });

  it('shows empty state message when expenseCount is 0', () => {
    render(<BucketVisual totalExpenses={0} expenseCount={0} />);
    expect(screen.getByText(/Wala pang nakalista/)).toBeTruthy();
  });

  it('shows expense count message when expenses exist', () => {
    render(<BucketVisual totalExpenses={5000} expenseCount={3} />);
    expect(screen.getByText(/3 ang gastos/)).toBeTruthy();
  });

  it('has bucket-tank class for CSS styling', () => {
    const { container } = render(<BucketVisual totalExpenses={1000} />);
    expect(container.querySelector('.bucket-tank')).toBeTruthy();
  });

  it('bucket fill does not exceed 100%', () => {
    const { container } = render(<BucketVisual totalExpenses={50000} maxExpenses={35000} />);
    const fill = container.querySelector('.bucket-fill');
    expect(fill.style.height).toBe('100%');
  });
});
