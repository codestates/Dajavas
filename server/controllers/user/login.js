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
    const authCode = req.body.authorizationCode;
    const userInfo = await user.findOne({
      where: { email, password },
    });
    // const kakaoBody = {
    //   grant_type: "authorization_code",
    //   redirect_uri: "https://localhost:3000",
    //   client_id: process.env.REACT_APP_KAKAO_REST_KEY,
    //   code: authCode,
    // };
    const googleBody = {
      grant_type: "authorization_code",
      redirect_uri: "https://localhost:3000",
      client_id: process.env.REACT_APP_GOOGLE_REST_KEY,
      code: authCode,
    };
    const queryString = Object.keys(googleBody)
      .map((k) => encodeURIComponent(k) + "=" + encodeURI(googleBody[k]))
      .join("&");
    // const queryStringBody = Object.keys(kakaoBody)
    //   .map((k) => encodeURIComponent(k) + "=" + encodeURI(kakaoBody[k]))
    //   .join("&");
    // const kakaoAccesstoken = await axios.post(
    //   "https://kauth.kakao.com/oauth/token",
    //   queryStringBody
    // );
    const googleAccesstoken = await axios.post(
      "https://oauth2.googleapis.com/token",
      queryString
    );
    // const kakaoSocial = await axios.get("https://kapi.kakao.com/v2/user/me", {
    //   headers: {
    //     Authorization: `Bearer ${kakaoAccesstoken.data.access_token}`,
    //   },
    // });
    //  const googleSocial = await axios.get("",{
    //    headers: {Authorization: `${googleAccesstoken.data.access_token}`}
    //  })
    // const kakaoCreate = await models.user.findOrCreate({
    //   where: {
    //     email: kakaoSocial.data.kakao_account.email,
    //     nickname: `kakao ${kakaoSocial.data.id}`,
    //     login_method: "1",
    //   },
    //   default: {
    //     password: null,
    //   },
    // });
    // const createOrFind = await user.findOrCreate({
    //   where: { email: social.email },
    //   default: {
    //     password: null,
    //     nickname: social.nickname,
    //   },
    // });
    try {
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
        return res.status(200).json({
          data: {
            accessToken: await accessToken(kakaoCreate[0].email),
            id: kakaoCreate[0].id,
            email: kakaoCreate[0].email,
            nickname: kakaoCreate[0].nickname,
            login_method: kakaoCreate[0].login_method,
          },
        });
      } else {
        console.log(googleAccesstoken);
        // return res.status(200).json({
        //   data: {
        //     accessToken: await accessToken(kakaoCreate[0].email),
        //     id: kakaoCreate[0].id,
        //     email: kakaoCreate[0].email,
        //     nickname: kakaoCreate[0].nickname,
        //     login_method: kakaoCreate[0].login_method,
        //   },
        // });
      }
    } catch {
      console.log("왜안되징................");
    }
  },
};
