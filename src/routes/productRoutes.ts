// routes/productRoutes.ts
import { Router } from "express";
import * as productController from "../controllers/productController";

const router = Router();

router.post("/", productController.createProduct);  // POST /products
router.get("/:id", productController.getProduct);   // GET /products/:id

export default router;