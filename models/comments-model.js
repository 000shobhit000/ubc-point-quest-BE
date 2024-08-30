const mongoose = require("mongoose");
const db = require("../bin/db");

// Define the nested reply schema
// const replySchema = new db.Schema(
//   {
//     userId: {
//       type: mongoose.Types.ObjectId,
//       ref: "users",
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     text: {
//       type: String,
//       required: true,
//     },
//   },
//   { _id: true, timestamps: true } // _id is generated automatically unless set to false
// );


// Define the main comments schema
const commentsSchema = new db.Schema(
  {
    pinPointId: {
      type: String,
      required: true,
      ref: "pin-points",
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        userId: {
          type: String,
          ref: "users",
        },
        commentId: {
          type: String,
          required: true,
          unique: true
          
        },
        name: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },

        like: {
          type: Boolean,
          default: false,
        },
        image: {
          type: String,
        },
        //reply: [replySchema], // Use the reply schema
      },
    ],
  },
  { minimize: false, timestamps: true }
);

module.exports = db.model("comments", commentsSchema, "comments");
