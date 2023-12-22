const UserData = require("../models/UserDatas");

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.myCookie;

  UserData.findByToken(token)
    .then((user) => {
      console.log("굿굿굿11", user);
      if (!user) {
        console.log("ㅎㅇㅎㅇㅎㅇ22", user);
        return res.json({ isAuth: false, err: "에러 발생입니다ㅎㅇㅎㅇ." });
      } else {
        console.log(token, user);
        req.token = token;
        req.user = user;
        console.log("여긴오나?");
        next();
      }
    })
    .catch((err) => {
      throw err;
    });

  // 유저가 있으면 인증 success

  // 유저가 없으면 인증 fail
};

module.exports = { auth };
