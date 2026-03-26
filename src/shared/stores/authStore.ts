import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mmkvStorage } from "@/shared/utils/mmkvStorage";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/shared/utils/secureStore";

export type AuthRole = "Admin" | "Volunteer" | "Donor";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
  isEmailVerified: boolean;
};

type AuthState = {
  user: AuthUser | null;
  role: AuthRole | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setUser: (user: AuthUser | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  login: (payload: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      isHydrated: false,

      setUser: (user) => {
        set({
          user,
          role: user?.role ?? null,
          isAuthenticated: Boolean(user),
        });
      },

      setTokens: async (accessToken, refreshToken) => {
        await Promise.all([
          setAccessToken(accessToken),
          setRefreshToken(refreshToken),
        ]);
      },

      login: async ({ user, accessToken, refreshToken }) => {
        await Promise.all([
          setAccessToken(accessToken),
          setRefreshToken(refreshToken),
        ]);

        set({
          user,
          role: user.role,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        await clearTokens();
        set({
          user: null,
          role: null,
          isAuthenticated: false,
        });
      },

      hydrate: async () => {
        const [accessToken, refreshToken] = await Promise.all([
          getAccessToken(),
          getRefreshToken(),
        ]);

        const hasTokens = Boolean(accessToken && refreshToken);

        if (!hasTokens) {
          await clearTokens();
          set({
            user: null,
            role: null,
            isAuthenticated: false,
            isHydrated: true,
          });
          return;
        }

        set({ isAuthenticated: true, isHydrated: true });
      },
    }),
    {
      name: "auth-store",
      storage: mmkvStorage,
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
