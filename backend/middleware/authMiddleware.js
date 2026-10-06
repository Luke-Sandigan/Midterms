import { verifyToken } from "../utils/token.js";
import { getStudentById } from "../services/studentService.js";
import { sendError, handleError } from "../utils/response.js";

// Requires a valid "Authorization: Bearer <token>" header.
// Sets req.user = { id, username, role }.
export const protect = async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return sendError(res, 401, "Authentication required");
    }

    const token = header.slice(7).trim();

    if (!token) {
        return sendError(res, 401, "Authentication required");
    }

    try {
        const payload = verifyToken(token);
        req.user = await getStudentById(payload.id);
        return next();
    } catch (err) {
        return handleError(res, err);
    }
};

// Use AFTER protect. Example: router.post("/", protect, authorize("librarian"), handler)
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return sendError(res, 403, "You do not have permission to do this");
        }
        return next();
    };
};