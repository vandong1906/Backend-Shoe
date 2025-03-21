// routes/sizeRoutes.ts
import express from "express";
import sizeController from "../controllers/sizeController";

const router = express.Router();

router.post("/", sizeController.createSize);
router.get("/", sizeController.getAllSizes);

export default router;