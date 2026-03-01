import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../Header.jsx';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('contains the text "AGRAIN" (app name)', () => {
    render(<Header />);
    expect(screen.getByText('AGRAIN')).toBeInTheDocument();
  });

  it('contains the tagline text', () => {
    render(<Header />);
    expect(screen.getByText('Alamin ang tamang presyo.')).toBeInTheDocument();
  });

  it('contains the grain emoji icon', () => {
    render(<Header />);
    expect(screen.getByText('🌾')).toBeInTheDocument();
  });
});
