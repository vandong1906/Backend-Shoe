"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.createOrder = void 0;
// services/orderService.ts
const order_1 = __importDefault(require("../model/order"));
const orderItem_1 = __importDefault(require("../model/orderItem"));
const relationships_1 = require("../model/relationships");
const createOrder = (userId, address_id, cartItems) => __awaiter(void 0, void 0, void 0, function* () {
    const total_amount = yield calculateTotal(cartItems); // Helper function
    const order = yield order_1.default.create({ user_id: userId, address_id, total_amount, status: "pending" });
    yield Promise.all(cartItems.map(item => orderItem_1.default.create(Object.assign(Object.assign({ order_id: order.id }, item), { price_at_purchase: 0 })))); // Price needs logic
    return order;
});
exports.createOrder = createOrder;
const getOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_1.default.findByPk(id, { include: [orderItem_1.default] });
    if (!order)
        throw new Error("Order not found");
    return order;
});
exports.getOrder = getOrder;
const calculateTotal = (items) => __awaiter(void 0, void 0, void 0, function* () {
    let total = 0;
    for (const item of items) {
        const variant = yield relationships_1.ProductVariant.findByPk(item.variant_id);
        if (variant)
            total += variant.price * item.quantity;
    }
    return total;
});
//# sourceMappingURL=orderService.js.map