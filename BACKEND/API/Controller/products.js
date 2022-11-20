const Products = require("../../Model/Product");
const { getErr500 } = require("./error");

//Get All Product
exports.index = async (req, res, next) => {
  try {
    const products = await Products.find();
    const newProducts = products.map((item) => {
      let price = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return { ...item._doc, price };
    });
    res.status(200).json(newProducts);
  } catch (err) {
    return next(getErr500(err));
  }
};

module.exports.category = async (req, res, next) => {
  try {
    const category = req.query.category;
    const id = req.query.id;
    const products = await Products.find({ category: category });
    const productsNew = products.filter((item) => item._id.toString() !== id);
    res.status(200).json(productsNew);
  } catch (err) {
    return next(getErr500(err));
  }
};

module.exports.detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const products = await Products.findOne({ _id: id });
    res.status(200).json(products);
  } catch (err) {
    return next(getErr500(err));
  }
};
