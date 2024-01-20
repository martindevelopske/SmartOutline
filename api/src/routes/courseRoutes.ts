import express, { Router } from "express";
import {
  createCousrseOutline,
  getCourseOutline,
} from "../controllers/courseControllers.js";

const router: Router = express.Router();

router.post("/new", createCousrseOutline);
router.get("/:id", getCourseOutline);
export default router;
