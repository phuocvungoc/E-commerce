const express = require("express");

const Comment = require("../Controller/comment");

const router = express.Router();

const { verifyUser } = require("../../utils/verifyToken");

router.get("/cmtUser", verifyUser, Comment.commentByUser);

router.get("/:prodId", Comment.index);

router.post("/send/:prodId", verifyUser, Comment.send);

module.exports = router;
