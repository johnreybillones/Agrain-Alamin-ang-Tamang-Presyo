import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/', label: 'Tahanan', icon: '🏠' },
  { to: '/gastos', label: 'Gastos', icon: '📋' },
  { to: '/negosasyon', label: 'Negosasyon', icon: '⚖️' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex z-20 shadow-up">
      {tabs.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex-1 min-h-16 flex flex-col items-center justify-center gap-1 text-sm font-semibold transition-colors ${
              isActive ? 'text-green-700' : 'text-gray-500'
            }`
          }
        >
          <span className="text-2xl leading-none">{icon}</span>
          <span className="text-xs">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
