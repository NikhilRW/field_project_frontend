import React from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import { Heart } from "lucide-react-native";
import { useSplashAnimation } from "@/shared/hooks/useSplashAnimation";
import { useAuthStore } from "@/shared/stores/authStore";
import { splashStyles as styles } from "@/shared/styles/splashStyles";

export default function SplashScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);
  const destination =
    isAuthenticated && role === "Volunteer"
      ? "/(tabs)/activities"
      : isAuthenticated
        ? "/(tabs)/dashboard"
        : "/(main)/onboarding";

  const { logoAnimatedStyle, taglineAnimatedStyle, loaderAnimatedStyle } =
    useSplashAnimation({
      onComplete: () => router.replace(destination as any),
    });

  return (
    <View style={styles.container} testID="splash-screen">
      <Animated.View style={[styles.logoWrap, logoAnimatedStyle]}>
        <View style={styles.logoBox}>
          <Heart size={30} color="#fff" fill="#fff" />
        </View>
        <Text style={styles.appName}>Helping Hands</Text>
        <Text style={styles.orgFull}>Samajik Seva Sanstha</Text>
        <Animated.Text style={[styles.tagline, taglineAnimatedStyle]}>
          Digital Empowerment for Social Good
        </Animated.Text>
      </Animated.View>

      <View style={styles.bottomSection}>
        <View style={styles.loaderTrack}>
          <Animated.View style={[styles.loaderBar, loaderAnimatedStyle]} />
        </View>
        <Text style={styles.version}>v1.0</Text>
      </View>
    </View>
  );
}
