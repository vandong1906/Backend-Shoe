// routes/addressRoutes.ts
import { Router } from "express";
import * as addressController from "../controllers/addressController";

const router = Router();

router.post("/users/:userId/addresses", addressController.createAddress);  // POST /users/:userId/addresses
router.get("/users/:userId/addresses", addressController.getAddresses);   // GET /users/:userId/addresses

export default router;