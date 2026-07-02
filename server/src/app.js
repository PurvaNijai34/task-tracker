import express from "express";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

// Middlewares
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Tracker API is running..."
  });
});
app.use(errorHandler);
export default app;