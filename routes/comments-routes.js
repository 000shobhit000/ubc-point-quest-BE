const express = require("express");
const router = express.Router();

const commentsServices = require("../services/comments-services");

/* GET home page. */
router.post("/add", commentsServices.addComment);
router.post("/reply", commentsServices.replyOnComment);

module.exports = router;
