import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateToken from "../utils/generateToken.js";
import cookieOptions from "../utils/cookieOptions.js";
import { loginUser } from "../services/auth.service.js";
import { registerUser } from "../services/auth.service.js";


export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerUser({
    name,
    email,
    password,
  });
  return res.status(201).json(
    new ApiResponse(
      201,
      "User registered successfully",
      user
    )
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser({
    email,
    password,
  });

  
  const token = generateToken({
    userId: user._id,
  });


  res.cookie("token", token, cookieOptions);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Login successful",
      {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    )
  );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      "Current user fetched successfully",
      req.user
    )
  );
});