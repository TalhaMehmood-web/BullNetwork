import User from "../models/userModel.js";
import ApiError from "../utils/APIError.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";



const verifyJWT = asyncHandler(async (req, res, next) => {
    let token;

    let authToken = req.headers.authorization || req.headers.Authorization
    if (!authToken) {

        return next();
    }
    try {
        token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded._id).select("-password");

        next();

    } catch (error) {
        throw new ApiError(400, error?.message)
    }
    if (!token) {
        throw new ApiError(400, "User Not Authorized")
    }
})

export default verifyJWT;