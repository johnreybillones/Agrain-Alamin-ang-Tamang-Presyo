import { useNavigate } from 'react-router-dom';
import { useSeason } from '../context/SeasonContext.jsx';
import { deleteExpense } from '../services/expenseService.js';
import BucketVisual from '../components/negotiation/BucketVisual.jsx';
import BigButton from '../components/ui/BigButton.jsx';
import { COLORS, FONTS } from '../utils/designTokens.js';

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
        <p style={{ fontFamily: FONTS.body, color: COLORS.muted, fontSize: 18 }}>Naglo-load…</p>
      </div>
    );
  }

  return (
    <div className="screen-body">
      {/* Header label */}
      <div style={{
        fontFamily: FONTS.duvet,
        fontSize: 'clamp(18px, 3.5vw, 24px)',
        color: COLORS.dark,
        letterSpacing: 2,
        textTransform: 'uppercase',
      }}>
        Kabuuang Gastos
      </div>

      {/* Bucket visual */}
      <BucketVisual
        totalExpenses={totalExpenses}
        expenseCount={expenses.length}
      />

      {/* Action buttons */}
      <BigButton variant="olive" onClick={() => navigate('/gastos')}>
        📝&nbsp;Maglista ng Gastos
      </BigButton>
      <BigButton variant="burnt" onClick={() => navigate('/negosasyon')}>
        ⚖️&nbsp;Magkano dapat ang benta?
      </BigButton>
    </div>
  );
}

