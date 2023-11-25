import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import colors from "colors";
import ProductRouter from "./router/productRouter.js";
import connectDB from "./config/connectDB.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import orderRouter from "./router/orderRouter.js";
import uploadRoute from "./router/uploadRoute.js";
dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/products", ProductRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRoute);
app.use("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.dirname("");
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5911, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${
      process.env.PORT || 5911
    }`.yellow.bold
  );
});
