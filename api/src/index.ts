import express, { Express, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
const app: Express = express();

const corsOptions: CorsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "i broke you hear" });
});
app.get("/1", (req: Request, res: Response) => {
  res.send("danda");
});
app.listen(4000, () => {
  console.log("app is listening on port 4000");
});
