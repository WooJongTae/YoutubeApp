const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const userDatasSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  lastname: {
    type: String,
    maxlength: 30,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: String,
  },
});

userDatasSchema.pre("save", function (next) {
  const userDatas = this;
  if (userDatas.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(userDatas.password, salt, function (err, hashedPassword) {
        if (err) return next(err);

        userDatas.password = hashedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

userDatasSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt
    .compare(inputPassword, this.password)
    .then((isMatch) => {
      return isMatch;
    })
    .catch((err) => {
      return err;
    });
};

userDatasSchema.methods.generateToken = function () {
  const userDatas = this;
  const token = jwt.sign(userDatas._id.toJSON(), "our_secret");
  userDatas.token = token;
  return userDatas
    .save()
    .then(() => {
      return userDatas;
    })
    .catch((err) => {
      return err;
    });
};

userDatasSchema.statics.findByToken = function (token) {
  let userDatas = this;
  // jwt는 왜then을쓰면 안되는지 콜백함수로만 가능
  const verifyToken = jwt.verify(token, "our_secret");
  return userDatas
    .findOne({ _id: verifyToken, token: token })
    .then((userData) => {
      return userData;
    })
    .catch((err) => {
      return err;
    });
};

const UserData = mongoose.model("UserData", userDatasSchema);

module.exports = UserData;
