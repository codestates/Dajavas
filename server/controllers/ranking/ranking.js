const models = require("../../models");
const func = require("../function");

module.exports = {
  get: async (req, res) => {
    const { email, fishName } = req.query;
    const allFiltered = [];
    const page = req.query.page || 1;
    const result = [];
    const filteredFish = await models.fish.findAll({
      where: { fish_name: fishName },
    });
    const arrPush = async () => {
      for (let i = 0; i < filteredFish.length; i++) {
        allFiltered.push(
          await models.fish.findAll({
            where: { fish_name: fishName },
          })[i]
        );
      }
      allFiltered.sort(function (a, b) {
        if (a.size > b.size) return -1;
        if (a.size === b.size) return 0;
        if (a.size < b.size) return 1;
      });
      for (let i = 0; i < 5 * page; i++) {
        result.push(allFiltered[i]);
      }
    };
    try {
      arrPush();
      return res.status(200).send({ data: { result } });
    } catch {
      return console.log("품종별 크기 랭킹 조회 잘못되었음");
    }
  },
};
