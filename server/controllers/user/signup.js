const { user } = require("../../models");
require("dotenv").config();
// 완료
module.exports = {
  // 회원가입 post
  // 중복검사 get
  // email, password, nickname
  // {
  //     "${userId}"
  // }

  post: async (req, res) => {
    const { email, password, nickname, login_method } = req.body;

    const result = user.findOrCreate({
      where: { email, nickname, password, login_method },
    });
    res.status(201).json({ message: `${result}` });
  },
};
