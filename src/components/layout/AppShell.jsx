import Header from './Header.jsx';
import BottomNav from './BottomNav.jsx';

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
