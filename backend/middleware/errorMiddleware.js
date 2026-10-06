import { sendError } from "../utils/response.js";

export const notFound = (req, res) => {
    return sendError(res, 404, "Route not found");
};

// Express identifies error handlers by the 4 arguments. Do not remove "next".
export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.type === "entity.parse.failed") {
        return sendError(res, 400, "Invalid JSON body");
    }

    if (err.type === "entity.too.large") {
        return sendError(res, 413, "Request body too large");
    }

    console.error(err);
    return sendError(res, 500, "Internal server error");
};