import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING, BORDER_RADIUS, SHADOWS } from '../../theme/spacing';

const STATUS_COLORS = {
  occupied: { bg: COLORS.successLight, text: COLORS.success },
  vacant: { bg: COLORS.warningLight, text: COLORS.warning },
  maintenance: { bg: COLORS.errorLight, text: COLORS.error },
};

export default function PropertyCard({ property, onPress }) {
  const statusStyle = STATUS_COLORS[property.status] || STATUS_COLORS.vacant;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.header}>
        <View style={styles.unitBadge}>
          <Text style={styles.unit}>{property.unit}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.text }]}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Text>
        </View>
      </View>

      <Text style={styles.type}>{property.type}</Text>
      <Text style={styles.owner} numberOfLines={1}>
        {property.status === 'occupied' ? property.ownerName : 'Unoccupied'}
      </Text>

      <View style={styles.divider} />

      <View style={styles.meta}>
        <MetaItem label="Floor" value={`${property.floor}`} />
        <MetaItem label="Area" value={`${property.areaSqFt} sq.ft`} />
        <MetaItem label="Maintenance" value={`₹${property.monthlyMaintenance}`} />
      </View>

      {property.parkingSlot ? (
        <Text style={styles.parking}>🅿 {property.parkingSlot}</Text>
      ) : null}
    </TouchableOpacity>
  );
}

function MetaItem({ label, value }) {
  return (
    <View style={styles.metaItem}>
      <Text style={styles.metaValue}>{value}</Text>
      <Text style={styles.metaLabel}>{label}</Text>
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  unitBadge: {
    backgroundColor: COLORS.primarySurface,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
  },
  unit: {
    ...TYPOGRAPHY.presets.h6,
    color: COLORS.primary,
  },
  statusBadge: {
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
  },
  statusText: {
    ...TYPOGRAPHY.presets.caption,
    fontWeight: '600',
  },
  type: {
    ...TYPOGRAPHY.presets.bodyLarge,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  owner: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    alignItems: 'center',
  },
  metaValue: {
    ...TYPOGRAPHY.presets.label,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  metaLabel: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  parking: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
});
