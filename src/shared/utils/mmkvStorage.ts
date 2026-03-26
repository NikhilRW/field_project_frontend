import { createMMKV, MMKV } from "react-native-mmkv";
import { createJSONStorage } from "zustand/middleware";

const storage = createMMKV({ id: "smart-ngo-storage" });

export const mmkvStorage = createJSONStorage(() => ({
  getItem: (key) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  setItem: (key, value) => {
    storage.set(key, value);
  },
  removeItem: (key) => {
    storage.delete(key);
  },
}));
