import type { Activity } from "@/shared/types/mock";
import http from "@/shared/utils/http";

type ActivitiesResponse = {
  success: boolean;
  data: Activity[];
};

export type ActivityDetail = Activity & {
  assignedVolunteers: Array<{
    id: string;
    name: string;
    role: string;
    skill: string;
    initials: string;
    color: string;
  }>;
};

export type CreateActivityPayload = {
  name: string;
  date: string;
  location: string;
  description: string;
  status?: "Upcoming" | "Completed" | "Ongoing";
  volunteerIds?: string[];
};

export const fetchActivities = async () => {
  const response = await http.get<ActivitiesResponse>("/api/activities");
  return response.data.data;
};

export const createActivity = async (payload: CreateActivityPayload) => {
  const response = await http.post<{ success: boolean; data: Activity }>(
    "/api/activities",
    payload,
  );
  return response.data.data;
};

export const fetchActivityById = async (id: string) => {
  const response = await http.get<{ success: boolean; data: ActivityDetail }>(
    `/api/activities/${id}`,
  );
  return response.data.data;
};
