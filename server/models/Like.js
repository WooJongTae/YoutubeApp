const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeDataSchema = new mongoose.Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "UserData",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "VideoData",
    },
  },
  { timestamps: true }
);

const LikeData = mongoose.model("Like", likeDataSchema);

module.exports = LikeData;
