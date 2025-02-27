// models/ShoppingSession.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user";

interface ShoppingSessionAttributes {
    id: number;
    user_id?: number;
    token: string;
    createdAt?: Date;
    updatedAt?: Date;
    expires_at?: Date;
}

interface ShoppingSessionCreationAttributes extends Optional<ShoppingSessionAttributes, "id" | "createdAt" | "updatedAt"> {}

class ShoppingSession extends Model<ShoppingSessionAttributes, ShoppingSessionCreationAttributes> implements ShoppingSessionAttributes {
    public id!: number;
    public user_id?: number;
    public token!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public expires_at?: Date;
}

ShoppingSession.init(
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
        token: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "shopping_sessions",
        timestamps: true,
    }
);

export default ShoppingSession;