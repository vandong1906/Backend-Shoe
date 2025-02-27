// models/Address.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user";

interface AddressAttributes {
    id: number;
    user_id: number;
    street: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
    is_default: boolean;
}

export interface AddressCreationAttributes extends Optional<AddressAttributes, "id"> {}

class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
     id!: number;
     user_id!: number;
     street!: string;
     city!: string;
     state?: string;
     postal_code!: string;
     country!: string;
     is_default!: boolean;
    public readonly  created_at!: Date;
    public readonly  updated_at!: Date;
}
Address.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: User, key: "id" },
        },
        street: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        postal_code: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        is_default: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: "addresses",
        timestamps: false,
    }
);

export default Address;