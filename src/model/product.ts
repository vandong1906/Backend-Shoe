// models/Product.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Brand from "./brand";

export  interface ProductAttributes {
    id: number;
    name: string;
    brand_id: number; // Foreign key to Brand
    description?: string;
    base_price: number;
    stock:number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id" | "createdAt" | "updatedAt"> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
    public brand_id!: number;
    public description?: string;
    public base_price!: number;
   public stock!:number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Brand, key: "id" },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        base_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "products",
        timestamps: true,
    }
);

export default Product;