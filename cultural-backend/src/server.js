import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import { authrouter } from "./routes/authRoutes.js";
import heritageRouter from "./routes/heritageRoutes.js";
import TimelineRouter from "./routes/TimelineRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import uploadRoute from "./routes/uploadRoutes.js";
import QrRouter from "./routes/qrcodeRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: "https://cultural-website-nine.vercel.app",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.use("/api/auth", authrouter);
app.use("/api/heritage", heritageRouter);
app.use("/api/timeline", TimelineRouter);
app.use("/api/stories", storyRouter);
app.use("/api/upload", uploadRoute);
app.use("/api/qrcode", QrRouter);
app.use("/api/admin", adminRouter);
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
