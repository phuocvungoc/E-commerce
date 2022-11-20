const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cart: {
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
  role: {
    type: String,
    default: "client",
  },
});

userSchema.methods.addToCart = function (product, count) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  const updateCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    updateCartItems[cartProductIndex].quantity =
      this.cart.items[cartProductIndex].quantity + count;
  } else {
    updateCartItems.push({
      nameProduct: product.name,
      priceProduct: product.price,
      img: product.imgUrl[0].url,
      productId: product._id,
      quantity: count,
    });
  }

  const updateCart = {
    items: updateCartItems,
  };
  this.cart = updateCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updateCartItems = this.cart.items.filter((item) => {
    return item._id.toString() !== productId.toString();
  });

  this.cart.items = updateCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
