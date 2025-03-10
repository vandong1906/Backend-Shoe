"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Order.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const user_1 = __importDefault(require("./user"));
const address_1 = __importDefault(require("./address"));
class Order extends sequelize_1.Model {
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: user_1.default, key: "id" },
    },
    address_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: address_1.default, key: "id" },
    },
    total_amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
    },
}, {
    sequelize: db_1.default,
    tableName: "orders",
    timestamps: true,
});
exports.default = Order;
//# sourceMappingURL=order.js.map