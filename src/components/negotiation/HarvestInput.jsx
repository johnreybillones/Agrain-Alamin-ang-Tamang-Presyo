import { useState, useEffect } from 'react';
import { COLORS, FONTS, CARD_STYLE } from '../../utils/designTokens.js';

/**
 * HarvestInput — Card with number input for total harvest weight in kg.
 * Extracted from LevelAppV2's NegoScreen.
 *
 * Uses internal draft state so the parent's `onChange` only fires when the
 * user commits the value (on blur or Enter), NOT on every keystroke. This
 * prevents the NegotiationSlider from jumping while the user is mid-typing.
 *
 * @param {string|number} value    - Committed value from parent (pre-populated)
 * @param {function}      onChange - Called with committed string value on blur/Enter
 */
export default function HarvestInput({ value, onChange }) {
  const [draft, setDraft] = useState(value ?? '');

  // Sync draft when parent pre-populates the value (e.g. on first load from DB)
  useEffect(() => {
    setDraft(value ?? '');
  }, [value]);

  function commit() {
    onChange(draft);
  }

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
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
        placeholder="(Halimbawa: 500)"
        className="harvest-input"
        style={{ borderColor: draft ? COLORS.burnt : COLORS.tan1 }}
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
