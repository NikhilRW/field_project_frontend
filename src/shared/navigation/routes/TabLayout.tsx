import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  HandCoins,
  CircleUser,
} from "lucide-react-native";
import { Colors } from "@/shared/constants/color";
import { useAuthStore } from "@/shared/stores/authStore";

export default function TabLayout() {
  const role = useAuthStore((state) => state.role);
  const isVolunteer = role === "Volunteer";
  const hiddenTabOptions = {
    tabBarButton: () => null,
    tabBarItemStyle: { display: 'none' }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={
          isVolunteer
            ? hiddenTabOptions
            : {
                title: "Home",
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={[styles.iconWrap, focused && styles.iconWrapActive]}
                  >
                    <LayoutDashboard
                      size={20}
                      color={color}
                      strokeWidth={focused ? 2.2 : 1.6}
                    />
                  </View>
                ),
              }
        }
      />
      <Tabs.Screen
        name="beneficiaries"
        options={
          isVolunteer
            ? hiddenTabOptions
            : {
                title: "People",
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={[styles.iconWrap, focused && styles.iconWrapActive]}
                  >
                    <Users
                      size={20}
                      color={color}
                      strokeWidth={focused ? 2.2 : 1.6}
                    />
                  </View>
                ),
              }
        }
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: "Activities",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <CalendarDays
                size={20}
                color={color}
                strokeWidth={focused ? 2.2 : 1.6}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="donations"
        options={
          isVolunteer
            ? hiddenTabOptions
            : {
                title: "Funds",
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={[styles.iconWrap, focused && styles.iconWrapActive]}
                  >
                    <HandCoins
                      size={20}
                      color={color}
                      strokeWidth={focused ? 2.2 : 1.6}
                    />
                  </View>
                ),
              }
        }
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <CircleUser
                size={20}
                color={color}
                strokeWidth={focused ? 2.2 : 1.6}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    paddingTop: 6,
    marginBottom: 8,
    ...(Platform.OS === "web" ? { height: 68 } : {}),
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "600" as const,
    letterSpacing: 0.2,
    marginTop: 2,
  },
  tabItem: {
    paddingTop: 2,
  },
  iconWrap: {
    width: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  iconWrapActive: {
    backgroundColor: Colors.primaryLight,
  },
});
