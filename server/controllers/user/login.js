const { user } = require("../../models");
const { accessToken } = require("./accesstoken");
const axios = require("axios");
const models = require("../../models");
const dotenv = require("dotenv");
// token 완료
//console.log("======token", accessToken); -> ======token [Function: accessToken]
module.exports = {
  // 로그인 post
  // email, password, login_method(0 token, 1 kakao, 2 google)
  //     {
  //     data: {
  //     accessToken: accessToken, // token
  //     id: int,
  //     email: string,
  //     nickname: string,
  //     login_method: int
  //     }
  // } or {
  //     "login err"
  // }
  post: async (req, res) => {
    const { email, password, login_method } = req.body;
    const userInfo = await user.findOne({
      where: { email, password },
    });

    try {
      if (login_method === "0") {
        if (!userInfo) {
          // 로그인 실패시
          return res.status(401).json({ message: "login err" });
        }
        // 로그인 성공시
        // console.log(userInfo.nickname);
        return res.status(200).json({
          data: {
            accessToken: await accessToken(email),
            id: userInfo.id,
            email: userInfo.email,
            nickname: userInfo.nickname,
            login_method: userInfo.login_method,
          },
        });
      }
    } catch {
      console.log("왜안되징................");
    }
  },
};
