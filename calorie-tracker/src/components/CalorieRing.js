import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { calcProgress, calcRemaining } from '../utils/calculations';

const SIZE = 180;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CalorieRing({ consumed = 0, goal = 2000 }) {
  const progress = calcProgress(consumed, goal);
  const remaining = calcRemaining(consumed, goal);
  const strokeDash = CIRCUMFERENCE * (1 - progress);
  const isOver = consumed > goal;

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={colors.divider}
          strokeWidth={STROKE}
          fill="none"
        />
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={isOver ? colors.error : colors.primary}
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          strokeDashoffset={strokeDash}
          strokeLinecap="round"
          rotation="-90"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={styles.consumed}>{consumed}</Text>
        <Text style={styles.label}>of {goal} cal</Text>
        <Text style={[styles.remaining, isOver && styles.over]}>
          {isOver ? `${consumed - goal} over` : `${remaining} left`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
  },
  consumed: {
    ...typography.h1,
    color: colors.textPrimary,
    lineHeight: 36,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  remaining: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  over: {
    color: colors.error,
  },
});
