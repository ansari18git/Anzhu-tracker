import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { calcMacroPercents } from '../utils/calculations';
import { SPACING } from '../utils/constants';

const MACRO_COLORS = {
  protein: colors.secondary,
  carbs:   colors.accent,
  fat:     colors.warning,
  fiber:   colors.success,
};

export default function MacroBar({ protein = 0, carbs = 0, fat = 0, fiber = 0 }) {
  const percents = calcMacroPercents(protein, carbs, fat, fiber);
  const isEmpty = protein === 0 && carbs === 0 && fat === 0 && fiber === 0;

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {isEmpty ? (
          <View style={[styles.segment, { flex: 1, backgroundColor: colors.divider }]} />
        ) : (
          <>
            {percents.protein > 0 && <View style={[styles.segment, { flex: percents.protein, backgroundColor: MACRO_COLORS.protein }]} />}
            {percents.carbs   > 0 && <View style={[styles.segment, { flex: percents.carbs,   backgroundColor: MACRO_COLORS.carbs   }]} />}
            {percents.fat     > 0 && <View style={[styles.segment, { flex: percents.fat,     backgroundColor: MACRO_COLORS.fat     }]} />}
            {percents.fiber   > 0 && <View style={[styles.segment, { flex: percents.fiber,   backgroundColor: MACRO_COLORS.fiber   }]} />}
          </>
        )}
      </View>
      <View style={styles.labels}>
        <MacroLabel label="Protein" value={protein} color={MACRO_COLORS.protein} />
        <MacroLabel label="Carbs"   value={carbs}   color={MACRO_COLORS.carbs}   />
        <MacroLabel label="Fat"     value={fat}     color={MACRO_COLORS.fat}     />
        <MacroLabel label="Fiber"   value={fiber}   color={MACRO_COLORS.fiber}   />
      </View>
    </View>
  );
}

function MacroLabel({ label, value, color }) {
  return (
    <View style={styles.labelItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.macroName}>{label}</Text>
      <Text style={styles.macroValue}>{Math.round(value * 10) / 10}g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: SPACING.sm },
  bar: { flexDirection: 'row', height: 10, borderRadius: 5, overflow: 'hidden', backgroundColor: colors.divider },
  segment: { height: '100%' },
  labels: { flexDirection: 'row', justifyContent: 'space-around' },
  labelItem: { alignItems: 'center', gap: 2 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  macroName: { ...typography.caption, color: colors.textSecondary },
  macroValue: { ...typography.caption, color: colors.textPrimary, fontWeight: '600' },
});
