import { COLORS, FONTS } from '../../utils/designTokens.js';
import { SIZES_AMOUNT } from '../../utils/constants.js';

/**
 * TierPicker — Three large S/M/L tier buttons extracted from LevelAppV2's LogModal.
 * Uses root's tier values (₱500 / ₱2,500 / ₱7,000).
 * @param {string}   selected - Currently selected tier key ('S', 'M', or 'L')
 * @param {function} onSelect - Called with tier key ('S' | 'M' | 'L')
 */

const sizeOpts = [
  { key: 'S', label: 'MALIIT', sub: `₱${SIZES_AMOUNT.S.toLocaleString()} pababa`, bars: [14], iconColor: '#FFECB3' },
  { key: 'M', label: 'KATAMTAMAN', sub: `₱${SIZES_AMOUNT.S.toLocaleString()}–₱${SIZES_AMOUNT.M.toLocaleString()}`, bars: [14, 22, 14], iconColor: '#B8860B' },
  { key: 'L', label: 'MALAKI', sub: `higit sa ₱${SIZES_AMOUNT.M.toLocaleString()}`, bars: [16, 28, 16], iconColor: COLORS.pula },
];

export default function TierPicker({ selected, onSelect }) {
  return (
    <div className="size-grid">
      {sizeOpts.map(opt => {
        const isActive = selected === opt.key;
        return (
          <div
            key={opt.key}
            onClick={() => onSelect(opt.key)}
            className="size-card"
            data-active={isActive}
            role="button"
            tabIndex={0}
            aria-label={`${opt.label} - ${opt.sub}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(opt.key); }}
            style={{
              background: isActive ? '#A5D6A7' : COLORS.white,
              border: isActive ? `3px solid ${COLORS.berde}` : `1.5px solid ${COLORS.tan1}`,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 24 }}>
              {opt.bars.map((h, i) => (
                <div key={i} style={{
                  width: 8, height: h * 1.2, borderRadius: 4,
                  background: opt.iconColor,
                }} />
              ))}
            </div>
            <span style={{
              fontSize: 'clamp(12px, 2.6vw, 16px)', fontWeight: 800,
              color: isActive ? COLORS.dark : COLORS.burnt,
              letterSpacing: 0.5, textAlign: 'center',
            }}>{opt.label}</span>
            <span style={{
              fontSize: 'clamp(10px, 2vw, 12px)',
              color: isActive ? COLORS.dark : COLORS.burnt,
              textAlign: 'center', opacity: isActive ? 1 : 0.9,
            }}>{opt.sub}</span>
          </div>
        );
      })}
    </div>
  );
}
