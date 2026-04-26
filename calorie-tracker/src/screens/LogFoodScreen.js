import React, { useState } from 'react';
import {
  View, ScrollView, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform, FlatList,
} from 'react-native';
import { Text, TextInput, Button, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFood } from '../hooks/useFood';
import MealPresetButton from '../components/MealPresetButton';
import { searchFoods, calcNutrition, getQuantityLabel } from '../utils/foodDatabase';
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

  // Food database search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
    setSelectedFood(null);
    setQuantity('');
    setSearchResults(searchFoods(text));
  };

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setSearchQuery(food.name);
    setSearchResults([]);
    setMealName(food.name);
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setQuantity('');
  };

  const handleQuantityChange = (val) => {
    setQuantity(val);
    if (!selectedFood) return;
    const qty = parseFloat(val);
    if (!val || isNaN(qty) || qty <= 0) {
      setCalories('');
      setProtein('');
      setCarbs('');
      setFat('');
      return;
    }
    const nutrition = calcNutrition(selectedFood, qty);
    if (nutrition) {
      setCalories(String(nutrition.calories));
      setProtein(String(nutrition.protein));
      setCarbs(String(nutrition.carbs));
      setFat(String(nutrition.fat));
    }
  };

  const autoFill = (item) => {
    setSelectedFood(null);
    setSearchQuery('');
    setSearchResults([]);
    setQuantity('');
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Log Meal</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* ── Food Search ──────────────────────────── */}
          <View style={styles.searchSection}>
            <Text style={styles.sectionTitle}>🔍 Search Food</Text>
            <TextInput
              label="Type food name (e.g. idli, chicken breast)"
              value={searchQuery}
              onChangeText={handleSearch}
              mode="outlined"
              style={styles.input}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <View style={styles.dropdown}>
                {searchResults.map((food) => (
                  <TouchableOpacity
                    key={food.id}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectFood(food)}
                  >
                    <View style={styles.dropdownLeft}>
                      <Text style={styles.dropdownName}>{food.name}</Text>
                      <Text style={styles.dropdownCategory}>{food.category}</Text>
                    </View>
                    <View style={styles.dropdownRight}>
                      <Text style={styles.dropdownCal}>{food.calories} cal</Text>
                      <Text style={styles.dropdownUnit}>per {food.unit}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Quantity Input — shown after food selected */}
            {selectedFood && (
              <View style={styles.quantitySection}>
                <View style={styles.selectedFoodBadge}>
                  <Text style={styles.selectedFoodName}>✅ {selectedFood.name}</Text>
                  <Text style={styles.selectedFoodInfo}>
                    {selectedFood.calories} cal per {selectedFood.unit} · P{selectedFood.protein}g  C{selectedFood.carbs}g  F{selectedFood.fat}g
                  </Text>
                </View>
                <TextInput
                  label={`How many ${getQuantityLabel(selectedFood.unit)}?`}
                  value={quantity}
                  onChangeText={handleQuantityChange}
                  keyboardType="decimal-pad"
                  mode="outlined"
                  style={styles.input}
                  outlineColor={colors.primary}
                  activeOutlineColor={colors.primary}
                  right={<TextInput.Affix text={getQuantityLabel(selectedFood.unit)} />}
                  autoFocus
                />
                {calories ? (
                  <View style={styles.calculatedBadge}>
                    <Text style={styles.calculatedText}>
                      🔢 {calories} cal  ·  P{protein}g  C{carbs}g  F{fat}g
                    </Text>
                  </View>
                ) : null}
              </View>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or enter manually</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* ── Meal Type ────────────────────────────── */}
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

          {/* ── Meal Name ────────────────────────────── */}
          <TextInput
            label="Meal Name *"
            value={mealName}
            onChangeText={setMealName}
            mode="outlined"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
          />

          {/* ── Calories ─────────────────────────────── */}
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

          {/* ── Macros ───────────────────────────────── */}
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

          {/* ── Save as Preset ───────────────────────── */}
          <TouchableOpacity style={styles.checkRow} onPress={() => setSaveAsPreset(!saveAsPreset)}>
            <Checkbox status={saveAsPreset ? 'checked' : 'unchecked'} color={colors.primary} onPress={() => setSaveAsPreset(!saveAsPreset)} />
            <Text style={styles.checkLabel}>Save as preset for quick-add later</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* ── Recent Meals ─────────────────────────── */}
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

          {/* ── Presets ──────────────────────────────── */}
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

          {/* ── Save Button ──────────────────────────── */}
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderBottomWidth: 1, borderBottomColor: colors.divider,
  },
  back: { width: 60 },
  backText: { ...typography.body1, color: colors.primary },
  title: { ...typography.h3, color: colors.textPrimary },
  scroll: { padding: SPACING.md, paddingBottom: SPACING.xl },
  searchSection: { marginBottom: SPACING.sm },
  sectionTitle: { ...typography.body1, fontWeight: '600', color: colors.textPrimary, marginBottom: SPACING.sm },
  input: { backgroundColor: colors.background, marginBottom: SPACING.sm },
  dropdown: {
    backgroundColor: colors.background,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: BORDER_RADIUS.card,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderBottomWidth: 1, borderBottomColor: colors.divider,
  },
  dropdownLeft: { flex: 1 },
  dropdownName: { ...typography.body2, color: colors.textPrimary, fontWeight: '500' },
  dropdownCategory: { ...typography.caption, color: colors.textSecondary },
  dropdownRight: { alignItems: 'flex-end' },
  dropdownCal: { ...typography.body2, color: colors.primary, fontWeight: '700' },
  dropdownUnit: { ...typography.caption, color: colors.textSecondary },
  quantitySection: { gap: SPACING.sm },
  selectedFoodBadge: {
    backgroundColor: colors.surface, borderRadius: BORDER_RADIUS.card,
    padding: SPACING.sm, borderLeftWidth: 3, borderLeftColor: colors.primary,
  },
  selectedFoodName: { ...typography.body1, fontWeight: '600', color: colors.textPrimary },
  selectedFoodInfo: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  calculatedBadge: {
    backgroundColor: colors.primary + '15', borderRadius: BORDER_RADIUS.button,
    padding: SPACING.sm,
  },
  calculatedText: { ...typography.body2, color: colors.primary, fontWeight: '600', textAlign: 'center' },
  divider: {
    flexDirection: 'row', alignItems: 'center',
    marginVertical: SPACING.md, gap: SPACING.sm,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.divider },
  dividerText: { ...typography.caption, color: colors.textSecondary },
  label: { ...typography.body2, color: colors.textSecondary, marginBottom: SPACING.xs, marginTop: SPACING.sm },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.sm },
  typeChip: {
    paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs,
    borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface,
  },
  typeChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  typeChipText: { ...typography.caption, color: colors.textSecondary },
  typeChipTextActive: { color: '#fff', fontWeight: '600' },
  macroRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm },
  macroInput: { flex: 1, backgroundColor: colors.background },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginVertical: SPACING.sm },
  checkLabel: { ...typography.body2, color: colors.textPrimary, flex: 1 },
  error: { ...typography.body2, color: colors.error, marginBottom: SPACING.sm },
  section: { marginTop: SPACING.md },
  presetRow: { flexDirection: 'row' },
  saveButton: { marginTop: SPACING.lg, borderRadius: BORDER_RADIUS.button, paddingVertical: SPACING.xs },
});
