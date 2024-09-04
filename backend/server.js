import express, { urlencoded } from 'express';
import dotenv  from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;
//Middlewares (a function that runs between request and response)
app.use(express.json()); //it allows u to pars(convert) incoming data from request into json formate
app.use(express.urlencoded({ extended: true}));//express.urlencoded allows u to pars(convert) form data into req.body
                                                //if true even if request body has some nested objects u can pars and vice versa
app.use(cookieParser());//help to get the cookie from request and set the cookie inside response

//Routes
app.use("/api/users",userRoutes)
app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`));