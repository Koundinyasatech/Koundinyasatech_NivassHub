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
import { formatCurrency, formatDate, formatTime, getStatusColor } from '../../utils/index';
import paymentsData from '../../data/payments.json';
import dashboardData from '../../data/dashboard.json';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'paid', label: 'Paid' },
  { key: 'pending', label: 'Pending' },
  { key: 'overdue', label: 'Overdue' },
];

function PaymentCard({ payment, onPress }) {
  const statusColor = getStatusColor(payment.status);
  const statusLabel = payment.status.charAt(0).toUpperCase() + payment.status.slice(1);
  const isPaid = payment.status === 'paid';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardHeader}>
        <View style={styles.typeWrap}>
          <Text style={styles.typeIcon}>{isPaid ? '✅' : payment.status === 'overdue' ? '🔴' : '⏳'}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{payment.typeLabel}</Text>
          <Text style={styles.cardFlat}>
            {payment.flat} · {payment.residentName}
          </Text>
          <Text style={styles.cardMonth}>{payment.month}</Text>
        </View>
        <View style={styles.amountWrap}>
          <Text style={styles.amount}>{formatCurrency(payment.amount)}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
          </View>
        </View>
      </View>

      {isPaid && payment.paidAt ? (
        <View style={styles.paidDetail}>
          <Text style={styles.paidText}>
            Paid on {formatDate(payment.paidAt)} via {payment.paymentMode}
          </Text>
          {payment.transactionId ? (
            <Text style={styles.txnId}>TXN: {payment.transactionId}</Text>
          ) : null}
        </View>
      ) : !isPaid ? (
        <TouchableOpacity style={styles.payBtn}>
          <Text style={styles.payBtnText}>Pay Now →</Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

export default function PaymentsScreen({ onBack }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const { payments: pStats } = dashboardData;

  const filtered = paymentsData.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.status === activeFilter;
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader title={STRINGS.payments.title} onBack={onBack} />

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: COLORS.success }]}>
            {formatCurrency(pStats.totalCollected)}
          </Text>
          <Text style={styles.summaryLabel}>Collected</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: COLORS.warning }]}>
            {formatCurrency(pStats.pending)}
          </Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: COLORS.error }]}>
            {formatCurrency(pStats.overdue)}
          </Text>
          <Text style={styles.summaryLabel}>Overdue</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressWrap}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${pStats.collectionPercent}%` },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {pStats.collectionPercent}% collected this month
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setActiveFilter(f.key)}
            style={[styles.filterChip, activeFilter === f.key && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, activeFilter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <PaymentCard payment={item} onPress={() => {}} />}
        ListEmptyComponent={
          <EmptyState
            icon="💳"
            title={STRINGS.payments.noPayments}
            subtitle={STRINGS.payments.noPaymentsSubtext}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  summary: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: {
    ...TYPOGRAPHY.presets.h5,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  summaryLabel: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textInverse + 'AA',
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: COLORS.textInverse + '30',
    marginVertical: 4,
  },
  progressWrap: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.textInverse + '20',
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.full,
  },
  progressLabel: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textInverse + 'AA',
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  typeWrap: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeIcon: { fontSize: 22 },
  cardInfo: { flex: 1 },
  cardTitle: {
    ...TYPOGRAPHY.presets.label,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  cardFlat: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cardMonth: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textLight,
    marginTop: 2,
  },
  amountWrap: { alignItems: 'flex-end', gap: 4 },
  amount: {
    ...TYPOGRAPHY.presets.h6,
    color: COLORS.textPrimary,
    fontWeight: '700',
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
  paidDetail: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  paidText: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
  },
  txnId: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textLight,
    marginTop: 2,
  },
  payBtn: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    alignSelf: 'flex-end',
  },
  payBtnText: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
