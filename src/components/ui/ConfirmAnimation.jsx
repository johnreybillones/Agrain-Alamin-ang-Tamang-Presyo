import { COLORS, FONTS } from '../../utils/designTokens.js';

/**
 * SuccessFlash — full-screen green flash with checkmark.
 * The farmer does not need to read any text — the flash alone signals success.
 * Displays "Nailista na" message text with animated check.
 */
export default function ConfirmAnimation({ visible }) {
  if (!visible) return null;

  return (
    <div className="success-flash">
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(254,250,224,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'pulseCheck 0.6s ease-out',
      }}>
        <span style={{ fontSize: 48, color: COLORS.cream }}>✓</span>
      </div>
      <span style={{
        fontFamily: FONTS.duvet,
        fontSize: 'clamp(18px, 4vw, 24px)',
        color: COLORS.cream,
        letterSpacing: 3,
        textTransform: 'uppercase',
      }}>
        Nailista na
      </span>
    </div>
  );
}
