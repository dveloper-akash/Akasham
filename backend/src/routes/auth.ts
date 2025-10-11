import { Router } from "express";
import { userAuth } from "../controllers/authController";
import  verifyToken  from "../middlewares/verifyToken";
import { wrapAsync } from "../utils/wrapAsync";

const router = Router();
router.post("/auth/user", wrapAsync(verifyToken), wrapAsync(userAuth));
export default router;
