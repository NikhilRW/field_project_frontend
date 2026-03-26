import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthGuard } from "@/shared/hooks/useAuthGuard";
import { useAuthStore } from "@/shared/stores/authStore";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
// TODO: modularize the styles here also
function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(main)/onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
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

  useAuthGuard();

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
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
