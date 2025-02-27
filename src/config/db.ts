import  dotenv from "dotenv";
import {Sequelize} from "sequelize";
dotenv.config({ path: './src/.env' });
const db = {
    host: process.env.DB_HOST || "localhost1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
};
const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: 'mysql'
});
export default sequelize;