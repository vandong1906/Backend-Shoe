// models/Payment.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Order from "./order";

interface PaymentAttributes {
    id: number;
    order_id: number;
    amount: number;
    payment_method: string;
    status: "pending" | "completed" | "failed";
    transaction_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id" | "createdAt" | "updatedAt"> {}

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
    public id!: number;
    public order_id!: number;
    public amount!: number;
    public payment_method!: string;
    public status!: "pending" | "completed" | "failed";
    public transaction_id?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Payment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true, // 1:1 with order
            references: { model: Order, key: "id" },
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "completed", "failed"),
            allowNull: false,
            defaultValue: "pending",
        },
        transaction_id: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "payments",
        timestamps: true,
    }
);

export default Payment;