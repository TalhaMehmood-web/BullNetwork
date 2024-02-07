// import files and decencies
import mongoose from "mongoose";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"
import ApiError from "../utils/APIError.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
// JWT Token Generator Function
let createToken = (_id, username, email, phoneNumber) => {
    const payload = {
        _id,
        username,
        email,
        phoneNumber
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
};
//------------------------------------
// Sign up user API controller
export const signUpUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, phoneNumber, password, confirmPassword } = req.body;
        if (!username || !email || !phoneNumber || !password || !confirmPassword) {
            throw new ApiError(400, "All fields are required!!")
        }
        if (password !== confirmPassword) {
            throw new ApiError(400, "Password not matched!!")
        }
        if (!validator.isEmail(email)) {
            throw new ApiError(400, "Email is not in valid format!!")
        }
        const existedUser = await User.findOne({      // user validation 
            $or: [{ phoneNumber }, { email }]
        });
        if (existedUser) {
            throw new ApiError(409, "User with email or phone number already exists")
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // password hashing 
        const user = await User.create({
            username,
            email,
            phoneNumber,
            password: hashedPassword
        })
        await user.save()
        const createdUser = await User.findById(user._id).select("-password -__v -createdAt -updatedAt");
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registration")
        }
        const token = createToken(createdUser._id, createdUser.username, createdUser.email, createdUser.phoneNumber)
        return res.status(201).json(new ApiResponse(200, createdUser, "User Registered Successfully", token))
    } catch (error) {
        throw new ApiError(500, error?.message)
    }
})
// -----------------------------------
// login user Api Controller 
export const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(409, "All fields are required!!")
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw new ApiError(404, "User Not Found with this email!")
        }
        const matchPassword = await bcrypt.compare(password, user.password); // matching hashed password
        if (!matchPassword) {
            throw new ApiError(400, "Incorrect Password")
        }
        const token = createToken(user._id, user.username, user.email, user.phoneNumber) // assigning token 
        return res.status(201).json(new ApiResponse(200, user, "User LoggedIn Successfully", token))
    } catch (error) {
        throw new ApiError(500, error?.message)
    }
})
export const user = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "user not found")
        }
        return res.status(200).json(new ApiResponse(200, user))
    } catch (error) {
        throw new ApiError(500, error?.message)
    }
})