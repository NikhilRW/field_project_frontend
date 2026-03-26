import { Router } from "express";
import {
  getDonations,
  getMonthlyDonations,
} from "../controllers/donationController";
import { authenticate, authorizeRoles } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, authorizeRoles("Admin"), getDonations);
router.get(
  "/monthly",
  authenticate,
  authorizeRoles("Admin"),
  getMonthlyDonations,
);

export default router;
