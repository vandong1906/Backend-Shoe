// routes/productRoutes.ts
import {Router} from "express";
import * as productController from "../controllers/productController";
import * as authMiddleware from '../middleware/authMiddleware'


const router = Router();
router.get('/getPaginatedProducts', productController.getProductsWithPagination);
router.post("/",authMiddleware.authMiddleware, productController.createProduct);  // POST /products
router.get("/:id", productController.getProduct);   // GET /products/:id
router.get('/',productController.getAll)
export default router;