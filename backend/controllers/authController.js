import User from "./../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import AppError from "../utils/appError.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new AppError("All data are required.", 400));
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hash });

  if (!newUser) {
    return next(new AppError("invalid data input.!", 400));
  }
  res.status(201).json({ newUser, message: "User Created successfully." });
});
