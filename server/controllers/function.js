const { verify } = require("jsonwebtoken");
const models = require("../models");

module.exports = {
  validateToken: async (token) => {
    const userInfo = await verify(token, process.env.ACCESS_SECRET);
    if (!userInfo) null;
    return userInfo;
  },
  checkUser: async (email) => {
    const userInfo = await models.user.findOne({ where: { email: email } });
    return userInfo;
  },
};
