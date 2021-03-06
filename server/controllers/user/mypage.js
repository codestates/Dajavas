// router.put("/mypage", controllers.mypage.put); 개인정보 수정
// router.delete("/mypage", controllers.mypage.delete); 회원탈퇴 -> destroy
// router.get("/mypage", controllers.mypage.get); 개인정보 불러오기

const models = require("../../models");
const func = require("../function");

module.exports = {
  get: async (req, res) => {
    // 개인정보 조회
    const validate = await func.validateToken(req.headers.authorizationtoken);
    const userInfo = await func.checkUser(req.query.email);
    try {
      if (!validate) {
        return res.status(401).send({ message: "not authorized" });
      } else {
        return res.status(200).send({
          data: {
            id: userInfo.id,
            email: userInfo.email,
            nickname: userInfo.nickname,
          },
        });
      }
    } catch {
      return console.log("개인정보 조회 에러났음");
    }
  },
  patch: async (req, res) => {
    // 개인정보 수정
    console.log('요청된 바디',req.body)
    const { nickname, password, email } = req.body;
    const validate = await func.validateToken(req.headers.authorizationtoken);
    // const userInfo = await func.checkUser(req.query.email);
    // console.log(userInfo)
    try {
      if (!validate) {
        return res.status(401).json({ message: "not authorized" });
      } else {
        await models.user.update(
          {
            nickname: nickname,
            password: password,
          },
          { where: { email: email } }
        );
        const userInfo = await func.checkUser(email);

        return res.status(200).json({ 
          data: {
            nickname: userInfo.nickname,
            password: userInfo.password,
          },
          message: "edit ok" });
      }
    } catch {
      return console.log("회원정보 수정 잘못되었음");
    }
  },
  delete: async (req, res) => {
    // 카카오 로그인한 사람 회원탈퇴할때 카카오 연결 끊기 해줘야함
    const userInfo = await func.checkUser(req.query.email);
    console.log('쿼리문 뭡니까',req.query)
    try {
      await models.user_fish.destroy({ where: { user_id: userInfo.id } });
      await models.user.destroy({ where: { email: userInfo.email } });
      return res.status(200).json({ message: "delete ok" });
    } catch (err){
      return console.log("유저 삭제 잘못되었음", err);
    }
  },
};
