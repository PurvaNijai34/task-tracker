import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/task.controller.js";

import {
  createTaskValidator,
  updateTaskValidator,
} from "../validators/task.validator.js";

import validate from "../middleware/validation.middleware.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();


router.use(protect);


router.post("/", createTaskValidator, validate, create);


router.get("/", getAll);


router.get("/:id", getOne);


router.put("/:id", updateTaskValidator, validate, update);


router.delete("/:id", remove);

export default router;