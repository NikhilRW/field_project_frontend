import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBeneficiary } from "../utils/api";
import { beneficiariesQueryKey } from "./useBeneficiaries";

export const useCreateBeneficiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBeneficiary,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: beneficiariesQueryKey });
    },
  });
};
