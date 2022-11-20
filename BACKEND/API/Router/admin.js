const express = require("express");

const adminController = require("../Controller/admin");

const { verifyAdmin } = require("../../utils/verifyToken");

const router = express.Router();

router.get("/products/:prodId", verifyAdmin, adminController.productDetail);

router.get("/orders", verifyAdmin, adminController.orders);

router.get("/products", verifyAdmin, adminController.products);

router.get("/users", verifyAdmin, adminController.users);

router.get("/newOrders", verifyAdmin, adminController.newOrders);

router.get("/countUser", verifyAdmin, adminController.countByUser);

router.get("/countOrder", verifyAdmin, adminController.countByOrder);

router.get("/totalRevenue", verifyAdmin, adminController.totalRevenue);

router.get("/avgRevenue", verifyAdmin, adminController.avgRevenue);

router.post("/add-product", verifyAdmin, adminController.postAddProduct);

router.post(
  "/update-product/:prodId",
  verifyAdmin,
  adminController.postUpdateProduct
);

router.post("/update-order/:orderId", verifyAdmin, adminController.updateOrder);

router.delete("/products/:prodId", verifyAdmin, adminController.deleteProduct);

router.delete("/users/:userId", verifyAdmin, adminController.deleteUser);

router.delete("/orders/:orderId", verifyAdmin, adminController.deleteOrder);

module.exports = router;
