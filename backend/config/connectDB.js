import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected Successfully`.cyan.underline.bold);
  } catch (error) {
    console.error(`ERROR- ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};
export default connectDB;
