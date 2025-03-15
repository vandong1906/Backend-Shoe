// routes/shoppingSessionRoutes.ts
import { Router } from "express";
import * as shoppingSessionController from "../controllers/shoppingSessionController";
const router = Router();
router.get("/", shoppingSessionController.getOrCreateSession);  
router.get("/current", shoppingSessionController.getSession);   
export default router;