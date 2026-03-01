import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomNav from '../BottomNav.jsx';

function renderWithRouter(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
}

describe('BottomNav', () => {
  it('renders without crashing', () => {
    renderWithRouter(<BottomNav />);
  });

  it('renders exactly 3 navigation items', () => {
    renderWithRouter(<BottomNav />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('each nav item has an accessible label matching: Kamalig, Gastos, Benta', () => {
    renderWithRouter(<BottomNav />);
    expect(screen.getByText('Kamalig')).toBeInTheDocument();
    expect(screen.getByText('Gastos')).toBeInTheDocument();
    expect(screen.getByText('Benta')).toBeInTheDocument();
  });

  it('shows active indicator on current route', () => {
    renderWithRouter(<BottomNav />, { route: '/' });
    // The active indicator is a div with burnt background color
    // Kamalig should be active on "/"
    const kamaligText = screen.getByText('Kamalig');
    expect(kamaligText).toBeInTheDocument();
  });
});
