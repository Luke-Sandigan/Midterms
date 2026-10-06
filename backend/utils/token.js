import jwt from "jsonwebtoken";


export const signToken = (student) => {
    return jwt.sign(
        { id: student._id.toString(), role: student.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );
};