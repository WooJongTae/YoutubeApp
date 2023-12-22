const express = require("express");
const UserDatas = require("./models/UserDatas");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const config = require("./config/key");
const path = require("path");
const cors = require("cors");
const ffmpeg = require("fluent-ffmpeg");

const app = express();
app.use(cors());
app.use("/uploads", express.static("../uploads"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5000;

const mongoose = require("mongoose");
const { auth } = require("./middleware/auth");
const VideoData = require("./models/VideoData");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("몽고DB 접속"))
  .catch((err) => console.log("에러", err));

app.get("/api/hello", (req, res) => {
  res.send("ㅎㅇㅎㅇ");
});

app.post("/api/users/register", (req, res) => {
  const userData = new UserDatas(req.body);
  userData
    .save()
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log("실패", err);
      return res.json({ success: false, err });
    });
});

app.post("/api/users/login", (req, res) => {
  UserDatas.findOne({ email: req.body.email }).then((userData) => {
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "이메일이 없습니다. 회원가입 하세요",
      });
    }
    userData.comparePassword(req.body.password).then((isMatch) => {
      if (!isMatch) {
        return res.json({ success: false, message: "비밀번호가 다릅니다.!" });
      }
    });
    userData
      .generateToken()
      .then((userInfo) => {
        console.log(userInfo);
        res
          .cookie("myCookie", userInfo.token)
          .status(200)
          .json({ success: true, userId: userInfo._id });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  // console.log("응답", res);
  res.status(200).json({
    _id: req.user._id,
    isAdimin: req.user.role == 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.lastname,
    role: req.user.role,
    img: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  UserDatas.findByIdAndUpdate({ _id: req.user._id }, { token: "" })
    .then(() => {
      return res.json({ success: true });
    })
    .catch((err) => {
      return res.json({ success: false, err: err });
    });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "uploads/");
    cb(null, "../uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg...기타등등"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

app.post("/api/video/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    console.log(req);
    return res.json({
      success: true,
      url: req.file.path,
      fileName: req.file.filename,
    });
  });
});

app.post("/api/video/thumbnail", (req, res) => {
  let thumbsFilePath = "";
  let fileDuration = "";

  // 비디오 전체 정보 추출
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    // console.log(req.body.url);
    console.dir("metadata", metadata);
    // console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  //썸네일 생성, 비디오 길이 추출
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "../uploads/thumbnails/" + filenames[0];
      // 오류발생시 여기보소
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "../uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});

app.post("/api/video/uploadVideo", (req, res) => {
  const video = new VideoData(req.body);
  video
    .save()
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log("실패", err);
      return res.json({ success: false, err });
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});