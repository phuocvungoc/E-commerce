const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    idProduct: {
      type: String,
      required: true,
    },
    idUser: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    star: {
      type: String,
      default: "5",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
