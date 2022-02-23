const { user } = require("../../models");
const { accessToken } = require("./accesstoken");
const axios = require("axios");
const models = require("../../models");
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
    const authCode = req.body.authorizationCode;
    const userInfo = await user.findOne({
      where: { email, password },
    });
    // const kakaoAccesstoken = await axios.post('https://kauth.kakao.com/oauth/token', authCode, {
    //   headers: {
    //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   }
    // const googleAccesstoken = await
    // const kakaoSocial = await axios.get("https://kapi.kakao.com/v2/user/me", {
    //   headers: { Authorization: `${kakaoAccesstoken.data.access_token}` },
    // });
    // const googleSocial = await axios.get("",{
    //   headers: {Authorization: `${googleAccesstoken.data.access_token}`}
    // })
    // const  = await models.user.findOrCreate({
    //   where: {email: kakaoSocial.data.email},
    //   default: {
    //     password: null,
    //     nickname: kakaoSocial.data.
    //   }
    // })
    // const createOrFind = await user.findOrCreate({
    //   where: { email: social.email },
    //   default: {
    //     password: null,
    //     nickname: social.nickname,
    //   },
    // });
    if (login_method === "0") {
      if (!userInfo) {
        // 로그인 실패시
        return res.status(401).json({ message: "login err" });
      }
      // 로그인 성공시
      console.log(userInfo.nickname);
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
    if (login_method === "1") {
      console.log(social.email);
    } else {
      console.log("안됨");
    }
  },
};
