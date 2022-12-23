import { register_users, login_users } from "../controllers/authControllers.js";
import express from "express";
import { checkUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", checkUser);
router.post("/register", register_users);
router.post("/login", login_users);

export default router;
