
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface SizeAttributes {
    id: number;
    size_value: number;
    size_system: string;
    description?: string;
}

interface SizeCreationAttributes extends Optional<SizeAttributes, "id"> {}

class Size extends Model<SizeAttributes, SizeCreationAttributes> implements SizeAttributes {
    public id!: number;
    public size_value!: number;
    public size_system!: string;
    public description?: string;
}

Size.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        size_value: {
            type: DataTypes.DECIMAL(4, 1), // Hỗ trợ số thập phân như 38.5
            allowNull: false,
            validate: { min: 0 }, // Đảm bảo kích thước không âm
        },
        size_system: {
            type: DataTypes.STRING(10), // EU, US, UK, v.v.
            allowNull: false,
            validate: {
                isIn: [["EU", "US", "UK", "JP"]], // Giới hạn các hệ thống kích thước
            },
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true, // Mô tả tùy chọn
        },
    },
    {
        sequelize,
        tableName: "shoe_sizes",
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["size_value", "size_system"], // Đảm bảo không trùng size trong cùng hệ thống
            },
        ],
    }
);

export default Size;