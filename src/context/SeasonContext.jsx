import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getActiveSeason } from '../services/seasonService.js';
import { getExpensesBySeason } from '../services/expenseService.js';
import Toast from '../components/ui/Toast.jsx';

const SeasonContext = createContext(null);

export function SeasonProvider({ children }) {
  const [season, setSeason] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
  }, []);

  const refresh = useCallback(async () => {
    const activeSeason = await getActiveSeason();
    setSeason(activeSeason);

    const exp = await getExpensesBySeason(activeSeason.id);
    setExpenses(exp);
    setTotalExpenses(exp.reduce((sum, e) => sum + e.value, 0));
  }, []);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);



  return (
    <SeasonContext.Provider
      value={{ season, expenses, totalExpenses, loading, refresh, showToast }}
    >
      {children}
      {toastMsg && <Toast message={toastMsg} onDismiss={() => setToastMsg('')} />}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) throw new Error('useSeason must be used inside SeasonProvider');
  return ctx;
}
