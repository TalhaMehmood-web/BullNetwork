import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import ApiError from "../utils/APIError.js";

import ApiResponse from "../utils/ApiResponse.js";

export const updateCoins = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found!!");
        }

        if (!user.start) {
            // If start is false, user can't update coins
            throw new ApiError(400, "Cannot update coins. Please wait for 1 minute.");
        }

        // Increment coins by 90 and set start to false
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { coins: 90 }, start: false },
            { new: true }
        );

        // Schedule a task to set start back to true after 1 minute
        setTimeout(async () => {
            await User.findByIdAndUpdate(userId, { start: true });
        }, 1 * 60 * 1000);

        return res.status(200).json(new ApiResponse(200, updatedUser, "Coins updated. Wait for 1 minute to update again."));
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
});