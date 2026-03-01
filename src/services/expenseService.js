import { saveExpense, getExpensesBySeasonId, deleteExpense as storeDeleteExpense } from '../stores/expenseStore.js';
import { getActiveSeason } from './seasonService.js';

/**
 * Generate a UUID v4.
 */
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Create and persist a new expense.
 * @param {number} amount - User-entered peso amount (must be > 0)
 * @param {Blob|string|null} photo - Camera photo as Blob or dataURL string (optional)
 * @param {Object} extraData - Additional fields from LogModal (name, emoji, date, etc.)
 * @returns {Promise<Object>} The saved expense object
 */
export async function createExpense(amount, photo = null, extraData = {}) {
  const value = Number(amount);
  if (!value || value <= 0) throw new Error(`Invalid amount: "${amount}"`);

  const activeSeason = await getActiveSeason();

  const expense = {
    id: generateId(),
    seasonId: activeSeason.id,
    value,
    photoBlob: photo ?? null,
    timestamp: new Date().toISOString(),
    // Merge rich LogModal data (name, emoji, date, dateTime, amount, etc.)
    ...extraData,
  };

  await saveExpense(expense);
  return expense;
}

/**
 * Return all expenses for a given seasonId, sorted newest first.
 * @param {string} seasonId
 * @returns {Promise<Array>}
 */
export async function getExpensesBySeason(seasonId) {
  return getExpensesBySeasonId(seasonId);
}

/**
 * Delete a single expense by id.
 * @param {string} id
 */
export async function deleteExpense(id) {
  return storeDeleteExpense(id);
}
