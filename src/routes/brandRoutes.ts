// routes/brandRoutes.ts
import { Router } from "express";
import * as brandController from "../controllers/brandController";
import { uploadConfigs } from "../utils/upload";
const router = Router();
router.post("/", uploadConfigs.upload, brandController.createBrand);
router.get("/:id", brandController.getBrand);
router.get("/", brandController.getAllBrands);

export default router;