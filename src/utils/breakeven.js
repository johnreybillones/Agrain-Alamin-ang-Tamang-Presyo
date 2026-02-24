/**
 * Pure math: Break-Even Price = Total Expenses / Harvest Weight
 * @param {number} totalExpenses - Sum of all tier values for the season (₱)
 * @param {number} harvestWeight  - Total harvest weight in kg
 * @returns {number} Break-even price per kg (0 if weight is invalid)
 */
export function calculateBreakEven(totalExpenses, harvestWeight) {
  if (!harvestWeight || harvestWeight <= 0) return 0;
  return totalExpenses / harvestWeight;
}
