import User from "./../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const newUser = await User.create({ username, email, password: hash });

  res.status(201).json({ newUser, message: "User Created successfully." });
});
