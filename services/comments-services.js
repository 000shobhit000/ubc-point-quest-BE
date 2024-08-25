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

// const deletePinPoint = async (req, res) => {
//   try {
//     const { pinPointId } = req.body;
//     const deletedPinPoint = await PINPOINT.findByIdAndDelete(pinPointId);
//     if (deletedPinPoint) {
//       return makeResponse(
//         res,
//         RESPONSE_STATUS.CREATED,
//         true,
//         RESPONSE_MESSAGES.SUCCESS,
//         deletedPinPoint
//       );
//     }
//     return throwError(
//       RESPONSE_STATUS.NOT_FOUND,
//       "Error in deleting PinPoint: "
//     );
//   } catch (error) {
//     console.log(error);
//     return makeResponse(
//       res,
//       RESPONSE_STATUS.SERVER_ERROR,
//       false,
//       "Error in deletePinPoint api: " + error,
//       undefined
//     );
//   }
// };

module.exports = {
  addComment,
  replyOnComment,
};
