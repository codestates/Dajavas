const { user } = require("../../models");
const { accessToken } = require("./accesstoken");
const axios = require("axios");
const models = require("../../models");
const dotenv = require("dotenv");

module.exports = {
  post: async (req, res) => {
    const { login_method } = req.body;
    const authCode = req.body.authCode;
    const kakaoBody = {
      grant_type: "authorization_code",
      redirect_uri: process.env.CLIENT_URL,
      client_id: process.env.REACT_APP_KAKAO_REST_KEY,
      code: authCode,
    };
    const queryStringBody = Object.keys(kakaoBody)
      .map((k) => encodeURIComponent(k) + "=" + encodeURI(kakaoBody[k]))
      .join("&");
    const kakaoAccesstoken = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      queryStringBody
    );
    const kakaoSocial = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${kakaoAccesstoken.data.access_token}`,
      },
    });
    console.log(kakaoSocial);
    const kakaoCreate = await models.user.findOrCreate({
      where: {
        email: kakaoSocial.data.kakao_account.email,
        login_method: "1",
        nickname: `kakao ${kakaoSocial.data.id}`,
      },
      default: {
        password: null,
      },
    });
    
    return res.status(200).json({
      data: {
        accessToken: await accessToken(kakaoCreate[0].email),
        id: kakaoCreate[0].id,
        email: kakaoCreate[0].email,
        nickname: kakaoCreate[0].nickname,
        login_method: kakaoCreate[0].login_method,
      },
    });
    
  },
};