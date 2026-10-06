import bcrypt from "bcrypt";
import Student from "../models/student.js";
import { createError } from "../utils/createError.js";

const SALT_ROUNDS = 10;

export const registerStudent = async ({ username, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    try {
        const student = await Student.create({
            username,
            password: hashedPassword,
        });

        return {
            id: student._id,
            username: student.username,
            role: student.role,
        };
    } catch (error) {
        if (error.code === 11000) {
            throw createError(409, "Username already taken");
        }
        throw error;
    }
};