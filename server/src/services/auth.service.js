import bcrypt from "bcryptjs";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword } from "../utils/password.util.js";

const registerUser = async ({ name, email, password }) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  
  const hashedPassword = hashPassword(password);

 
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  
  const createdUser = await User.findById(user._id).select("-password");

  return createdUser;
};

export { registerUser };