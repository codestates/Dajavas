const models = require("../../models");
const func = require("../function");

module.exports = {
  get: async (req, res) => {
    const userInfo = await func.checkUser(req.query.email);
    const validate = await func.validateToken(req.headers.Authorizationtoken);
    const page = req.query.page || 1;
    const allFiltered = [];
    const result = [];
    const filteredId = await models.user_fish.findAll({
      where: { user_id: userInfo.id },
    });
    const arrPush = async () => {
      for (let i = 0; i < filteredId.length; i++) {
        allFiltered.push(
          await models.fish.findAll({ where: { id: filteredId } })[i]
        );
      }
      allFiltered.sort(function (a, b) {
        if (a.updatedAt > b.updatedAt) return -1;
        if (a.updatedAt === b.updatedAt) return 0;
        if (a.updatedAt < b.updatedAt) return 1;
      });
      for (let i = 0; i < 5 * page; i++) {
        result.push(allFiltered[i]);
      }
    };
    try {
      if (!validate) {
        return res.status(401).send({ response: "not authorized" });
      } else {
        arrPush();
        return res.status(200).send({ data: { result } });
      }
    } catch {
      return console.log("유저 사진 조회 잘못되었음");
    }
  },
  post: async (req, res) => {
    const { fish_name, size, ranked, src, userId } = req.body;
    try {
      await models.fish.create({
        fish_name: fish_name,
        size: size,
        ranked: ranked,
        src: src,
        userId: userId,
      });
      return res.status(201).send({ response: `${userId}` });
    } catch {
      return console.log("유저 사진 기록 잘못되었음");
    }
  },
  put: async (req, res) => {
    const { fishId, fish_name, size, ranked, src, userId } = req.body;
    const validate = await func.validateToken(req.headers.Authorizationtoken);
    try {
      if (!validate) {
        return res.status(401).send("not authorized");
      } else {
        await models.fish.update(
          {
            fish_name: fish_name,
            size: size,
            ranked: ranked,
            src: src,
            userId: userId,
          },
          { where: { id: fishId } }
        );
        return res.status(200).send({ response: "edit ok" });
      }
    } catch {
      return console.log("유저 사진 수정 잘못되었음");
    }
  },
  delete: async (req, res) => {
    const { email, userId, fishId } = req.body;
    const validate = await func.validateToken(req.headers.Authorizationtoken);
    try {
      if (!validate) {
        return res.status(401).send({ response: "not authorized" });
      } else {
        await models.user_fish.destroy({ where: { fish_id: fishId } });
        await models.fish.destroy({ where: { id: fishId } });
        return res.status(200).send({ response: "deleted fish board" });
      }
    } catch {
      return console.log("유저 사진 삭제 잘못되었음");
    }
  },
};
