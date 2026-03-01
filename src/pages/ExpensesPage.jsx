import { useState } from 'react';
import { useSeason } from '../context/SeasonContext.jsx';
import { createExpense, deleteExpense } from '../services/expenseService.js';
import ExpenseList from '../components/expenses/ExpenseList.jsx';
import LogModal from '../components/expenses/LogModal.jsx';
import ConfirmAnimation from '../components/ui/ConfirmAnimation.jsx';
import BigButton from '../components/ui/BigButton.jsx';
import { COLORS, FONTS } from '../utils/designTokens.js';

export default function ExpensesPage() {
  const { expenses, totalExpenses, refresh, showToast } = useSeason();
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSave(expenseData) {
    try {
      await createExpense(expenseData.amount, expenseData.photo, expenseData);
      await refresh();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 900);
    } catch {
      showToast('May error. Subukan muli.');
    }
  }

  async function handleDelete(index) {
    try {
      const expense = expenses[index];
      if (expense?.id) {
        await deleteExpense(expense.id);
        await refresh();
      }
    } catch {
      showToast('May error sa pagbura. Subukan muli.');
    }
  }

  return (
    <>
      {/* Success flash overlay */}
      <ConfirmAnimation visible={showSuccess} />

      {/* Log modal — full-screen camera + form flow */}
      <LogModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />

      {/* Gastos screen body */}
      <div className="screen-body gastos-screen-layout">
        {/* Header */}
        <div className="gastos-header" style={{ flexShrink: 0 }}>
          <div style={{ marginBottom: 4, textAlign: 'right' }}>
            <span style={{
              fontFamily: FONTS.duvet,
              fontSize: 'clamp(14px, 2.8vw, 18px)',
              color: COLORS.dark,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}>
              Kabuuang gastos:{' '}
            </span>
            <span style={{
              fontFamily: FONTS.duvet,
              fontSize: 'clamp(18px, 3.5vw, 24px)',
              letterSpacing: 1,
              color: COLORS.pula,
              fontWeight: 700,
            }}>
              ₱{totalExpenses.toLocaleString()}
            </span>
          </div>

          <BigButton variant="olive" onClick={() => setShowModal(true)}>
            📝&nbsp;Maglista ng Gastos
          </BigButton>

          <div style={{
            fontFamily: FONTS.duvet,
            fontSize: 'clamp(18px, 3.5vw, 24px)',
            color: COLORS.dark,
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginTop: 20,
            marginBottom: 6,
          }}>
            Mga gastos:
          </div>
        </div>

        {/* Scrollable expense list */}
        <div className="gastos-list-box">
          <ExpenseList expenses={expenses} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
}
