// routes/cartItemRoutes.ts
import { Router } from "express";
import * as cartItemController from "../controllers/cartItemController";

const router = Router();

router.post("/", cartItemController.addToCart);    // POST /cart-items
router.get("/", cartItemController.getCartItems);  // GET /cart-items (current session)

export default router;