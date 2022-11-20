const express = require("express");

const router = express.Router();

const cartController = require("../Controller/carts");

const { verifyUser } = require("../../utils/verifyToken");

router.get("/user", verifyUser, cartController.getUser);

router.get("/", verifyUser, cartController.getCart);

router.post("/add", verifyUser, cartController.postCart);

router.delete(
  "/delete-item/:prodId",
  verifyUser,
  cartController.postCartDeleteProduct
);

router.post("/order", verifyUser, cartController.postOrder);

module.exports = router;
