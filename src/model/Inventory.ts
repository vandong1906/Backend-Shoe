import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Product from "./product";

export interface InventoryAttributes {
    id: number;
    product_id: number;
    quantity: number;
    location?: string;
    last_updated?: Date;
}

interface InventoryCreationAttributes extends Optional<InventoryAttributes, "id" | "last_updated"> {}

class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
    public id!: number;
    public product_id!: number;
    public quantity!: number;
    public location?: string;
    public readonly last_updated!: Date;
}

Inventory.init(
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
            defaultValue: 0,
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        last_updated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "inventory",
        timestamps: false,
    }
);


export default Inventory;