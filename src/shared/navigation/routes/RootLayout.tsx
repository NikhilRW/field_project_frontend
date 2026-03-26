import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FlashMessage from "react-native-flash-message";
import { useAuthGuard } from "@/shared/hooks/useAuthGuard";
import { useDeepLinkBootstrap } from "@/shared/hooks/useDeepLinkBootstrap";
import { usePushRegistration } from "@/shared/hooks/usePushRegistration";
import { useAuthStore } from "@/shared/stores/authStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
// TODO: modularize the styles here also
function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(main)/onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)/forgot-password"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/reset-password"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(main)/add-beneficiary"
        options={{
          headerShown: true,
          title: "Add Beneficiary",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: "#1B6CA8",
          headerTitleStyle: { fontWeight: "600" as const, color: "#1C1C2E" },
        }}
      />
      <Stack.Screen
        name="(main)/add-activity"
        options={{
          headerShown: true,
          title: "Add Activity",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: "#1B6CA8",
          headerTitleStyle: { fontWeight: "600" as const, color: "#1C1C2E" },
        }}
      />
      <Stack.Screen
        name="(main)/activity/[id]"
        options={{
          headerShown: true,
          title: "Activity Details",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: "#1B6CA8",
          headerTitleStyle: { fontWeight: "600" as const, color: "#1C1C2E" },
        }}
      />
      <Stack.Screen
        name="(main)/pick-location"
        options={{
          headerShown: true,
          title: "Pick Location",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: "#1B6CA8",
          headerTitleStyle: { fontWeight: "600" as const, color: "#1C1C2E" },
        }}
      />
      <Stack.Screen
        name="(main)/volunteers"
        options={{
          headerShown: true,
          title: "Volunteers",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: "#1B6CA8",
          headerTitleStyle: { fontWeight: "600" as const, color: "#1C1C2E" },
        }}
      />
      <Stack.Screen
        name="(main)/surveys"
        options={{
          headerShown: true,
          title: "Field Surveys",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: "#1B6CA8",
          headerTitleStyle: { fontWeight: "600" as const, color: "#1C1C2E" },
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const { bottom } = useSafeAreaInsets();

  useAuthGuard();
  useDeepLinkBootstrap();
  usePushRegistration();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (isHydrated) {
      SplashScreen.hideAsync();
    }
  }, [isHydrated]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
        <FlashMessage position="bottom" style={{ marginBottom: bottom }} />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
