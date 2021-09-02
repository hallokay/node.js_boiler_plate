const mongoose = require("mongoose");


// 모델은 스키마를 감싸주는 역할 스키마는 하나하나의 정보들을 명시해 주는 것
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    // 트림은 공백을 없애줌
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    //   유효성 검사할 떄 씀
    type: String,
  },
  tokenExp: {
    type: Number,
    // 토큰 유효기간
  },
});


// // 비크립트 사용법
const bcrypt = require('bcrypt');
const saltRounds = 10;
// // 솔트가 몇글자인지 정하는 것
// // 유저스키마를 저장하기 전에 무언가를 한다
userSchema.pre('save', function(next) {
let user = this;
// user는 위의 스키마를 가져옴


// 비밀번호가 변환 될때만 실행해야 하므로
if(user.isModified('password')){
  // salt를 이용해서 비밀번호를 암호화 시킨다
  // genSalt임 오타나지 않게 주의!
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);
    // 에러가 나면다음으로 에러를 보내줌

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // 에러가 나면다음으로 에러를 보내줌
      // hash는 암호화된 비밀번호
      user.password = hash;
      // 성공하면 유저 패스워드를 암호로 교체해줌

      // 이거 후에 넥스트로 돌아가줌
      next();
    });
  });
} else {
  next();
}

})


const User = mongoose.model("User", userSchema);
module.exports = { User };
