import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "./../models/userModel.js";
import createSendToken from "../utils/createSendToken.js";
import AppError from "../utils/appError.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new AppError("All data are required.", 500));
  }

  const hash = await bcrypt.hash(password, 10);

  const existsCheck = await User.findOne({ $or: [{ username }, { email }] });

  if (existsCheck) {
    return next(new AppError("Your enter data is already exists.", 400));
  }

  const newUser = await User.create({ username, email, password: hash });

  if (!newUser) {
    return next(new AppError("invalid data input.!", 500));
  }
  createSendToken(newUser, 201, res);
});
