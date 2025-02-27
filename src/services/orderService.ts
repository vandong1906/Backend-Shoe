// services/orderService.ts
import Order from "../model/order";
import CartItem from "../model/cartItem";
import OrderItem from "../model/orderItem";
import {ProductVariant} from "../model/relationships";

export const createOrder = async (userId: number, address_id: number, cartItems: { variant_id: number; quantity: number }[]) => {
    const total_amount = await calculateTotal(cartItems); // Helper function
    const order = await Order.create({ user_id: userId, address_id, total_amount, status: "pending" });
    await Promise.all(cartItems.map(item => OrderItem.create({ order_id: order.id, ...item, price_at_purchase: 0 }))); // Price needs logic
    return order;
};

export const getOrder = async (id: number) => {
    const order = await Order.findByPk(id, { include: [OrderItem] });
    if (!order) throw new Error("Order not found");
    return order;
};

const calculateTotal = async (items: { variant_id: number; quantity: number }[]) => {
    let total = 0;
    for (const item of items) {
        const variant = await ProductVariant.findByPk(item.variant_id);
        if (variant) total += variant.price * item.quantity;
    }
    return total;
};