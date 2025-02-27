// models/OrderItem.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Order from "./order";
import ProductVariant from "./productVariant";

interface OrderItemAttributes {
    id: number;
    order_id: number;
    variant_id?: number;
    quantity: number;
    price_at_purchase: number;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, "id"> {}

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
    public id!: number;
    public order_id!: number;
    public variant_id?: number;
    public quantity!: number;
    public price_at_purchase!: number;
}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Order, key: "id" },
        },
        variant_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: ProductVariant, key: "id" },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1 },
        },
        price_at_purchase: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "order_items",
        timestamps: false,
    }
);

export default OrderItem;