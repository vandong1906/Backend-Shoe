// models/Brand.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface BrandAttributes {
    id: number;
    name: string;
    description?: string;
    logo_url?: string; // URL to brand logo stored in Cloudinary
    createdAt?: Date;
    updatedAt?: Date;
}
export interface BrandCreationAttributes extends Optional<BrandAttributes, "id" | "createdAt" | "updatedAt"> {}
class Brand extends Model<BrandAttributes, BrandCreationAttributes> implements BrandAttributes {
    public id!: number;
    public name!: string;
    public description?: string;
    public logo_url?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Brand.init(
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
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        logo_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "brands",
        timestamps: true,
    }
);

export default Brand;