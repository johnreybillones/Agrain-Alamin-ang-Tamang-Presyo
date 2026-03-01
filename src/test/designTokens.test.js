import { describe, it, expect } from 'vitest';
import { COLORS, FONTS, CARD_STYLE } from '../utils/designTokens.js';

describe('Design Tokens — COLORS', () => {
  it('exports exactly 16 color keys', () => {
    expect(Object.keys(COLORS)).toHaveLength(16);
  });

  it('contains all required color keys', () => {
    const requiredKeys = [
      'cream', 'tan1', 'tan2', 'burnt', 'olive', 'dark',
      'pula', 'pulaLight', 'pulaBorder',
      'berde', 'berdeLight', 'berdeBorder',
      'white', 'line', 'muted', 'shadow',
    ];
    requiredKeys.forEach((key) => {
      expect(COLORS).toHaveProperty(key);
    });
  });

  it('has correct hex values for primary palette', () => {
    expect(COLORS.cream).toBe('#FEFAE0');
    expect(COLORS.burnt).toBe('#BC6C25');
    expect(COLORS.olive).toBe('#606C38');
    expect(COLORS.dark).toBe('#45462A');
    expect(COLORS.pula).toBe('#C0392B');
    expect(COLORS.berde).toBe('#3B7D3E');
  });
});

describe('Design Tokens — FONTS', () => {
  it('exports exactly 4 font keys', () => {
    expect(Object.keys(FONTS)).toHaveLength(4);
  });

  it('contains all required font keys', () => {
    ['logo', 'duvet', 'rustyne', 'body'].forEach((key) => {
      expect(FONTS).toHaveProperty(key);
    });
  });

  it('logo uses Righteous', () => {
    expect(FONTS.logo).toContain('Righteous');
  });

  it('duvet uses Bebas Neue', () => {
    expect(FONTS.duvet).toContain('Bebas Neue');
  });

  it('rustyne uses Playfair Display', () => {
    expect(FONTS.rustyne).toContain('Playfair Display');
  });

  it('body uses Helvetica Neue', () => {
    expect(FONTS.body).toContain('Helvetica Neue');
  });
});

describe('Design Tokens — CARD_STYLE', () => {
  it('has white background', () => {
    expect(CARD_STYLE.background).toBe('#FFFFFF');
  });

  it('has borderRadius of 18', () => {
    expect(CARD_STYLE.borderRadius).toBe(18);
  });

  it('has overflow hidden', () => {
    expect(CARD_STYLE.overflow).toBe('hidden');
  });

  it('has border using COLORS.line', () => {
    expect(CARD_STYLE.border).toContain(COLORS.line);
  });

  it('has boxShadow using COLORS.shadow', () => {
    expect(CARD_STYLE.boxShadow).toContain(COLORS.shadow);
  });
});
