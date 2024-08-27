const express = require("express");
const router = express.Router();

const commentsServices = require("../services/comments-services");
const { formidableMiddleware } = require("../common/middlewares");

/* GET home page. */
router.post("/add", formidableMiddleware, commentsServices.addComment);
router.post("/reply", commentsServices.replyOnComment);
router.get("/get-all", commentsServices.getAllComments);
router.post("/del-cmt", commentsServices.delComment);
router.post("/del-reply", commentsServices.delReply);

module.exports = router;
