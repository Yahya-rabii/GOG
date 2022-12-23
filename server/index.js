import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
const app = express();
app.use(express.json({ limit: "30mb", extended: true })); // limit: '30mb' is the default
app.use(express.json());

app.use(cors()); // This is a middleware that allows us to make requests to our API from different origins

app.use("/posts", postRoutes); // This is the middleware that allows us to use the postRoutes in our application



const CONNECTION_URL =
  "mongodb+srv://yahya_rb:Yahyarb11102001@gog-clus.4jd9swy.mongodb.net/test"; // This is the connection string to our database
const PORT = process.env.PORT || 5000; // This is the port our server will run on

mongoose
  .connect(CONNECTION_URL) // This is the method that connects our Express application to our MongoDB database
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port: ${PORT} and database is connected`)
    )
  ) // This is the method that starts our server
  .catch((error) => console.log(error.message)); // This is the method that logs any errors to the console

app.use(cookieParser());
mongoose.set("strictQuery", true);
app.use("/", authRoutes);
