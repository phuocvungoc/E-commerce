const Comment = require("../../Model/Comment");
const { getErr500 } = require("./error");

module.exports.index = async (req, res, next) => {
  try {
    const idProduct = req.params.prodId;
    const comment_product = await Comment.find({ idProduct: idProduct });
    res.status(200).json(comment_product);
  } catch (err) {
    return next(getErr500(err));
  }
};

module.exports.commentByUser = async (req, res, next) => {
  try {
    const idUser = req.query.idUser;
    const idProd = req.query.idProd;
    const commentUser = await Comment.findOne({
      idUser: idUser,
      idProduct: idProd,
    });
    res.status(200).json(commentUser);
  } catch (err) {
    return next(getErr500(err));
  }
};

module.exports.send = async (req, res, next) => {
  try {
    const idProduct = req.params.prodId;
    const idUser = req.body.idUser;
    const fullname = req.body.fullname;
    const content = req.body.content;
    const star = req.body.star;

    const data = {
      idProduct: idProduct,
      idUser: idUser,
      fullname: fullname,
      content: content,
      star: star,
    };

    Comment.insertMany(data)
      .then((result) => {
        res.send("Success");
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    return next(getErr500(err));
  }
};
