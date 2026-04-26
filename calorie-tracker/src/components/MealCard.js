import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { SPACING, BORDER_RADIUS } from '../utils/constants';

export default function MealCard({ meal, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{meal.meal_name}</Text>
        <View style={styles.macros}>
          {meal.protein > 0 && <Text style={styles.macro}>P {Math.round(meal.protein)}g</Text>}
          {meal.carbs   > 0 && <Text style={styles.macro}>C {Math.round(meal.carbs)}g</Text>}
          {meal.fat     > 0 && <Text style={styles.macro}>F {Math.round(meal.fat)}g</Text>}
          {meal.fiber   > 0 && <Text style={[styles.macro, styles.fiber]}>Fi {Math.round(meal.fiber * 10) / 10}g</Text>}
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.calories}>{meal.calories}</Text>
        <Text style={styles.calLabel}>cal</Text>
        {onDelete && (
          <TouchableOpacity onPress={() => onDelete(meal.id)} style={styles.delete} hitSlop={8}>
            <Text style={styles.deleteIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: colors.surface,
    borderRadius: BORDER_RADIUS.card,
    marginBottom: SPACING.xs,
  },
  info: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  name: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  macros: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: 2,
  },
  macro: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  fiber: {
    color: colors.success,
  },
  right: {
    alignItems: 'flex-end',
  },
  calories: {
    ...typography.body1,
    color: colors.primary,
    fontWeight: '700',
  },
  calLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  delete: {
    marginTop: SPACING.xs,
  },
  deleteIcon: {
    fontSize: 12,
    color: colors.textDisabled,
  },
});
