import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { logoutUser } from '../../redux/slices/authSlice';
import AppHeader from '../../components/common/AppHeader';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING, BORDER_RADIUS, SHADOWS } from '../../theme/spacing';
import { STRINGS } from '../../constants/strings';
import { getInitials, formatDate, capitalize } from '../../utils/index';

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '—'}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.replace('/login');
  };

  if (!user) return null;

  const initials = getInitials(user.name);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader title={STRINGS.profile.title} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{capitalize(user.role)}</Text>
          </View>
          <Text style={styles.flat}>{user.flat}</Text>
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <InfoRow label={STRINGS.profile.email} value={user.email} />
          <InfoRow label={STRINGS.profile.phone} value={user.phone} />
          <InfoRow label={STRINGS.profile.flat} value={user.flat} />
          <InfoRow label={STRINGS.profile.block} value={`Block ${user.block}`} />
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {user.familyMembers ?? 0}
            </Text>
            <Text style={styles.statLabel}>Family</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{user.role === 'admin' ? 'Admin' : 'Member'}</Text>
            <Text style={styles.statLabel}>Role</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>Active</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>✏️</Text>
            <Text style={styles.menuLabel}>{STRINGS.profile.editProfile}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={styles.menuLabel}>Notification Preferences</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔒</Text>
            <Text style={styles.menuLabel}>Change Password</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuLabel}>Help & Support</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 {STRINGS.auth.logout}</Text>
        </TouchableOpacity>

        <Text style={styles.version}>NivassHub v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: SPACING.base, paddingBottom: SPACING['3xl'] },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.lg,
  },
  avatarText: {
    ...TYPOGRAPHY.presets.h2,
    color: COLORS.textInverse,
    fontWeight: '700',
  },
  name: {
    ...TYPOGRAPHY.presets.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  roleBadge: {
    backgroundColor: COLORS.primarySurface,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    marginBottom: SPACING.xs,
  },
  roleText: {
    ...TYPOGRAPHY.presets.label,
    color: COLORS.primary,
    fontWeight: '600',
  },
  flat: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.base,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  cardTitle: {
    ...TYPOGRAPHY.presets.label,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  infoLabel: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
  },
  infoValue: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: '500',
    maxWidth: '60%',
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.base,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: {
    ...TYPOGRAPHY.presets.h5,
    color: COLORS.primary,
    fontWeight: '700',
  },
  statLabel: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  menuIcon: { fontSize: 20 },
  menuLabel: {
    flex: 1,
    ...TYPOGRAPHY.presets.body,
    color: COLORS.textPrimary,
  },
  menuArrow: {
    fontSize: 22,
    color: COLORS.textLight,
    marginTop: -2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
  },
  logoutCard: {
    backgroundColor: COLORS.errorLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.base,
    alignItems: 'center',
    marginBottom: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.error + '30',
  },
  logoutText: {
    ...TYPOGRAPHY.presets.body,
    color: COLORS.error,
    fontWeight: '600',
  },
  version: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
