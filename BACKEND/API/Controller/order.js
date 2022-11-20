const Histories = require("../../Model/Order");
const { getErr500 } = require("./error");

module.exports.index = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const histories = await Histories.find({ idUser: idUser });
    res.status(200).json(histories);
  } catch (err) {
    return next(getErr500(err));
  }
};

module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const histories = await Histories.findOne({ _id: id });
    res.status(200).json(histories);
  } catch (err) {
    return next(getErr500(err));
  }
};

module.exports.history = async (req, res) => {
  try {
    const histories = await Histories.find();
    res.status(200).json(histories);
  } catch (err) {
    return next(getErr500(err));
  }
};
