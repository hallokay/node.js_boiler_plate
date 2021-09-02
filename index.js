const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");

const config = require('./config/key')

const mongoose = require("mongoose");

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
  .then(() => console.log("연결됨"))
  .catch((err) => console.log(err));


// application/x-www-form-urlencoded를 분석해서 가져와줌
  app.use(bodyParser.urlencoded({ extended: true }));
  // application/json을 분석해서 가져옴
  app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.send("Hello World!hghghg");
});

app.post("/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 DB에 넣어준다.

  const user = new User(req.body);
  // bodyparser때문에 여기서 요청을 받아올 수 잇음
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,

      // status(200)은 성공했다는 뜻
    });
    // 몽고디비에서 오는 메서드
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
