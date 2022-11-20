const nodemailer = require("nodemailer");

const Products = require("../../Model/Product");
const Order = require("../../Model/Order");
const { getErr500 } = require("../Controller/error");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.APP_PASSWORD,
  },
});

exports.getUser = async (req, res, next) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.getCart = async (req, res, next) => {
  try {
    res.status(200).send(req.user.cart.items);
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.postCart = (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const count = req.body.count;
    Products.findById(prodId)
      .then((product) => {
        return req.user.addToCart(product, count);
      })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.postCartDeleteProduct = (req, res, next) => {
  try {
    const prodId = req.params.prodId;
    req.user
      .removeFromCart(prodId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    const idUser = req.user._id;
    const phone = req.body.phone;
    const email = req.body.email;
    const total = req.body.total;
    const fullname = req.body.fullname;
    const address = req.body.address;
    const orders = req.user.cart;
    const orderUser = orders.items;

    orders.items.map(async (item) => {
      const product = await Products.findById(item.productId);
      const stockOld = product.stock;

      // if (Number(item.quantity) > Number(stockOld)) {
      //   const err = new Error(
      //     `${item.nameProduct} không còn đủ số lượng sản phẩm bạn muốn đặt!`
      //   );
      //   return next(getErr500(err));
      // }

      await Products.findByIdAndUpdate(item.productId, {
        $set: {
          stock: stockOld - item.quantity,
        },
      });
    });

    const htmlHead =
      '<table style="width:80%">' +
      '<tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Hình Ảnh</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>';

    let htmlContent = "";

    for (let i = 0; i < orderUser.length; i++) {
      htmlContent +=
        "<tr>" +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        orderUser[i].nameProduct +
        "</td>" +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src="' +
        orderUser[i].img +
        '" width="80" height="80"></td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        orderUser[i].priceProduct
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
        " " +
        "VNĐ</td>" +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        orderUser[i].quantity +
        "</td>" +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        (parseInt(orderUser[i].priceProduct) * parseInt(orderUser[i].quantity))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
        " " +
        "VNĐ</td><tr>";
    }

    const htmlResult =
      "<h1>Xin Chào " +
      fullname +
      "</h1>" +
      "<h3>Phone: " +
      phone +
      "</h3>" +
      "<h3>Address:" +
      address +
      "</h3>" +
      htmlHead +
      htmlContent +
      "<h1>Tổng Thanh Toán: " +
      total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      " " +
      "VNĐ</br>" +
      "<p>Cảm ơn bạn!</p>";

    const order = new Order({
      idUser: idUser,
      phone: phone,
      email: email,
      total: total,
      fullname: fullname,
      address: address,
      status: "Waiting for progressing",
      delivery: "Waiting for pay",
      orders: orders,
    });

    order
      .save()
      .then((result) => {
        req.user.clearCart();
        res.status(200).json(result);
        return transporter.sendMail({
          from: "phuocdaika3334@gmail.com",
          to: req.body.email,
          subject: "Hóa Đơn Đặt Hàng",
          html: htmlResult,
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    console.log(err);
    return next(getErr500(err));
  }
};
