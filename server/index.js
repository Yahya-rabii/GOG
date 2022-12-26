import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/posts.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors()); // This is a middleware that allows us to make requests to our API from different origins
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));// This is a middleware that allows us to parse JSON data from the body of HTTP requests

app.use("/api/posts", postRoutes); // This is the middleware that allows us to use the postRoutes in our application
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI) // This is the method that connects our Express application to our MongoDB database
  .then(() => app.listen(process.env.PORT || 5000, () => console.log(`Server running on port: ${process.env.PORT} and database is connected`)))
  .catch((error) => console.log(error.message)); // This is the method that logs any errors to the console
