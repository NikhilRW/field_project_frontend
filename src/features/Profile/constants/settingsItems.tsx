import React from "react";
import { Pencil, Users, Bell, Info, LogOut } from "lucide-react-native";
import { Colors } from "@/shared/constants/color";
import type { ProfileSettingsItem } from "../types/settings";

export const buildProfileSettingsItems = (
  onLogout: () => void,
): ProfileSettingsItem[] => [
  {
    icon: <Pencil size={16} color={Colors.primary} strokeWidth={1.8} />,
    label: "Edit Profile",
    sub: "Update NGO information",
    iconBg: Colors.primaryLight,
  },
  {
    icon: <Users size={16} color={Colors.secondary} strokeWidth={1.8} />,
    label: "Manage Users",
    sub: "Admins, volunteers & donors",
    iconBg: Colors.secondaryLight,
  },
  {
    icon: <Bell size={16} color={Colors.accent} strokeWidth={1.8} />,
    label: "Notifications",
    sub: "Alerts and reminders",
    iconBg: Colors.accentLight,
  },
  {
    icon: <Info size={16} color={Colors.textSecondary} strokeWidth={1.8} />,
    label: "About App",
    sub: "Smart NGO v1.0",
    iconBg: Colors.borderLight,
  },
  {
    icon: <LogOut size={16} color={Colors.error} strokeWidth={1.8} />,
    label: "Logout",
    isLogout: true,
    onPress: onLogout,
    iconBg: Colors.errorLight,
  },
];
