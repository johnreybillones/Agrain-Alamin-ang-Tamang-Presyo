import { COLORS, FONTS } from '../../utils/designTokens.js';

export default function Header() {
  return (
    <header className="level-topbar">
      <div className="topbar-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🌾</span>
          <span style={{
            fontFamily: FONTS.logo,
            fontSize: "clamp(20px, 4vw, 26px)",
            color: COLORS.tan1,
            letterSpacing: 3,
            textTransform: "uppercase",
            lineHeight: 1,
          }}>AGRAIN</span>
        </div>
        <span style={{
          fontFamily: FONTS.rustyne,
          fontStyle: "italic",
          fontSize: "clamp(9px, 1.8vw, 11px)",
          color: COLORS.tan1,
          letterSpacing: 0.5,
          opacity: 0.55,
        }}>Alamin ang tamang presyo.</span>
      </div>
    </header>
  );
}
