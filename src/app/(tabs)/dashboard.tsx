import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Users,
  CalendarDays,
  HandCoins,
  HeartHandshake,
  ChevronRight,
  MapPin,
  Clock,
  ArrowUpRight,
} from 'lucide-react-native';
import AppHeader from '@/shared/components/AppHeader';
import { Colors } from '@/shared/constants/color';
import { dashboardStats, activities } from '@/shared/mock/data';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();

  const recentActivities = activities.slice(0, 3);

  const statusColor = (status: string) => {
    if (status === 'Completed') return Colors.secondary;
    if (status === 'Upcoming') return Colors.accent;
    return Colors.primary;
  };

  const statusBg = (status: string) => {
    if (status === 'Completed') return Colors.secondaryLight;
    if (status === 'Upcoming') return Colors.accentLight;
    return Colors.primaryLight;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingSection}>
          <Text style={styles.greetingSub}>Welcome back</Text>
          <Text style={styles.greeting}>Good Morning, Admin</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: Colors.primaryLight }]}>
              <Users size={16} color={Colors.primary} strokeWidth={1.8} />
            </View>
            <Text style={styles.statValue}>{dashboardStats.beneficiaries}</Text>
            <Text style={styles.statLabel}>Beneficiaries</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: Colors.secondaryLight }]}>
              <CalendarDays size={16} color={Colors.secondary} strokeWidth={1.8} />
            </View>
            <Text style={styles.statValue}>{dashboardStats.activities}</Text>
            <Text style={styles.statLabel}>Programs</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: Colors.accentLight }]}>
              <HeartHandshake size={16} color={Colors.accent} strokeWidth={1.8} />
            </View>
            <Text style={styles.statValue}>{dashboardStats.volunteers}</Text>
            <Text style={styles.statLabel}>Volunteers</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: Colors.errorLight }]}>
              <HandCoins size={16} color={Colors.error} strokeWidth={1.8} />
            </View>
            <Text style={styles.statValue}>₹2.28L</Text>
            <Text style={styles.statLabel}>Donations</Text>
          </View>
        </View>

        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/volunteers' as any)}
            activeOpacity={0.7}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: Colors.accentLight }]}>
              <HeartHandshake size={17} color={Colors.accent} strokeWidth={1.8} />
            </View>
            <Text style={styles.quickActionLabel}>Volunteers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/surveys' as any)}
            activeOpacity={0.7}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: Colors.secondaryLight }]}>
              <MapPin size={17} color={Colors.secondary} strokeWidth={1.8} />
            </View>
            <Text style={styles.quickActionLabel}>Surveys</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/add-beneficiary' as any)}
            activeOpacity={0.7}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: Colors.primaryLight }]}>
              <Users size={17} color={Colors.primary} strokeWidth={1.8} />
            </View>
            <Text style={styles.quickActionLabel}>Add Person</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/(tabs)/donations' as any)}
            activeOpacity={0.7}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: Colors.errorLight }]}>
              <HandCoins size={17} color={Colors.error} strokeWidth={1.8} />
            </View>
            <Text style={styles.quickActionLabel}>Funds</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => router.push('/(tabs)/activities' as any)}
          >
            <Text style={styles.viewAllText}>See all</Text>
            <ArrowUpRight size={13} color={Colors.primary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {recentActivities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.activityCard}
            activeOpacity={0.7}
            testID={`activity-${activity.id}`}
          >
            <View style={[styles.activityIndicator, { backgroundColor: statusColor(activity.status) }]} />
            <View style={styles.activityContent}>
              <View style={styles.activityTop}>
                <Text style={styles.activityName} numberOfLines={1}>{activity.name}</Text>
                <View style={[styles.statusPill, { backgroundColor: statusBg(activity.status) }]}>
                  <Text style={[styles.statusText, { color: statusColor(activity.status) }]}>
                    {activity.status}
                  </Text>
                </View>
              </View>
              <View style={styles.activityMeta}>
                <View style={styles.metaItem}>
                  <Clock size={11} color={Colors.textTertiary} strokeWidth={1.6} />
                  <Text style={styles.metaText}>{activity.date}</Text>
                </View>
                <View style={styles.metaDot} />
                <View style={styles.metaItem}>
                  <MapPin size={11} color={Colors.textTertiary} strokeWidth={1.6} />
                  <Text style={styles.metaText} numberOfLines={1}>{activity.location}</Text>
                </View>
              </View>
              <Text style={styles.volunteerLabel}>
                {activity.volunteers} volunteer{activity.volunteers !== 1 ? 's' : ''} assigned
              </Text>
            </View>
            <ChevronRight size={15} color={Colors.textTertiary} />
          </TouchableOpacity>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  greetingSection: {
    marginTop: 4,
    marginBottom: 18,
  },
  greetingSub: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginBottom: 2,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
  },
  statIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    gap: 7,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    fontSize: 11,
    fontWeight: '500' as const,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewAllText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500' as const,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    marginBottom: 8,
    overflow: 'hidden',
  },
  activityIndicator: {
    width: 3,
    alignSelf: 'stretch',
  },
  activityContent: {
    flex: 1,
    paddingVertical: 13,
    paddingLeft: 13,
    paddingRight: 4,
  },
  activityTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  statusPill: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500' as const,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: Colors.textTertiary,
  },
  metaText: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
  volunteerLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
