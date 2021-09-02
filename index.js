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
  .connect(
    config.mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
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


// 쓰기 - 입력해서 post 하는 것
app.post("/register", (req, res) => {
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




