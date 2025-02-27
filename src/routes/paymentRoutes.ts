// routes/paymentRoutes.ts
import { Router } from "express";
import * as paymentController from "../controllers/paymentController";

const router = Router();

router.post("/", paymentController.createPayment);           // POST /payments
router.put("/:id/status", paymentController.updatePaymentStatus);  // PUT /payments/:id/status

export default router;