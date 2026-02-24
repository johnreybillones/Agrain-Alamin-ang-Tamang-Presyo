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

// Default season ID for the active growing season
export const ACTIVE_SEASON_ID = 'season_2025_main';

export const APP_VERSION = '0.1.0';
