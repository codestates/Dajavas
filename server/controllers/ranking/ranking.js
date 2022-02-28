const models = require("../../models");
const func = require("../function");

module.exports = {
  get: async (req, res) => {
    const { email, fishName } = req.query;
    const allFiltered = [];
    const page = req.query.page || 1;
    const result = [];
    let realResult = [];
    const filteredFish = await models.fish.findAll({
      where: { ranked: 1, fish_name: fishName },
    });
    async function arrPush() {
      for (let i = 0; i < filteredFish.length; i++) {
        const findRank = await models.fish.findOne({
          where: { id: filteredFish[i].id },
        });
        const findUser = await models.user_fish.findOne({
          where: { fish_id: filteredFish[i].id },
        });
        const userInfo = await models.user.findOne({
          where: { id: findUser.id },
        });
        result.push({
          fish_name: findRank.fish_name,
          src: findRank.src,
          size: findRank.size,
          ranked: findRank.ranked,
          createdAt: findRank.createdAt,
          nickname: userInfo.nickname,
        });
      }
      result.sort(function (a, b) {
        if (a.size > b.size) return -1;
        if (a.size === b.size) return 0;
        if (a.size < b.size) return 1;
      });
      realResult = result.slice((page - 1) * 5, page * 5);
    }
    try {
      await arrPush();
      return res.status(200).json({ data: { realResult } });
    } catch {
      return console.log("품종별 크기 랭킹 조회 잘못되었음");
    }
  },
};
