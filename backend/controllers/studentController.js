import { registerSchema } from "../validators/studentvalidator.js";
import { registerStudent } from "../services/studentService.js";
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