import express, { urlencoded } from 'express';
import dotenv  from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js"
import travelcompanyRoutes from "./routes/travelcompanyRoutes.js"
import postRoutes from "./routes/postRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js"
import tourRoutes from "./routes/tourRoutes.js"
import cors from 'cors';
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Middlewares (a function that runs between request and response)
app.use(express.json({ limit: '50mb' })); //it allows u to pars(convert) incoming data from request into json formate
app.use(express.urlencoded({ limit: '50mb', extended: true }));;//express.urlencoded allows u to pars(convert) form data into req.body
                                                //if true even if request body has some nested objects u can pars and vice versa
app.use(cookieParser());//help to get the cookie from request and set the cookie inside response
app.use(cors()); // Allow frontend to communicate with backend
//Routes
app.use("/api/users", userRoutes);
app.use("/api/travelcompany",travelcompanyRoutes)
app.use("/api/posts",postRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/tours', tourRoutes);
app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`));