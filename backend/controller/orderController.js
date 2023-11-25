import Order from "../model/orderModel.js";
import Product from '../model/productModel.js'
import asyncHandler from "express-async-handler";

//@desc    Add Order Items
//@Route   POST/api/orders
//@access  Private

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingPrice,
    taxPrice,
    totalPrice,
    shippingAddress,
    paymentMethod,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems,
      shippingPrice,
      user: req.person._id,
      taxPrice,
      totalPrice,
      shippingAddress: {
        ...shippingAddress,
        mobile1: shippingAddress.mobileNumber,
        mobile2: shippingAddress.alternateNumber,
      },
      paymentMethod,
    });
    const orderedItems = await order.save();
    if (orderedItems) {
      for (let i = 0; i < orderItems.length; i++) {
        const product=await Product.findById(orderItems[i].product);
        product.countInStock=product.countInStock-orderItems[i].qty;
        await product.save();
       }
      res.status(201).send(orderedItems);
    }
  }
 
});

//@desc    Get Order
//@Route   GET/api/orders/:id
//@access  Private

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).send(order);
  } else {
    res.status(400);
    throw new Error("Order Not Found");
  }
});

//@desc    Get All Order
//@Route   GET/api/orders
//@access  Private/admin

export const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Order.find().populate("user", "_id name email").count();
  const orders = await Order.find()
    .populate("user", "_id name email")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (orders) {
    res
      .status(200)
      .send({ orders, page, pages: Math.ceil(count / pageSize), count });
  } else {
    res.status(400);
    throw new Error("Orders Not Found");
  }
});

//@desc    Update Order Pay
//@Route   PUT/api/orders/:id/pay
//@access  Private

export const updateOrderToPade = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const savedOrder = await order.save();

    res.status(200).send(savedOrder);
  } else {
    res.status(400);
    throw new Error("Orders Not Found");
  }
});

//@desc    Update Order Deliver
//@Route   PUT/api/orders/:id/deliver
//@access  Private/admin

export const updateOrderToDeliver = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const savedOrder = await order.save();

    res.status(200).send(savedOrder);
  } else {
    res.status(400);
    throw new Error("Orders Not Found");
  }
});

//@desc    Get My Orders
//@Route   GET/api/orders/myOrder
//@access  Private

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.person._id });
  if (orders) {
    res.status(200).send(orders);
  } else {
    res.status(400);
    throw new Error("Orders List Is Empty");
  }
});
