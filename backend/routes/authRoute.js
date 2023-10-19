import express from "express";
import { logout, signIn, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/logout", logout);

export default router;
