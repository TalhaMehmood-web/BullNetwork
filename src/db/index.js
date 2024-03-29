import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
// DB Connection function 
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        if (connectionInstance) {
            console.log("Database Connected");
        }
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}
export default connectDB;