import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    coins: {
        type: Number,
        default: 0,
    },
    start: {
        type: Boolean,
        default: true
    }


}, { timestamps: true })
const User = mongoose.model("User", userSchema)
export default User;