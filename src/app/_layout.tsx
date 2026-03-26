import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-beneficiary"
        options={{
          headerShown: true,
          title: "Add Beneficiary",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: "#1B6CA8",
          headerTitleStyle: { fontWeight: "600" as const, color: "#1C1C2E" },
        }}
      />
      <Stack.Screen
        name="volunteers"
        options={{
          headerShown: true,
          title: "Volunteers",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: "#1B6CA8",
          headerTitleStyle: { fontWeight: "600" as const, color: "#1C1C2E" },
        }}
      />
      <Stack.Screen
        name="surveys"
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
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
