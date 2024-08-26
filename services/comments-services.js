const PINPOINT = require("../models/pin-point-model");
const COMMENTS = require("../models/comments-model");

const { makeResponse, throwError } = require("../common/functions");
const { RESPONSE_STATUS, RESPONSE_MESSAGES } = require("../common/constants");
const { default: mongoose } = require("mongoose");

// service handelers ^_^

const addComment = async (req, res) => {
  try {
    const { pinPointId, name, text, like = false } = req.body;

    const updateObj = {
      name,
      text,
      like,
    };
    let addedCmt;
    const ifAnyCmt = await COMMENTS.findOne({
      pinPointId: pinPointId,
    });
    if (ifAnyCmt) {
      addedCmt = await COMMENTS.findOneAndUpdate(
        {
          pinPointId: pinPointId,
        },
        {
          $push: { comments: updateObj },
        },
        { new: true }
      );
    } else {
      addedCmt = await COMMENTS.create({
        pinPointId,
        comments: [updateObj],
      });
    }
    if (!addedCmt) {
      return throwError(
        RESPONSE_STATUS.BAD_REQUEST,
        "Error in adding comment: "
      );
    }
    return makeResponse(
      res,
      RESPONSE_STATUS.CREATED,
      true,
      RESPONSE_MESSAGES.SUCCESS,
      addedCmt
    );
  } catch (error) {
    console.log(error);
    return makeResponse(
      res,
      RESPONSE_STATUS.SERVER_ERROR,
      false,
      "Error in addComment api: " + error,
      undefined
    );
  }
};

const replyOnComment = async (req, res) => {
  try {
    const { pinPointId, commentId, name, text } = req.body;
    const replyObj = {
      // userId: req.userId,
      name,
      text,
    };

    const repliedCmt = await COMMENTS.findOneAndUpdate(
      {
        pinPointId: pinPointId,
        "comments._id": commentId,
      },
      {
        $push: {
          "comments.$.reply": replyObj,
        },
      },
      { new: true, useFindAndModify: false }
    );

    if (!repliedCmt) {
      return throwError(
        RESPONSE_STATUS.BAD_REQUEST,
        "Error in replying comment: "
      );
    }
    return makeResponse(
      res,
      RESPONSE_STATUS.SUCCESS,
      true,
      RESPONSE_MESSAGES.SUCCESS,
      repliedCmt
    );
  } catch (error) {
    console.log(error);
    return makeResponse(
      res,
      RESPONSE_STATUS.SERVER_ERROR,
      false,
      "Error in replyOnComment api: " + error,
      undefined
    );
  }
};

const getAllComments = async (req, res) => {
  try {
    const fetchedCmts = await COMMENTS.find();
    return makeResponse(
      res,
      RESPONSE_STATUS.SUCCESS,
      true,
      RESPONSE_MESSAGES.SUCCESS,
      fetchedCmts
    );
  } catch (error) {
    console.log(error);
    return makeResponse(
      res,
      RESPONSE_STATUS.SERVER_ERROR,
      false,
      "Error in replyOnComment api: " + error,
      undefined
    );
  }
};

const delComment = async (req, res) => {
  try {
    const { pinPointId, cmtId } = req.body;
    const deletedCmt = await COMMENTS.findOneAndUpdate(
      {
        pinPointId: pinPointId,
        "comments._id": cmtId,
      },
      {
        $pull: {
          comments: {
            _id: cmtId,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );
    if (!deletedCmt) {
      return throwError(RESPONSE_STATUS.BAD_REQUEST, "No such comment found!");
    }

    return makeResponse(
      res,
      RESPONSE_STATUS.SUCCESS,
      true,
      RESPONSE_MESSAGES.SUCCESS,
      deletedCmt
    );
  } catch (error) {
    console.log(error);
    return makeResponse(
      res,
      RESPONSE_STATUS.SERVER_ERROR,
      false,
      "Error in delComment api: " + error,
      undefined
    );
  }
};

const delReply = async (req, res) => {
  try {
    const { pinPointId, cmtId, replyId } = req.body;
    const deletedReply = await COMMENTS.findOneAndUpdate(
      {
        pinPointId: pinPointId,
        "comments._id": cmtId,
      },
      {
        $pull: {
          "comments.$.reply": {
            _id: replyId,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );
    if (!deletedReply) {
      return throwError(RESPONSE_STATUS.BAD_REQUEST, "No such reply found!");
    }

    return makeResponse(
      res,
      RESPONSE_STATUS.SUCCESS,
      true,
      RESPONSE_MESSAGES.SUCCESS,
      deletedReply
    );
  } catch (error) {
    console.log(error);
    return makeResponse(
      res,
      RESPONSE_STATUS.SERVER_ERROR,
      false,
      "Error in delReply api: " + error,
      undefined
    );
  }
};

module.exports = {
  addComment,
  replyOnComment,
  getAllComments,
  delComment,
  delReply,
};
