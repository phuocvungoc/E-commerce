const express = require("express");

const router = express.Router();

const Products = require("../Controller/products");

router.get("/", Products.index);

router.get("/category", Products.category);

router.get("/:id", Products.detail);

module.exports = router;
