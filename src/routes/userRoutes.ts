import express from "express";
import {register, login, getProfile, updateProfile, logout, googleLogin} from "../controllers/userController";
import * as authenticated from "../middleware/authMiddleware";

const router = express.Router();
router.post("/refresh-token", authenticated.refreshToken)
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticated.authMiddleware, getProfile);
router.put("/profile", authenticated.authMiddleware, updateProfile);
router.post("/logout", logout);
router.post("/google-login", googleLogin);
export default router;