import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeightChart from '../components/WeightChart';
import MacroBar from '../components/MacroBar';
import { useWeight } from '../hooks/useWeight';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../context/AuthContext';
import { getLogsForDateRange } from '../services/foodService';
import {
  calcCalorieAverage,
  calcAdherence,
  calcTotalMacros,
  calcWeightDelta,
  calcStreak,
} from '../utils/calculations';
import { getLast7Days, getLast30Days, getLast90Days, formatShortDate } from '../utils/dateHelpers';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { SPACING, BORDER_RADIUS } from '../utils/constants';

const RANGES = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: 'All', days: 365 },
];

export default function ProgressScreen() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [rangeDays, setRangeDays] = useState(30);
  const { weightLogs, latestWeight, loading: weightLoading } = useWeight(rangeDays);

  const [weekLogs, setWeekLogs] = useState([]);
  const [allLogDates, setAllLogDates] = useState([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    if (!user) return;
    setAnalyticsLoading(true);
    try {
      const last7 = getLast7Days();
      const last90 = getLast90Days();
      const [week, longRange] = await Promise.all([
        getLogsForDateRange(user.id, last7[0], last7[last7.length - 1] + 'T23:59:59'),
        getLogsForDateRange(user.id, last90[0], last90[last90.length - 1] + 'T23:59:59'),
      ]);
      setWeekLogs(week);
      setAllLogDates(longRange.map((l) => l.logged_at));
    } catch (err) {
      console.error('ProgressScreen analytics error:', err.message);
    } finally {
      setAnalyticsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const calorieGoal = profile?.daily_calorie_goal ?? 2000;
  const targetWeight = profile?.target_weight ?? null;

  const dailyCalorieTotals = getLast7Days().map((date) => {
    const dayLogs = weekLogs.filter((l) => l.logged_at.startsWith(date));
    return dayLogs.reduce((s, l) => s + l.calories, 0);
  });

  const avgCalories = calcCalorieAverage(dailyCalorieTotals.filter((v) => v > 0));
  const adherence = calcAdherence(avgCalories, calorieGoal);
  const weekTotals = calcTotalMacros(weekLogs);
  const streak = calcStreak(allLogDates);

  const firstWeight = weightLogs.length > 0 ? weightLogs[0]?.weight : null;
  const weightChange = calcWeightDelta(latestWeight?.weight, firstWeight);
  const toGoal = targetWeight && latestWeight
    ? Math.round((latestWeight.weight - targetWeight) * 10) / 10
    : null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <Text style={styles.pageTitle}>Progress</Text>

        {/* Weight Chart */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📊 Weight Trend</Text>

          {/* Range Toggle */}
          <View style={styles.rangeRow}>
            {RANGES.map(({ label, days }) => (
              <TouchableOpacity
                key={label}
                style={[styles.rangeBtn, rangeDays === days && styles.rangeBtnActive]}
                onPress={() => setRangeDays(days)}
              >
                <Text style={[styles.rangeBtnText, rangeDays === days && styles.rangeBtnTextActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {weightLoading ? (
            <ActivityIndicator color={colors.primary} style={styles.loader} />
          ) : (
            <WeightChart data={weightLogs} />
          )}

          {/* Weight Stats */}
          <View style={styles.statsRow}>
            <StatBox
              label="Current"
              value={latestWeight ? `${latestWeight.weight} kg` : '—'}
            />
            <StatBox
              label="Change"
              value={weightChange !== null ? `${weightChange > 0 ? '+' : ''}${weightChange} kg` : '—'}
              valueColor={weightChange !== null ? (weightChange <= 0 ? colors.primary : colors.error) : colors.textPrimary}
            />
            <StatBox
              label="To Goal"
              value={toGoal !== null ? `${toGoal > 0 ? '-' : '+'}${Math.abs(toGoal)} kg` : '—'}
            />
          </View>
        </View>

        {/* Calorie Average */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📈 Calories (Last 7 Days)</Text>
          {analyticsLoading ? (
            <ActivityIndicator color={colors.primary} style={styles.loader} />
          ) : (
            <>
              <View style={styles.statsRow}>
                <StatBox label="Average" value={`${avgCalories} cal`} />
                <StatBox label="Goal" value={`${calorieGoal} cal`} />
                <StatBox
                  label="Adherence"
                  value={`${adherence}%`}
                  valueColor={adherence >= 80 ? colors.primary : colors.warning}
                />
              </View>
              <View style={styles.calBarBg}>
                <View style={[styles.calBarFill, { width: `${Math.min(adherence, 100)}%` }]} />
              </View>
            </>
          )}
        </View>

        {/* Macro Split */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🎯 Macro Split (Last 7 Days)</Text>
          {analyticsLoading ? (
            <ActivityIndicator color={colors.primary} style={styles.loader} />
          ) : weekLogs.length === 0 ? (
            <Text style={styles.empty}>No food logged in the past 7 days.</Text>
          ) : (
            <MacroBar
              protein={weekTotals.protein / 7}
              carbs={weekTotals.carbs / 7}
              fat={weekTotals.fat / 7}
            />
          )}
        </View>

        {/* Streak */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🔥 Logging Streak</Text>
          <View style={styles.streakContainer}>
            <Text style={styles.streakNumber}>{streak}</Text>
            <Text style={styles.streakLabel}>
              {streak === 1 ? 'day' : 'days'} in a row
            </Text>
          </View>
          <Text style={styles.streakSub}>
            {streak === 0
              ? 'Log a meal today to start your streak!'
              : streak < 7
              ? 'Keep it up! 💪'
              : streak < 30
              ? 'Amazing consistency! 🌟'
              : 'You\'re on fire! 🔥'}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ label, value, valueColor }) {
  return (
    <View style={styles.statBox}>
      <Text style={[styles.statValue, valueColor && { color: valueColor }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: SPACING.md, paddingBottom: SPACING.xl },
  pageTitle: { ...typography.h2, color: colors.primary, fontWeight: '700', marginBottom: SPACING.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: BORDER_RADIUS.card,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginBottom: SPACING.sm },
  rangeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  rangeBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  rangeBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  rangeBtnText: { ...typography.caption, color: colors.textSecondary },
  rangeBtnTextActive: { color: '#fff', fontWeight: '600' },
  loader: { marginVertical: SPACING.lg },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.md,
  },
  statBox: { alignItems: 'center', gap: 2 },
  statValue: { ...typography.h3, color: colors.textPrimary },
  statLabel: { ...typography.caption, color: colors.textSecondary },
  calBarBg: {
    height: 8,
    backgroundColor: colors.divider,
    borderRadius: 4,
    marginTop: SPACING.sm,
    overflow: 'hidden',
  },
  calBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  empty: { ...typography.body2, color: colors.textDisabled, fontStyle: 'italic' },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.sm,
    marginVertical: SPACING.sm,
  },
  streakNumber: { fontSize: 48, fontWeight: '700', color: colors.accent },
  streakLabel: { ...typography.h3, color: colors.textPrimary },
  streakSub: { ...typography.body2, color: colors.textSecondary },
});
