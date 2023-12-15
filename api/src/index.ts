import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { logger } from "./midlleware/logger.js";
import { errorHandler } from "./midlleware/ErrorHandler.js";
import cookieParser from "cookie-parser";
import { allowedOrigins } from "./config/AllowedOrigins.js";
import { corsOptions } from "./config/CorsOptions.js";
const app: Express = express();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.use("/auth", authRoutes);
app.get("/testlog", (req, res) => {
  console.log("request made");
});
app.use(errorHandler);
app.listen(4000, () => {
  console.log("app is listening on port 4000");
});
