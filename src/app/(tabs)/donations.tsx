import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import AppHeader from '@/shared/components/AppHeader';
import { Colors } from '@/shared/constants/color';
import { donations, monthlyDonations } from '@/shared/mock/data';

const MAX_CHART_HEIGHT = 90;

export default function DonationsScreen() {
  const insets = useSafeAreaInsets();

  const totalReceived = donations
    .filter((d) => d.type === 'incoming')
    .reduce((sum, d) => sum + d.amount, 0);

  const totalSpent = donations
    .filter((d) => d.type === 'outgoing')
    .reduce((sum, d) => sum + d.amount, 0);

  const maxVal = Math.max(...monthlyDonations.flatMap((m) => [m.received, m.spent]));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.title}>Funds</Text>
          <Text style={styles.titleSub}>Track all donations & expenses</Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: Colors.secondaryLight }]}>
              <ArrowDownLeft size={15} color={Colors.secondary} strokeWidth={2} />
            </View>
            <Text style={styles.summaryLabel}>Received</Text>
            <Text style={[styles.summaryValue, { color: Colors.secondary }]}>
              ₹{totalReceived.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: Colors.accentLight }]}>
              <ArrowUpRight size={15} color={Colors.accent} strokeWidth={2} />
            </View>
            <Text style={styles.summaryLabel}>Spent</Text>
            <Text style={[styles.summaryValue, { color: Colors.accent }]}>
              ₹{totalSpent.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Monthly Overview</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.secondary }]} />
                <Text style={styles.legendText}>In</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.accent }]} />
                <Text style={styles.legendText}>Out</Text>
              </View>
            </View>
          </View>
          <View style={styles.chart}>
            {monthlyDonations.map((m, i) => {
              const receivedH = (m.received / maxVal) * MAX_CHART_HEIGHT;
              const spentH = (m.spent / maxVal) * MAX_CHART_HEIGHT;
              return (
                <View key={i} style={styles.barGroup}>
                  <View style={styles.bars}>
                    <View
                      style={[
                        styles.bar,
                        styles.barReceived,
                        { height: receivedH },
                      ]}
                    />
                    <View
                      style={[
                        styles.bar,
                        styles.barSpent,
                        { height: spentH },
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel}>{m.month}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <Text style={styles.transactionsTitle}>Recent Transactions</Text>

        {donations.map((d) => {
          const isIncoming = d.type === 'incoming';
          return (
            <View
              key={d.id}
              style={styles.transRow}
              testID={`donation-${d.id}`}
            >
              <View style={[styles.transIcon, { backgroundColor: isIncoming ? Colors.secondaryLight : Colors.errorLight }]}>
                {isIncoming
                  ? <ArrowDownLeft size={14} color={Colors.secondary} strokeWidth={2} />
                  : <ArrowUpRight size={14} color={Colors.error} strokeWidth={2} />
                }
              </View>
              <View style={styles.transInfo}>
                <Text style={styles.transDonor}>{d.donor}</Text>
                <Text style={styles.transMeta}>{d.purpose} · {d.date}</Text>
              </View>
              <Text style={[styles.transAmount, { color: isIncoming ? Colors.secondary : Colors.error }]}>
                {isIncoming ? '+' : '-'}₹{d.amount.toLocaleString('en-IN')}
              </Text>
            </View>
          );
        })}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20 },
  titleSection: {
    paddingTop: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  titleSub: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
  },
  summaryIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginBottom: 3,
  },
  summaryValue: {
    fontSize: 17,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  chartCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 22,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: MAX_CHART_HEIGHT + 24,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    marginBottom: 6,
  },
  bar: {
    width: 12,
    borderRadius: 3,
    minHeight: 4,
  },
  barReceived: {
    backgroundColor: Colors.secondary,
  },
  barSpent: {
    backgroundColor: Colors.accent,
    opacity: 0.7,
  },
  barLabel: {
    fontSize: 10,
    color: Colors.textTertiary,
    fontWeight: '500' as const,
  },
  transactionsTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  transRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 13,
    marginBottom: 6,
  },
  transIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transInfo: { flex: 1 },
  transDonor: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  transMeta: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  transAmount: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
});
