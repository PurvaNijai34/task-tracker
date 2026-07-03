import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/task.service.js";

export const createTaskController = asyncHandler(async (req, res) => {
  const task = await createTask({
    ...req.body,
    userId: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Task created successfully", task));
});

export const getAllTasksController = asyncHandler(async (req, res) => {
  const tasks = await getAllTasks(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Tasks fetched successfully", tasks));
});

export const getTaskController = asyncHandler(async (req, res) => {
  const task = await getTaskById(req.params.id, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Task fetched successfully", task));
});

export const updateTaskController = asyncHandler(async (req, res) => {
  const task = await updateTask(req.params.id, req.user._id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "Task updated successfully", task));
});

export const deleteTaskController = asyncHandler(async (req, res) => {
  await deleteTask(req.params.id, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Task deleted successfully"));
});
