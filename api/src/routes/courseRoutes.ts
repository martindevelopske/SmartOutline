import express, { Router } from "express";
import {
  createCousrseOutline,
  getCourseOutline,
} from "../controllers/courseControllers.js";

const router: Router = express.Router();

router.post("/createCourseOutline", createCousrseOutline);
router.get("/getCourseOutline", getCourseOutline);
export default router;
