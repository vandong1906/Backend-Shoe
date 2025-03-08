import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Product from "./product";

export interface StockInAttributes {
    id: number;
    product_id: number;
    quantity: number;
    supplier?: string;
    date_added?: Date;
}

interface StockInCreationAttributes extends Optional<StockInAttributes, "id" | "date_added"> {}

class StockIn extends Model<StockInAttributes, StockInCreationAttributes> implements StockInAttributes {
    public id!: number;
    public product_id!: number;
    public quantity!: number;
    public supplier?: string;
    public readonly date_added!: Date;
}

StockIn.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Product, key: "id" },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        date_added: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "stock_in",
        timestamps: false,
    }
);

export default StockIn;