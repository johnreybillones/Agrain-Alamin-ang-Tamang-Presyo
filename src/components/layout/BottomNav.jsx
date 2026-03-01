import { NavLink, useLocation } from 'react-router-dom';
import { COLORS, FONTS } from '../../utils/designTokens.js';

const tabs = [
  { to: '/', key: 'sakahan', icon: '🛖', label: 'Kamalig' },
  { to: '/gastos', key: 'gastos', icon: '📋', label: 'Gastos' },
  { to: '/negosasyon', key: 'nego', icon: '⚖️', label: 'Benta' },
];

export default function BottomNav() {
  const location = useLocation();

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <nav className="level-bottomnav">
      {tabs.map((item) => {
        const active = isActive(item.to);
        return (
          <NavLink
            key={item.key}
            to={item.to}
            end={item.to === '/'}
            className="nav-btn"
            style={{ textDecoration: 'none' }}
          >
            <span style={{ fontSize: "clamp(20px, 4vw, 24px)" }}>{item.icon}</span>
            <span style={{
              fontSize: "clamp(9px, 1.8vw, 11px)",
              fontWeight: active ? 800 : 500,
              color: active ? COLORS.burnt : COLORS.muted,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}>
              {item.label}
            </span>
            {active && (
              <div style={{
                width: 24, height: 3, borderRadius: 2,
                background: COLORS.burnt, marginTop: 2,
              }} />
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
