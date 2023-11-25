import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, require: true },
        qty: { type: Number, require: true },
        image: { type: String, require: true },
        price: { type: Number, require: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, require: true },
      country: { type: String, require: true },
      state: { type: String, require: true },
      city: { type: String, require: true },
      district: { type: String, require: true },
      pincode: { type: String, require: true },
      landmark: { type: String, require: true },
      mobile1: { type: Number, require: true },
      mobile2: { type: Number, require: true },
    },
    paymentMethod: {
      type: String,
      require: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      require: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      require: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
