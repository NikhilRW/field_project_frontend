import { useQuery } from "@tanstack/react-query";
import { fetchActivityById } from "../utils/api";

export const activityDetailQueryKey = (id: string) => ["activities", id];

export const useActivity = (id: string) =>
  useQuery({
    queryKey: activityDetailQueryKey(id),
    queryFn: () => fetchActivityById(id),
    enabled: Boolean(id),
  });
