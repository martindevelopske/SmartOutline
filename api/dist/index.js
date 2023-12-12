import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
const app = express();
const corsOptions = {
    origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});
app.use("/auth", authRoutes);
app.listen(4000, () => {
    console.log("app is listening on port 4000");
});
//# sourceMappingURL=index.js.map