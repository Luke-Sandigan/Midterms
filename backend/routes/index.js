import { Router } from "express";
import { sendSuccess } from "../utils/response.js";
import studentRoutes from "./studentRoutes.js";

const router = Router();

router.get("/health", (req, res) => {
    return sendSuccess(res, 200, "API is running");
});

router.use("/students", studentRoutes);



export default router;