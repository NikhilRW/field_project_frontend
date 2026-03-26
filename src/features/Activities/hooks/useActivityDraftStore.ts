import { create } from "zustand";
import type { ActivityStatus } from "@/shared/types/mock";

type ActivityDraftState = {
  name: string;
  date: Date | null;
  location: string;
  description: string;
  status: ActivityStatus;
  volunteerIds: string[];
  setName: (name: string) => void;
  setDate: (date: Date | null) => void;
  setLocation: (location: string) => void;
  setDescription: (description: string) => void;
  setStatus: (status: ActivityStatus) => void;
  toggleVolunteer: (volunteerId: string) => void;
  setVolunteerIds: (volunteerIds: string[]) => void;
  resetDraft: () => void;
};

export const useActivityDraftStore = create<ActivityDraftState>((set) => ({
  name: "",
  date: null,
  location: "",
  description: "",
  status: "Upcoming",
  volunteerIds: [],
  setName: (name) => set({ name }),
  setDate: (date) => set({ date }),
  setLocation: (location) => set({ location }),
  setDescription: (description) => set({ description }),
  setStatus: (status) => set({ status }),
  toggleVolunteer: (volunteerId) =>
    set((state) => ({
      volunteerIds: state.volunteerIds.includes(volunteerId)
        ? state.volunteerIds.filter((id) => id !== volunteerId)
        : [...state.volunteerIds, volunteerId],
    })),
  setVolunteerIds: (volunteerIds) => set({ volunteerIds }),
  resetDraft: () =>
    set({
      name: "",
      date: null,
      location: "",
      description: "",
      status: "Upcoming",
      volunteerIds: [],
    }),
}));
