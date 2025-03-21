// models/ProductVariant.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Product from "./product";
import Color from "./Color";
import SKU from "./Sku";
import size from './size'
interface ProductVariantAttributes {
    id: number;
    product_id: number;
    size_id: string;
    color_id: number;
    sku_id: number;
    price: number;
    stock_quantity: number;
    image_url?: string;
}

interface ProductVariantCreationAttributes extends Optional<ProductVariantAttributes, "id"> {}

class ProductVariant extends Model<ProductVariantAttributes, ProductVariantCreationAttributes> implements ProductVariantAttributes {
    public id!: number;
    public product_id!: number;
    public size_id!: string;
    public color_id!: number;
    public sku_id!: number;
    public price!: number;
    public stock_quantity!: number;
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
        size_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: size, key: "id" },
        },
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Color, key: "id" },
        },
        sku_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: SKU, key: "id" },
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
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "product_variants",
        timestamps: false,
    }
);

// Thiết lập quan hệ
ProductVariant.belongsTo(Product, { foreignKey: "product_id" });
ProductVariant.belongsTo(Color, { foreignKey: "color_id" });
ProductVariant.belongsTo(SKU, { foreignKey: "sku_id" });
ProductVariant.belongsTo(size, { foreignKey: "size_id" });

export default ProductVariant;