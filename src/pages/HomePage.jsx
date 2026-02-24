import { useNavigate } from 'react-router-dom';
import { useSeason } from '../context/SeasonContext.jsx';
import { deleteExpense } from '../services/expenseService.js';
import BucketVisual from '../components/negotiation/BucketVisual.jsx';
import BigButton from '../components/ui/BigButton.jsx';
import ExpenseList from '../components/expenses/ExpenseList.jsx';

export default function HomePage() {
  const { totalExpenses, expenses, loading, refresh, showToast } = useSeason();
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      await deleteExpense(id);
      await refresh();
      showToast('Na-bura na ang gastos.');
    } catch {
      showToast('May error sa pagbura. Subukan muli.');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">Naglo-load…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Bucket visual — seasonal cost tank */}
      <div className="flex flex-col items-center">
        <BucketVisual totalExpenses={totalExpenses} />
      </div>

      {/* Quick-log button */}
      <div className="px-4">
        <BigButton
          onClick={() => navigate('/gastos')}
          className="w-full bg-green-700 text-white text-xl shadow-md"
        >
          📋 Mag-log ng Gastos
        </BigButton>
      </div>

      {/* Quick negotiation shortcut */}
      <div className="px-4">
        <BigButton
          onClick={() => navigate('/negosasyon')}
          className="w-full bg-orange-500 text-white text-xl shadow-md"
        >
          ⚖️ I-check ang Alok
        </BigButton>
      </div>

      {/* Recent expenses preview (last 3) */}
      {expenses.length > 0 && (
        <div className="px-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">Mga Huling Gastos</p>
          <ExpenseList expenses={expenses.slice(0, 3)} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
