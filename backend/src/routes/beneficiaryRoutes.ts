import { Router } from "express";
import { getBeneficiaries } from "../controllers/beneficiaryController";
import { authenticate, authorizeRoles } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, authorizeRoles("Admin"), getBeneficiaries);

export default router;
