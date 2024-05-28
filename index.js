import express, { response } from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import { User } from "./module/user.js";
import dotenv from "dotenv"
dotenv.config();



import { MongoDBURL } from "./config.js";

const app = express();

app.use(express.json())

app.use("/users",router);
const PORT = process.env.PORT || 4000;
mongoose
    .connect(MongoDBURL)
    .then(()=>{
        console.log("App is connected to server");
        app.listen(PORT,()=>{
            console.log("the server is runing at 4000")
            })
    })
    .catch(error=>{
        console.log(error.message)
    })