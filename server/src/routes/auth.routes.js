import express from "express";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import {
registerController,
loginController,
logoutController,
getCurrentUserController
} from "../controllers/auth.controller.js";

import validate from "../middleware/validation.middleware.js";
import protect from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerValidator, validate, registerController);
router.post("/login", loginValidator, validate, loginController);
router.get("/me", protect, getCurrentUserController);
router.post("/logout", protect, logoutController);

export default router;
