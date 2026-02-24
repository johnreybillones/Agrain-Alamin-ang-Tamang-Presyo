import ExpenseCard from './ExpenseCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

/**
 * Scrollable list of logged expenses for the current season.
 * @param {Array}    expenses  - List of expense objects
 * @param {function} onDelete  - Optional callback(id) when user deletes an expense
 */
export default function ExpenseList({ expenses, onDelete }) {
  if (!expenses || expenses.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </div>
  );
}
