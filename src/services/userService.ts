import User from "../model/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import {checkemail} from "../utils/checkemail";
import * as process from "node:process";
const userService = {
    register: async (userData: { email: string; password: string; name?: string }) => {
        const flag =checkemail(userData.email);
        if(flag) {
            const existingUser = await User.findOne({ where: { email: userData.email } });
            if (existingUser) throw new Error("User already exists");

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = await User.create({ ...userData, password: hashedPassword, role: "user" });
            return user;
        }
        else
        {
            throw new Error("Email not valid or Email already exists");
        }

    },

    login: async (credentials: { email: string; password: string }) => {
        const user = await User.findOne({ where: { email: credentials.email } });
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            throw new Error("Invalid credentials");
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "", {
            expiresIn: "1h",
        });
        return { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
    },

    getProfile: async (userId: number) => {
        const user = await User.findByPk(userId, { attributes: { exclude: ["password"] } });
        if (!user) throw new Error("User not found");
        return user;
    },

    updateProfile: async (userId: number, updates: { name?: string; password?: string }) => {
        const user = await User.findByPk(userId);
        if (!user) throw new Error("User not found");

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        await user.update(updates);
        return user;
    },
};

export default userService;