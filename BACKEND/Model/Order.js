const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    idUser: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      required: true,
    },
    orders: {
      items: [
        {
          nameProduct: {
            type: String,
          },
          priceProduct: {
            type: String,
          },
          img: {
            type: String,
          },
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
