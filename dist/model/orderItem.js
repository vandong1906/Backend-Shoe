"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/OrderItem.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const order_1 = __importDefault(require("./order"));
const productVariant_1 = __importDefault(require("./productVariant"));
class OrderItem extends sequelize_1.Model {
}
OrderItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: order_1.default, key: "id" },
    },
    variant_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: productVariant_1.default, key: "id" },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 },
    },
    price_at_purchase: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "order_items",
    timestamps: false,
});
exports.default = OrderItem;
//# sourceMappingURL=orderItem.js.map