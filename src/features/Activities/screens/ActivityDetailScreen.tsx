import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MapPin, Users, CalendarDays } from "lucide-react-native";
import { Colors } from "@/shared/constants/color";
import { useAuthStore } from "@/shared/stores/authStore";
import { useActivity } from "../hooks/useActivity";
import { activityDetailStyles } from "../styles/activityDetailStyles";

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const role = useAuthStore((state) => state.role);
  const isVolunteer = role === "Volunteer";

  const { data: activity, isLoading, isError } = useActivity(id ?? "");

  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.stateText}>Loading activity...</Text>
      </View>
    );
  }

  if (isError || !activity) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.stateText}>
          Unable to load activity details. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{activity.name}</Text>
        <Text style={styles.subtitle}>{activity.description}</Text>

        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <CalendarDays size={16} color={Colors.primary} strokeWidth={1.8} />
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{activity.date}</Text>
          </View>
          <View style={styles.metaRow}>
            <MapPin size={16} color={Colors.primary} strokeWidth={1.8} />
            <Text style={styles.metaLabel}>Location</Text>
            <Text style={styles.metaValue}>{activity.location}</Text>
          </View>
          <View style={styles.metaRow}>
            <Users size={16} color={Colors.primary} strokeWidth={1.8} />
            <Text style={styles.metaLabel}>Volunteers</Text>
            <Text style={styles.metaValue}>{activity.volunteers}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Status</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{activity.status}</Text>
            </View>
          </View>
        </View>

        {!isVolunteer && activity.assignedVolunteers?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Assigned Volunteers</Text>
            {activity.assignedVolunteers.map((volunteer) => (
              <View key={volunteer.id} style={styles.volunteerRow}>
                <View
                  style={[
                    styles.volunteerAvatar,
                    { backgroundColor: volunteer.color },
                  ]}
                >
                  <Text style={styles.volunteerInitials}>
                    {volunteer.initials}
                  </Text>
                </View>
                <View style={styles.volunteerInfo}>
                  <Text style={styles.volunteerName}>{volunteer.name}</Text>
                  <Text style={styles.volunteerMeta}>
                    {volunteer.role} · {volunteer.skill}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = activityDetailStyles;
