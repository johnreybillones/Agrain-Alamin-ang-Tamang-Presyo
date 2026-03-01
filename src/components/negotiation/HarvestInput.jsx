import { COLORS, FONTS, CARD_STYLE } from '../../utils/designTokens.js';

/**
 * HarvestInput — Card with number input for total harvest weight in kg.
 * Extracted from LevelAppV2's NegoScreen.
 *
 * @param {string|number} value    - Current input value
 * @param {function}      onChange - Called with new string value
 */
export default function HarvestInput({ value, onChange }) {
  return (
    <div style={{ ...CARD_STYLE, padding: 'clamp(12px, 2.5vw, 18px)' }}>
      <div style={{
        fontFamily: FONTS.duvet,
        fontSize: 'clamp(16px, 3.5vw, 22px)',
        fontWeight: 700,
        color: COLORS.dark,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 10,
      }}>
        Ilang kilo ang ani?
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="(Halimbawa: 500)"
        className="harvest-input"
        style={{ borderColor: value ? COLORS.burnt : COLORS.tan1 }}
        aria-label="Timbang ng Ani (kg)"
      />
      <div style={{
        fontSize: 'clamp(13px, 2.5vw, 15px)',
        color: COLORS.dark,
        marginTop: 10,
        lineHeight: 1.5,
        fontWeight: 500,
      }}>
        Ilagay ang timbang para makita ang tamang presyo.
      </div>
    </div>
  );
}
