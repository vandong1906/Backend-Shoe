"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/index.ts
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const addressRoutes_1 = __importDefault(require("./addressRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const productVariantRoutes_1 = __importDefault(require("./productVariantRoutes"));
const shoppingSessionRoutes_1 = __importDefault(require("./shoppingSessionRoutes"));
const cartItemRoutes_1 = __importDefault(require("./cartItemRoutes"));
const brandRoutes_1 = __importDefault(require("./brandRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
const orderItemRoutes_1 = __importDefault(require("./orderItemRoutes"));
const paymentRoutes_1 = __importDefault(require("./paymentRoutes"));
const router = (0, express_1.Router)();
router.use("/users", userRoutes_1.default);
router.use("/addresses", addressRoutes_1.default); // Nested under users in some cases
router.use("/products", productRoutes_1.default);
router.use("/product-variants", productVariantRoutes_1.default);
router.use("/shopping-session", shoppingSessionRoutes_1.default);
router.use("/cart-items", cartItemRoutes_1.default);
router.use("/orders", orderRoutes_1.default);
router.use("/order-items", orderItemRoutes_1.default);
router.use("/payments", paymentRoutes_1.default);
router.use("/brands", brandRoutes_1.default);
// router.use("/inventory", inventoryRoutes);
exports.default = router;
//# sourceMappingURL=index.js.map