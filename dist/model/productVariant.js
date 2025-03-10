"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/ProductVariant.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const product_1 = __importDefault(require("./product"));
class ProductVariant extends sequelize_1.Model {
}
ProductVariant.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: product_1.default, key: "id" },
    },
    size: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    color: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock_quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
    },
    sku: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    image_url: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true, // Optional image
    },
}, {
    sequelize: db_1.default,
    tableName: "product_variants",
    timestamps: false,
});
exports.default = ProductVariant;
//# sourceMappingURL=productVariant.js.map