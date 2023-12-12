import express, { Express, NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import authRoutes from "./routes/authRoutes.js";
const app: Express = express();

const corsOptions: CorsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.use("/auth", authRoutes);

app.listen(4000, () => {
  console.log("app is listening on port 4000");
});
