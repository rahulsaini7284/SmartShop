import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export { Category, SubCategory };
