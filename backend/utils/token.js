import jwt from "jsonwebtoken";
import { createError } from "./createError.js";

// Rule 8: always an expiry, payload is id and role only.
export const signToken = (student) => {
    return jwt.sign(
        { id: student._id.toString(), role: student.role },
        process.env.JWT_SECRET,
        {
            algorithm: "HS256",
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
    );
};

export const verifyToken = (token) => {
    let payload;

    try {
        payload = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"],
        });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw createError(401, "Token expired");
        }
        throw createError(401, "Invalid token");
    }

    // Rule 8 enforced on the way in: reject tokens that never expire.
    if (!payload.exp || !payload.id) {
        throw createError(401, "Invalid token");
    }

    return payload;
};