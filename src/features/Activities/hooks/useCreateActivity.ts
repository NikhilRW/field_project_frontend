import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity } from "../utils/api";
import { activitiesQueryKey } from "./useActivities";

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: activitiesQueryKey });
    },
  });
};
