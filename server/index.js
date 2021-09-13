const express = require("express");
const app = express();
const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// 서버로 들어왓을 떄 뜨는 것. - 포트가 잘 열리면 log 로 확인 띄워줌

// 몽고 디비 연결
const mongoose = require("mongoose");
const config = require("./config/key");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongo DB 연결됨"))
  .catch((err) => console.log(err));

// get으로 읽기 서버한테 get요청을 하는거
// 누군가가 방문을 하면 기본 페이지 '/' 여기에 응답을 띄운다
// 이거는 그냥 외우기
app.get("/", (req, res) => {
  res.send("Hello World!기본 페이지 입니다.^^");
});

// app.get("/register", (req, res) => {
//   // res.send("레지스터 페이지 입니다.")
//   // 파일 보내기 - 인덱스 파일로 사용자를 보내줌
//   res.sendFile(__dirname + "/index.html");
// });

const { User } = require("./models/User");

const bodyParser = require("body-parser");
// application/x-www-form-urlencoded를 분석해서 가져와줌
app.use(bodyParser.urlencoded({ extended: true }));
// application/json을 분석해서 가져옴
app.use(bodyParser.json());

// cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// 쓰기 - 입력해서 post 하는 것
app.post("/api/users/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 DB에 넣어준다.
  // 그러기 위해 model에 있는 USER을 가져와야함
  const user = new User(req.body);
  // bodyparser때문에 여기서 요청을 받아올 수 잇음

  // save는 몽고디비에서 오는 것이다 -  저장하게 해줌
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      // status(200)은 성공했다는 뜻
    });
    // 몽고디비에서 오는 메서드
  });
});

app.post("/api/users/login", (req, res) => {
  // 요청된 이메일을 디비에 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    // 유저가 없을 떄
    if (!user) {
      return res.json({
        loginSucess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    //이메일이 맞다면 비번이 맞는지도 확인
    // comparePassword이 메소드는 User에서 만들어준다
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSucess: false,
          message: "비밀번호가 틀렸습니다",
        });

      // /비번이 맞다면 토큰 생성
      // user에서 메소드 만들꺼임
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // status 400은 에러가 있다는 뜻

        // 토큰을 저장한다 쿠키든 로컬스토리지든
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSucess: true, userId: user._id });
      });
    });
  });
});

const { auth } = require("./middleware/auth");
const { application } = require("express");
app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 미들웨어가 통과했다는 말은 인증이 true라는 말

  // 클라이언트에게 json data로 정보를 제공하면 됨
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? "false" : "true",
    // 0이면 일반 다른 숫자는 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// 로그아웃
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

// app.get("/api/hello", (req, res) => {
//   res.send("안녕하세요");
// });
