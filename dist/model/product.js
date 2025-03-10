"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Product.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const brand_1 = __importDefault(require("./brand"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    brand_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: brand_1.default, key: "id" },
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    base_price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: db_1.default,
    tableName: "products",
    timestamps: true,
});
exports.default = Product;
//# sourceMappingURL=product.js.map