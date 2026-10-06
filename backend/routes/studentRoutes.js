import { Router } from "express";
import { register } from "../controllers/studentController.js";

const router = Router();

router.post("/register", register);

export default router;