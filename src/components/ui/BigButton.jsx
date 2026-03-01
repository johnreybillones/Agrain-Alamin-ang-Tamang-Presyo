import { COLORS, FONTS } from '../../utils/designTokens.js';

/**
 * BigButton — LevelAppV2's ActionBtn. Large touch-target button with gradient.
 * @param {string} variant — "olive" (green-dark gradient) or "burnt" (orange gradient)
 * @param {function} onClick
 * @param {React.ReactNode} children
 * @param {boolean} disabled
 */
export default function BigButton({ variant = 'olive', onClick, children, disabled = false }) {
  const bg = variant === 'olive'
    ? `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.olive})`
    : `linear-gradient(135deg, #9A4A10, ${COLORS.burnt})`;
  const shadow = variant === 'olive'
    ? '0 4px 16px rgba(96,108,56,0.35)'
    : '0 4px 16px rgba(188,108,37,0.35)';

  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%',
      border: 'none',
      borderRadius: 16,
      padding: 'clamp(18px, 4vw, 26px) 24px',
      fontFamily: FONTS.duvet,
      fontSize: 'clamp(18px, 3.5vw, 22px)',
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: COLORS.cream,
      background: disabled ? COLORS.tan1 : bg,
      boxShadow: disabled ? 'none' : shadow,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      minHeight: 56,
    }}>
      {children}
    </button>
  );
}
