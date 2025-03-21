import { Router } from "express";
import {
    stockInController,
    stockOutController,
    getStockController,
    checkoutController,
} from "../controllers/InventoryController";

import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

router.post("/stockin", authMiddleware, stockInController);
router.post("/stockout", authMiddleware, stockOutController);
router.get("/inventory/:product_id", getStockController);
router.post("/checkout", checkoutController);

export default router;