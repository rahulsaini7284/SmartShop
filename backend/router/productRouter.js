import { admin, jwtProtect } from "../middleware/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getTopProducts,
  updateProduct,
  updateProductReview,
} from "../controller/productController.js";
import express from "express";
const ProductRouter = express.Router();
ProductRouter.get("/", getProducts);
ProductRouter.get("/admin/getProducts", jwtProtect, getProducts);
ProductRouter.get("/top", getTopProducts);
ProductRouter.get("/:id", getProduct);
ProductRouter.delete(
  "/admin/deleteProduct/:id",
  jwtProtect,
  admin,
  deleteProduct
);
ProductRouter.post("/admin/createProduct", jwtProtect, admin, createProduct);
ProductRouter.post("/:id/review", jwtProtect, updateProductReview);
ProductRouter.put("/admin/updateProduct/:id", jwtProtect, admin, updateProduct);
export default ProductRouter;
