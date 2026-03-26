import type { Request, Response } from "express";
import { db, beneficiaries } from "../config/databaseSetup";

export const getBeneficiaries = async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(beneficiaries);
    return res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Failed to fetch beneficiaries:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch beneficiaries" });
  }
};
