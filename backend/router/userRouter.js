import {
  authUser,
  deleteUser,
  getUserProfile,
  getUsers,
  registerUser,
  getUser,
  updateUserProfile,
  updateUser,
} from "../controller/userController.js";
import express from "express";
import { admin, jwtProtect } from "../middleware/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/login", authUser);
userRouter.get("/profile", jwtProtect, getUserProfile);
userRouter.delete("/admin/:id", jwtProtect, admin, deleteUser);
userRouter.put("/updateProfile", jwtProtect, updateUserProfile);
userRouter
  .post("/", registerUser)
  .get("/admin/users", jwtProtect, admin, getUsers);
userRouter
  .put("/admin/:id", jwtProtect, admin, updateUser)
  .get("/admin/:id", jwtProtect, admin, getUser);

export default userRouter;
