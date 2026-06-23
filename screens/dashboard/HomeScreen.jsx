import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { fetchDashboardData } from '../../store/slices/dashboardSlice';
import { logoutUser } from '../../store/slices/authSlice';
import AppLoader from '../../components/common/AppLoader';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING, BORDER_RADIUS, SHADOWS } from '../../theme/spacing';
import { STRINGS } from '../../constants/strings';
import { formatCurrency, timeAgo } from '../../utils/index';

const ACTIVITY_ICONS = {
  visitor: '👤',
  complaint: '📋',
  payment: '💳',
  notice: '📢',
};

const QUICK_ACTIONS = [
  { label: 'Visitors', icon: '🚪', route: '/visitors' },
  { label: 'Complaints', icon: '📋', route: '/complaints' },
  { label: 'Notices', icon: '📢', route: '/notices' },
  { label: 'Payments', icon: '💳', route: '/payments' },
];

export default function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { stats, recentActivity, amenities, loading, refreshing } = useSelector(
    (state) => state.dashboard
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchDashboardData());
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.replace('/login');
  };

  if (loading && !stats) {
    return <AppLoader message="Loading dashboard..." />;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{STRINGS.home.welcome}</Text>
          <Text style={styles.userName}>{user?.name || 'Resident'}</Text>
          <Text style={styles.flat}>{user?.flat} · {user?.role}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.textInverse}
          />
        }
      >
        {/* Stats Grid */}
        {stats && (
          <View style={styles.statsGrid}>
            <StatCard
              label={STRINGS.home.todayVisitors}
              value={stats.visitorsInside}
              icon="👤"
              color={COLORS.info}
            />
            <StatCard
              label={STRINGS.home.openComplaints}
              value={stats.openComplaints}
              icon="📋"
              color={COLORS.error}
            />
            <StatCard
              label={STRINGS.home.pendingPayments}
              value={stats.pendingPayments}
              icon="💳"
              color={COLORS.warning}
            />
            <StatCard
              label={STRINGS.home.activeNotices}
              value={stats.activeNotices}
              icon="📢"
              color={COLORS.success}
            />
          </View>
        )}

        {/* Payment Collection */}
        {stats && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>June Collections</Text>
            <View style={styles.collectionCard}>
              <View style={styles.collectionRow}>
                <Text style={styles.collectionLabel}>Collected</Text>
                <Text style={[styles.collectionAmount, { color: COLORS.success }]}>
                  {formatCurrency(stats.paymentsCollected)}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${stats.collectionPercent}%` },
                  ]}
                />
              </View>
              <Text style={styles.collectionMeta}>
                {stats.collectionPercent}% of {formatCurrency(stats.paymentsExpected)} collected
              </Text>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{STRINGS.home.quickActions}</Text>
          <View style={styles.actionsGrid}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.route}
                style={styles.actionCard}
                onPress={() => router.push(action.route)}
                activeOpacity={0.8}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Amenities */}
        {amenities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {amenities.map((item) => (
                <View key={item.name} style={styles.amenityChip}>
                  <View
                    style={[
                      styles.amenityDot,
                      {
                        backgroundColor:
                          item.status === 'operational' ? COLORS.success : COLORS.warning,
                      },
                    ]}
                  />
                  <Text style={styles.amenityName}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{STRINGS.home.recentActivity}</Text>
            {recentActivity.map((item) => (
              <View key={item.id} style={styles.activityItem}>
                <Text style={styles.activityIcon}>
                  {ACTIVITY_ICONS[item.type] || '📌'}
                </Text>
                <View style={styles.activityText}>
                  <Text style={styles.activityMessage}>{item.message}</Text>
                  <Text style={styles.activityTime}>{timeAgo(item.timestamp)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel} numberOfLines={2}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.primary,
  },
  greeting: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textInverse + 'BB',
  },
  userName: {
    ...TYPOGRAPHY.presets.h4,
    color: COLORS.textInverse,
    marginTop: 2,
  },
  flat: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.secondary,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  logoutBtn: {
    backgroundColor: COLORS.textInverse + '20',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  logoutText: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textInverse,
    fontWeight: '500',
  },
  scroll: { flex: 1, backgroundColor: COLORS.background },
  content: {
    padding: SPACING.base,
    paddingBottom: SPACING['3xl'],
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.base,
  },
  statCard: {
    width: '47.5%',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderLeftWidth: 4,
    ...SHADOWS.sm,
  },
  statIcon: { fontSize: 22, marginBottom: SPACING.xs },
  statValue: {
    ...TYPOGRAPHY.presets.h3,
    fontWeight: '700',
  },
  statLabel: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  section: { marginBottom: SPACING.lg },
  sectionTitle: {
    ...TYPOGRAPHY.presets.h6,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  collectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.base,
    ...SHADOWS.sm,
  },
  collectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  collectionLabel: {
    ...TYPOGRAPHY.presets.body,
    color: COLORS.textSecondary,
  },
  collectionAmount: {
    ...TYPOGRAPHY.presets.h5,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: BORDER_RADIUS.full,
  },
  collectionMeta: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.base,
    alignItems: 'center',
    gap: SPACING.xs,
    ...SHADOWS.sm,
  },
  actionIcon: { fontSize: 28 },
  actionLabel: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    gap: SPACING.xs,
    ...SHADOWS.sm,
  },
  amenityDot: { width: 8, height: 8, borderRadius: 4 },
  amenityName: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textPrimary,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  activityIcon: { fontSize: 22, marginTop: 2 },
  activityText: { flex: 1 },
  activityMessage: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  activityTime: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
  },
});
