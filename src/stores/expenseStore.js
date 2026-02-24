import { expenseDB } from './db.js';

/**
 * Save a single expense object. Uses expense.id as the key.
 */
export async function saveExpense(expense) {
  return expenseDB.setItem(expense.id, expense);
}

/**
 * Retrieve all expenses for a given seasonId, sorted newest first.
 */
export async function getExpensesBySeasonId(seasonId) {
  const expenses = [];
  await expenseDB.iterate((value) => {
    if (value.seasonId === seasonId) {
      expenses.push(value);
    }
  });
  return expenses.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

/**
 * Retrieve all expenses across all seasons.
 */
export async function getAllExpenses() {
  const expenses = [];
  await expenseDB.iterate((value) => {
    expenses.push(value);
  });
  return expenses;
}

/**
 * Delete an expense by id.
 */
export async function deleteExpense(id) {
  return expenseDB.removeItem(id);
}

/**
 * Delete all expenses for a given seasonId.
 */
export async function deleteExpensesBySeason(seasonId) {
  const toDelete = [];
  await expenseDB.iterate((value, key) => {
    if (value.seasonId === seasonId) toDelete.push(key);
  });
  await Promise.all(toDelete.map((key) => expenseDB.removeItem(key)));
}
