// models/Order.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user";
import Address from "./address";

interface OrderAttributes {
    id: number;
    user_id?: number;
    address_id?: number;
    total_amount: number;
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
    createdAt?: Date;
    updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id" | "createdAt" | "updatedAt"> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public user_id?: number;
    public address_id?: number;
    public total_amount!: number;
    public status!: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: User, key: "id" },
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: Address, key: "id" },
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
            allowNull: false,
            defaultValue: "pending",
        },
    },
    {
        sequelize,
        tableName: "orders",
        timestamps: true,
    }
);

export default Order;