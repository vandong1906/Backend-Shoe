// models/Color.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ColorAttributes {
    id: number;
    name: string;
}

interface ColorCreationAttributes extends Optional<ColorAttributes, "id"> {}

class Color extends Model<ColorAttributes, ColorCreationAttributes> implements ColorAttributes {
    public id!: number;
    public name!: string;
}

Color.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "colors",
        timestamps: false,
    }
);

export default Color;