const models = require("../../models");
const func = require("../function");

module.exports = {
  get: async (req, res) => {
    const { email, fishName } = req.query;
    const allFiltered = [];
    const page = req.query.page || 1;
    const result = [];
    const filteredFish = await models.fish.findAll({
      where: { ranked: 1, fish_name: fishName },
    });
    async function arrPush() {
      // for (let i = 0; i < filteredFish.length; i++) {
      //   allFiltered.push(
      //     await models.fish.findOne({
      //       where: { fish_name: fishName,  },
      //     })[i]
      //   );
      // }
      // allFiltered.sort(function (a, b) {
      //   if (a.size > b.size) return -1;
      //   if (a.size === b.size) return 0;
      //   if (a.size < b.size) return 1;
      // });
      // for (let i = 0; i < 5 * page; i++) {
      //   result.push(allFiltered[i]);
      // }
      // console.log(result);
      for (let i = 0; i < filteredFish.length; i++) {
        const findRank = await models.fish.findOne({
          where: { fish_name: filteredFish[i].fish_name },
        });
        result.push({
          fish_name: findRank.fish_name,
          src: findRank.src,
          size: findRank.size,
          ranked: findRank.ranked,
          createdAt: findRank.createdAt,
        });
      }
      result.sort(function (a, b) {
        if (a.size > b.size) return -1;
        if (a.size === b.size) return 0;
        if (a.size < b.size) return 1;
      });
    }
    try {
      console.log(filteredFish);
      await arrPush();
      return res.status(200).send({ data: { result } });
    } catch {
      return console.log("품종별 크기 랭킹 조회 잘못되었음");
    }
  },
};
