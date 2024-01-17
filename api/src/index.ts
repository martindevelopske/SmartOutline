import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import { logger } from "./midlleware/logger.js";
import { errorHandler } from "./midlleware/ErrorHandler.js";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/CorsOptions.js";
import { verifyJWT } from "./midlleware/TokenVerifier.js";
const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use(logger);
app.use(cors(corsOptions));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.use("/auth", authRoutes);
app.use("/outline", courseRoutes);
app.get("/testlog", verifyJWT, (req, res) => {
  res.send("done...");
});
app.use(errorHandler);
app.listen(4000, () => {
  console.log("app is listening on port 4000");
});
