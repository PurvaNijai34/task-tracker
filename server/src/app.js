import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";

import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(
  cors({
     origin:  process.env.CLIENT_URL|| "http://localhost:5173",
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


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