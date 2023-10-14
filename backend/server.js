import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/api/auth", authRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
