import express from "express";
import { admin, jwtProtect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDeliver,
  updateOrderToPade,
} from "../controller/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/", jwtProtect, addOrderItems);
orderRouter.get("/myOrders", jwtProtect, getMyOrders);
orderRouter.get("/:id", jwtProtect, getOrderById);
orderRouter.put("/:id/pay", jwtProtect, updateOrderToPade);
orderRouter.put("/:id/deliver", jwtProtect, admin, updateOrderToDeliver);
orderRouter.get("/", jwtProtect, getOrders);

export default orderRouter;
