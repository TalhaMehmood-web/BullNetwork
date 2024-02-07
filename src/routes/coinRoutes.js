import express from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import { updateCoins } from "../controllers/coinControllers.js";
const router = express.Router();

router.put("/update-coins/:userId", verifyJWT, updateCoins);
export default router;