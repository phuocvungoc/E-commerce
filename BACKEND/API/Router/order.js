const express = require("express");

const router = express.Router();

const Histories = require("../Controller/order");

const { verifyUser } = require("../../utils/verifyToken");

//Get Find Carts For User
router.get("/:idUser", verifyUser, Histories.index);

// Get All History
router.get("/all", verifyUser, Histories.history);

//Get Detail History
router.get("/detail/:id", verifyUser, Histories.detail);

module.exports = router;
