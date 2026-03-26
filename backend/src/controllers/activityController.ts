import axios from "axios";
import type { Response } from "express";
import { and, desc, eq, inArray } from "drizzle-orm";
import type { AuthRequest } from "../types/auth";
import {
  activityStatusEnum,
  activityVolunteers,
  activities,
  db,
  notifications,
  users,
  volunteerProfiles,
} from "../config/databaseSetup";
import { formatDate } from "../utils/date";

const expoPushUrl = "https://exp.host/--/api/v2/push/send";

const isExpoPushToken = (token: string) =>
  /^ExponentPushToken\[[^\]]+\]$/.test(token);

const sendPushNotifications = async (
  tokens: string[],
  title: string,
  body: string,
  data?: Record<string, string>,
) => {
  const validTokens = tokens.filter((token) => isExpoPushToken(token));
  if (validTokens.length === 0) return;

  try {
    await axios.post(
      expoPushUrl,
      validTokens.map((token) => ({
        to: token,
        title,
        body,
        data,
      })),
    );
  } catch (error) {
    console.error("Failed to send push notifications:", error);
  }
};

export const getActivities = async (req: AuthRequest, res: Response) => {
  try {
    const selectFields = {
      id: activities.id,
      name: activities.name,
      date: activities.date,
      location: activities.location,
      volunteersCount: activities.volunteersCount,
      status: activities.status,
      description: activities.description,
    };

    const rows =
      req.user?.role === "Volunteer" && req.user.id
        ? await db
            .select(selectFields)
            .from(activities)
            .innerJoin(
              activityVolunteers,
              eq(activityVolunteers.activityId, activities.id),
            )
            .where(eq(activityVolunteers.volunteerId, req.user.id))
            .orderBy(desc(activities.date))
        : await db
            .select(selectFields)
            .from(activities)
            .orderBy(desc(activities.date));

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

export const getActivityById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id?: string };

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Activity ID is required." });
    }

    const [activity] = await db
      .select({
        id: activities.id,
        name: activities.name,
        date: activities.date,
        location: activities.location,
        volunteersCount: activities.volunteersCount,
        status: activities.status,
        description: activities.description,
      })
      .from(activities)
      .where(eq(activities.id, id));

    if (!activity) {
      return res
        .status(404)
        .json({ success: false, error: "Activity not found." });
    }

    if (req.user?.role === "Volunteer" && req.user.id) {
      const [assignment] = await db
        .select()
        .from(activityVolunteers)
        .where(
          and(
            eq(activityVolunteers.activityId, id),
            eq(activityVolunteers.volunteerId, req.user.id),
          ),
        );

      if (!assignment) {
        return res.status(403).json({ success: false, error: "Forbidden." });
      }
    }

    const volunteers =
      req.user?.role === "Admin"
        ? await db
            .select({
              id: volunteerProfiles.userId,
              name: users.name,
              roleTitle: volunteerProfiles.roleTitle,
              skill: volunteerProfiles.skill,
              initials: volunteerProfiles.initials,
              color: volunteerProfiles.color,
            })
            .from(activityVolunteers)
            .innerJoin(
              volunteerProfiles,
              eq(activityVolunteers.volunteerId, volunteerProfiles.userId),
            )
            .innerJoin(users, eq(volunteerProfiles.userId, users.id))
            .where(eq(activityVolunteers.activityId, id))
        : [];

    return res.status(200).json({
      success: true,
      data: {
        id: activity.id,
        name: activity.name,
        date: formatDate(activity.date),
        location: activity.location,
        volunteers: activity.volunteersCount,
        status: activity.status,
        description: activity.description,
        assignedVolunteers: volunteers.map((volunteer) => ({
          id: volunteer.id,
          name: volunteer.name ?? "Unknown",
          role: volunteer.roleTitle,
          skill: volunteer.skill,
          initials: volunteer.initials,
          color: volunteer.color,
        })),
      },
    });
  } catch (error) {
    console.error("Failed to fetch activity details", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch activity details" });
  }
};

export const createActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { name, date, location, description, status, volunteerIds } =
      req.body as {
        name?: string;
        date?: string;
        location?: string;
        description?: string;
        status?: string;
        volunteerIds?: string[];
      };

    if (!name || !date || !location || !description) {
      return res.status(400).json({
        success: false,
        error: "Name, date, location, and description are required.",
      });
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: "Invalid date.",
      });
    }

    const statusValue = status ?? "Upcoming";
    if (!activityStatusEnum.enumValues.includes(statusValue as any)) {
      return res.status(400).json({
        success: false,
        error: "Invalid activity status.",
      });
    }

    const assignedVolunteerIds = Array.isArray(volunteerIds)
      ? volunteerIds.filter((id) => typeof id === "string" && id.length > 0)
      : [];

    const [created] = await db
      .insert(activities)
      .values({
        name,
        date: parsedDate,
        location,
        description,
        status: statusValue as any,
        volunteersCount: assignedVolunteerIds.length,
      })
      .returning({
        id: activities.id,
        name: activities.name,
        date: activities.date,
        location: activities.location,
        volunteersCount: activities.volunteersCount,
        status: activities.status,
        description: activities.description,
      });

    if (!created) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to create activity." });
    }

    if (assignedVolunteerIds.length > 0) {
      await db.insert(activityVolunteers).values(
        assignedVolunteerIds.map((volunteerId) => ({
          activityId: created.id,
          volunteerId,
        })),
      );

      const title = "New Activity Assigned";
      const body = `You have been assigned to ${created.name}.`;

      await db.insert(notifications).values(
        assignedVolunteerIds.map((volunteerId) => ({
          userId: volunteerId,
          title,
          body,
          data: JSON.stringify({ activityId: created.id }),
        })),
      );

      const pushRows = await db
        .select({ expoPushToken: users.expoPushToken })
        .from(users)
        .where(inArray(users.id, assignedVolunteerIds));

      const tokens = pushRows
        .map((row) => row.expoPushToken)
        .filter((token): token is string => Boolean(token));

      await sendPushNotifications(tokens, title, body, {
        activityId: created.id,
      });
    }

    return res.status(201).json({
      success: true,
      data: {
        id: created.id,
        name: created.name,
        date: formatDate(created.date),
        location: created.location,
        volunteers: created.volunteersCount,
        status: created.status,
        description: created.description,
      },
    });
  } catch (error) {
    console.error("Failed to create activity", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create activity" });
  }
};
