import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { genrateToken } from "../utils/genrateToken.js";

//@desc    auth User & get Token
//@Route   POST/api/users/login
//@access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // const passwordMatchResult = await bcrypt
  //   .compare(password, user.password)
  //   .then((res) => res)
  //   .catch((er) => er.message);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genrateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid Email or Password");
  }
});

//@desc    Login User Profile
//@Route   POST/api/users/login
//@access  Private

export const getUserProfile = (req, res) => {
  const user = req.person;

  if (user) {
    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
};

//@desc    Update User Profile
//@Route   POST/api/users/profile
//@access  Private

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.person._id);
  if (user) {
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    if (req.body.password) {
      const pass = await bcrypt.hash(req.body.password, 10);
      user.password = pass || user.password;
    }
    const updatedUser = await user.save();
    res.status(200).send({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genrateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@desc    Register a New User
//@Route   POST/api/users
//@access  Public

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const pass = await bcrypt.hash(password, 10);
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  const user = await User.create({ name, email, password: pass });
  if (user) {
    res.status(201).send({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genrateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@desc    Get users List By Admin
//@Route   GET/api/users
//@access  Private/admin

export const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.find().count();
  const users = await User.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res
    .status(200)
    .send({ users, count, page, pages: Math.ceil(count / pageSize) });
});

//@desc   Delete a User By Admin
//@Route   DELETE/api/users/:id
//@access  Private/admin

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user) {
    res.status(200).send({ message: "User Deleted Successfully" });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@desc    Get User by id By Admin
//@Route   GET/api/users/:id
//@access  Private/admin

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@desc    Update User by Admin
//@Route   PUT/api/users/:id
//@access  Private/admin

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.status(200).send({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
