import { registerSchema, loginSchema } from "../validators/studentvalidator.js";
import { registerStudent, loginStudent } from "../services/studentService.js";
import { sendSuccess, sendError, handleError } from "../utils/response.js";

export const register = async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
        return sendError(res, 400, error.details[0].message);
    }

    try {
        const student = await registerStudent(value);
        return sendSuccess(res, 201, "Student registered successfully", student);
    } catch (err) {
        return handleError(res, err);
    }
};

export const login = async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        return sendError(res, 400, error.details[0].message);
    }

    try {
        const result = await loginStudent(value);
        return sendSuccess(res, 200, "Login successful", result);
    } catch (err) {
        return handleError(res, err);
    }
};

export const getMe = (req, res) => {
    return sendSuccess(res, 200, "Current student fetched", req.user);
};