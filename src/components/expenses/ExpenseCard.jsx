import { useState } from 'react';
import { COLORS, FONTS, CARD_STYLE } from '../../utils/designTokens.js';

/**
 * ExpenseCard — Single expense row extracted from LevelAppV2's ExpenseFullRow.
 * Shows photo/emoji thumbnail, category name, date, amount, tier label, and delete button.
 */
export default function ExpenseCard({ expense, index, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dateTimeDisplay = expense.dateTime || expense.date || '';

  return (
    <>
      <div style={{
        ...CARD_STYLE, display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2vw, 14px)',
        padding: 'clamp(10px, 2vw, 14px)', minHeight: 64,
      }}>
        {/* Photo/Emoji Thumbnail */}
        <div style={{
          width: 'clamp(44px, 10vw, 56px)', height: 'clamp(44px, 10vw, 56px)', borderRadius: 10, overflow: 'hidden',
          flexShrink: 0, background: COLORS.tan1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {expense.photo ? (
            <img src={expense.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 22 }}>{expense.emoji}</span>
          )}
        </div>

        {/* Name & Date */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 'clamp(13px, 2.5vw, 15px)', fontWeight: 700, color: COLORS.dark }}>{expense.name}</div>
          <div style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: COLORS.muted, marginTop: 2 }}>{dateTimeDisplay}</div>
        </div>

        {/* Amount & Tier Label */}
        <div style={{ flexShrink: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
          <span style={{
            fontSize: 'clamp(16px, 3.2vw, 20px)', fontWeight: 800, color: COLORS.pula,
            fontFamily: FONTS.duvet, letterSpacing: 0.5,
          }}>₱{(expense.amount ?? expense.value).toLocaleString()}</span>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => setShowDeleteConfirm(true)}
          style={{
            width: 40, height: 40, borderRadius: 10, border: 'none',
            background: COLORS.pulaLight, color: COLORS.pula, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}
          aria-label="Alisin sa listahan"
        >
          🗑️
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          className="modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setShowDeleteConfirm(false); }}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{
            background: COLORS.cream, borderRadius: 18, padding: '28px 24px',
            maxWidth: 360, width: '90%', boxShadow: `0 8px 32px ${COLORS.shadow}`,
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              fontFamily: FONTS.duvet, fontSize: 'clamp(18px, 3.5vw, 22px)',
              color: COLORS.dark, letterSpacing: 2, textTransform: 'uppercase',
              textAlign: 'center', marginBottom: 24, lineHeight: 1.4,
            }}>Alisin na ito sa listahan?</div>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
              <button
                onClick={() => { onDelete(index); setShowDeleteConfirm(false); }}
                style={{
                  padding: '16px 32px', borderRadius: 14, border: 'none',
                  background: COLORS.pula, color: COLORS.white, fontFamily: FONTS.duvet,
                  fontSize: 'clamp(16px, 3.2vw, 18px)', letterSpacing: 2, cursor: 'pointer',
                }}
              >Oo</button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: '16px 32px', borderRadius: 14, border: `2px solid ${COLORS.tan2}`,
                  background: COLORS.white, color: COLORS.dark, fontFamily: FONTS.duvet,
                  fontSize: 'clamp(16px, 3.2vw, 18px)', letterSpacing: 2, cursor: 'pointer',
                }}
              >Huwag</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
