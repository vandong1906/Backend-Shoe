// routes/productVariantRoutes.ts
import { Router } from "express";
import * as productVariantController from "../controllers/productVariantController";
import {uploadConfigs} from "../utils/upload";

const router = Router();

router.post("/",uploadConfigs.product ,productVariantController.createVariant);  // POST /product-variants
router.get("/:id", productVariantController.getVariant);   // GET /product-variants/:id

export default router;