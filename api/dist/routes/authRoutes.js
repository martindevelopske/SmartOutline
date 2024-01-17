import express from "express";
import { getUsers, refresh, signin, signout, signup, } from "../controllers/authControllers.js";
import { loginLimiter } from "../midlleware/RateLimiter.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", loginLimiter, signin);
router.post("/refresh", refresh);
router.post("/logout", signout);
router.get("/getUsers", getUsers);
export default router;
//# sourceMappingURL=authRoutes.js.map