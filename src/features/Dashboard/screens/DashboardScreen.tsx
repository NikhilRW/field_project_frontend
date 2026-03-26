import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  Users,
  CalendarDays,
  HandCoins,
  HeartHandshake,
  ChevronRight,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react-native";
import AppHeader from "@/shared/components/AppHeader";
import { Colors } from "@/shared/constants/color";
import { useDashboard } from "../hooks/useDashboard";
import {
  getDashboardStatusBg,
  getDashboardStatusColor,
} from "../utils/statusColors";
import { dashboardStyles as styles } from "../styles/dashboardStyles";

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { data } = useDashboard();

  const stats = data?.stats ?? {
    beneficiaries: 0,
    activities: 0,
    volunteers: 0,
    donations: 0,
  };
  const recentActivities = data?.recentActivities ?? [];

  const donationLabel =
    stats.donations > 0 ? `₹${(stats.donations / 100000).toFixed(2)}L` : "₹0";

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
            <View
              style={[
                styles.statIconWrap,
                { backgroundColor: Colors.primaryLight },
              ]}
            >
              <Users size={16} color={Colors.primary} strokeWidth={1.8} />
            </View>
            <Text style={styles.statValue}>{stats.beneficiaries}</Text>
            <Text style={styles.statLabel}>Beneficiaries</Text>
          </View>
          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconWrap,
                { backgroundColor: Colors.secondaryLight },
              ]}
            >
              <CalendarDays
                size={16}
                color={Colors.secondary}
                strokeWidth={1.8}
              />
            </View>
            <Text style={styles.statValue}>{stats.activities}</Text>
            <Text style={styles.statLabel}>Programs</Text>
          </View>
          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconWrap,
                { backgroundColor: Colors.accentLight },
              ]}
            >
              <HeartHandshake
                size={16}
                color={Colors.accent}
                strokeWidth={1.8}
              />
            </View>
            <Text style={styles.statValue}>{stats.volunteers}</Text>
            <Text style={styles.statLabel}>Volunteers</Text>
          </View>
          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconWrap,
                { backgroundColor: Colors.errorLight },
              ]}
            >
              <HandCoins size={16} color={Colors.error} strokeWidth={1.8} />
            </View>
            <Text style={styles.statValue}>{donationLabel}</Text>
            <Text style={styles.statLabel}>Donations</Text>
          </View>
        </View>

        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push("/(main)/volunteers" as any)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.quickActionIcon,
                { backgroundColor: Colors.accentLight },
              ]}
            >
              <HeartHandshake
                size={17}
                color={Colors.accent}
                strokeWidth={1.8}
              />
            </View>
            <Text style={styles.quickActionLabel}>Volunteers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push("/(main)/surveys" as any)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.quickActionIcon,
                { backgroundColor: Colors.secondaryLight },
              ]}
            >
              <MapPin size={17} color={Colors.secondary} strokeWidth={1.8} />
            </View>
            <Text style={styles.quickActionLabel}>Surveys</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push("/(main)/add-beneficiary" as any)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.quickActionIcon,
                { backgroundColor: Colors.primaryLight },
              ]}
            >
              <Users size={17} color={Colors.primary} strokeWidth={1.8} />
            </View>
            <Text style={styles.quickActionLabel}>Add Person</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push("/(tabs)/donations" as any)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.quickActionIcon,
                { backgroundColor: Colors.errorLight },
              ]}
            >
              <HandCoins size={17} color={Colors.error} strokeWidth={1.8} />
            </View>
            <Text style={styles.quickActionLabel}>Funds</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => router.push("/(tabs)/activities" as any)}
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
            <View
              style={[
                styles.activityIndicator,
                { backgroundColor: getDashboardStatusColor(activity.status) },
              ]}
            />
            <View style={styles.activityContent}>
              <View style={styles.activityTop}>
                <Text style={styles.activityName} numberOfLines={1}>
                  {activity.name}
                </Text>
                <View
                  style={[
                    styles.statusPill,
                    { backgroundColor: getDashboardStatusBg(activity.status) },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getDashboardStatusColor(activity.status) },
                    ]}
                  >
                    {activity.status}
                  </Text>
                </View>
              </View>
              <View style={styles.activityMeta}>
                <View style={styles.metaItem}>
                  <Clock
                    size={11}
                    color={Colors.textTertiary}
                    strokeWidth={1.6}
                  />
                  <Text style={styles.metaText}>{activity.date}</Text>
                </View>
                <View style={styles.metaDot} />
                <View style={styles.metaItem}>
                  <MapPin
                    size={11}
                    color={Colors.textTertiary}
                    strokeWidth={1.6}
                  />
                  <Text style={styles.metaText} numberOfLines={1}>
                    {activity.location}
                  </Text>
                </View>
              </View>
              <Text style={styles.volunteerLabel}>
                {activity.volunteers} volunteer
                {activity.volunteers !== 1 ? "s" : ""} assigned
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
