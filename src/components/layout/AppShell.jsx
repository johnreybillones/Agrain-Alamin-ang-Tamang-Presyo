import Header from './Header.jsx';
import BottomNav from './BottomNav.jsx';

export default function AppShell({ children }) {
  return (
    <div className="level-root">
      <Header />
      <main className="screen-body">{children}</main>
      <BottomNav />
    </div>
  );
}
