// services/cartItemService.ts
import CartItem from "../model/cartItem";
import ProductVariant from "../model/productVariant";

export const addToCart = async (sessionId: number, variantId: number, quantity: number) => {
    const variant = await ProductVariant.findByPk(variantId);
    if (!variant || variant.stock_quantity < quantity) throw new Error("Insufficient stock or variant not found");
    return await CartItem.create({ session_id: sessionId, variant_id: variantId, quantity });
};

export const getCartItems = async (sessionId: number) => {
    return await CartItem.findAll({ where: { session_id: sessionId }, include: [ProductVariant] });
};