import { COLORS, FONTS } from '../../utils/designTokens.js';

/**
 * PhotoPreview — Shows captured photo with retake/skip option.
 * Extracted from LevelAppV2's LogModal form step.
 * @param {string|null} photoData - Data URL of the captured photo
 * @param {function}    onRetake  - Called when user wants to retake photo
 */
export default function PhotoPreview({ photoData, onRetake }) {
  if (!photoData) return null;

  return (
    <div style={{ position: 'relative', marginBottom: 14 }}>
      <img
        src={photoData}
        alt="Larawan ng resibo"
        style={{
          width: '100%',
          maxHeight: 220,
          objectFit: 'cover',
          borderRadius: 14,
          border: `1.5px solid ${COLORS.line}`,
        }}
      />
      <button
        onClick={onRetake}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          background: 'rgba(0,0,0,0.55)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '7px 18px',
          fontFamily: FONTS.body,
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        ⟳ Ulitin
      </button>
    </div>
  );
}
