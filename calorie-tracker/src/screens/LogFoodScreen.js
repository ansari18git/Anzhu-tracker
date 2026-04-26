import React, { useState } from 'react';
import {
  View, ScrollView, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { Text, TextInput, Button, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFood } from '../hooks/useFood';
import MealPresetButton from '../components/MealPresetButton';
import { searchFoods, calcNutrition, getQuickPresets } from '../utils/foodDatabase';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { MEAL_TYPES, MEAL_TYPE_LABELS, SPACING, BORDER_RADIUS } from '../utils/constants';

export default function LogFoodScreen({ navigation, route }) {
  const initialType = route?.params?.mealType ?? 'breakfast';
  const { recentMeals, presets, addLog } = useFood();

  // Form state
  const [mealType, setMealType] = useState(initialType);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [saveAsPreset, setSaveAsPreset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [measure, setMeasure] = useState('grams');
  const [quantity, setQuantity] = useState('');
  const [nutrition, setNutrition] = useState(null);

  const handleSearch = (text) => {
    setSearchQuery(text);
    setSearchResults(searchFoods(text));
    if (selectedFood) {
      setSelectedFood(null);
      setNutrition(null);
      setQuantity('');
    }
  };

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setSearchQuery(food.name);
    setSearchResults([]);
    setMealName(food.name);
    const defaultMeasure = food.measures[0];
    setMeasure(defaultMeasure);
    setQuantity('');
    setNutrition(null);
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  const handleMeasureChange = (newMeasure) => {
    setMeasure(newMeasure);
    setQuantity('');
    setNutrition(null);
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  const handleQuantityChange = (val) => {
    setQuantity(val);
    const qty = parseFloat(val);
    if (!selectedFood || !val || isNaN(qty) || qty <= 0) {
      setNutrition(null);
      setCalories('');
      setProtein('');
      setCarbs('');
      setFat('');
      return;
    }
    const result = calcNutrition(selectedFood, qty, measure);
    if (result) {
      setNutrition(result);
      setCalories(String(result.calories));
      setProtein(String(result.protein));
      setCarbs(String(result.carbs));
      setFat(String(result.fat));
    }
  };

  const handleQuickPreset = (val) => {
    handleQuantityChange(String(val));
    setQuantity(String(val));
  };

  const autoFill = (item) => {
    setSelectedFood(null);
    setSearchQuery('');
    setSearchResults([]);
    setQuantity('');
    setNutrition(null);
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
      await addLog({
        meal_name: mealName.trim(),
        meal_type: mealType,
        calories: parseInt(calories, 10),
        protein: parseFloat(protein) || 0,
        carbs: parseFloat(carbs) || 0,
        fat: parseFloat(fat) || 0,
      }, saveAsPreset);
      navigation.goBack();
    } catch (e) {
      setError(e.message || 'Failed to save. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const measureLabel = measure === 'pieces' ? 'pcs' : measure === 'ml' ? 'ml' : 'g';
  const quickPresets = selectedFood ? getQuickPresets(measure) : [];

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Log Meal</Text>
          <View style={{ width: 50 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ── Search ─────────────────────────────── */}
          <TextInput
            label="🔍 Search food (e.g. idli, chicken breast)"
            value={searchQuery}
            onChangeText={handleSearch}
            mode="outlined"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
          />

          {/* Search Dropdown */}
          {searchResults.length > 0 && (
            <View style={styles.dropdown}>
              {searchResults.map((food) => (
                <TouchableOpacity
                  key={food.id}
                  style={styles.dropdownItem}
                  onPress={() => handleSelectFood(food)}
                >
                  <View>
                    <Text style={styles.dropdownName}>{food.name}</Text>
                    <Text style={styles.dropdownCategory}>{food.category}</Text>
                  </View>
                  <Text style={styles.dropdownCal}>{food.cal} cal/100g</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* ── Food Detail Card ───────────────────── */}
          {selectedFood && (
            <View style={styles.detailCard}>

              {/* Food name + hint */}
              <View style={styles.detailHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.detailName}>{selectedFood.name}</Text>
                  <Text style={styles.detailCategory}>{selectedFood.category}</Text>
                  {selectedFood.hint && (
                    <Text style={styles.detailHint}>💡 {selectedFood.hint}</Text>
                  )}
                </View>
                <View style={styles.detailCalBadge}>
                  <Text style={styles.detailCalNum}>{selectedFood.cal}</Text>
                  <Text style={styles.detailCalLabel}>cal/100g</Text>
                </View>
              </View>

              {/* Measure toggle */}
              {selectedFood.measures.length > 1 && (
                <View style={styles.measureRow}>
                  <Text style={styles.measureLabel}>Measure</Text>
                  <View style={styles.measureToggle}>
                    {selectedFood.measures.map((m) => (
                      <TouchableOpacity
                        key={m}
                        style={[styles.measureChip, measure === m && styles.measureChipActive]}
                        onPress={() => handleMeasureChange(m)}
                      >
                        <Text style={[styles.measureChipText, measure === m && styles.measureChipTextActive]}>
                          {m === 'pieces' ? 'Pieces' : m === 'ml' ? 'ml' : 'Grams'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* Quantity input */}
              <View style={styles.quantityRow}>
                <TextInput
                  label={`Quantity (${measureLabel})`}
                  value={quantity}
                  onChangeText={handleQuantityChange}
                  keyboardType="decimal-pad"
                  mode="outlined"
                  style={styles.quantityInput}
                  outlineColor={colors.primary}
                  activeOutlineColor={colors.primary}
                  right={<TextInput.Affix text={measureLabel} />}
                  autoFocus
                />
              </View>

              {/* Quick preset buttons */}
              <View style={styles.quickRow}>
                {quickPresets.map((val) => (
                  <TouchableOpacity
                    key={val}
                    style={[styles.quickBtn, quantity === String(val) && styles.quickBtnActive]}
                    onPress={() => handleQuickPreset(val)}
                  >
                    <Text style={[styles.quickBtnText, quantity === String(val) && styles.quickBtnTextActive]}>
                      {val}{measureLabel}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Nutrition result card */}
              {nutrition && (
                <View style={styles.nutritionCard}>
                  <View style={styles.nutritionTopRow}>
                    <View>
                      <Text style={styles.nutritionCalLabel}>Calories</Text>
                      <Text style={styles.nutritionCalValue}>{nutrition.calories} cal</Text>
                    </View>
                    <View style={styles.netWtBadge}>
                      <Text style={styles.netWtText}>Net wt: {nutrition.grams}g</Text>
                    </View>
                  </View>
                  <View style={styles.nutritionDivider} />
                  <NutritionRow label="Protein" value={nutrition.protein} />
                  <NutritionRow label="Carbs" value={nutrition.carbs} />
                  <NutritionRow label="Fat" value={nutrition.fat} />
                </View>
              )}
            </View>
          )}

          {/* ── Divider ────────────────────────────── */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or enter manually</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* ── Meal Type ────────────────────────────── */}
          <Text style={styles.fieldLabel}>Meal Type</Text>
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
          <Text style={styles.fieldLabel}>Macros (optional)</Text>
          <View style={styles.macroRow}>
            <TextInput label="Protein" value={protein} onChangeText={setProtein} keyboardType="numeric" mode="outlined" style={styles.macroInput} outlineColor={colors.border} activeOutlineColor={colors.secondary} right={<TextInput.Affix text="g" />} />
            <TextInput label="Carbs"   value={carbs}   onChangeText={setCarbs}   keyboardType="numeric" mode="outlined" style={styles.macroInput} outlineColor={colors.border} activeOutlineColor={colors.accent}    right={<TextInput.Affix text="g" />} />
            <TextInput label="Fat"     value={fat}     onChangeText={setFat}     keyboardType="numeric" mode="outlined" style={styles.macroInput} outlineColor={colors.border} activeOutlineColor={colors.warning}   right={<TextInput.Affix text="g" />} />
          </View>

          {/* Save as preset */}
          <TouchableOpacity style={styles.checkRow} onPress={() => setSaveAsPreset(!saveAsPreset)}>
            <Checkbox status={saveAsPreset ? 'checked' : 'unchecked'} color={colors.primary} onPress={() => setSaveAsPreset(!saveAsPreset)} />
            <Text style={styles.checkLabel}>Save as preset for quick-add later</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Recent Meals */}
          {recentMeals.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Meals</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.presetRow}>
                  {recentMeals.map((meal, i) => <MealPresetButton key={i} preset={meal} onPress={autoFill} />)}
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
                  {presets.map((p) => <MealPresetButton key={p.id} preset={p} onPress={autoFill} />)}
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
            Add to {MEAL_TYPE_LABELS[mealType]}
          </Button>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function NutritionRow({ label, value }) {
  return (
    <View style={styles.nutritionRow}>
      <Text style={styles.nutritionRowLabel}>{label}</Text>
      <Text style={styles.nutritionRowValue}>{value} g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: colors.divider },
  backText: { ...typography.body1, color: colors.primary },
  title: { ...typography.h3, color: colors.textPrimary },
  scroll: { padding: SPACING.md, paddingBottom: SPACING.xl },
  input: { backgroundColor: colors.background, marginBottom: SPACING.sm },

  // Dropdown
  dropdown: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: BORDER_RADIUS.card, marginBottom: SPACING.sm, overflow: 'hidden' },
  dropdownItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.divider },
  dropdownName: { ...typography.body2, color: colors.textPrimary, fontWeight: '600' },
  dropdownCategory: { ...typography.caption, color: colors.textSecondary },
  dropdownCal: { ...typography.caption, color: colors.primary, fontWeight: '700' },

  // Detail Card
  detailCard: { backgroundColor: colors.surface, borderRadius: BORDER_RADIUS.card, padding: SPACING.md, marginBottom: SPACING.sm, gap: SPACING.sm },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  detailName: { ...typography.h3, color: colors.textPrimary },
  detailCategory: { ...typography.caption, color: colors.textSecondary },
  detailHint: { ...typography.caption, color: colors.accent, marginTop: 2 },
  detailCalBadge: { alignItems: 'center', backgroundColor: colors.primary + '15', borderRadius: 8, padding: SPACING.sm },
  detailCalNum: { ...typography.h3, color: colors.primary, fontWeight: '700' },
  detailCalLabel: { ...typography.caption, color: colors.primary },

  // Measure toggle
  measureRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  measureLabel: { ...typography.body2, color: colors.textSecondary, width: 60 },
  measureToggle: { flexDirection: 'row', gap: SPACING.sm },
  measureChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background },
  measureChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  measureChipText: { ...typography.caption, color: colors.textSecondary },
  measureChipTextActive: { color: '#fff', fontWeight: '600' },

  // Quantity
  quantityRow: { flexDirection: 'row' },
  quantityInput: { flex: 1, backgroundColor: colors.background },

  // Quick presets
  quickRow: { flexDirection: 'row', gap: SPACING.sm },
  quickBtn: { flex: 1, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.button, borderWidth: 1, borderColor: colors.border, alignItems: 'center', backgroundColor: colors.background },
  quickBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  quickBtnText: { ...typography.caption, color: colors.textSecondary, fontWeight: '600' },
  quickBtnTextActive: { color: '#fff' },

  // Nutrition card
  nutritionCard: { backgroundColor: colors.background, borderRadius: BORDER_RADIUS.card, padding: SPACING.md, borderWidth: 1, borderColor: colors.border },
  nutritionTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  nutritionCalLabel: { ...typography.caption, color: colors.textSecondary },
  nutritionCalValue: { fontSize: 28, fontWeight: '700', color: colors.textPrimary },
  netWtBadge: { backgroundColor: colors.surface, borderRadius: 6, paddingHorizontal: SPACING.sm, paddingVertical: 4 },
  netWtText: { ...typography.caption, color: colors.textSecondary },
  nutritionDivider: { height: 1, backgroundColor: colors.divider, marginBottom: SPACING.sm },
  nutritionRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  nutritionRowLabel: { ...typography.body2, color: colors.textSecondary },
  nutritionRowValue: { ...typography.body2, color: colors.textPrimary, fontWeight: '600' },

  // Divider
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: SPACING.md, gap: SPACING.sm },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.divider },
  dividerText: { ...typography.caption, color: colors.textSecondary },

  // Form
  fieldLabel: { ...typography.body2, color: colors.textSecondary, marginBottom: SPACING.xs, marginTop: SPACING.sm },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.sm },
  typeChip: { paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  typeChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  typeChipText: { ...typography.caption, color: colors.textSecondary },
  typeChipTextActive: { color: '#fff', fontWeight: '600' },
  macroRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm },
  macroInput: { flex: 1, backgroundColor: colors.background },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginVertical: SPACING.sm },
  checkLabel: { ...typography.body2, color: colors.textPrimary, flex: 1 },
  error: { ...typography.body2, color: colors.error, marginBottom: SPACING.sm },
  section: { marginTop: SPACING.md },
  sectionTitle: { ...typography.body1, fontWeight: '600', color: colors.textPrimary, marginBottom: SPACING.sm },
  presetRow: { flexDirection: 'row' },
  saveButton: { marginTop: SPACING.lg, borderRadius: BORDER_RADIUS.button, paddingVertical: SPACING.xs },
});
