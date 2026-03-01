import { useState, useEffect, useCallback } from 'react';
import { COLORS, FONTS } from '../../utils/designTokens.js';
import { EXPENSE_CATEGORIES } from '../../utils/constants.js';
import CameraCapture from '../camera/CameraCapture.jsx';
import PhotoPreview from '../camera/PhotoPreview.jsx';
import AmountInput from './TierPicker.jsx';

/**
 * LogModal — Full-screen expense logging flow.
 * Extracted from LevelAppV2's LogModal.
 *
 * Flow: camera → form (photo preview + tier picker + category picker → save)
 *
 * @param {boolean}  visible - Whether the modal is shown
 * @param {function} onClose - Called when the modal should close
 * @param {function} onSave  - Called with the saved expense object
 */
export default function LogModal({ visible, onClose, onSave }) {
  const [step, setStep] = useState('camera');
  const [photoData, setPhotoData] = useState(null);
  const [amount, setAmount] = useState('');
  const [cat, setCat] = useState('');
  const [saving, setSaving] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  function reset() {
    setStep('camera');
    setPhotoData(null);
    setAmount('');
    setCat('');
    setShowWarning(false);
  }

  function handleCancel() {
    reset();
    onClose();
  }

  // Lock body scroll when visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  // Reset state on open
  useEffect(() => {
    if (visible) {
      reset();
    }
  }, [visible]);

  // Camera callbacks
  const handleCameraCapture = useCallback((dataUrl) => {
    setPhotoData(dataUrl);
    setStep('form');
  }, []);

  const handleCameraCancel = useCallback(() => {
    handleCancel();
  }, []);

  const handleCameraError = useCallback(() => {
    // Skip to form if camera not available
    setStep('form');
  }, []);

  function handleRetakePhoto() {
    setPhotoData(null);
    setStep('camera');
  }

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      const now = new Date();
      const date = now.toLocaleDateString('en-US', {
        month: 'long', day: '2-digit', year: 'numeric',
      });
      const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit',
      });
      const dateTime = `${date} - ${time}`;
      const emoji = EXPENSE_CATEGORIES[cat] || '';
      onSave({
        name: cat,
        emoji,
        amount: Number(amount),
        date,
        dateTime,
        photo: photoData,
      });
      reset();
      setSaving(false);
      onClose();
    }, 300);
  }

  if (!visible) return null;

  // Camera step
  if (step === 'camera') {
    return (
      <CameraCapture
        onCapture={handleCameraCapture}
        onCancel={handleCameraCancel}
        onError={handleCameraError}
      />
    );
  }

  // Form step
  return (
    <div className="log-form-fullscreen">
      <div className="log-form-content">
        {/* Title */}
        <div style={{
          fontFamily: FONTS.duvet,
          fontSize: 'clamp(16px, 4vw, 24px)',
          color: COLORS.dark,
          letterSpacing: 2,
          textTransform: 'uppercase',
          flexShrink: 0,
        }}>
          Gastusin:
        </div>

        {/* Photo preview */}
        <PhotoPreview photoData={photoData} onRetake={handleRetakePhoto} />

        {/* Tier picker */}
        <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, gap: 8 }}>
          <div style={{
            fontFamily: FONTS.duvet,
            fontSize: 'clamp(13px, 2.8vw, 18px)',
            fontWeight: 700,
            color: COLORS.dark,
            letterSpacing: 2,
            textTransform: 'uppercase',
            flexShrink: 0,
          }}>
            Gaano kalaki ang gastos?
          </div>
          <AmountInput value={amount} onChange={setAmount} />

          {/* Category picker */}
          <div style={{
            fontFamily: FONTS.duvet,
            fontSize: 'clamp(13px, 2.8vw, 18px)',
            fontWeight: 700,
            color: COLORS.dark,
            letterSpacing: 2,
            textTransform: 'uppercase',
            flexShrink: 0,
            marginTop: 8,
          }}>
            Para saan ito?
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 'clamp(10px, 1.5vw, 16px)',
            minWidth: 0,
          }}>
            {Object.entries(EXPENSE_CATEGORIES).map(([name, emoji]) => (
              <div
                key={name}
                onClick={() => setCat(name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setCat(name)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: 'clamp(10px, 1.5vh, 14px) clamp(10px, 1.8vw, 16px)',
                  borderRadius: 12,
                  minHeight: 44,
                  border: cat === name ? '3px solid #1B5E20' : `1.5px solid ${COLORS.tan1}`,
                  background: cat === name ? '#A5D6A7' : COLORS.white,
                  fontSize: 'clamp(13px, 2.6vw, 16px)',
                  fontWeight: 600,
                  color: COLORS.dark,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>{emoji}</span>{name}
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={() => {
            if (saving) return;
            if (!(Number(amount) > 0) || !cat) setShowWarning(true);
            else handleSave();
          }}
          disabled={saving}
          style={{
            width: '100%', border: 'none', borderRadius: 16,
            padding: 'clamp(12px, 2.5vh, 20px) 20px',
            fontFamily: FONTS.duvet,
            fontSize: 'clamp(16px, 3.5vw, 22px)',
            flexShrink: 0, minHeight: 44,
            letterSpacing: 2, textTransform: 'uppercase',
            color: COLORS.cream,
            background: saving
              ? COLORS.tan1
              : `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.olive})`,
            opacity: (Number(amount) > 0 && cat) || saving ? 1 : 0.6,
            boxShadow: saving ? 'none' : '0 4px 16px rgba(96,108,56,0.35)',
            cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          {saving ? 'Sine-save...' : 'Ilista na'}
        </button>

        {/* Validation warning modal */}
        {showWarning && (
          <div
            className="modal-overlay"
            style={{ alignItems: 'center', justifyContent: 'center' }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowWarning(false); }}
          >
            <div
              style={{
                background: COLORS.cream, borderRadius: 18, padding: '28px 24px',
                maxWidth: 360, width: '90%', boxShadow: `0 8px 32px ${COLORS.shadow}`,
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{
                fontFamily: FONTS.duvet,
                fontSize: 'clamp(20px, 4.5vw, 26px)',
                color: COLORS.dark,
                textAlign: 'center',
                marginBottom: 24,
                lineHeight: 1.4,
                letterSpacing: 1,
              }}>
                Tukuyin muna ang impormasyon bago ito malista
              </div>
              <button
                onClick={() => setShowWarning(false)}
                style={{
                  width: '100%', padding: '18px', borderRadius: 14, border: 'none',
                  background: COLORS.olive, color: COLORS.cream,
                  fontFamily: FONTS.duvet,
                  fontSize: 'clamp(18px, 4vw, 22px)',
                  letterSpacing: 2, cursor: 'pointer',
                }}
              >
                Okay
              </button>
            </div>
          </div>
        )}

        {/* Cancel button */}
        <button
          onClick={handleCancel}
          style={{
            width: '100%',
            padding: 'clamp(10px, 1.5vh, 14px) 20px',
            borderRadius: 14,
            flexShrink: 0, minHeight: 42,
            border: `2px solid ${COLORS.pula}`,
            background: COLORS.white, color: COLORS.pula,
            fontFamily: FONTS.duvet,
            fontSize: 'clamp(18px, 3.5vw, 24px)',
            letterSpacing: 2, textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          Kansela
        </button>
      </div>
    </div>
  );
}
