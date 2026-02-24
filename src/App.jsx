import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SeasonProvider } from './context/SeasonContext.jsx';
import AppShell from './components/layout/AppShell.jsx';
import HomePage from './pages/HomePage.jsx';
import ExpensesPage from './pages/ExpensesPage.jsx';
import NegotiationPage from './pages/NegotiationPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <SeasonProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gastos" element={<ExpensesPage />} />
            <Route path="/negosasyon" element={<NegotiationPage />} />
          </Routes>
        </AppShell>
      </SeasonProvider>
    </BrowserRouter>
  );
}
