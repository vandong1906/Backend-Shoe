import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Product from "./product";

export interface StockOutAttributes {
    id: number;
    product_id: number;
    quantity: number;
    reason?: string;
    date_removed?: Date;
}

interface StockOutCreationAttributes extends Optional<StockOutAttributes, "id" | "date_removed"> {}

class StockOut extends Model<StockOutAttributes, StockOutCreationAttributes> implements StockOutAttributes {
    public id!: number;
    public product_id!: number;
    public quantity!: number;
    public reason?: string;
    public readonly date_removed!: Date;
}

StockOut.init(
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
        reason: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        date_removed: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "stock_out",
        timestamps: false,
    }
);

export default StockOut;