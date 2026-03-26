import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Bell } from "lucide-react-native";
import { Colors } from "@/shared/constants/color";
import { appHeaderStyles } from "@/shared/styles/appHeaderStyles";
import type { AppHeaderProps } from "@/shared/types/appHeader";

export default function AppHeader({
  orgName = "Helping Hands",
  showNotification = true,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <View style={styles.logoMark}>
          <Text style={styles.logoText}>HH</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.orgName} numberOfLines={1}>
            {orgName}
          </Text>
          <Text style={styles.orgSub}>Samajik Seva Sanstha</Text>
        </View>
      </View>
      {showNotification && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconBtn} testID="notification-btn">
            <Bell size={19} color={Colors.textPrimary} strokeWidth={1.8} />
            <View style={styles.badge} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = appHeaderStyles;
