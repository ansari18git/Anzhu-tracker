import React, { useState, useCallback } from 'react';
import {
  View, ScrollView, StyleSheet, TouchableOpacity,
  RefreshControl, Modal,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalorieRing from '../components/CalorieRing';
import MacroBar from '../components/MacroBar';
import MealCard from '../components/MealCard';
import WaterTracker from '../components/WaterTracker';
import { useFood } from '../hooks/useFood';
import { useWater } from '../hooks/useWater';
import { useWeight } from '../hooks/useWeight';
import { useProfile } from '../hooks/useProfile';
import { calcTotalMacros, calcWeightDelta } from '../utils/calculations';
import { formatDate } from '../utils/dateHelpers';
import { MEAL_TYPES, MEAL_TYPE_LABELS, SPACING, BORDER_RADIUS } from '../utils/constants';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function HomeScreen({ navigation }) {
  const { todayLogs, loading: foodLoading, removeLog, refetch: refetchFood } = useFood();
  const { glasses, addGlass, removeGlass, refetch: refetchWater } = useWater();
  const { latestWeight, logWeight, weightLogs, refetch: refetchWeight } = useWeight();
  const { profile } = useProfile();

  const [refreshing, setRefreshing] = useState(false);
  const [weightModal, setWeightModal] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [weightError, setWeightError] = useState('');

  const totals = calcTotalMacros(todayLogs);
  const prevWeight = weightLogs.length > 1 ? weightLogs[weightLogs.length - 2]?.weight : null;
  const delta = calcWeightDelta(latestWeight?.weight, prevWeight);

  const calorieGoal = profile?.daily_calorie_goal ?? 2000;
  const waterGoal = profile?.daily_water_goal ?? 8;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchFood(), refetchWater(), refetchWeight()]);
    setRefreshing(false);
  }, [refetchFood, refetchWater, refetchWeight]);

  const handleLogWeight = async () => {
    const val = parseFloat(weightInput);
    if (!weightInput || isNaN(val) || val <= 0) {
      setWeightError('Enter a valid weight');
      return;
    }
    try {
      await logWeight(val);
      setWeightInput('');
      setWeightError('');
      setWeightModal(false);
    } catch {
      setWeightError('Failed to save. Try again.');
    }
  };

  const logsByType = MEAL_TYPES.reduce((acc, type) => {
    acc[type] = todayLogs.filter((log) => log.meal_type === type);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.dateText}>{formatDate()}</Text>
          <Text style={styles.appName}>Anzhu Tracker</Text>
        </View>

        {/* Calorie Ring */}
        <View style={styles.ringSection}>
          <CalorieRing consumed={totals.calories} goal={calorieGoal} />
        </View>

        {/* Macro Bar */}
        <View style={styles.card}>
          <MacroBar protein={totals.protein} carbs={totals.carbs} fat={totals.fat} />
        </View>

        {/* Meals by type */}
        {MEAL_TYPES.map((type) => (
          <View key={type} style={styles.mealSection}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealType}>{MEAL_TYPE_LABELS[type]}</Text>
              <View style={styles.mealHeaderRight}>
                {logsByType[type].length > 0 && (
                  <Text style={styles.mealTotal}>
                    {logsByType[type].reduce((s, l) => s + l.calories, 0)} cal
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate('LogFood', { mealType: type })}
                >
                  <Text style={styles.addButtonText}>+ Add</Text>
                </TouchableOpacity>
              </View>
            </View>
            {logsByType[type].length === 0 ? (
              <Text style={styles.emptyMeal}>Nothing logged yet</Text>
            ) : (
              logsByType[type].map((meal) => (
                <MealCard key={meal.id} meal={meal} onDelete={removeLog} />
              ))
            )}
          </View>
        ))}

        {/* Water Tracker */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💧 Water</Text>
          <WaterTracker
            glasses={glasses}
            goal={waterGoal}
            onAdd={addGlass}
            onRemove={removeGlass}
          />
        </View>

        {/* Weight */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>⚖️ Weight</Text>
          {latestWeight ? (
            <View style={styles.weightRow}>
              <Text style={styles.weightValue}>{latestWeight.weight} kg</Text>
              {delta !== null && (
                <Text style={[styles.weightDelta, delta > 0 ? styles.deltaUp : styles.deltaDown]}>
                  {delta > 0 ? `↑ ${delta}` : `↓ ${Math.abs(delta)}`} kg
                </Text>
              )}
            </View>
          ) : (
            <Text style={styles.emptyMeal}>No weight logged yet</Text>
          )}
          <Button
            mode="outlined"
            onPress={() => setWeightModal(true)}
            style={styles.logWeightBtn}
            textColor={colors.primary}
          >
            Log Weight
          </Button>
        </View>
      </ScrollView>

      {/* Weight Modal */}
      <Modal visible={weightModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Log Weight</Text>
            <TextInput
              label="Weight (kg)"
              value={weightInput}
              onChangeText={setWeightInput}
              keyboardType="decimal-pad"
              mode="outlined"
              style={styles.modalInput}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
              autoFocus
            />
            {weightError ? <Text style={styles.error}>{weightError}</Text> : null}
            <View style={styles.modalButtons}>
              <Button onPress={() => { setWeightModal(false); setWeightInput(''); setWeightError(''); }} textColor={colors.textSecondary}>
                Cancel
              </Button>
              <Button mode="contained" onPress={handleLogWeight} buttonColor={colors.primary}>
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: SPACING.md, paddingBottom: SPACING.xl },
  header: { marginBottom: SPACING.md },
  dateText: { ...typography.caption, color: colors.textSecondary },
  appName: { ...typography.h2, color: colors.primary, fontWeight: '700' },
  ringSection: { alignItems: 'center', marginVertical: SPACING.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: BORDER_RADIUS.card,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginBottom: SPACING.sm },
  mealSection: { marginBottom: SPACING.md },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  mealHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  mealType: { ...typography.h3, color: colors.textPrimary },
  mealTotal: { ...typography.body2, color: colors.textSecondary },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.button,
  },
  addButtonText: { ...typography.caption, color: '#fff', fontWeight: '600' },
  emptyMeal: { ...typography.body2, color: colors.textDisabled, fontStyle: 'italic', paddingVertical: SPACING.sm },
  weightRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.sm },
  weightValue: { ...typography.h2, color: colors.textPrimary },
  weightDelta: { ...typography.body1, fontWeight: '600' },
  deltaDown: { color: colors.primary },
  deltaUp: { color: colors.error },
  logWeightBtn: { borderColor: colors.primary, borderRadius: BORDER_RADIUS.button },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalCard: {
    backgroundColor: colors.background,
    borderRadius: BORDER_RADIUS.card,
    padding: SPACING.lg,
    width: '85%',
    gap: SPACING.sm,
  },
  modalTitle: { ...typography.h3, color: colors.textPrimary },
  modalInput: { backgroundColor: colors.background },
  error: { ...typography.caption, color: colors.error },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: SPACING.sm },
});
