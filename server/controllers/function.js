const { verify } = require("jsonwebtoken");
const models = require("../models");
const accessToken = require("./user/accesstoken");
// console.log("토큰 확인!", accessToken);

module.exports = {
  validateToken: async (token) => {
    const userInfo = await verify(accessToken, process.env.ACCESS_SECRET);
    if (!userInfo) null;
    return userInfo;
  },
  checkUser: async (email) => {
    const userInfo = await models.user.findOne({ where: { email: email } });
    return userInfo;
  },
};
