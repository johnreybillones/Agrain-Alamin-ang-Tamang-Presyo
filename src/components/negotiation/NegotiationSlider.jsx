import { COLORS, FONTS, CARD_STYLE } from '../../utils/designTokens.js';

/**
 * NegotiationSlider — High-contrast range slider for the buyer's offer price.
 * Extracted from LevelAppV2's NegoScreen.
 *
 * @param {number}   value          - Current slider value (₱/kg)
 * @param {function} onChange       - Called with new number value
 * @param {number}   breakEvenPrice - The profit threshold
 * @param {boolean}  isProfitable   - Whether the offer is above break-even
 * @param {number}   max            - Max slider value
 * @param {number}   min            - Min slider value (default 1)
 */
export default function NegotiationSlider({ value, onChange, breakEvenPrice, isProfitable, max, min = 1 }) {
  const sliderMax = max || Math.max(Math.round(breakEvenPrice * 1.5 * 100) / 100, 80);
  const sliderMin = min;
  const toQuarter = (v) => Math.round(v * 4) / 4;

  // Break-even marker position
  const bePct = breakEvenPrice
    ? ((breakEvenPrice - sliderMin) / (sliderMax - sliderMin)) * 100
    : 50;

  return (
    <div style={{ ...CARD_STYLE, padding: 'clamp(12px, 2.5vw, 16px) clamp(14px, 3vw, 20px)' }}>
      {/* Header with label + verdict — column layout to prevent wrapping on narrow screens */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
        {/* Row 1: title */}
        <div style={{
          fontFamily: FONTS.duvet,
          fontSize: 'clamp(14px, 2.8vw, 18px)',
          fontWeight: 700,
          color: COLORS.dark,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>
          Magkano ang alok ng buyer? (kada kilo)
        </div>
        {/* Row 2: verdict pill + price — always fits on one line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
          <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
            <div style={{
              fontFamily: FONTS.duvet,
              fontSize: 'clamp(16px, 3.2vw, 20px)',
              fontWeight: 800,
              color: isProfitable ? COLORS.berde : COLORS.pula,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}>
              {isProfitable ? 'SULIT!' : 'LUGI!'}
            </div>
            <div style={{
              fontSize: 'clamp(10px, 2vw, 12px)',
              color: COLORS.dark,
              fontWeight: 500,
            }}>
              {isProfitable ? 'may kita ka na rito' : 'tumanggi nalang'}
            </div>
          </div>
          <div style={{
            fontFamily: FONTS.duvet,
            fontSize: 'clamp(24px, 4.5vw, 32px)',
            color: isProfitable ? COLORS.berde : COLORS.pula,
            fontWeight: 800,
          }}>
            ₱{value.toFixed(2)}/kg
          </div>
        </div>
      </div>

      {/* Slider with break-even marker */}
      <div style={{ position: 'relative', paddingTop: 20 }}>
        <div style={{
          position: 'absolute',
          left: `${Math.min(100, Math.max(0, bePct))}%`,
          top: -20,
          transform: 'translateX(-50%)',
          zIndex: 5,
          pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            fontFamily: FONTS.duvet,
            fontSize: 'clamp(11px, 2.2vw, 14px)',
            color: COLORS.burnt,
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 2,
            whiteSpace: 'nowrap',
          }}>
            ₱{Math.round(breakEvenPrice * 100) / 100}
          </div>
          <div style={{
            width: 2, height: 24, borderRadius: 1,
            background: COLORS.burnt,
            boxShadow: '0 0 8px rgba(188,108,37,0.5)',
          }} />
        </div>
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={0.01}
          value={value}
          onChange={(e) => onChange(toQuarter(parseFloat(e.target.value)))}
          className="offer-slider"
          style={{ accentColor: isProfitable ? COLORS.olive : COLORS.pula }}
          aria-label="Alok ng Mamimili"
        />
      </div>

      {/* Min/Max labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 10, color: COLORS.muted, fontWeight: 600 }}>₱{sliderMin}/kg</span>
        <span style={{ fontSize: 10, color: COLORS.muted, fontWeight: 600 }}>₱{sliderMax}/kg</span>
      </div>
    </div>
  );
}
