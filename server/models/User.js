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
const bcrypt = require("bcrypt");
const saltRounds = 10;
// // 솔트가 몇글자인지 정하는 것
// // 유저스키마를 저장하기 전에 무언가를 한다
userSchema.pre("save", function (next) {
  let user = this;
  // user는 위의 스키마를 가져옴

  // 비밀번호가 변환 될때만 실행해야 하므로
  if (user.isModified("password")) {
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
});

// ============= comparePassword  메소드 만들기==============
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 유저의 날것의 비밀번호 ex>123456 = 암호화된 비번%sdasdaqw2313qweqd
  // 암호화된 비번을 복호화할순없어서 비교하려는 비번을 암호화시켜서 비교햐야함
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
    // isMatch는 성공값 index의 콜백함수로 보내준다
  });
};

// ================ webtoken
const jwt = require("jsonwebtoken");

userSchema.methods.generateToken = function (cb) {
  // json wevtoken을 이용해서 토큰 생성
  let user = this;
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // _id는 디비에 있는 아이디
  // 아이디랑 시크릿토큰이 합쳐져서 토큰이 만들어짐

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
  // 여기 정보가 인덱스에 함수로 들어감
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  // 토큰은 디코드 한다
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 디코드 된 것은 아이디
    // 유저 아이드를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 토큰과 디비에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
