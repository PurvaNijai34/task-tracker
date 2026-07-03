import api from "./axios";

export const createTask = async (payload) => {
  const response = await api.post("/tasks", payload);
  return response.data.data;
};

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data.data;
};

export const getTaskById = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data.data;
};

export const updateTask = async (taskId, payload) => {
  const response = await api.put(`/tasks/${taskId}`, payload);
  return response.data.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data.data;
};
