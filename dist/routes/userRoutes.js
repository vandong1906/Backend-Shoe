"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post("/register", userController_1.register);
router.post("/login", userController_1.login);
router.get("/profile", authMiddleware_1.default, userController_1.getProfile);
router.put("/profile", authMiddleware_1.default, userController_1.updateProfile);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map