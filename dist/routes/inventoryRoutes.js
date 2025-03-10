"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InventoryController_1 = require("../controllers/InventoryController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/stockin", authMiddleware_1.default, InventoryController_1.stockInController);
router.post("/stockout", authMiddleware_1.default, InventoryController_1.stockOutController);
router.get("/inventory/:product_id", InventoryController_1.getStockController);
router.post("/checkout", InventoryController_1.checkoutController);
exports.default = router;
//# sourceMappingURL=inventoryRoutes.js.map