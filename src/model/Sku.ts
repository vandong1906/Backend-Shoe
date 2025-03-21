// models/SKU.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface SKUAttributes {
    id: number;
    code: string;
}

interface SKUCreationAttributes extends Optional<SKUAttributes, "id"> {}

class SKU extends Model<SKUAttributes, SKUCreationAttributes> implements SKUAttributes {
    public id!: number;
    public code!: string;
}

SKU.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "skus",
        timestamps: false,
    }
);

export default SKU;