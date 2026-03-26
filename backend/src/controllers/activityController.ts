import type { Request, Response } from "express";
import { desc } from "drizzle-orm";
import { db, activities } from "../config/databaseSetup";
import { formatDate } from "../utils/date";

export const getActivities = async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(activities).orderBy(desc(activities.date));
    const data = rows.map((row) => ({
      id: row.id,
      name: row.name,
      date: formatDate(row.date),
      location: row.location,
      volunteers: row.volunteersCount,
      status: row.status,
      description: row.description,
    }));
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Failed to fetch activities", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch activities" });
  }
};
