import React, { useState, useCallback } from 'react';
import {
  View, ScrollView, StyleSheet, TouchableOpacity,
  RefreshControl, Modal, ActivityIndicator,
} from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalorieRing from '../components/CalorieRing';
import MacroBar from '../components/MacroBar';
import MealCard from '../components/MealCard';
import WaterTracker from '../components/WaterTracker';
import { useFood } from '../hooks/useFood';
import { useWater } from '../hooks/useWater';
import { useWeight } from '../hooks/useWeight';
import { useProfile } from '../hooks/useProfile';
import { calcTotalMacros, calcWeightDelta, calcBMI, getBMICategory, calcBMIProgress } from '../utils/calculations';
import { formatDate } from '../utils/dateHelpers';
import { MEAL_TYPES, MEAL_TYPE_LABELS, SPACING, BORDER_RADIUS } from '../utils/constants';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function HomeScreen({ navigation }) {
  const { todayLogs, loading: foodLoading, removeLog, refetch: refetchFood } = useFood();
  const { amountMl, addWater, removeWater, refetch: refetchWater } = useWater();
  const { latestWeight, logWeight, weightLogs, refetch: refetchWeight } = useWeight();
  const { profile, loading: profileLoading } = useProfile();

  const [refreshing, setRefreshing] = useState(false);
  const [weightModal, setWeightModal] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [weightError, setWeightError] = useState('');
  const [weightSaving, setWeightSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  const isLoading = foodLoading || profileLoading;
  const totals = calcTotalMacros(todayLogs);
  const prevWeight = weightLogs.length > 1 ? weightLogs[weightLogs.length - 2]?.weight : null;
  const delta = calcWeightDelta(latestWeight?.weight, prevWeight);
  const calorieGoal  = profile?.daily_calorie_goal ?? 2000;
  const waterGoalMl  = profile?.daily_water_goal   ?? 2500;
  const heightCm     = profile?.height_cm           ?? null;
  const targetWeight = profile?.target_weight       ?? null;

  const currentBMI   = calcBMI(latestWeight?.weight, heightCm);
  const targetBMI    = calcBMI(targetWeight, heightCm);
  const bmiCategory  = getBMICategory(currentBMI);
  const bmiProgress  = calcBMIProgress(currentBMI);

  const showToast = (message) => setSnackbar({ visible: true, message });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchFood(), refetchWater(), refetchWeight()]);
    setRefreshing(false);
  }, [refetchFood, refetchWater, refetchWeight]);

  const handleDeleteLog = async (id) => {
    try {
      await removeLog(id);
      showToast('Meal removed');
    } catch {
      showToast('Failed to remove meal');
    }
  };

  const handleLogWeight = async () => {
    const val = parseFloat(weightInput);
    if (!weightInput || isNaN(val) || val <= 0) {
      setWeightError('Enter a valid weight');
      return;
    }
    setWeightSaving(true);
    try {
      await logWeight(val);
      setWeightInput('');
      setWeightError('');
      setWeightModal(false);
      showToast('Weight logged!');
    } catch {
      setWeightError('Failed to save. Try again.');
    } finally {
      setWeightSaving(false);
    }
  };

  const logsByType = MEAL_TYPES.reduce((acc, type) => {
    acc[type] = todayLogs.filter((log) => log.meal_type === type);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading your dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
            <TouchableOpacity
              style={styles.mealHeader}
              onPress={() => navigation.navigate('LogFood', { mealType: type })}
              activeOpacity={0.7}
            >
              <Text style={styles.mealType}>{MEAL_TYPE_LABELS[type]}</Text>
              <View style={styles.mealHeaderRight}>
                {logsByType[type].length > 0 && (
                  <Text style={styles.mealTotal}>
                    {logsByType[type].reduce((s, l) => s + l.calories, 0)} cal
                  </Text>
                )}
                <View style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Add</Text>
                </View>
              </View>
            </TouchableOpacity>
            {logsByType[type].length === 0 ? (
              <Text style={styles.emptyMeal}>Nothing logged yet</Text>
            ) : (
              logsByType[type].map((meal) => (
                <MealCard key={meal.id} meal={meal} onDelete={handleDeleteLog} />
              ))
            )}
          </View>
        ))}

        {/* Water Tracker */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💧 Water</Text>
          <WaterTracker
            amountMl={amountMl}
            goalMl={waterGoalMl}
            onAdd={addWater}
            onRemove={removeWater}
          />
        </View>

        {/* Weight */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>⚖️ Weight</Text>

          {/* Current Weight + Buttons */}
          <View style={styles.weightCurrentRow}>
            <View>
              <Text style={styles.weightLabel}>Current Weight</Text>
              {latestWeight ? (
                <View style={styles.weightValueRow}>
                  <Text style={styles.weightValue}>{latestWeight.weight} kg</Text>
                  {delta !== null && (
                    <Text style={[styles.weightDelta, delta > 0 ? styles.deltaUp : styles.deltaDown]}>
                      {delta > 0 ? `↑${delta}` : `↓${Math.abs(delta)}`} kg
                    </Text>
                  )}
                </View>
              ) : (
                <Text style={styles.emptyMeal}>Not logged yet</Text>
              )}
            </View>
            <View style={styles.weightButtons}>
              {/* Camera button — OCR Phase 2 */}
              <TouchableOpacity
                style={styles.cameraBtn}
                onPress={() => showToast('📷 OCR scanning coming soon!')}
                activeOpacity={0.7}
              >
                <Text style={styles.cameraBtnIcon}>📷</Text>
              </TouchableOpacity>
              {/* Manual add */}
              <TouchableOpacity
                style={styles.weightAddBtn}
                onPress={() => setWeightModal(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.weightAddBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* BMI */}
          {heightCm ? (
            <View style={styles.bmiSection}>
              <View style={styles.bmiTopRow}>
                <Text style={styles.bmiLabel}>BMI</Text>
                {currentBMI && (
                  <View style={styles.bmiValueRow}>
                    <Text style={[styles.bmiValue, { color: bmiCategory?.color }]}>
                      {currentBMI}
                    </Text>
                    <Text style={[styles.bmiCategory, { color: bmiCategory?.color }]}>
                      {bmiCategory?.label}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.bmiBarBg}>
                <View style={[
                  styles.bmiBarFill,
                  { width: `${bmiProgress * 100}%`, backgroundColor: bmiCategory?.color ?? colors.primary }
                ]} />
              </View>
              <View style={styles.bmiScaleLabels}>
                <Text style={styles.bmiScaleText}>Underweight</Text>
                <Text style={styles.bmiScaleText}>Normal</Text>
                <Text style={styles.bmiScaleText}>Obese</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.bmiHint}>⚙️ Set your height in Settings to see BMI</Text>
          )}

          {/* Target Weight + Hero BMI */}
          <View style={styles.targetSection}>
            <View style={styles.targetRow}>
              <Text style={styles.targetLabel}>Target Weight</Text>
              <Text style={styles.targetValue}>
                {targetWeight ? `${targetWeight} kg` : '— kg'}
              </Text>
            </View>
            {targetBMI && (
              <View style={styles.targetRow}>
                <Text style={styles.targetLabel}>Hero BMI</Text>
                <Text style={[styles.targetValue, { color: getBMICategory(targetBMI)?.color }]}>
                  {targetBMI}
                </Text>
              </View>
            )}
            <Text style={styles.settingsHint}>⚙️ Change target weight in Settings</Text>
          </View>
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
              <Button
                onPress={() => { setWeightModal(false); setWeightInput(''); setWeightError(''); }}
                textColor={colors.textSecondary}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleLogWeight}
                loading={weightSaving}
                disabled={weightSaving}
                buttonColor={colors.primary}
              >
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: '' })}
        duration={2000}
        style={styles.snackbar}
      >
        {snackbar.message}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: SPACING.md },
  loadingText: { ...typography.body2, color: colors.textSecondary },
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
  mealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  mealHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  mealType: { ...typography.h3, color: colors.textPrimary },
  mealTotal: { ...typography.body2, color: colors.textSecondary },
  addButton: { backgroundColor: colors.primary, paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: BORDER_RADIUS.button },
  addButtonText: { ...typography.caption, color: '#fff', fontWeight: '600' },
  emptyMeal: { ...typography.body2, color: colors.textDisabled, fontStyle: 'italic', paddingVertical: SPACING.sm },
  // Weight section
  weightCurrentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  weightLabel: { ...typography.caption, color: colors.textSecondary, marginBottom: 2 },
  weightValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: SPACING.sm },
  weightValue: { ...typography.h2, color: colors.textPrimary, fontWeight: '700' },
  weightDelta: { ...typography.body2, fontWeight: '600' },
  deltaDown: { color: colors.primary },
  deltaUp: { color: colors.error },
  weightButtons: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'center' },
  cameraBtn: {
    width: 52, height: 52,
    borderRadius: BORDER_RADIUS.card,
    backgroundColor: colors.textPrimary,
    justifyContent: 'center', alignItems: 'center',
  },
  cameraBtnIcon: { fontSize: 24 },
  weightAddBtn: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.button,
    borderWidth: 1, borderColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  weightAddBtnText: { ...typography.body2, color: colors.primary, fontWeight: '600' },
  // BMI
  bmiSection: { marginBottom: SPACING.md, gap: SPACING.xs },
  bmiTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bmiLabel: { ...typography.body2, color: colors.textSecondary },
  bmiValueRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  bmiValue: { ...typography.h3, fontWeight: '700' },
  bmiCategory: { ...typography.caption, fontWeight: '600' },
  bmiBarBg: { height: 10, backgroundColor: colors.divider, borderRadius: 5, overflow: 'hidden' },
  bmiBarFill: { height: '100%', borderRadius: 5 },
  bmiScaleLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  bmiScaleText: { ...typography.caption, color: colors.textDisabled, fontSize: 9 },
  bmiHint: { ...typography.caption, color: colors.textSecondary, marginBottom: SPACING.sm },
  // Target
  targetSection: { borderTopWidth: 1, borderTopColor: colors.divider, paddingTop: SPACING.sm, gap: 4 },
  targetRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  targetLabel: { ...typography.body2, color: colors.textSecondary },
  targetValue: { ...typography.body2, color: colors.textPrimary, fontWeight: '600' },
  settingsHint: { ...typography.caption, color: colors.textDisabled, marginTop: SPACING.xs },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { backgroundColor: colors.background, borderRadius: BORDER_RADIUS.card, padding: SPACING.lg, width: '85%', gap: SPACING.sm },
  modalTitle: { ...typography.h3, color: colors.textPrimary },
  modalInput: { backgroundColor: colors.background },
  error: { ...typography.caption, color: colors.error },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: SPACING.sm },
  snackbar: { backgroundColor: colors.textPrimary },
});
