//importing dependencies and Files;
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes.js";
import connectDB from "./src/db/index.js";
import coinRouter from "./src/routes/coinRoutes.js";
import cors from "cors";
//----------------------------------------
//app configuration
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
//----------------------------------------
//Routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/coin", coinRouter)
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