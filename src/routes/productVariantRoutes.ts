// routes/productVariantRoutes.ts
import { Router } from "express";
import * as productVariantController from "../controllers/productVariantController";
import {upload} from "../utils/upload";

const router = Router();

router.post("/",upload ,productVariantController.createVariant);  // POST /product-variants
router.get("/:id", productVariantController.getVariant);   // GET /product-variants/:id

export default router;