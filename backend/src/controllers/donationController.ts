import type { Request, Response } from "express";
import { asc, desc } from "drizzle-orm";
import { db, donations, monthlyDonations } from "../config/databaseSetup";
import { formatDate } from "../utils/date";

export const getDonations = async (_req: Request, res: Response) => {
  try {
    const rows = await db
      .select()
      .from(donations)
      .orderBy(desc(donations.date));
    const data = rows.map((row) => ({
      id: row.id,
      donor: row.donorName,
      purpose: row.purpose,
      amount: Number(row.amount),
      type: row.type,
      date: formatDate(row.date),
    }));
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Failed to fetch donations", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch donations" });
  }
};

export const getMonthlyDonations = async (_req: Request, res: Response) => {
  try {
    const rows = await db
      .select()
      .from(monthlyDonations)
      .orderBy(asc(monthlyDonations.monthIndex));
    const data = rows.map((row) => ({
      month: row.month,
      received: Number(row.received),
      spent: Number(row.spent),
    }));
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Failed to fetch monthly donations", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch monthly donations",
    });
  }
};
