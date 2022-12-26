import {register_users,login_users,checkUser,} from "../controllers/authControllers.js";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware(false), checkUser);
router.post("/register", register_users);
router.post("/login", login_users);

export default router;
