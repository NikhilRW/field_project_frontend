import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Clock, MapPin, Users } from "lucide-react-native";
import { Colors } from "@/shared/constants/color";
import AppHeader from "@/shared/components/AppHeader";
import { useActivities } from "../hooks/useActivities";
import { activityFilterTabs } from "../constants/filterTabs";
import type { ActivityFilterTab } from "../types/filter";
import {
  getActivityStatusBg,
  getActivityStatusColor,
} from "../utils/statusColors";
import { activitiesStyles as styles } from "../styles/activitiesStyles";

export default function ActivitiesScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<ActivityFilterTab>("All");
  const { data: activityItems = [] } = useActivities();

  const filtered = activityItems.filter(
    (a) => activeTab === "All" || a.status === activeTab,
  );

  const upcoming = activityItems.filter((a) => a.status === "Upcoming").length;
  const completed = activityItems.filter(
    (a) => a.status === "Completed",
  ).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader />

      <View style={styles.titleSection}>
        <Text style={styles.title}>Activities</Text>
        <Text style={styles.titleSub}>
          {activityItems.length} total programs
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View
          style={[styles.miniStat, { backgroundColor: Colors.accentLight }]}
        >
          <Text style={[styles.miniStatNum, { color: Colors.accent }]}>
            {upcoming}
          </Text>
          <Text style={styles.miniStatLabel}>Upcoming</Text>
        </View>
        <View
          style={[styles.miniStat, { backgroundColor: Colors.secondaryLight }]}
        >
          <Text style={[styles.miniStatNum, { color: Colors.secondary }]}>
            {completed}
          </Text>
          <Text style={styles.miniStatLabel}>Done</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {activityFilterTabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.filterTab,
              activeTab === tab && styles.filterTabActive,
            ]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
            testID={`filter-${tab}`}
          >
            <Text
              style={[
                styles.filterTabText,
                activeTab === tab && styles.filterTabTextActive,
              ]}
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
              <View
                style={[
                  styles.dateChip,
                  { backgroundColor: getActivityStatusBg(activity.status) },
                ]}
              >
                <Clock
                  size={11}
                  color={getActivityStatusColor(activity.status)}
                  strokeWidth={1.8}
                />
                <Text
                  style={[
                    styles.dateChipText,
                    { color: getActivityStatusColor(activity.status) },
                  ]}
                >
                  {activity.date}
                </Text>
              </View>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getActivityStatusColor(activity.status) },
                ]}
              />
            </View>
            <Text style={styles.cardTitle}>{activity.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {activity.description}
            </Text>
            <View style={styles.cardFooter}>
              <View style={styles.footerItem}>
                <MapPin
                  size={12}
                  color={Colors.textTertiary}
                  strokeWidth={1.6}
                />
                <Text style={styles.footerText} numberOfLines={1}>
                  {activity.location}
                </Text>
              </View>
              <View style={styles.footerDivider} />
              <View style={styles.footerItem}>
                <Users size={12} color={Colors.primary} strokeWidth={1.6} />
                <Text
                  style={[
                    styles.footerText,
                    { color: Colors.primary, fontWeight: "600" as const },
                  ]}
                >
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
