import ExpenseCard from './ExpenseCard.jsx';
import { COLORS } from '../../utils/designTokens.js';

/**
 * Scrollable list of logged expenses for the current season.
 * Extracted from LevelAppV2's GastosScreen expense list rendering.
 * @param {Array}    expenses  - List of expense objects
 * @param {function} onDelete  - Callback(index) when user deletes an expense
 */
export default function ExpenseList({ expenses, onDelete }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px', color: COLORS.muted, minHeight: 120,
      }}>
        <span style={{ fontSize: 14, textAlign: 'center', lineHeight: 1.6 }}>
          Walang nakalista, pindutin ang "Maglista ng Gastos" para magsimula.
        </span>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map((expense, i) => (
        <ExpenseCard key={expense.id ?? i} expense={expense} index={i} onDelete={onDelete} />
      ))}
    </div>
  );
}
