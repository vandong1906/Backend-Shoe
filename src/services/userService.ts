import User from "../model/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import {checkemail} from "../utils/checkemail";


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
        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || "",
            { expiresIn: "5m" } 
        );
    
        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_REFRESH_SECRET || "",
            { expiresIn: "7d" } 
        );
        return { accessToken,refreshToken, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
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
    googleLoginOrRegister: async (email: string, uid: string) => {
        if (!email) {
            throw new Error("Email is required");
        }

        // Kiểm tra xem user đã tồn tại với email này chưa
        let user = await User.findOne({ where: { email } });

        if (!user) {

            user = await User.create({
                email,
                password: await bcrypt.hash(uid, 10),
                name: email.split('@')[0],
                role: "user",

            });
        }
        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || "",
            { expiresIn: "5m" }
        );

        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_REFRESH_SECRET || "",
            { expiresIn: "7d" }
        );

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name
            }
        };
    }
};

export default userService;