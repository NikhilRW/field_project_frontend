import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Clock, MapPin, Users } from 'lucide-react-native';
import { Colors } from '@/shared/constants/color';
import { activities, ActivityStatus } from '@/shared/mock/data';
import AppHeader from '@/shared/components/AppHeader';

type FilterTab = 'All' | ActivityStatus;
const filterTabs: FilterTab[] = ['All', 'Upcoming', 'Completed'];

const statusColor = (s: string) => {
  if (s === 'Completed') return Colors.secondary;
  if (s === 'Upcoming') return Colors.accent;
  return Colors.primary;
};
const statusBg = (s: string) => {
  if (s === 'Completed') return Colors.secondaryLight;
  if (s === 'Upcoming') return Colors.accentLight;
  return Colors.primaryLight;
};

export default function ActivitiesScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const filtered = activities.filter(
    (a) => activeTab === 'All' || a.status === activeTab
  );

  const upcoming = activities.filter((a) => a.status === 'Upcoming').length;
  const completed = activities.filter((a) => a.status === 'Completed').length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader />

      <View style={styles.titleSection}>
        <Text style={styles.title}>Activities</Text>
        <Text style={styles.titleSub}>{activities.length} total programs</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.miniStat, { backgroundColor: Colors.accentLight }]}>
          <Text style={[styles.miniStatNum, { color: Colors.accent }]}>{upcoming}</Text>
          <Text style={styles.miniStatLabel}>Upcoming</Text>
        </View>
        <View style={[styles.miniStat, { backgroundColor: Colors.secondaryLight }]}>
          <Text style={[styles.miniStatNum, { color: Colors.secondary }]}>{completed}</Text>
          <Text style={styles.miniStatLabel}>Done</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {filterTabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, activeTab === tab && styles.filterTabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
            testID={`filter-${tab}`}
          >
            <Text
              style={[styles.filterTabText, activeTab === tab && styles.filterTabTextActive]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.card}
            activeOpacity={0.7}
            testID={`activity-${activity.id}`}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.dateChip, { backgroundColor: statusBg(activity.status) }]}>
                <Clock size={11} color={statusColor(activity.status)} strokeWidth={1.8} />
                <Text style={[styles.dateChipText, { color: statusColor(activity.status) }]}>
                  {activity.date}
                </Text>
              </View>
              <View style={[styles.statusDot, { backgroundColor: statusColor(activity.status) }]} />
            </View>
            <Text style={styles.cardTitle}>{activity.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {activity.description}
            </Text>
            <View style={styles.cardFooter}>
              <View style={styles.footerItem}>
                <MapPin size={12} color={Colors.textTertiary} strokeWidth={1.6} />
                <Text style={styles.footerText} numberOfLines={1}>{activity.location}</Text>
              </View>
              <View style={styles.footerDivider} />
              <View style={styles.footerItem}>
                <Users size={12} color={Colors.primary} strokeWidth={1.6} />
                <Text style={[styles.footerText, { color: Colors.primary, fontWeight: '600' as const }]}>
                  {activity.volunteers}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
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
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 14,
  },
  miniStat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  miniStatNum: {
    fontSize: 15,
    fontWeight: '700' as const,
  },
  miniStatLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: Colors.surface,
  },
  filterTabActive: {
    backgroundColor: Colors.primary,
  },
  filterTabText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  filterTabTextActive: {
    color: '#fff',
    fontWeight: '600' as const,
  },
  list: { flex: 1 },
  listContent: { paddingHorizontal: 20 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dateChipText: {
    fontSize: 11,
    fontWeight: '600' as const,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textTertiary,
    flex: 1,
  },
  footerDivider: {
    width: 1,
    height: 14,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 10,
  },
});
