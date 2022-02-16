const jwt = require("jsonwebtoken");
require("dotenv").config();
const access = process.env.ACCESS_SECRET;

exports.verifyToken = (req, res, next) => {
  try {
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰 반환
    req.decoded = jwt.verify(req.headers.authorization, access);
    return next();
  } catch (error) {
    // 인증 실패
    // 유효기간이 초과된 경우
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        message: "not authorized",
      });
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    return res.status(401).json({
      message: "not authorized",
    });
  }
};
