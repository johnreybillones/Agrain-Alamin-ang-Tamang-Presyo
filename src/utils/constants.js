// Expense tier definitions
export const TIERS = {
  Small: {
    key: 'Small',
    label: 'Maliit',
    sublabel: 'Paggawa, kagamitan',
    value: 500,
    color: 'bg-yellow-500',
    icon: '🔧',
  },
  Medium: {
    key: 'Medium',
    label: 'Katamtaman',
    sublabel: 'Pataba, binhi',
    value: 2500,
    color: 'bg-orange-500',
    icon: '🌾',
  },
  Large: {
    key: 'Large',
    label: 'Malaki',
    sublabel: 'Renta, transportasyon',
    value: 7000,
    color: 'bg-red-500',
    icon: '🚛',
  },
};

// Quick lookup: tier key → peso value
export const TIER_VALUES = {
  Small: 500,
  Medium: 2500,
  Large: 7000,
};

// Tier labels (short key → Filipino label)
export const TIER_LABELS = {
  S: 'Maliit',
  M: 'Katamtaman',
  L: 'Malaki',
};

// Size-to-amount mapping (display ranges from LevelAppV2, but using root's values)
export const SIZES_AMOUNT = {
  S: 500,
  M: 2500,
  L: 7000,
};

// Expense categories from LevelAppV2 (6 entries)
export const EXPENSE_CATEGORIES = {
  'Binhi':     '🌱',
  'Pataba':    '🧪',
  'Tubig':     '💧',
  'Tauhan':    '👷',
  'Kagamitan': '🚜',
  'Iba pa':    '📦',
};

// Default season ID for the active growing season
export const ACTIVE_SEASON_ID = 'season_2025_main';

export const APP_VERSION = '0.1.0';
