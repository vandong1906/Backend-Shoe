"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = exports.Payment = exports.OrderItem = exports.Order = exports.CartItem = exports.ShoppingSession = exports.ProductVariant = exports.Product = exports.Address = exports.User = void 0;
// models/index.ts
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const address_1 = __importDefault(require("./address"));
exports.Address = address_1.default;
const product_1 = __importDefault(require("./product"));
exports.Product = product_1.default;
const productVariant_1 = __importDefault(require("./productVariant"));
exports.ProductVariant = productVariant_1.default;
const shoppingSession_1 = __importDefault(require("./shoppingSession"));
exports.ShoppingSession = shoppingSession_1.default;
const cartItem_1 = __importDefault(require("./cartItem"));
exports.CartItem = cartItem_1.default;
const order_1 = __importDefault(require("./order"));
exports.Order = order_1.default;
const orderItem_1 = __importDefault(require("./orderItem"));
exports.OrderItem = orderItem_1.default;
const payment_1 = __importDefault(require("./payment"));
exports.Payment = payment_1.default;
const Inventory_1 = __importDefault(require("./Inventory"));
exports.Inventory = Inventory_1.default;
// Define associations
user_1.default.hasMany(address_1.default, { foreignKey: "user_id", onDelete: "CASCADE" });
address_1.default.belongsTo(user_1.default, { foreignKey: "user_id" });
product_1.default.hasMany(productVariant_1.default, { foreignKey: "product_id", onDelete: "CASCADE" });
productVariant_1.default.belongsTo(product_1.default, { foreignKey: "product_id" });
user_1.default.hasMany(shoppingSession_1.default, { foreignKey: "user_id", onDelete: "SET NULL" });
shoppingSession_1.default.belongsTo(user_1.default, { foreignKey: "user_id" });
shoppingSession_1.default.hasMany(cartItem_1.default, { foreignKey: "session_id", onDelete: "CASCADE" });
cartItem_1.default.belongsTo(shoppingSession_1.default, { foreignKey: "session_id" });
productVariant_1.default.hasMany(cartItem_1.default, { foreignKey: "variant_id", onDelete: "CASCADE" });
cartItem_1.default.belongsTo(productVariant_1.default, { foreignKey: "variant_id" });
user_1.default.hasMany(order_1.default, { foreignKey: "user_id", onDelete: "SET NULL" });
order_1.default.belongsTo(user_1.default, { foreignKey: "user_id" });
order_1.default.hasMany(orderItem_1.default, { foreignKey: "order_id", onDelete: "CASCADE" });
orderItem_1.default.belongsTo(order_1.default, { foreignKey: "order_id" });
productVariant_1.default.hasMany(orderItem_1.default, { foreignKey: "variant_id", onDelete: "SET NULL" });
orderItem_1.default.belongsTo(productVariant_1.default, { foreignKey: "variant_id" });
order_1.default.hasOne(payment_1.default, { foreignKey: "order_id", onDelete: "CASCADE" });
payment_1.default.belongsTo(order_1.default, { foreignKey: "order_id" });
product_1.default.hasOne(Inventory_1.default, { foreignKey: "product_id" });
Inventory_1.default.belongsTo(product_1.default, { foreignKey: "product_id" });
//# sourceMappingURL=relationships.js.map