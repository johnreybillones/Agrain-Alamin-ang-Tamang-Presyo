/**
 * Hardware & UI Service — bridges business logic to phone hardware.
 */

/**
 * Compare a buyer's offer against the break-even price and trigger haptics.
 *
 * @param {number} currentOffer   - Buyer's offer per kg (from slider)
 * @param {number} breakEvenPrice - Minimum price per kg to break even
 * @returns {boolean} true = profitable (KITA!), false = loss (LUGI!)
 */
export function checkOffer(currentOffer, breakEvenPrice) {
  const isProfitable = currentOffer >= breakEvenPrice;

  if (!isProfitable) {
    // Trigger haptic warning only when at a loss
    if ('vibrate' in navigator) {
      navigator.vibrate([300, 100, 300]);
    }
    return false;
  }

  return true;
}
