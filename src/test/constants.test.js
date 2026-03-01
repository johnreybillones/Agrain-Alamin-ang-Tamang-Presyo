import { describe, it, expect } from 'vitest';
import {
  EXPENSE_CATEGORIES,
  ACTIVE_SEASON_ID,
} from '../utils/constants.js';

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
