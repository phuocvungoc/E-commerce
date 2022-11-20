const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessengerSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: [
      {
        message: String,
        isAdmin: Boolean,
      },
    ],
    isEnd: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messenger", MessengerSchema);
