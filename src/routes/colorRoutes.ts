// routes/skuRoutes.ts
import express from "express";
import colorController from "../controllers/colorController";

const router = express.Router();

// Tạo một SKU mới
router.post("/", colorController.createColor);

// Lấy tất cả SKU
router.get("/", colorController.getAllColors);

export default router;