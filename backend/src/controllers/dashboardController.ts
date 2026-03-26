import type { Request, Response } from "express";
import { desc, eq, sql } from "drizzle-orm";
import {
  activities,
  beneficiaries,
  db,
  donations,
  volunteerProfiles,
} from "../config/databaseSetup";
import { formatDate } from "../utils/date";

export const getDashboard = async (_req: Request, res: Response) => {
  try {
    const [beneficiaryCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(beneficiaries);

    const [activityCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(activities);

    const [volunteerCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(volunteerProfiles);

    const [donationTotals] = await db
      .select({
        total: sql<number>`coalesce(sum(${donations.amount}), 0)`,
      })
      .from(donations)
      .where(eq(donations.type, "incoming"));

    const activityRows = await db
      .select()
      .from(activities)
      .orderBy(desc(activities.date))
      .limit(3);

    const recentActivities = activityRows.map((activity) => ({
      id: activity.id,
      name: activity.name,
      date: formatDate(activity.date),
      location: activity.location,
      volunteers: activity.volunteersCount,
      status: activity.status,
      description: activity.description,
    }));

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          beneficiaries: Number(beneficiaryCount?.count ?? 0),
          activities: Number(activityCount?.count ?? 0),
          volunteers: Number(volunteerCount?.count ?? 0),
          donations: Number(donationTotals?.total ?? 0),
        },
        recentActivities,
      },
    });
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch dashboard data." });
  }
};
