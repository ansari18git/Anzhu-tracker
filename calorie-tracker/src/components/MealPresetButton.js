import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { SPACING, BORDER_RADIUS } from '../utils/constants';

export default function MealPresetButton({ preset, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(preset)} activeOpacity={0.7}>
      <Text style={styles.name} numberOfLines={1}>{preset.meal_name}</Text>
      <View style={styles.meta}>
        <Text style={styles.calories}>{preset.calories} cal</Text>
        {preset.protein > 0 && (
          <Text style={styles.macro}>P{Math.round(preset.protein)}g</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.surface,
    borderRadius: BORDER_RADIUS.button,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 100,
    maxWidth: 160,
  },
  name: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  meta: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: 2,
  },
  calories: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  macro: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
