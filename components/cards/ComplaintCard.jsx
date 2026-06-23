import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING, BORDER_RADIUS, SHADOWS } from '../../theme/spacing';
import { timeAgo, truncate, getPriorityColor, getStatusColor } from '../../utils/index';

const CATEGORY_ICONS = {
  plumbing: '🔧',
  electrical: '⚡',
  noise: '🔊',
  sanitation: '🧹',
  parking: '🅿',
  amenity: '🏊',
  security: '🔒',
};

export default function ComplaintCard({ complaint, onPress }) {
  const priorityColor = getPriorityColor(complaint.priority);
  const statusColor = getStatusColor(complaint.status);
  const icon = CATEGORY_ICONS[complaint.category] || '📋';
  const statusLabel = complaint.status
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {complaint.title}
          </Text>
          <Text style={styles.flat}>
            {complaint.raisedByFlat} · {timeAgo(complaint.createdAt)}
          </Text>
        </View>
        <View style={[styles.priorityDot, { backgroundColor: priorityColor }]} />
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {truncate(complaint.description, 100)}
      </Text>

      <View style={styles.footer}>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
        </View>
        <Text style={styles.priority}>
          {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
        </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 20 },
  headerText: { flex: 1 },
  title: {
    ...TYPOGRAPHY.presets.label,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  flat: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  description: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: {
    ...TYPOGRAPHY.presets.caption,
    fontWeight: '600',
  },
  priority: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
  },
});
