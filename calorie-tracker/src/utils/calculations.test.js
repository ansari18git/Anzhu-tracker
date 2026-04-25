import {
  calcProgress,
  calcRemaining,
  calcAdherence,
  calcTotalMacros,
  calcMacroPercents,
  calcCalorieAverage,
  calcWeightDelta,
  calcStreak,
} from './calculations';

describe('calcProgress', () => {
  it('returns correct fraction', () => {
    expect(calcProgress(500, 2000)).toBe(0.25);
  });
  it('caps at 1 when over goal', () => {
    expect(calcProgress(3000, 2000)).toBe(1);
  });
  it('returns 0 when goal is 0', () => {
    expect(calcProgress(100, 0)).toBe(0);
  });
});

describe('calcRemaining', () => {
  it('returns difference', () => {
    expect(calcRemaining(500, 2000)).toBe(1500);
  });
  it('returns 0 when consumed exceeds goal', () => {
    expect(calcRemaining(2500, 2000)).toBe(0);
  });
});

describe('calcAdherence', () => {
  it('returns correct percentage', () => {
    expect(calcAdherence(1850, 2000)).toBe(93);
  });
  it('caps at 100', () => {
    expect(calcAdherence(3000, 2000)).toBe(100);
  });
  it('returns 0 when goal is 0', () => {
    expect(calcAdherence(100, 0)).toBe(0);
  });
});

describe('calcTotalMacros', () => {
  it('sums all macro fields correctly', () => {
    const logs = [
      { calories: 300, protein: 20, carbs: 40, fat: 10 },
      { calories: 500, protein: 30, carbs: 60, fat: 15 },
    ];
    expect(calcTotalMacros(logs)).toEqual({
      calories: 800,
      protein: 50,
      carbs: 100,
      fat: 25,
    });
  });
  it('returns zeros for empty logs', () => {
    expect(calcTotalMacros([])).toEqual({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  });
});

describe('calcMacroPercents', () => {
  it('returns correct percentages', () => {
    const result = calcMacroPercents(30, 45, 25);
    expect(result.protein + result.carbs + result.fat).toBeCloseTo(100, 0);
  });
  it('returns zeros when all macros are 0', () => {
    expect(calcMacroPercents(0, 0, 0)).toEqual({ protein: 0, carbs: 0, fat: 0 });
  });
});

describe('calcCalorieAverage', () => {
  it('returns correct average', () => {
    expect(calcCalorieAverage([1800, 2000, 2200])).toBe(2000);
  });
  it('returns 0 for empty array', () => {
    expect(calcCalorieAverage([])).toBe(0);
  });
});

describe('calcWeightDelta', () => {
  it('returns negative delta for weight loss', () => {
    expect(calcWeightDelta(74.5, 75.0)).toBe(-0.5);
  });
  it('returns positive delta for weight gain', () => {
    expect(calcWeightDelta(76.0, 75.0)).toBe(1);
  });
  it('returns null when no previous weight', () => {
    expect(calcWeightDelta(75.0, null)).toBeNull();
  });
});

describe('calcStreak', () => {
  it('returns 0 for empty array', () => {
    expect(calcStreak([])).toBe(0);
  });
  it('counts consecutive days correctly', () => {
    const today = new Date();
    const dates = [0, 1, 2].map((i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    });
    expect(calcStreak(dates)).toBe(3);
  });
  it('stops streak on gap', () => {
    const today = new Date();
    const dates = [0, 1, 3].map((i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    });
    expect(calcStreak(dates)).toBe(2);
  });
});
