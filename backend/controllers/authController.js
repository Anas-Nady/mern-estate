import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const isUserExists = await User.findOne({ email });

  if (!isUserExists) return next(new AppError("Your email not found.", 404));

  const isPasswordCorrect = await bcrypt.compare(
    password,
    isUserExists.password
  );

  if (!isPasswordCorrect)
    return next(new AppError("Your enter password incorrect.", 400));

  isUserExists.password = undefined;

  const token = jwt.sign({ id: isUserExists._id }, process.env.JWT_SECRET);
  res.cookie("access_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 60 * 60 * 1000),
  });

  createSendToken(isUserExists, 200, res);
});

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
