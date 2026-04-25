import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button, Divider, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../services/authService';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { SPACING, BORDER_RADIUS } from '../utils/constants';

export default function SettingsScreen() {
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();

  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [water, setWater] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  useEffect(() => {
    if (profile) {
      setCalories(String(profile.daily_calorie_goal ?? 2000));
      setProtein(String(profile.daily_protein_goal ?? 150));
      setCarbs(String(profile.daily_carbs_goal ?? 200));
      setFat(String(profile.daily_fat_goal ?? 67));
      setWater(String(profile.daily_water_goal ?? 8));
      setTargetWeight(profile.target_weight ? String(profile.target_weight) : '');
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await updateProfile({
        daily_calorie_goal: parseInt(calories) || 2000,
        daily_protein_goal: parseInt(protein) || 150,
        daily_carbs_goal: parseInt(carbs) || 200,
        daily_fat_goal: parseInt(fat) || 67,
        daily_water_goal: parseInt(water) || 8,
        target_weight: targetWeight ? parseFloat(targetWeight) : null,
      });
      setSaved(true);
      setSnackbar({ visible: true, message: '✓ Settings saved!' });
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setSnackbar({ visible: true, message: 'Failed to save. Try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (err) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <Text style={styles.pageTitle}>Settings</Text>

        {/* Daily Goals */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Daily Goals</Text>

          <GoalInput
            label="Calories"
            value={calories}
            onChangeText={setCalories}
            suffix="cal/day"
          />
          <GoalInput
            label="Protein"
            value={protein}
            onChangeText={setProtein}
            suffix="g/day"
          />
          <GoalInput
            label="Carbs"
            value={carbs}
            onChangeText={setCarbs}
            suffix="g/day"
          />
          <GoalInput
            label="Fat"
            value={fat}
            onChangeText={setFat}
            suffix="g/day"
          />
          <GoalInput
            label="Water"
            value={water}
            onChangeText={setWater}
            suffix="glasses/day"
          />
        </View>

        {/* Weight Goal */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Weight Goal</Text>
          <GoalInput
            label="Target Weight"
            value={targetWeight}
            onChangeText={setTargetWeight}
            suffix="kg"
            decimal
          />
        </View>

        {/* Save Button */}
        <Button
          mode="contained"
          onPress={handleSave}
          loading={saving}
          disabled={saving || loading}
          style={styles.saveButton}
          buttonColor={saved ? colors.success : colors.primary}
          labelStyle={typography.button}
        >
          {saved ? '✓ Saved!' : 'Save Changes'}
        </Button>

        {/* Account */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Divider style={styles.divider} />
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            textColor={colors.error}
          >
            Logout
          </Button>
        </View>

        {/* About */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>Anzhu Tracker v1.0.0</Text>
          <Text style={styles.aboutText}>Built with ❤️ by Ansari</Text>
        </View>

      </ScrollView>

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

function GoalInput({ label, value, onChangeText, suffix, decimal = false }) {
  return (
    <View style={styles.goalRow}>
      <Text style={styles.goalLabel}>{label}</Text>
      <View style={styles.goalInputWrap}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={decimal ? 'decimal-pad' : 'numeric'}
          mode="outlined"
          style={styles.goalInput}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          dense
        />
        <Text style={styles.goalSuffix}>{suffix}</Text>
      </View>
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
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: SPACING.md,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  goalLabel: { ...typography.body1, color: colors.textPrimary, flex: 1 },
  goalInputWrap: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  goalInput: { width: 90, backgroundColor: colors.background },
  goalSuffix: { ...typography.caption, color: colors.textSecondary, width: 70 },
  saveButton: {
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.button,
    paddingVertical: SPACING.xs,
  },
  email: { ...typography.body1, color: colors.textSecondary, marginBottom: SPACING.md },
  divider: { marginBottom: SPACING.md },
  logoutButton: {
    borderColor: colors.error,
    borderRadius: BORDER_RADIUS.button,
  },
  aboutText: { ...typography.body2, color: colors.textSecondary, marginBottom: SPACING.xs },
  snackbar: { backgroundColor: colors.textPrimary },
});
