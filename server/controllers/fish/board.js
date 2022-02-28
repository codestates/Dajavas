const models = require("../../models");
const func = require("../function");

module.exports = {
  get: async (req, res) => {
    const page = req.query.page || 1;
    const userInfo = await func.checkUser(req.query.email);
    const filterFishId = [];
    const result = [];
    let realResult = [];
    const filteredId = await models.user_fish.findAll({
      where: { user_id: userInfo.id },
    });
    const validate = await func.validateToken(req.headers.authorizationtoken);
    async function arrPush() {
      for (let i = 0; i < filteredId.length; i++) {
        filterFishId.push(filteredId[i].fish_id);
      }
      for (let i = 0; i < filterFishId.length; i++) {
        const findFish = await models.fish.findOne({
          where: { id: filterFishId[i] },
        });
        result.push({
          fish_name: findFish.fish_name,
          src: findFish.src,
          size: findFish.size,
          ranked: findFish.ranked,
          createdAt: findFish.createdAt,
          fishId: findFish.id,
        });
      }
      realResult = result.slice((page - 1) * 5, page * 5);
    }
    try {
      if (!validate) {
        return res.status(401).send({ message: "not authorized" });
      } else {
        await arrPush();
        return res.status(200).send({ data: { realResult } });
      }
    } catch {
      return console.log("유저 사진 조회 잘못되었음");
    }
  },
  post: async (req, res) => {
    const { fish_name, size, ranked, src, userId } = req.body;
    const validate = await func.validateToken(req.headers.authorizationtoken);

    try {
      if (!validate) {
        return res.status;
      }
      const fish = await models.fish.create({
        fish_name: fish_name,
        size: size,
        ranked: ranked,
        src: src,
        userId: userId,
      });
      await models.user_fish.create({
        fish_id: fish.id,
        user_id: userId,
      });
      return res.status(201).send({ message: `${userId}` });
    } catch {
      return console.log("유저 사진 기록 잘못되었음");
    }
  },
  put: async (req, res) => {
    const { fishId, fish_name, size, ranked, src, userId } = req.body;
    const validate = await func.validateToken(req.headers.authorizationtoken);
    try {
      if (!validate) {
        return res.status(401).send({ message: "not authorized" });
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
        return res.status(200).send({ message: "edit ok" });
      }
    } catch {
      return console.log("유저 사진 수정 잘못되었음");
    }
  },
  delete: async (req, res) => {
    const { email, userId, fishId } = req.body;
    const validate = await func.validateToken(req.headers.authorizationtoken);
    try {
      if (!validate) {
        return res.status(401).send({ message: "not authorized" });
      } else {
        await models.user_fish.destroy({ where: { fish_id: fishId } });
        await models.fish.destroy({ where: { id: fishId } });
        return res.status(200).send({ message: "deleted fish board" });
      }
    } catch {
      return console.log("유저 사진 삭제 잘못되었음");
    }
  },
};
