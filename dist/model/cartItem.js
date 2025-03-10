"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/CartItem.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const shoppingSession_1 = __importDefault(require("./shoppingSession"));
const productVariant_1 = __importDefault(require("./productVariant"));
class CartItem extends sequelize_1.Model {
}
CartItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    session_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: shoppingSession_1.default, key: "id" },
    },
    variant_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: productVariant_1.default, key: "id" },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 },
    },
}, {
    sequelize: db_1.default,
    tableName: "cart_items",
    timestamps: true,
});
exports.default = CartItem;
//# sourceMappingURL=cartItem.js.map