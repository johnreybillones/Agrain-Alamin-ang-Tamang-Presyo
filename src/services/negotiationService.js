import { getExpensesBySeason } from './expenseService.js';
import { getActiveSeason } from './seasonService.js';
import { calculateBreakEven } from '../utils/breakeven.js';

/**
 * Calculate the break-even price per kilo for the current active season.
 * @param {number} totalWeight - Harvest weight in kg entered by the farmer
 * @returns {Promise<number>} Break-even price per kg
 */
export async function calculateBreakEvenForSeason(totalWeight) {
  const activeSeason = await getActiveSeason();
  if (!activeSeason) return 0;

  const expenses = await getExpensesBySeason(activeSeason.id);
  const totalCost = expenses.reduce((sum, e) => sum + e.value, 0);

  return calculateBreakEven(totalCost, totalWeight);
}

/**
 * Return total expense amount and count for the current active season.
 * @returns {Promise<{totalExpenses: number, count: number, expenses: Array}>}
 */
export async function getSeasonTotals() {
  const activeSeason = await getActiveSeason();
  if (!activeSeason) return { totalExpenses: 0, count: 0, expenses: [] };

  const expenses = await getExpensesBySeason(activeSeason.id);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.value, 0);

  return { totalExpenses, count: expenses.length, expenses };
}
