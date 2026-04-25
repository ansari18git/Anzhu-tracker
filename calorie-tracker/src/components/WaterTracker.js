import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { SPACING } from '../utils/constants';

export default function WaterTracker({ glasses = 0, goal = 8, onAdd, onRemove }) {
  return (
    <View style={styles.container}>
      <View style={styles.glassRow}>
        {Array.from({ length: goal }, (_, i) => (
          <TouchableOpacity
            key={i}
            onPress={i < glasses ? onRemove : onAdd}
            style={styles.glassTap}
            hitSlop={4}
          >
            <Text style={styles.glass}>{i < glasses ? '🔵' : '⚪'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.count}>
          <Text style={styles.current}>{glasses}</Text>
          <Text style={styles.separator}> / </Text>
          <Text style={styles.total}>{goal} glasses</Text>
        </Text>
        {glasses >= goal && (
          <Text style={styles.goalReached}>Goal reached! 💧</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  glassRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  glassTap: {
    padding: 2,
  },
  glass: {
    fontSize: 22,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    ...typography.body2,
  },
  current: {
    ...typography.body1,
    color: colors.secondary,
    fontWeight: '700',
  },
  separator: {
    color: colors.textSecondary,
  },
  total: {
    color: colors.textSecondary,
  },
  goalReached: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});
