import Product from "../model/productModel.js";
import Order from "../model/orderModel.js";
import asyncHandler from "express-async-handler";

//@desc    Fetch all Products
//@Route   GET/api/produts
//@access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.count({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res
    .status(200)
    .json({ products, page, pageSize, pages: Math.ceil(count / pageSize) });
});

//@desc    Fetch single Product
//@Route   GET/api/product/:id
//@access  Public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});
//@desc    Delete Product By Admin
//@Route   GET/api/product/admin/deleteProduct/:id
//@access  Private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    res.status(200).json({ message: "Product Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});
//@desc    Create Product By Admin
//@Route   POST/api/product/admin/createProduct
//@access  Private/admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, brand, image, description, price, countInStock, category } =
    req.body;
  const product = new Product({
    user: req.person._id,
    name,
    brand,
    image,
    description,
    price,
    countInStock,
    category,
  });
  await product.save();
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(404);
    throw new Error("Product not Created");
  }
});

//@desc    Update Product By Admin
//@Route   PUT/api/product/admin/updateProduct/:id
//@access  Private/admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, brand, image, description, price, countInStock, category } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    (product.name = name),
      (product.brand = brand),
      (product.image = image),
      (product.description = description),
      (product.price = price),
      (product.countInStock = countInStock),
      (product.category = category);

    const updateProduct = await product.save();
    if (updateProduct) {
      res.status(200).json(updateProduct);
    }
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@desc    Add review by User
//@Route   PUT/api/products/:id/review
//@access  Private
export const updateProductReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  let isOrdered;
  const PRODUCT = await Product.findById(req.params.id);
  const orders = await Order.find({ user: req.person._id });

  if (orders && PRODUCT) {
    isOrdered = orders.map((o) =>
      o.orderItems.find(
        (so) => so.product.toString() === PRODUCT._id.toString()
      )
    );
    if (isOrdered[0]) {
      const alreadyReviewed = PRODUCT.reviews.find(
        (e) => e.user.toString() === req.person._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product Already Reviewed");
      }
      
      const review = {
        name: req.person.name,
        rating: Number(rating),
        comment,
        user: req.person._id,
      };
      PRODUCT.reviews.push(review);
      PRODUCT.numReviews = PRODUCT.reviews.length;
      PRODUCT.rating =
        PRODUCT.reviews.reduce((acc, item) => item.rating + acc, 0) /
        PRODUCT.reviews.length;

      const updateProduct = await PRODUCT.save();
      if (updateProduct) {
        res.status(200).json({ updateProduct, message: "Review Added" });
      }
    } else {
      res.status(400);
      throw new Error(
        "Sorry! You are not allowed to review this product since you haven't bought it on SmartShop."
      );
    }
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
});
//@desc    Get Top rated Products
//@Route   GET/api/produts/top
//@access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.status(200).json(products);
});
