// models/CartItem.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import ShoppingSession from "./shoppingSession";
import ProductVariant from "./productVariant";

interface CartItemAttributes {
    id: number;
    session_id: number;
    variant_id: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, "id" | "createdAt" | "updatedAt"> {}

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
    public id!: number;
    public session_id!: number;
    public variant_id!: number;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        session_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: ShoppingSession, key: "id" },
        },
        variant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: ProductVariant, key: "id" },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1 },
        },
    },
    {
        sequelize,
        tableName: "cart_items",
        timestamps: true,
    }
);

export default CartItem;