import express from "express";
import errorHandler from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cookieParser from "cookie-parser";
const app = express();

// Middlewares
app.use(express.json());

app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Tracker API is running..."
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


app.use(errorHandler);
export default app;