const models = require("../../models");
const func = require("../function");

module.exports = {
  get: async (req, res) => {
    // const validate = await func.validateToken(req.headers.authorizationtoken);
    const userInfo = await func.checkUser(req.query.email);
    const result = [];
    const data = await models.location.findAll({
      where: { user_id: userInfo.id },
    });
    async function arr() {
      for (let i = 0; i < data.length; i++) {
        const locationInfo = await models.location.findOne({
          where: { user_id: data[i].user_id },
        });
        result.push({
          id: locationInfo.id,
          location_name: locationInfo.location_name,
          lat: locationInfo.lat,
          long: locationInfo.long,
        });
      }
    }
    try {
      // if (!validate) {
      //   return res.status(401).send({ message: "not authorized" });
      // } else {
      await arr();
      return res.status(200).send({ data: { result } });
      // }
    } catch {
      return console.log("유저 즐겨찾기 위치 조회 잘못되었음");
    }
  },
  post: async (req, res) => {
    const { location_name, userId, lat, long } = req.body;
    const validate = await func.validateToken(req.headers.authorizationtoken);
    try {
      if (!validate) {
        return res.status(401).send({ message: "not authorized" });
      } else {
        await models.location.create({
          location_name: location_name,
          user_id: userId,
          lat: lat,
          long: long,
        });
        return res.status(201).send({ message: `${userId}` });
      }
    } catch {
      return console.log("유저 즐겨찾기 위치 등록 잘못되었음");
    }
  },
  patch: async (req, res) => {
    const { locationId, location_name } = req.body;
    const validate = await func.validateToken(req.headers.authorizationtoken);
    try {
      if (!validate) {
        return res.status(401).send({ message: "not authorized" });
      } else {
        await models.location.update(
          {
            location_name: location_name,
          },
          { where: { id: locationId } }
        );
        return res.status(200).send({ message: "location_name change" });
      }
    } catch {
      return console.log("유저 즐겨찾기 위치 이름수정 잘못되었음");
    }
  },
  delete: async (req, res) => {
    const { locationId } = req.body;
    const validate = await func.validateToken(req.headers.authorizationtoken);
    try {
      if (!validate) {
        return res.status(401).send({ message: "not authorized" });
      } else {
        await models.location.destroy({
          where: {
            id: locationId,
          },
        });
        return res.status(200).send({ message: "deleted location" });
      }
    } catch {
      return console.log("유저 즐겨찾기 위치 삭제");
    }
  },
};
