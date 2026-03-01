import { COLORS, FONTS, CARD_STYLE } from '../../utils/designTokens.js';

/**
 * BreakEvenDisplay — Shows the computed break-even price per kilo.
 * Extracted from LevelAppV2's NegoScreen.
 *
 * @param {number} breakEvenPrice - Computed ₱/kg minimum
 */
export default function BreakEvenDisplay({ breakEvenPrice }) {
  if (!breakEvenPrice || breakEvenPrice <= 0) return null;

  return (
    <div style={{
      ...CARD_STYLE,
      padding: 'clamp(12px, 2vw, 16px) clamp(14px, 2.5vw, 20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      border: `2px solid ${COLORS.berde}`,
      background: `linear-gradient(135deg, ${COLORS.berdeLight}, ${COLORS.white})`,
    }}>
      <div style={{
        fontFamily: FONTS.duvet,
        fontSize: 'clamp(14px, 2.8vw, 18px)',
        fontWeight: 700,
        color: COLORS.dark,
        letterSpacing: 2,
        textTransform: 'uppercase',
      }}>
        Presyong Balik-Puhunan
      </div>
      <div style={{
        fontFamily: FONTS.duvet,
        fontSize: 'clamp(24px, 4.5vw, 32px)',
        color: COLORS.berde,
        letterSpacing: 1,
        fontWeight: 800,
      }}>
        ₱{Math.round(breakEvenPrice * 100) / 100}/kg
      </div>
    </div>
  );
}
