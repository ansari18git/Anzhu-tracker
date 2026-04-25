import React, { useState } from 'react';
import {
  View, ScrollView, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { Text, TextInput, Button, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFood } from '../hooks/useFood';
import MealPresetButton from '../components/MealPresetButton';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { MEAL_TYPES, MEAL_TYPE_LABELS, SPACING, BORDER_RADIUS } from '../utils/constants';

export default function LogFoodScreen({ navigation, route }) {
  const initialType = route?.params?.mealType ?? 'breakfast';
  const { recentMeals, presets, addLog } = useFood();

  const [mealType, setMealType] = useState(initialType);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [saveAsPreset, setSaveAsPreset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const autoFill = (item) => {
    setMealName(item.meal_name);
    setCalories(String(item.calories));
    setProtein(item.protein ? String(item.protein) : '');
    setCarbs(item.carbs ? String(item.carbs) : '');
    setFat(item.fat ? String(item.fat) : '');
    if (item.meal_type) setMealType(item.meal_type);
  };

  const validate = () => {
    if (!mealName.trim()) return 'Meal name is required';
    const cal = parseInt(calories, 10);
    if (!calories || isNaN(cal) || cal <= 0) return 'Enter a valid calorie amount';
    return null;
  };

  const handleSave = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      await addLog(
        {
          meal_name: mealName.trim(),
          meal_type: mealType,
          calories: parseInt(calories, 10),
          protein: parseFloat(protein) || 0,
          carbs: parseFloat(carbs) || 0,
          fat: parseFloat(fat) || 0,
        },
        saveAsPreset
      );
      navigation.goBack();
    } catch (e) {
      setError(e.message || 'Failed to save. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Log Meal</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* Meal Type Selector */}
          <Text style={styles.label}>Meal Type</Text>
          <View style={styles.typeRow}>
            {MEAL_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.typeChip, mealType === type && styles.typeChipActive]}
                onPress={() => setMealType(type)}
              >
                <Text style={[styles.typeChipText, mealType === type && styles.typeChipTextActive]}>
                  {MEAL_TYPE_LABELS[type]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Meal Name */}
          <TextInput
            label="Meal Name *"
            value={mealName}
            onChangeText={setMealName}
            mode="outlined"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
          />

          {/* Calories */}
          <TextInput
            label="Calories *"
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            right={<TextInput.Affix text="cal" />}
          />

          {/* Macros */}
          <Text style={styles.label}>Macros (optional)</Text>
          <View style={styles.macroRow}>
            <TextInput
              label="Protein"
              value={protein}
              onChangeText={setProtein}
              keyboardType="numeric"
              mode="outlined"
              style={styles.macroInput}
              outlineColor={colors.border}
              activeOutlineColor={colors.secondary}
              right={<TextInput.Affix text="g" />}
            />
            <TextInput
              label="Carbs"
              value={carbs}
              onChangeText={setCarbs}
              keyboardType="numeric"
              mode="outlined"
              style={styles.macroInput}
              outlineColor={colors.border}
              activeOutlineColor={colors.accent}
              right={<TextInput.Affix text="g" />}
            />
            <TextInput
              label="Fat"
              value={fat}
              onChangeText={setFat}
              keyboardType="numeric"
              mode="outlined"
              style={styles.macroInput}
              outlineColor={colors.border}
              activeOutlineColor={colors.warning}
              right={<TextInput.Affix text="g" />}
            />
          </View>

          {/* Save as preset */}
          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setSaveAsPreset(!saveAsPreset)}
          >
            <Checkbox
              status={saveAsPreset ? 'checked' : 'unchecked'}
              color={colors.primary}
              onPress={() => setSaveAsPreset(!saveAsPreset)}
            />
            <Text style={styles.checkLabel}>Save as preset for quick-add later</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Recent Meals */}
          {recentMeals.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Meals</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.presetRow}>
                  {recentMeals.map((meal, i) => (
                    <MealPresetButton key={i} preset={meal} onPress={autoFill} />
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Presets */}
          {presets.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Presets</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.presetRow}>
                  {presets.map((preset) => (
                    <MealPresetButton key={preset.id} preset={preset} onPress={autoFill} />
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Save Button */}
          <Button
            mode="contained"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={styles.saveButton}
            buttonColor={colors.primary}
            labelStyle={typography.button}
          >
            Save Entry
          </Button>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  back: { width: 60 },
  backText: { ...typography.body1, color: colors.primary },
  title: { ...typography.h3, color: colors.textPrimary },
  scroll: { padding: SPACING.md, paddingBottom: SPACING.xl },
  label: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  typeChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  typeChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeChipText: { ...typography.caption, color: colors.textSecondary },
  typeChipTextActive: { color: '#fff', fontWeight: '600' },
  input: { backgroundColor: colors.background, marginBottom: SPACING.sm },
  macroRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm },
  macroInput: { flex: 1, backgroundColor: colors.background },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },
  checkLabel: { ...typography.body2, color: colors.textPrimary, flex: 1 },
  error: { ...typography.body2, color: colors.error, marginBottom: SPACING.sm },
  section: { marginTop: SPACING.md },
  sectionTitle: { ...typography.body1, fontWeight: '600', color: colors.textPrimary, marginBottom: SPACING.sm },
  presetRow: { flexDirection: 'row' },
  saveButton: {
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.button,
    paddingVertical: SPACING.xs,
  },
});
