// models/index.ts
import User from "./user";
import Address from "./address";
import Product from "./product";
import ProductVariant from "./productVariant";
import ShoppingSession from "./shoppingSession";
import CartItem from "./cartItem";
import Order from "./order";
import OrderItem from "./orderItem";
import Payment from "./payment";

// Define associations
User.hasMany(Address, { foreignKey: "user_id", onDelete: "CASCADE" });
Address.belongsTo(User, { foreignKey: "user_id" });

Product.hasMany(ProductVariant, { foreignKey: "product_id", onDelete: "CASCADE" });
ProductVariant.belongsTo(Product, { foreignKey: "product_id" });

User.hasMany(ShoppingSession, { foreignKey: "user_id", onDelete: "SET NULL" });
ShoppingSession.belongsTo(User, { foreignKey: "user_id" });

ShoppingSession.hasMany(CartItem, { foreignKey: "session_id", onDelete: "CASCADE" });
CartItem.belongsTo(ShoppingSession, { foreignKey: "session_id" });

ProductVariant.hasMany(CartItem, { foreignKey: "variant_id", onDelete: "CASCADE" });
CartItem.belongsTo(ProductVariant, { foreignKey: "variant_id" });

User.hasMany(Order, { foreignKey: "user_id", onDelete: "SET NULL" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

ProductVariant.hasMany(OrderItem, { foreignKey: "variant_id", onDelete: "SET NULL" });
OrderItem.belongsTo(ProductVariant, { foreignKey: "variant_id" });

Order.hasOne(Payment, { foreignKey: "order_id", onDelete: "CASCADE" });
Payment.belongsTo(Order, { foreignKey: "order_id" });

export {
    User,
    Address,
    Product,
    ProductVariant,
    ShoppingSession,
    CartItem,
    Order,
    OrderItem,
    Payment,
};