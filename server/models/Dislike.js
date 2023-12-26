const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const disLikeDataSchema = new mongoose.Schema(
  {
    userId: {
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

const DislikeData = mongoose.model("Dislike", disLikeDataSchema);

module.exports = { DislikeData };
