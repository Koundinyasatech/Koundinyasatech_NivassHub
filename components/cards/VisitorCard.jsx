import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING, BORDER_RADIUS, SHADOWS } from '../../theme/spacing';
import { formatTime, getInitials, getStatusColor } from '../../utils/index';

const PURPOSE_ICONS = {
  delivery: '📦',
  guest: '👤',
  maintenance: '🔧',
  domestic: '🏠',
};

export default function VisitorCard({ visitor, onPress }) {
  const statusColor = getStatusColor(visitor.status);
  const initials = getInitials(visitor.name);
  const icon = PURPOSE_ICONS[visitor.purpose] || '👤';

  const isInside = visitor.status === 'inside';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{visitor.name}</Text>
          <Text style={styles.purpose}>
            {icon} {visitor.purposeLabel} · {visitor.hostFlat}
          </Text>
          <Text style={styles.time}>
            In: {formatTime(visitor.checkIn)}
            {visitor.checkOut ? ` · Out: ${formatTime(visitor.checkOut)}` : ''}
          </Text>
        </View>

        <View style={styles.statusWrap}>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {isInside ? 'Inside' : 'Left'}
            </Text>
          </View>
          {visitor.vehicleNumber ? (
            <Text style={styles.vehicle}>{visitor.vehicleNumber}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.base,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary + '30',
  },
  avatarText: {
    ...TYPOGRAPHY.presets.label,
    color: COLORS.primary,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.presets.label,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  purpose: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  time: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textLight,
  },
  statusWrap: {
    alignItems: 'flex-end',
    gap: SPACING.xs,
  },
  statusBadge: {
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  statusText: {
    ...TYPOGRAPHY.presets.caption,
    fontWeight: '600',
  },
  vehicle: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
  },
});
