const express = require("express");
const app = express();
require("../src/db/conn");
const router = require("./routers/productroute");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

const Product = require("../src/models/products");
const Order = require("./models/orderdata");
const { verifyAccessToken } = require("./helpers/jwt_helpers");
require("dotenv").config();

const AuthRoute = require("./routers/Auth.route");
const CartItemsRoute = require("./routers/cartroute");
const UserProfile = require("./routers/userroute");
const orderRouter = require("./routers/order.router");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(orderRouter);
app.use("/auth", AuthRoute);
app.use("/cart", CartItemsRoute);
app.use("/user", UserProfile);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
