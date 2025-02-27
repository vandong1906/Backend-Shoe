// models/ProductVariant.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Product from "./product";

interface ProductVariantAttributes {
    id: number;
    product_id: number;
    size: string;
    color: string;
    price: number;
    stock_quantity: number;
    sku: string;
    image_url?: string; // URL to the image file
}

interface ProductVariantCreationAttributes extends Optional<ProductVariantAttributes, "id"> {}

class ProductVariant extends Model<ProductVariantAttributes, ProductVariantCreationAttributes> implements ProductVariantAttributes {
    public id!: number;
    public product_id!: number;
    public size!: string;
    public color!: string;
    public price!: number;
    public stock_quantity!: number;
    public sku!: string;
    public image_url?: string;
}

ProductVariant.init(
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
        size: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0 },
        },
        sku: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: true, // Optional image
        },
    },
    {
        sequelize,
        tableName: "product_variants",
        timestamps: false,
    }
);

export default ProductVariant;