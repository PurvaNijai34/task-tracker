import express from "express";

import {
  createTaskController,
getAllTasksController,
getTaskController,
updateTaskController,
deleteTaskController
} from "../controllers/task.controller.js";

import {
  createTaskValidator,
  updateTaskValidator,
} from "../validators/task.validator.js";

import validate from "../middleware/validation.middleware.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();


router.use(protect);


router.post("/", createTaskValidator, validate, createTaskController);


router.get("/", getAllTasksController);


router.get("/:id", getTaskController);


router.put("/:id", updateTaskValidator, validate, updateTaskController);


router.delete("/:id", deleteTaskController);

export default router;