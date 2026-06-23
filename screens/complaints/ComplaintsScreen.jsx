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
import ComplaintCard from '../../components/cards/ComplaintCard';
import EmptyState from '../../components/common/EmptyState';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { STRINGS } from '../../constants/strings';
import complaintsData from '../../data/complaints.json';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'resolved', label: 'Resolved' },
];

const STATUS_COUNTS = (data) => ({
  all: data.length,
  open: data.filter((c) => c.status === 'open').length,
  'in-progress': data.filter((c) => c.status === 'in-progress').length,
  resolved: data.filter((c) => c.status === 'resolved').length,
});

export default function ComplaintsScreen({ onBack }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const counts = STATUS_COUNTS(complaintsData);

  const filtered = complaintsData.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.status === activeFilter;
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader
        title={STRINGS.complaints.title}
        onBack={onBack}
        rightLabel="+ New"
        rightAction={() => {}}
      />

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
            <View
              style={[
                styles.badge,
                activeFilter === f.key && styles.badgeActive,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  activeFilter === f.key && styles.badgeTextActive,
                ]}
              >
                {counts[f.key]}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ComplaintCard complaint={item} onPress={() => {}} />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="✅"
            title={STRINGS.complaints.noComplaints}
            subtitle={STRINGS.complaints.noComplaintsSubtext}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.borderLight,
    gap: 4,
  },
  filterChipActive: { backgroundColor: COLORS.primary },
  filterText: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: { color: COLORS.textInverse },
  badge: {
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeActive: { backgroundColor: COLORS.textInverse + '30' },
  badgeText: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  badgeTextActive: { color: COLORS.textInverse },
  list: { padding: SPACING.base, paddingBottom: SPACING['3xl'] },
});
