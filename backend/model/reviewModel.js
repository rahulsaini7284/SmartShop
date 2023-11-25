import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: { type: String, require: true },
    comment: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default reviewSchema;
