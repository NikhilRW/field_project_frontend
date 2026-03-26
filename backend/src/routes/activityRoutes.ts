import { Router } from "express";
import {
  createActivity,
  getActivities,
  getActivityById,
} from "../controllers/activityController";
import { authenticate, authorizeRoles } from "../middleware/auth";

const router = Router();

router.get(
  "/",
  authenticate,
  authorizeRoles("Admin", "Volunteer"),
  getActivities,
);

router.get(
  "/:id",
  authenticate,
  authorizeRoles("Admin", "Volunteer"),
  getActivityById,
);

router.post("/", authenticate, authorizeRoles("Admin"), createActivity);

export default router;
