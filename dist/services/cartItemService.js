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
exports.getCartItems = exports.addToCart = void 0;
// services/cartItemService.ts
const cartItem_1 = __importDefault(require("../model/cartItem"));
const productVariant_1 = __importDefault(require("../model/productVariant"));
const addToCart = (sessionId, variantId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const variant = yield productVariant_1.default.findByPk(variantId);
    if (!variant || variant.stock_quantity < quantity)
        throw new Error("Insufficient stock or variant not found");
    return yield cartItem_1.default.create({ session_id: sessionId, variant_id: variantId, quantity });
});
exports.addToCart = addToCart;
const getCartItems = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cartItem_1.default.findAll({ where: { session_id: sessionId }, include: [productVariant_1.default] });
});
exports.getCartItems = getCartItems;
//# sourceMappingURL=cartItemService.js.map