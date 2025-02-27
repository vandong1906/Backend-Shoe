// services/orderItemService.ts
import OrderItem from "../model/orderItem";

export const createOrderItem = async (data: { order_id: number; variant_id?: number; quantity: number; price_at_purchase: number }) => {
    return await OrderItem.create(data);
};