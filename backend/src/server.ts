import express from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import helmetSetup from "./middlewares/helmetSetup";
import rateLimiter from "./middlewares/rateLimiter";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import clientRoutes from "./routes/client";
import cloudinary from "./services/cloudinary";
import username from "./services/generateUsername";
import "./config/firebase"; // Initialize Firebase Admin SDK
import "./config/prisma"; // Initialize Prisma Client
dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 5000;

helmetSetup(app);
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(rateLimiter);

app.use("/api", authRoutes);
app.use("/api", username);
app.use("/api", cloudinary);
app.use("/api", userRoutes);
app.use("/api",clientRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Akasham API!");});
app.use(errorHandler);
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
