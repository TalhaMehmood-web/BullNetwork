import express from "express";
import { signUpUser, loginUser } from "../controllers/userControllers.js";
const router = express.Router()
router.post("/sign-up", signUpUser)
router.post('/login', loginUser)

export default router;