const express = require("express");

const router = express.Router();

const messController = require("../Controller/messenger");

const { verifyCounselors, verifyUser } = require("../../utils/verifyToken");

router.get("/room/:roomId", verifyUser, messController.getMessageByRoomId);

router.post("/newRoom", verifyUser, messController.newRoom);

router.put("/addMessage", verifyUser, messController.addMessage);

router.get("/roomOpen", verifyCounselors, messController.getAllRoomIsOpen);

module.exports = router;
