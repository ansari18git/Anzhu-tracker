import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { SPACING, BORDER_RADIUS } from '../utils/constants';

const QUICK_AMOUNTS = [250, 500, 750, 1000];

export default function WaterTracker({ amountMl = 0, goalMl = 2500, onAdd, onRemove }) {
  const [customModal, setCustomModal] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const progress = Math.min(1, amountMl / goalMl);
  const progressPct = Math.round(progress * 100);
  const isGoalReached = amountMl >= goalMl;

  const toLitres = (ml) => {
    if (ml >= 1000) return `${(ml / 1000).toFixed(1)}L`;
    return `${ml}ml`;
  };

  const handleCustomAdd = () => {
    const val = parseInt(customInput, 10);
    if (!isNaN(val) && val > 0) {
      onAdd(val);
    }
    setCustomInput('');
    setCustomModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Amount display */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.amountText}>{toLitres(amountMl)}</Text>
          <Text style={styles.goalText}>goal: {toLitres(goalMl)}</Text>
        </View>
        <View style={styles.pctBadge}>
          <Text style={[styles.pctText, isGoalReached && styles.goalReachedText]}>
            {isGoalReached ? '✅ Goal!' : `${progressPct}%`}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View style={[
          styles.progressFill,
          { width: `${progressPct}%` },
          isGoalReached && styles.progressGoalReached,
        ]} />
      </View>

      {/* Quick add buttons */}
      <View style={styles.quickRow}>
        {QUICK_AMOUNTS.map((ml) => (
          <TouchableOpacity
            key={ml}
            style={styles.quickBtn}
            onPress={() => onAdd(ml)}
            activeOpacity={0.7}
          >
            <Text style={styles.quickBtnText}>+{toLitres(ml)}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.quickBtn, styles.customBtn]}
          onPress={() => setCustomModal(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.customBtnText}>Custom</Text>
        </TouchableOpacity>
      </View>

      {/* Undo button */}
      {amountMl > 0 && (
        <TouchableOpacity onPress={() => onRemove(250)} style={styles.undoBtn}>
          <Text style={styles.undoText}>↩ Undo 250ml</Text>
        </TouchableOpacity>
      )}

      {/* Custom amount modal */}
      <Modal visible={customModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Custom Amount</Text>
            <TextInput
              style={styles.modalInput}
              value={customInput}
              onChangeText={setCustomInput}
              keyboardType="numeric"
              placeholder="Enter ml (e.g. 350)"
              placeholderTextColor={colors.textDisabled}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => { setCustomModal(false); setCustomInput(''); }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalAddBtn} onPress={handleCustomAdd}>
                <Text style={styles.modalAddText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: SPACING.sm },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountText: { fontSize: 28, fontWeight: '700', color: colors.secondary },
  goalText: { ...typography.caption, color: colors.textSecondary },
  pctBadge: {
    backgroundColor: colors.secondary + '15',
    borderRadius: BORDER_RADIUS.button,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  pctText: { ...typography.body2, color: colors.secondary, fontWeight: '700' },
  goalReachedText: { color: colors.success },
  progressBg: {
    height: 10,
    backgroundColor: colors.divider,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 5,
  },
  progressGoalReached: { backgroundColor: colors.success },
  quickRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    flexWrap: 'wrap',
  },
  quickBtn: {
    flex: 1,
    minWidth: 60,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.button,
    borderWidth: 1,
    borderColor: colors.secondary,
    alignItems: 'center',
  },
  quickBtnText: { ...typography.caption, color: colors.secondary, fontWeight: '700' },
  customBtn: {
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  customBtnText: { ...typography.caption, color: colors.textSecondary, fontWeight: '600' },
  undoBtn: { alignSelf: 'flex-start', paddingVertical: 2 },
  undoText: { ...typography.caption, color: colors.textDisabled },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalCard: {
    backgroundColor: colors.background,
    borderRadius: BORDER_RADIUS.card,
    padding: SPACING.lg,
    width: '80%',
    gap: SPACING.md,
  },
  modalTitle: { ...typography.h3, color: colors.textPrimary },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: BORDER_RADIUS.button,
    padding: SPACING.sm,
    ...typography.body1,
    color: colors.textPrimary,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: SPACING.sm },
  modalCancelBtn: { padding: SPACING.sm },
  modalCancelText: { ...typography.body2, color: colors.textSecondary },
  modalAddBtn: {
    backgroundColor: colors.secondary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.button,
  },
  modalAddText: { ...typography.body2, color: '#fff', fontWeight: '600' },
});
