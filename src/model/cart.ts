import {DataTypes, Model, Optional, Options} from "sequelize";
import sequelize from "../config/db";

interface CartAttributes {
    id: number;
    name: string;
    price: number;

}

interface  CartCreateAttributes extends Optional<CartAttributes,"id"> {}

class Cart extends Model<CartAttributes,CartCreateAttributes> implements CartAttributes {
    id!: number;
    name!: string;
    price!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Cart.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    sequelize,
    tableName: "Cart",
    timestamps: false,
})