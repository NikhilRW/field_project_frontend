import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import http from "@/shared/utils/http";
import { useAuthStore } from "@/shared/stores/authStore";

export const usePushRegistration = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);
  const hasRegistered = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || hasRegistered.current) {
      return;
    }

    const register = async () => {
      if (!Device.isDevice) {
        return;
      }

      const permission = await Notifications.getPermissionsAsync();
      let status = permission.status;

      if (status !== "granted") {
        const request = await Notifications.requestPermissionsAsync();
        status = request.status;
      }

      if (status !== "granted") {
        return;
      }

      const projectId =
        Constants.easConfig?.projectId ??
        Constants.expoConfig?.extra?.eas?.projectId;

      const tokenResponse = projectId
        ? await Notifications.getExpoPushTokenAsync({ projectId })
        : await Notifications.getExpoPushTokenAsync();

      const token = tokenResponse.data;
      if (!token) {
        return;
      }

      await http.post("/api/notifications/register-token", { token });
      hasRegistered.current = true;
    };

    register();
  }, [isAuthenticated, role]);
};
