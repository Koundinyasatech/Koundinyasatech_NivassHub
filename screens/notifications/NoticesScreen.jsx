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
import EmptyState from '../../components/common/EmptyState';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING, BORDER_RADIUS, SHADOWS } from '../../theme/spacing';
import { STRINGS } from '../../constants/strings';
import { timeAgo, truncate } from '../../utils/index';
import noticesData from '../../data/notices.json';

const CATEGORY_ICONS = {
  maintenance: '🔧',
  event: '🎉',
  payment: '💳',
  amenity: '🏊',
  community: '🤝',
  safety: '🛡',
  utility: '🌐',
};

const PRIORITY_COLORS = {
  high: COLORS.error,
  medium: COLORS.warning,
  low: COLORS.success,
};

function NoticeCard({ notice, onPress }) {
  const icon = CATEGORY_ICONS[notice.category] || '📢';
  const priorityColor = PRIORITY_COLORS[notice.priority] || COLORS.textSecondary;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {notice.pinned && (
        <View style={styles.pinnedBadge}>
          <Text style={styles.pinnedText}>📌 Pinned</Text>
        </View>
      )}
      <View style={styles.cardHeader}>
        <Text style={styles.categoryIcon}>{icon}</Text>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {notice.title}
          </Text>
          <Text style={styles.cardMeta}>
            {notice.postedBy} · {timeAgo(notice.createdAt)}
          </Text>
        </View>
        <View style={[styles.priorityBar, { backgroundColor: priorityColor }]} />
      </View>
      <Text style={styles.cardBody} numberOfLines={3}>
        {truncate(notice.body, 140)}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={styles.category}>
          {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
        </Text>
        <Text style={styles.readCount}>
          {notice.readBy.length} read
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function NoticesScreen({ onBack }) {
  const [showPinned, setShowPinned] = useState(false);

  const filtered = showPinned
    ? noticesData.filter((n) => n.pinned)
    : noticesData;

  const pinnedCount = noticesData.filter((n) => n.pinned).length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader title={STRINGS.notices.title} onBack={onBack} />

      <View style={styles.filterRow}>
        <TouchableOpacity
          onPress={() => setShowPinned(false)}
          style={[styles.filterChip, !showPinned && styles.filterChipActive]}
        >
          <Text style={[styles.filterText, !showPinned && styles.filterTextActive]}>
            All ({noticesData.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowPinned(true)}
          style={[styles.filterChip, showPinned && styles.filterChipActive]}
        >
          <Text style={[styles.filterText, showPinned && styles.filterTextActive]}>
            📌 Pinned ({pinnedCount})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <NoticeCard notice={item} onPress={() => {}} />}
        ListEmptyComponent={
          <EmptyState
            icon="📭"
            title={STRINGS.notices.noNotices}
            subtitle={STRINGS.notices.noNoticesSubtext}
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
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.borderLight,
  },
  filterChipActive: { backgroundColor: COLORS.primary },
  filterText: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: { color: COLORS.textInverse },
  list: { padding: SPACING.base, paddingBottom: SPACING['3xl'] },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.base,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  pinnedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.secondaryLight + '30',
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    marginBottom: SPACING.sm,
  },
  pinnedText: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.secondaryDark,
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  categoryIcon: { fontSize: 24, marginTop: 2 },
  cardHeaderText: { flex: 1 },
  cardTitle: {
    ...TYPOGRAPHY.presets.label,
    color: COLORS.textPrimary,
    fontWeight: '600',
    lineHeight: 20,
  },
  cardMeta: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
    marginTop: 3,
  },
  priorityBar: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginTop: 2,
  },
  cardBody: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  category: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },
  readCount: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textLight,
  },
});
