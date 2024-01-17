import express from "express";
import { createCousrseOutline, getCourseOutline, } from "../controllers/courseControllers.js";
const router = express.Router();
router.post("/createCourseOutline", createCousrseOutline);
router.get("/getCourseOutline", getCourseOutline);
export default router;
//# sourceMappingURL=courseRoutes.js.map