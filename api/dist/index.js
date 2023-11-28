import express from "express";
import cors from "cors";
const app = express();
const corsOptions = {
    origin: "*",
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
    res.json({ message: "i broke you hear" });
});
app.get("/1", (req, res) => {
    res.send("danda");
});
app.listen(4000, () => {
    console.log("app is listening on port 4000");
});
//# sourceMappingURL=index.js.map