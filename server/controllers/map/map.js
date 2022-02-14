const models = require("../../models");
const func = require("../function");

module.exports = {
  get: async (req, res) => {
    const validate = await func.validateToken(req.headers.Authorizationtoken);
    const userInfo = await func.checkUser(req.query.email);
    try {
      if (!validate) {
        return res.status(401).send({ response: "not authorized" });
      } else {
        const data = await models.location.findAll({
          where: { user_id: userInfo.id },
        });
        return res.status(200).send({ data: data });
      }
    } catch {
      return console.log("유저 즐겨찾기 위치 조회 잘못되었음");
    }
  },
  post: async (req, res) => {
    const { location_name, userId, lat, long } = req.body;
    const validate = await func.validateToken(req.headers.Authorizationtoken);
    try {
      if (!validate) {
        return res.status(401).send("not authorized");
      } else {
        await models.location.create({
          location_name: location_name,
          user_id: userId,
          lat: lat,
          long: long,
        });
        return res.status(201).send({ response: `${userId}` });
      }
    } catch {
      return console.log("유저 즐겨찾기 위치 등록 잘못되었음");
    }
  },
  patch: async (req, res) => {
    const { locationId, location_name } = req.body;
    const validate = await func.validateToken(req.headers.Authorizationtoken);
    try {
      if (!validate) {
        return res.status(401).send("not authorized");
      } else {
        await models.location.update(
          {
            location_name: location_name,
          },
          { where: { id: locationId } }
        );
        return res.status(200).send({ response: "location_name change" });
      }
    } catch {
      return console.log("유저 즐겨찾기 위치 이름수정 잘못되었음");
    }
  },
  delete: async (req, res) => {
    const { locationId } = req.body;
    const validate = await func.validateToken(req.headers.Authorizationtoken);
    try {
      if (!validate) {
        return res.status(401).send({ response: "not authorized" });
      } else {
        await models.location.destroy({
          where: {
            id: locationId,
          },
        });
        return res.status(200).send({ response: "deleted location" });
      }
    } catch {
      return console.log("유저 즐겨찾기 위치 삭제");
    }
  },
};
