import Task from "../models/Task.js";
import ApiError from "../utils/ApiError.js";

export const createTask = async ({
  title,
  description,
  status,
  dueDate,
  userId,
}) => {
  const task = await Task.create({
    title,
    description,
    status,
    dueDate,
    user: userId,
  });

  return task;
};

export const getAllTasks = async (userId) => {
  return await Task.find({ user: userId }).sort({
    createdAt: -1,
  });
};

export const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({
    _id: taskId,
    user: userId,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};

export const updateTask = async (taskId, userId, updateData) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
      user: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};

export const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};
