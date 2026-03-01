import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppShell from '../AppShell.jsx';

function renderWithRouter(ui) {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
}

describe('AppShell', () => {
  it('renders without crashing', () => {
    renderWithRouter(<AppShell><div>Test</div></AppShell>);
  });

  it('renders Header (contains "AGRAIN" text)', () => {
    renderWithRouter(<AppShell><div>Test</div></AppShell>);
    expect(screen.getByText('AGRAIN')).toBeInTheDocument();
  });

  it('renders BottomNav (contains nav items)', () => {
    renderWithRouter(<AppShell><div>Test</div></AppShell>);
    expect(screen.getByText('Kamalig')).toBeInTheDocument();
    expect(screen.getByText('Gastos')).toBeInTheDocument();
    expect(screen.getByText('Benta')).toBeInTheDocument();
  });

  it('renders child content passed to it', () => {
    renderWithRouter(
      <AppShell>
        <div data-testid="child-content">Hello Farmer</div>
      </AppShell>
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Hello Farmer')).toBeInTheDocument();
  });
});
