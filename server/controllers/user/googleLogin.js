const { user } = require("../../models");
const { accessToken } = require("./accesstoken");
const axios = require("axios");
const models = require("../../models");
const dotenv = require("dotenv");
import GoogleLogin from require("react-google-login")

module.exports = {
  post: async (req, res) => {
    const { login_method } = req.body;
    const authCode = req.body.authorizationCode;
    const googleBody = {
      code: authCode,
      client_id: process.env.REACT_APP_GOOGLE_REST_KEY,
      client_secret: process.env.REACT_APP_GOOGLE_REST_KEY_SECRET,
      redirect_uri: "https://localhost:3000",
      grant_type: "authorization_code",
    };
    const url = `https://oauth2.googleapis.com/token?code=${authCode}&client_id=${process.env.REACT_APP_GOOGLE_REST_KEY}&client_secret=${process.env.REACT_APP_GOOGLE_REST_KEY_SECRET}&redirect_uri=${googleBody.redirect_uri}&grant_type=${process.env.GOOGLE_GRANT_TYPE}`;
    // const queryString = Object.keys(googleBody)
    //   .map((k) => encodeURIComponent(k) + "=" + encodeURI(googleBody[k]))
    //   .join("&");

    const googleAccesstoken = await axios.post(url, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });

    const googleSocial = await axios.get("", {
      headers: { Authorization: `${googleAccesstoken.data.access_token}` },
    });
    if (login_method === "2") {
      console.log(googleAccesstoken);
      //   return res.status(200).json({
      //     data: {
      //       accessToken: await accessToken(kakaoCreate[0].email),
      //       id: kakaoCreate[0].id,
      //       email: kakaoCreate[0].email,
      //       nickname: kakaoCreate[0].nickname,
      //       login_method: kakaoCreate[0].login_method,
      //     },
      //   });
    } else {
      return res.status(401).json({ message: "login err" });
    }
  },
};
