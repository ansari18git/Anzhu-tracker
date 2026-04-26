export const calcBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm || heightCm === 0) return null;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
};

export const getBMICategory = (bmi) => {
  if (!bmi) return null;
  if (bmi < 18.5) return { label: 'Underweight', color: '#2196F3' };
  if (bmi < 25)   return { label: 'Normal',      color: '#4CAF50' };
  if (bmi < 30)   return { label: 'Overweight',  color: '#FF9800' };
  return           { label: 'Obese',             color: '#EF5350' };
};

export const calcBMIProgress = (bmi) => {
  // Visual scale: 15 to 35
  if (!bmi) return 0;
  return Math.min(1, Math.max(0, (bmi - 15) / 20));
};

export const calcProgress = (consumed, goal) => {
  if (goal === 0) return 0;
  return Math.min(1, consumed / goal);
};

export const calcRemaining = (consumed, goal) => {
  return Math.max(0, goal - consumed);
};

export const calcAdherence = (avgConsumed, goal) => {
  if (goal === 0) return 0;
  return Math.min(100, Math.round((avgConsumed / goal) * 100));
};

export const calcTotalMacros = (foodLogs) => {
  return foodLogs.reduce(
    (totals, log) => ({
      calories: totals.calories + (log.calories || 0),
      protein:  totals.protein  + (log.protein  || 0),
      carbs:    totals.carbs    + (log.carbs    || 0),
      fat:      totals.fat      + (log.fat      || 0),
      fiber:    totals.fiber    + (log.fiber    || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
};

export const calcMacroPercents = (protein, carbs, fat, fiber = 0) => {
  const total = protein + carbs + fat + fiber;
  if (total === 0) return { protein: 0, carbs: 0, fat: 0, fiber: 0 };
  return {
    protein: Math.round((protein / total) * 100),
    carbs:   Math.round((carbs   / total) * 100),
    fat:     Math.round((fat     / total) * 100),
    fiber:   Math.round((fiber   / total) * 100),
  };
};

export const calcCalorieAverage = (dailyTotals) => {
  if (!dailyTotals || dailyTotals.length === 0) return 0;
  const sum = dailyTotals.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / dailyTotals.length);
};

export const calcWeightDelta = (current, previous) => {
  if (previous == null) return null;
  return Math.round((current - previous) * 10) / 10;
};

export const calcStreak = (logDates) => {
  if (!logDates || logDates.length === 0) return 0;
  const unique = [...new Set(logDates.map((d) => d.split('T')[0]))].sort().reverse();
  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const dateStr of unique) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    const diffDays = Math.round((cursor - date) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      streak++;
      cursor = date;
    } else {
      break;
    }
  }
  return streak;
};
