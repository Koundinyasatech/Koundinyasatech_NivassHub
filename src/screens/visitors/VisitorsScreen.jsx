import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/common/AppHeader';
import VisitorCard from '../../components/cards/VisitorCard';
import EmptyState from '../../components/common/EmptyState';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { STRINGS } from '../../constants/strings';
import visitorsData from '../../data/visitors.json';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'inside', label: 'Inside' },
  { key: 'checked-out', label: 'Left' },
  { key: 'delivery', label: 'Delivery' },
];

export default function VisitorsScreen({ onBack }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = visitorsData.filter((v) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'delivery') return v.purpose === 'delivery';
    return v.status === activeFilter;
  });

  const insideCount = visitorsData.filter((v) => v.status === 'inside').length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader
        title={STRINGS.visitors.title}
        onBack={onBack}
        rightLabel="+ Add"
        rightAction={() => {}}
      />

      <View style={styles.summaryBar}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{visitorsData.length}</Text>
          <Text style={styles.summaryLabel}>Today</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: COLORS.success }]}>
            {insideCount}
          </Text>
          <Text style={styles.summaryLabel}>Inside</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{visitorsData.length - insideCount}</Text>
          <Text style={styles.summaryLabel}>Left</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setActiveFilter(f.key)}
            style={[
              styles.filterChip,
              activeFilter === f.key && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === f.key && styles.filterTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <VisitorCard visitor={item} onPress={() => {}} />}
        ListEmptyComponent={
          <EmptyState
            icon="🚪"
            title={STRINGS.visitors.noVisitors}
            subtitle={STRINGS.visitors.noVisitorsSubtext}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  summaryBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: {
    ...TYPOGRAPHY.presets.h4,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  summaryLabel: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.borderLight,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: COLORS.textInverse,
  },
  list: {
    padding: SPACING.base,
    paddingBottom: SPACING['3xl'],
  },
});
