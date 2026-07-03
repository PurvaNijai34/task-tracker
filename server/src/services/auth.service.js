import bcrypt from "bcryptjs";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword } from "../utils/password.util.js";

export const registerUser = async ({ name, email, password }) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  
  const hashedPassword = await hashPassword(password);

 
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  
   return user;

};


export const loginUser = async ({ email, password }) => {
  
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

 
  const isPasswordMatched = await hashPassword(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid email or password");
  }

  return user;
};
