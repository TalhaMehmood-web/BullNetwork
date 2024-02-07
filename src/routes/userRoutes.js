import express from "express";
import { signUpUser, loginUser, user } from "../controllers/userControllers.js";
// import verifyJWT from "../middleware/authMiddleware.js";
const router = express.Router()
router.post("/sign-up", signUpUser)
router.post('/login', loginUser)
router.get("/user/:userId", user)


export default router;