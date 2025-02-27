// routes/orderRoutes.ts
import { Router } from "express";
import * as orderController from "../controllers/orderController";

const router = Router();

router.post("/", orderController.createOrder);  // POST /orders
router.get("/:id", orderController.getOrder);   // GET /orders/:id

export default router;