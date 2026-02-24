import { TIER_VALUES } from '../utils/constants.js';
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
 * @param {string} tier - "Small" | "Medium" | "Large"
 * @param {Blob|null} photoBlob - Camera-captured receipt photo (optional)
 * @returns {Promise<Object>} The saved expense object
 */
export async function createExpense(tier, photoBlob = null) {
  const value = TIER_VALUES[tier];
  if (value === undefined) throw new Error(`Invalid tier: "${tier}"`);

  const activeSeason = await getActiveSeason();

  const expense = {
    id: generateId(),
    seasonId: activeSeason.id,
    tier,
    value,
    photoBlob: photoBlob ?? null,
    timestamp: new Date().toISOString(),
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
