const { User } = require("../models/User");

let auth = (req, res, next) => {
  // ========== 인증처리를 하는 곳====
  // 클라이언트 쿠키에서 토큰을 가져온다

  let token = req.cookies.x_auth;

  // 토큰을 복호화한 후 유저를 찾는다
  // 유저에서 메소드를 만든다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 유저 없음
    if (!user) return res.json({ isAuth: false, error: true });

    // 유저 있음
    req.token = token;
    req.user = user;
    // 인덱스에서 사용할 수 있게 하기 위해서 유저정보와 토큰 정보를 넣어주는 것이다
    next();
    // 넥스트가 없으면 미들웨어에 갇힘
  });

};

module.exports = { auth };
