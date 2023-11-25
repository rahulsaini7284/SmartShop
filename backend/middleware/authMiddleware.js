import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

export const jwtProtect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.person = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Session has expired Please Login First");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

export const admin = (req, res, next) => {
  if (req.person && req.person.isAdmin) {
    next();
  } else {
    throw new Error("Not Authourized as An Admin");
  }
};
