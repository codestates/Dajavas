require("dotenv").config();
const { sign } = require("jsonwebtoken");
module.exports = {
  refreshToken: (data) => {
    // refresh 토큰 생성
    return sign(data, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
    });
  },
};
