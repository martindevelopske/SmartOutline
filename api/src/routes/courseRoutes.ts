import express, { Router } from "express";
import {
  createCousrseOutline,
  getCourseOutline,
} from "../controllers/courseControllers.js";
import { AI } from "../controllers/AIControllers.js";

const router: Router = express.Router();

router.post("/new", createCousrseOutline);
router.get("/AI", AI);
router.get("/:id", getCourseOutline);
export default router;
