const { user } = require("../../models");
const { accessToken } = require("./accesstoken");
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
    const { email, password } = req.body;
    console.log('로그인시 보낸 리퀘스트 바디',req.body)
    const userInfo = await user.findOne({
      where: { email, password },
    });
    console.log('로그인 시 받아온 데이터', userInfo);
    if (!userInfo) {
      // 로그인 실패시
      return res.status(401).json({ message: "login err" });
    }
    // 로그인 성공시
    return res.status(200).json({
      data: {
        accessToken: await accessToken(email),
        id: userInfo.id,
        email: userInfo.email,
        nickname: userInfo.nickname,
        login_method: userInfo.login_method,
      },
    });
  },
};
