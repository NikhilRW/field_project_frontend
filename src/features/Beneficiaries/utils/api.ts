import http from "@/shared/utils/http";
import type { Beneficiary } from "@/shared/types/mock";

export const fetchBeneficiaries = async () => {
  const response = await http.get<{ success: boolean; data: Beneficiary[] }>(
    "/api/beneficiaries",
  );
  return response.data.data;
};
