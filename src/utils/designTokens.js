// Design tokens extracted from LevelAppV2/src/LevelApp.jsx
// These are the single source of truth for visual styling

export const COLORS = {
  cream:      "#FEFAE0",
  tan1:       "#EFDCAC",
  tan2:       "#D4A373",
  burnt:      "#BC6C25",
  olive:      "#606C38",
  dark:       "#45462A",
  pula:       "#C0392B",
  pulaLight:  "#FDF0EE",
  pulaBorder: "rgba(192,57,43,0.25)",
  berde:      "#3B7D3E",
  berdeLight: "#EEF5EE",
  berdeBorder:"rgba(59,125,62,0.28)",
  white:      "#FFFFFF",
  line:       "#E0D4B0",
  muted:      "#8B7D5A",
  shadow:     "rgba(69,70,42,0.12)",
};

export const FONTS = {
  logo:    "'Righteous', 'Arial Black', sans-serif",
  duvet:   "'Bebas Neue', 'Arial Narrow', sans-serif",
  rustyne: "'Playfair Display', Georgia, serif",
  body:    "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

export const CARD_STYLE = {
  background: COLORS.white,
  border: `1.5px solid ${COLORS.line}`,
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: `0 2px 12px ${COLORS.shadow}`,
};
