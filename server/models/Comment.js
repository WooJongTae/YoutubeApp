const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentDatasSchema = new mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "UserData",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "VideoData",
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "UserData",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Subscriber", commentDatasSchema);

module.exports = Comment;
