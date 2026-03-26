import { Router } from "express";
import { getActivities } from "../controllers/activityController";
import { authenticate, authorizeRoles } from "../middleware/auth";

const router = Router();

router.get(
  "/",
  authenticate,
  authorizeRoles("Admin", "Volunteer"),
  getActivities,
);

export default router;
