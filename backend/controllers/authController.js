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

  const emailIsExists = await User.findOne({ email });
  const usernameIsExists = await User.findOne({ username });

  if (emailIsExists && usernameIsExists) {
    return next(
      new AppError("Your enter email and username is already exists.", 400)
    );
  }

  if (emailIsExists)
    return next(new AppError("Your enter email is already exists.", 400));

  if (usernameIsExists)
    return next(new AppError("Your enter username is already exists.", 400));

  const newUser = await User.create({ username, email, password: hash });

  if (!newUser) {
    return next(new AppError("invalid data input.!", 500));
  }
  res.status(201).json({ newUser, message: "User Created successfully." });
});
