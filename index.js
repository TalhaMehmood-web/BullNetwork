//importing dependencies and Files;
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes.js";
import connectDB from "./src/db/index.js";
//----------------------------------------
//app configuration
dotenv.config();
const app = express();
app.use(bodyParser.json());
//----------------------------------------
//Routes
app.use("/api/v1/user", userRouter)
//----------------------------------------
//DB connection and Running Server
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })