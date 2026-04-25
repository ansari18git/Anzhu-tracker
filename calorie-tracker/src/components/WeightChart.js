import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { formatShortDate } from '../utils/dateHelpers';
import { SPACING } from '../utils/constants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_WIDTH = SCREEN_WIDTH - SPACING.md * 2;

export default function WeightChart({ data = [] }) {
  if (data.length < 2) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Log at least 2 weight entries to see the chart.</Text>
      </View>
    );
  }

  const labels = data.map((entry) => formatShortDate(entry.logged_at));
  const values = data.map((entry) => parseFloat(entry.weight));

  const displayLabels = labels.map((l, i) =>
    i === 0 || i === labels.length - 1 || i % Math.ceil(labels.length / 4) === 0 ? l : ''
  );

  const chartData = {
    labels: displayLabels,
    datasets: [{ data: values, strokeWidth: 2 }],
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={CHART_WIDTH}
        height={180}
        chartConfig={{
          backgroundColor: colors.background,
          backgroundGradientFrom: colors.background,
          backgroundGradientTo: colors.background,
          decimalPlaces: 1,
          color: () => colors.primary,
          labelColor: () => colors.textSecondary,
          propsForDots: { r: '4', strokeWidth: '2', stroke: colors.primary },
          propsForBackgroundLines: { stroke: colors.divider },
        }}
        bezier
        style={styles.chart}
        withInnerLines
        withOuterLines={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 12,
    marginLeft: -SPACING.md,
  },
  empty: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: SPACING.md,
  },
  emptyText: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
