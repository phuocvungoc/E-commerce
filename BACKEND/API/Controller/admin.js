const { getErr500 } = require("./error");
const User = require("../../Model/User");
const Order = require("../../Model/Order");
const Product = require("../../Model/Product");
const cloudinary = require("../../utils/cloudinary");

exports.orders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    const newOrders = orders.map((item) => {
      let total = item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return { ...item._doc, total };
    });
    newOrders.reverse();
    res.status(200).json(newOrders);
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.products = async (req, res, next) => {
  try {
    const products = await Product.find();
    const newProducts = products.map((item) => {
      let price = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return { ...item._doc, price };
    });
    newProducts.reverse();
    res.status(200).json(newProducts);
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.users = async (req, res, next) => {
  try {
    const users = await User.find();
    users.reverse();
    res.status(200).json(users);
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.newOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: "Waiting for progressing" });
    const newOrders = orders.map((item) => {
      let total = item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return { ...item._doc, total };
    });
    res.status(200).json(newOrders);
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.countByUser = async (req, res, next) => {
  try {
    const countUser = await User.countDocuments();
    res.status(200).json(countUser);
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.countByOrder = async (req, res, next) => {
  try {
    const countOrder = await Order.countDocuments();
    res.status(200).json(countOrder);
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.totalRevenue = async (req, res, next) => {
  try {
    const orders = await Order.find();
    const totalRevenue = orders.reduce((total, item) => {
      return total + Number(item.total);
    }, 0);
    res
      .status(200)
      .json(totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.avgRevenue = async (req, res, next) => {
  try {
    function getMonthDifference(startDate, endDate) {
      return (
        endDate.getMonth() -
        startDate.getMonth() +
        12 * (endDate.getFullYear() - startDate.getFullYear())
      );
    }

    const orders = await Order.find();
    const totalP = orders.reduce((total, item) => {
      return total + Number(item.total);
    }, 0);

    const startDate = orders[0].createdAt;
    const endDate = orders[orders.length - 1].createdAt;
    const months = getMonthDifference(startDate, endDate) || 1;

    const average = (totalP / months).toFixed();
    res
      .status(200)
      .json(average.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const productName = req.body.productName;
    const category = req.body.category;
    const price = req.body.price;
    const stock = req.body.stock;
    const shortDesc = req.body.shortDesc;
    const longDesc = req.body.longDesc;
    const images = req.body.images;

    let imgUrl = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i]);
      imgUrl.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
      //    {
      //     folder: "banners",
      //     width: 1920,
      //     crop: "scale",
      //   }
    }

    const product = new Product({
      name: productName,
      price: price,
      stock: stock,
      short_desc: shortDesc,
      long_desc: longDesc,
      imgUrl: imgUrl,
      category: category,
    });

    product
      .save()
      .then((result) => {
        res.status(200).json("Success");
      })
      .catch((err) => {
        return next(getErr500(err));
      });
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const prodId = req.params.prodId;
    const product = await Product.findOne({ _id: prodId });
    await Product.findByIdAndDelete(prodId)
      .then((result) => {
        res.status(200).json("Product has been deleted.");
      })
      .catch((err) => {
        console.log(err);
      });

    product.imgUrl.map(async (item) => {
      if (item.public_id) {
        await cloudinary.uploader.destroy(item.public_id, function (err, res) {
          if (err) {
            console.log(err);
          }
        });
      }

      return;
    });
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json("Order has been deleted.");
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.productDetail = async (req, res, next) => {
  try {
    const prodId = req.params.prodId;
    const product = await Product.findOne({ _id: prodId });
    res.status(200).json(product);
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.postUpdateProduct = async (req, res, next) => {
  try {
    const prodId = req.params.prodId;
    const productName = req.body.productName;
    const category = req.body.category;
    const price = req.body.price;
    const stock = req.body.stock;
    const shortDesc = req.body.shortDesc;
    const longDesc = req.body.longDesc;
    const images = req.body.images;
    const imgDestroy = [];

    const productOld = await Product.findOne({ _id: prodId });

    let imgUrl = [];

    for (let i = 0; i < images.length; i++) {
      if (!images[i].public_id) {
        const result = await cloudinary.uploader.upload(images[i]);
        imgUrl.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      } else imgUrl.push(images[i]);
    }

    const product = {
      name: productName,
      price: price,
      stock: stock,
      short_desc: shortDesc,
      long_desc: longDesc,
      imgUrl: imgUrl,
      category: category,
    };

    await Product.findByIdAndUpdate(prodId, product)
      .then((result) => {
        res.status(200).json("Success");
      })
      .catch((err) => {
        return next(getErr500(err));
      });

    // Delete photos on cloudinary
    productOld.imgUrl.map((item) => {
      images.map((image) => {
        if (image.public_id && item.public_id !== image.public_id) {
          imgDestroy.push(item);
        }
      });
    });

    imgDestroy.map(async (item) => {
      await cloudinary.uploader.destroy(item.public_id, function (err, res) {
        if (err) {
          console.log(err);
        }
      });
    });
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const status = req.body.status;
    const delivery = req.body.delivery;

    await Order.findByIdAndUpdate(orderId, {
      $set: {
        status: status,
        delivery: delivery,
      },
    });
    res.status(200).json("succeed");
  } catch (err) {
    return next(getErr500(err));
  }
};
