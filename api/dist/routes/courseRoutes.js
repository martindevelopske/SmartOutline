import express from "express";
import { createCousrseOutline, getCourseOutline, } from "../controllers/courseControllers.js";
const router = express.Router();
router.post("/new", createCousrseOutline);
router.get("/:id", getCourseOutline);
export default router;
//# sourceMappingURL=courseRoutes.js.map