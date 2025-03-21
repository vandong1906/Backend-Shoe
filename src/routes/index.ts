// routes/index.ts
import { Router } from "express";
import userRoutes from "./userRoutes";
import addressRoutes from "./addressRoutes";
import productRoutes from "./productRoutes";
import productVariantRoutes from "./productVariantRoutes";
import shoppingSessionRoutes from "./shoppingSessionRoutes";
import cartItemRoutes from "./cartItemRoutes";
import brandRoutes from "./brandRoutes";
import orderRoutes from "./orderRoutes";
import orderItemRoutes from "./orderItemRoutes";
import paymentRoutes from "./paymentRoutes";
import inventoryRoutes from "./inventoryRoutes";
import colorRoutes from "./colorRoutes";
import skuRoutes from "./skuRoutes";
import sizeRoutes from "./sizeRoutes";

const router = Router();
router.use("/users", userRoutes);
router.use("/addresses", addressRoutes); // Nested under users in some cases
router.use("/products", productRoutes);
router.use("/product-variants", productVariantRoutes);
router.use("/shopping-session", shoppingSessionRoutes);
router.use("/cart-items", cartItemRoutes);
router.use("/orders", orderRoutes); 
router.use("/order-items", orderItemRoutes);
router.use("/payments", paymentRoutes);
router.use("/brands", brandRoutes);
router.use("/colors", colorRoutes);
router.use("/skus", skuRoutes);
router.use("/sizes", sizeRoutes);
// router.use("/inventory", inventoryRoutes);

export default router;