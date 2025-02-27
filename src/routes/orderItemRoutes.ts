// routes/orderItemRoutes.ts
import { Router } from "express";
import * as orderItemController from "../controllers/orderItemController";

const router = Router();

router.post("/", orderItemController.createOrderItem);  // POST /order-items

export default router;