require("dotenv").config();
const access = process.env.ACCESS_SECRET;
const { sign } = require("jsonwebtoken");

module.exports = {
  accessToken: (email) => {
    // access 토큰 생성
    console.log(email);
    const token = sign(
      {
        email,
      },
      access,
      { expiresIn: "30m", issuer: "토큰토큰" }
    );
    return token;
  },
};
