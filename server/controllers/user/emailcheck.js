const { user } = require("../../models");
// 완료
module.exports = {
  //  중복 검사
  //  can use(200) or used email(409)
  get: async (req, res) => {
    user.findOne({ where: { email: await req.query.email } }).then((data) => {
      if (data) {
        return res.status(409).json({ message: "used email" });
      } else {
        return res.status(200).json({ message: "can use" });
      }
    });
  },
};
