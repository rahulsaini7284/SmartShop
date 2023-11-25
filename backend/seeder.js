import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/productModel.js";
import User from "./model/userModel.js";
import { Category, SubCategory } from "./model/categoryModel.js";
import { products, category, subCategory } from "./data/products.js";
import users from "./data/users.js";
import colors from "colors";
import connectDB from "./config/connectDB.js";

connectDB();

const insertData = async () => {
  try {
    const createdCategory = await Category.insertMany(category);

    const SubCate = subCategory.map((s) => {
      return { ...s, category: createdCategory[0]._id };
    });

    await SubCategory.insertMany(SubCate);

    const createdUser = await User.insertMany(users);

    const PRODUCTS = products.map((p) => {
      return { ...p, user: createdUser[0]._id };
    });

    await Product.insertMany(PRODUCTS);
    console.log("Data Imported!".green.inverse);
    process.exit(1);
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
  }
};

const destroyData = async () => {
  try {
    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit(1);
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  insertData();
}
