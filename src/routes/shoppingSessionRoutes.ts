// routes/shoppingSessionRoutes.ts
import { Router } from "express";
import * as shoppingSessionController from "../controllers/shoppingSessionController";

const router = Router();

router.get("/", shoppingSessionController.getOrCreateSession);  // GET /shopping-session (creates if not exists)
router.get("/current", shoppingSessionController.getSession);   // GET /shopping-session/current (fetches by token)

export default router;