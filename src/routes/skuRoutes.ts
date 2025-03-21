// routes/skuRoutes.ts
import express from "express";
import skuController from "../controllers/skuController";

const router = express.Router();

// Tạo một SKU mới
router.post("/", skuController.createSKU);

// Lấy tất cả SKU
router.get("/", skuController.getAllSKUs);

export default router;