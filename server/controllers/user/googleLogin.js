const { user } = require("../../models");
const { accessToken } = require("./accesstoken");
const axios = require("axios");
const models = require("../../models");
const dotenv = require("dotenv");

module.exports = {
  post: async (req, res) => {
    console.log("리퀘스트 바디는?",req.body)
    const { email, googleId } = req.body.profileObj;
    const googleCreate = await models.user.findOrCreate({
      where: {
        email: email,
        login_method: "2",
        nickname: `google ${googleId}`,
      },
      default: {
        password: null,
      },
    });
    console.log({
      data: {
        accessToken: await accessToken(googleCreate[0].email),
        id: googleCreate[0].id,
        email: googleCreate[0].email,
        nickname: googleCreate[0].nickname,
        login_method: googleCreate[0].login_method,
      },
    });
    return res.status(200).json({
      data: {
        accessToken: await accessToken(googleCreate[0].email),
        id: googleCreate[0].id,
        email: googleCreate[0].email,
        nickname: googleCreate[0].nickname,
        login_method: googleCreate[0].login_method,
      },
    });

  },
};
