import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { logger } from "./midlleware/logger.js";
import { errorHandler } from "./midlleware/ErrorHandler.js";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/CorsOptions.js";
import { verifyJWT } from "./midlleware/TokenVerifier.js";
const app = express();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});
app.use("/auth", authRoutes);
app.get("/testlog", verifyJWT, (req, res) => {
    console.log("request made");
    res.send("done...");
});
app.use(errorHandler);
app.listen(4000, () => {
    console.log("app is listening on port 4000");
});
//# sourceMappingURL=index.js.map