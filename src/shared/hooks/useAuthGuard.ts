import { useEffect, useRef } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/shared/stores/authStore";
import { fetchMe } from "@/features/Auth/utils/api";

export const useAuthGuard = () => {
  const router = useRouter();
  const segments = useSegments();
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const isFetchingProfile = useRef(false);

  useEffect(() => {
    if (!isHydrated || !isAuthenticated || user || isFetchingProfile.current) {
      return;
    }

    isFetchingProfile.current = true;

    fetchMe()
      .then((data) => {
        setUser(data);
      })
      .catch(async () => {
        await logout();
        router.replace("/(auth)/login");
      })
      .finally(() => {
        isFetchingProfile.current = false;
      });
  }, [isHydrated, isAuthenticated, user, setUser, logout, router]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const rootSegment = segments[0];
    const isInAuthGroup = rootSegment === "(auth)";
    const isInTabsGroup = rootSegment === "(tabs)";
    const isInMainGroup = rootSegment === "(main)";
    const tabSegment = segments[1];

    if (!isAuthenticated) {
      if (!isInAuthGroup) {
        router.replace("/(auth)/login");
      }
      return;
    }

    const defaultRoute =
      role === "Volunteer" ? "/(tabs)/activities" : "/(tabs)/dashboard";

    if (isInAuthGroup) {
      router.replace(defaultRoute);
      return;
    }

    if (role === "Volunteer") {
      if (isInTabsGroup) {
        const allowedTabs = new Set(["activities", "profile"]);
        if (tabSegment && !allowedTabs.has(tabSegment)) {
          router.replace("/(tabs)/activities");
        }
      }

      if (isInMainGroup) {
        router.replace("/(tabs)/activities");
      }
    }
  }, [segments, isAuthenticated, isHydrated, role, router]);
};
