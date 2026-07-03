import express from "express";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import { register, login,getCurrentUser } from "../controllers/auth.controller.js";

import validate from "../middleware/validation.middleware.js";
import protect from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/me", protect, getCurrentUser);
export default router;
