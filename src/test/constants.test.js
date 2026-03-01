import { describe, it, expect } from 'vitest';
import {
  TIERS,
  TIER_VALUES,
  TIER_LABELS,
  SIZES_AMOUNT,
  EXPENSE_CATEGORIES,
  ACTIVE_SEASON_ID,
} from '../utils/constants.js';

describe('Constants — TIERS', () => {
  it('has Small, Medium, Large tiers', () => {
    expect(TIERS).toHaveProperty('Small');
    expect(TIERS).toHaveProperty('Medium');
    expect(TIERS).toHaveProperty('Large');
  });

  it('Small tier value is 500', () => {
    expect(TIERS.Small.value).toBe(500);
  });

  it('Medium tier value is 2500', () => {
    expect(TIERS.Medium.value).toBe(2500);
  });

  it('Large tier value is 7000', () => {
    expect(TIERS.Large.value).toBe(7000);
  });
});

describe('Constants — TIER_VALUES', () => {
  it('matches TIERS values', () => {
    expect(TIER_VALUES.Small).toBe(500);
    expect(TIER_VALUES.Medium).toBe(2500);
    expect(TIER_VALUES.Large).toBe(7000);
  });
});

describe('Constants — TIER_LABELS', () => {
  it('has S, M, L keys with Filipino labels', () => {
    expect(TIER_LABELS.S).toBe('Maliit');
    expect(TIER_LABELS.M).toBe('Katamtaman');
    expect(TIER_LABELS.L).toBe('Malaki');
  });
});

describe('Constants — SIZES_AMOUNT', () => {
  it('is an object with S, M, L keys', () => {
    expect(typeof SIZES_AMOUNT).toBe('object');
    expect(SIZES_AMOUNT).toHaveProperty('S');
    expect(SIZES_AMOUNT).toHaveProperty('M');
    expect(SIZES_AMOUNT).toHaveProperty('L');
  });

  it('uses root tier values (500 / 2500 / 7000)', () => {
    expect(SIZES_AMOUNT.S).toBe(500);
    expect(SIZES_AMOUNT.M).toBe(2500);
    expect(SIZES_AMOUNT.L).toBe(7000);
  });
});

describe('Constants — EXPENSE_CATEGORIES', () => {
  it('has exactly 6 categories', () => {
    expect(Object.keys(EXPENSE_CATEGORIES)).toHaveLength(6);
  });

  it('contains all required category keys with emoji values', () => {
    expect(EXPENSE_CATEGORIES['Binhi']).toBe('🌱');
    expect(EXPENSE_CATEGORIES['Pataba']).toBe('🧪');
    expect(EXPENSE_CATEGORIES['Tubig']).toBe('💧');
    expect(EXPENSE_CATEGORIES['Tauhan']).toBe('👷');
    expect(EXPENSE_CATEGORIES['Kagamitan']).toBe('🚜');
    expect(EXPENSE_CATEGORIES['Iba pa']).toBe('📦');
  });
});

describe('Constants — ACTIVE_SEASON_ID', () => {
  it('is a non-empty string', () => {
    expect(typeof ACTIVE_SEASON_ID).toBe('string');
    expect(ACTIVE_SEASON_ID.length).toBeGreaterThan(0);
  });
});
