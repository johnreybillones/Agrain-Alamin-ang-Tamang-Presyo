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

// Normalize short keys (S/M/L) to full keys (Small/Medium/Large)
const TIER_ALIAS = { S: 'Small', M: 'Medium', L: 'Large' };

/**
 * Create and persist a new expense.
 * @param {string} tier - "Small"|"Medium"|"Large" or short form "S"|"M"|"L"
 * @param {Blob|string|null} photo - Camera photo as Blob or dataURL string (optional)
 * @param {Object} extraData - Additional fields from LogModal (name, emoji, date, etc.)
 * @returns {Promise<Object>} The saved expense object
 */
export async function createExpense(tier, photo = null, extraData = {}) {
  const normalizedTier = TIER_ALIAS[tier] ?? tier;
  const value = TIER_VALUES[normalizedTier];
  if (value === undefined) throw new Error(`Invalid tier: "${tier}"`);

  const activeSeason = await getActiveSeason();

  const expense = {
    id: generateId(),
    seasonId: activeSeason.id,
    tier: normalizedTier,
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
