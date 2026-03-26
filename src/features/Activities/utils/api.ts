import type { Activity } from "@/shared/types/mock";
import http from "@/shared/utils/http";

type ActivitiesResponse = {
  success: boolean;
  data: Activity[];
};

export const fetchActivities = async () => {
  const response = await http.get<ActivitiesResponse>("/api/activities");
  return response.data.data;
};
