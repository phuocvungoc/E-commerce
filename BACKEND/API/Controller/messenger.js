const mongoose = require("mongoose");
const Messenger = require("../../Model/Messenger");
const { getErr500 } = require("./error");

exports.newRoom = async (req, res, next) => {
  try {
    const newRoom = new Messenger({
      userId: req.user._id || "6365c606a5b1122474baad5f",
    });
    const room = await newRoom.save();
    res.status(200).json(room);
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.getMessageByRoomId = async (req, res, next) => {
  try {
    const room = await Messenger.findById(req.params.roomId); //.populate("userId")
    res.status(200).json(room);
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.addMessage = async (req, res, next) => {
  try {
    if (req.body.message.toLowerCase() === "/end") {
      await Messenger.findByIdAndUpdate(req.body.roomId, {
        $set: {
          isEnd: true,
        },
        $push: {
          message: {
            message: req.body.message,
            isAdmin: req.body.isAdmin,
          },
        },
      });
      return res.status(200).json("End chat success!");
    }
    await Messenger.findByIdAndUpdate(req.body.roomId, {
      $push: {
        message: {
          message: req.body.message,
          isAdmin: req.body.isAdmin,
        },
      },
    });
    res.status(200).json("Save message success!");
  } catch (err) {
    return next(getErr500(err));
  }
};

exports.getAllRoomIsOpen = async (req, res, next) => {
  try {
    const roomOpen = await Messenger.find({ isEnd: false }).populate("userId");
    res.status(200).json(roomOpen);
  } catch (err) {
    return next(getErr500(err));
  }
};
