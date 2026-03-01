import { COLORS, FONTS, CARD_STYLE } from '../../utils/designTokens.js';

/**
 * BucketVisual — Filling tank showing total seasonal expenses.
 * Extracted from LevelAppV2's SakahanScreen.
 *
 * @param {number} totalExpenses - Current total in ₱
 * @param {number} expenseCount  - Number of expenses logged
 * @param {number} maxExpenses   - Visual "full" level (default ₱35,000)
 */
export default function BucketVisual({ totalExpenses, expenseCount = 0, maxExpenses = 35000 }) {
  const bucketFill = Math.min((totalExpenses / maxExpenses) * 100, 100);

  return (
    <div style={{
      ...CARD_STYLE,
      border: `2px solid ${COLORS.tan2}`,
      background: `linear-gradient(145deg, ${COLORS.white}, ${COLORS.cream})`,
    }}>
      {/* Title */}
      <div style={{ padding: '16px 20px 0', textAlign: 'center' }}>
        <div style={{
          fontFamily: FONTS.duvet,
          fontSize: 'clamp(14px, 3vw, 18px)',
          fontWeight: 700,
          color: COLORS.dark,
          letterSpacing: 3,
          textTransform: 'uppercase',
          marginBottom: 4,
        }}>
          Kabuuang Gastos
        </div>
      </div>

      {/* Tank */}
      <div className="bucket-tank">
        <div className="bucket-fill" style={{ height: `${bucketFill}%` }} />
        {bucketFill > 5 && <div className="bucket-wave" style={{ bottom: `${bucketFill}%` }} />}
        <div className="bucket-label">
          <div style={{
            fontFamily: FONTS.duvet,
            fontSize: 'clamp(28px, 6vw, 38px)',
            color: COLORS.dark,
            letterSpacing: -1,
            lineHeight: 1,
            display: 'flex', alignItems: 'flex-start', gap: 2,
            textShadow: '0 1px 6px rgba(254,250,224,0.7)',
          }}>
            <span style={{
              fontSize: 'clamp(18px, 3.5vw, 24px)',
              color: COLORS.burnt,
              paddingTop: 4,
            }}>₱</span>
            <span>{totalExpenses.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div style={{ padding: '6px 20px 14px', textAlign: 'center' }}>
        <div style={{
          fontSize: 'clamp(11px, 2.2vw, 13px)',
          color: COLORS.muted,
          fontWeight: 500,
        }}>
          {expenseCount > 0
            ? `${expenseCount} ang pinagkagastusan ngayong panahon ng pagtatanim`
            : 'Wala pang nakalista. Pindutin ang "Maglista ng Gastos"'}
        </div>
      </div>
    </div>
  );
}
