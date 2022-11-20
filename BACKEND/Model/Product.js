const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imgUrl: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  long_desc: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
