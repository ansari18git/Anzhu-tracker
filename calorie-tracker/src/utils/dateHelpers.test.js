import {
  getTodayString,
  isToday,
  formatDate,
  formatShortDate,
  getDayLabel,
  getLastNDays,
  getLast7Days,
  getLast30Days,
  getLast90Days,
} from './dateHelpers';

describe('getTodayString', () => {
  it('returns a YYYY-MM-DD formatted string', () => {
    expect(getTodayString()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
  it('matches today\'s date', () => {
    const expected = new Date().toISOString().split('T')[0];
    expect(getTodayString()).toBe(expected);
  });
});

describe('isToday', () => {
  it('returns true for today', () => {
    expect(isToday(getTodayString())).toBe(true);
  });
  it('returns false for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isToday(yesterday.toISOString().split('T')[0])).toBe(false);
  });
});

describe('formatDate', () => {
  it('returns a non-empty string', () => {
    expect(formatDate(new Date('2026-04-25'))).toBeTruthy();
  });
  it('includes the year', () => {
    expect(formatDate(new Date('2026-04-25'))).toContain('2026');
  });
});

describe('formatShortDate', () => {
  it('returns a non-empty string', () => {
    expect(formatShortDate(new Date('2026-04-25'))).toBeTruthy();
  });
  it('does not include the year', () => {
    expect(formatShortDate(new Date('2026-04-25'))).not.toContain('2026');
  });
});

describe('getDayLabel', () => {
  it('returns a 3-letter weekday', () => {
    expect(getDayLabel('2026-04-25')).toMatch(/^[A-Z][a-z]{2}$/);
  });
});

describe('getLastNDays', () => {
  it('returns correct number of days', () => {
    expect(getLastNDays(7)).toHaveLength(7);
    expect(getLastNDays(30)).toHaveLength(30);
  });
  it('last item is today', () => {
    const days = getLastNDays(7);
    expect(days[days.length - 1]).toBe(getTodayString());
  });
  it('returns dates in ascending order', () => {
    const days = getLastNDays(7);
    expect(days[0] < days[days.length - 1]).toBe(true);
  });
});

describe('getLast7Days / getLast30Days / getLast90Days', () => {
  it('getLast7Days returns 7 items', () => {
    expect(getLast7Days()).toHaveLength(7);
  });
  it('getLast30Days returns 30 items', () => {
    expect(getLast30Days()).toHaveLength(30);
  });
  it('getLast90Days returns 90 items', () => {
    expect(getLast90Days()).toHaveLength(90);
  });
});
