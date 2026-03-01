import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BigButton from '../BigButton.jsx';

describe('BigButton', () => {
  it('renders without crashing', () => {
    render(<BigButton>Test</BigButton>);
  });

  it('displays the passed label text', () => {
    render(<BigButton>Maglista ng Gastos</BigButton>);
    expect(screen.getByText('Maglista ng Gastos')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<BigButton onClick={handleClick}>Click Me</BigButton>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('has a minimum height of 56px', () => {
    render(<BigButton>Test</BigButton>);
    const button = screen.getByRole('button');
    expect(button.style.minHeight).toBe('56px');
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<BigButton onClick={handleClick} disabled>Click Me</BigButton>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with olive variant by default', () => {
    render(<BigButton>Default</BigButton>);
    const button = screen.getByRole('button');
    expect(button.style.background).toContain('linear-gradient');
  });
});
