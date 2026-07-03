import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  createTask,
  deleteTask as deleteTaskRequest,
  getTasks,
  updateTask as updateTaskRequest,
} from "../api/task.api";
import { TASK_FILTERS, TASK_SORT_OPTIONS, TASK_STATUS } from "../utils/constants";
import { getApiErrorMessage, getTaskId } from "../utils/helpers";

const sortTasks = (tasks, sortBy) => {
  const sorted = [...tasks];

  if (sortBy === TASK_SORT_OPTIONS.OLDEST) {
    return sorted.sort(
      (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
    );
  }

  if (sortBy === TASK_SORT_OPTIONS.DUE_DATE) {
    return sorted.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }

  return sorted.sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  );
};

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(TASK_FILTERS[0]);
  const [sortBy, setSortBy] = useState(TASK_SORT_OPTIONS.NEWEST);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      const message = getApiErrorMessage(err, "Unable to load tasks");
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (payload) => {
    setIsSubmitting(true);

    try {
      const task = await createTask(payload);
      setTasks((current) => [task, ...current]);
      toast.success("Task created successfully");
      return task;
    } catch (err) {
      const message = getApiErrorMessage(err, "Unable to create task");
      toast.error(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const editTask = useCallback(async (taskId, payload) => {
    setIsSubmitting(true);

    try {
      const updatedTask = await updateTaskRequest(taskId, payload);
      setTasks((current) =>
        current.map((task) =>
          getTaskId(task) === taskId ? { ...task, ...updatedTask } : task
        )
      );
      toast.success("Task updated successfully");
      return updatedTask;
    } catch (err) {
      const message = getApiErrorMessage(err, "Unable to update task");
      toast.error(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const removeTask = useCallback(async (taskId) => {
    setIsSubmitting(true);

    try {
      await deleteTaskRequest(taskId);
      setTasks((current) => current.filter((task) => getTaskId(task) !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      const message = getApiErrorMessage(err, "Unable to delete task");
      toast.error(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const filteredTasks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const visible = tasks.filter((task) => {
      const matchesSearch = task.title?.toLowerCase().includes(query);
      const matchesFilter = filter === TASK_FILTERS[0] || task.status === filter;
      return matchesSearch && matchesFilter;
    });

    return sortTasks(visible, sortBy);
  }, [filter, searchTerm, sortBy, tasks]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((task) => task.status === TASK_STATUS.PENDING).length,
      inProgress: tasks.filter((task) => task.status === TASK_STATUS.IN_PROGRESS)
        .length,
      completed: tasks.filter((task) => task.status === TASK_STATUS.COMPLETED)
        .length,
    }),
    [tasks]
  );

  return {
    tasks,
    filteredTasks,
    stats,
    isLoading,
    isSubmitting,
    error,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
  };
}
