const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subsciberDatasSchema = new mongoose.Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "UserData",
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "UserData",
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", subsciberDatasSchema);

module.exports = Subscriber;
