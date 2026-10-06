import bcrypt from "bcrypt";
import Student from "../models/student.js";
import { createError } from "../utils/createError.js";
import { signToken } from "../utils/token.js";

const SALT_ROUNDS = 10;
const INVALID_CREDENTIALS = "Invalid username or password";


const DUMMY_HASH = bcrypt.hashSync("dummy_password", SALT_ROUNDS);

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

export const loginStudent = async ({ username, password }) => {
    const student = await Student.findOne({ username }).select("+password");

    const hashToCompare = student ? student.password : DUMMY_HASH;
    const isMatch = await bcrypt.compare(password, hashToCompare);


    if (!student || !isMatch) {
        throw createError(401, INVALID_CREDENTIALS);
    }

    return {
        token: signToken(student),
        student: {
            id: student._id,
            username: student.username,
            role: student.role,
        },
    };
};