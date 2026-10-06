import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string()
        .trim()
        .lowercase()
        .min(3)
        .max(30)
        .pattern(/^[a-z0-9_]+$/)
        .required()
        .messages({
            "string.pattern.base":
                "Username can only contain letters, numbers and underscores",
        }),
    password: Joi.string()
        .min(8)
        .max(72, "utf8")
        .required()
        .messages({
            "string.max": "Password must be at most 72 bytes",
        }),
}).required();
export const loginSchema = Joi.object({
    username: Joi.string().trim().lowercase().required(),
    password: Joi.string().required(),
}).required();