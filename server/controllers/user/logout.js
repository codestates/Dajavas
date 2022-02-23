const func = require("../function");

// test 시 로그인 해서 토큰 받아서 적용할 것!

module.exports = {
  post: async (req, res) => {
    //console.log("--------------", req);
    const validate = await func.validateToken(req.headers.authorizationtoken);
    if (!validate) {
      res.status(401).json({ message: "not authorized" });
    }
    res.status(200).json({ message: "logout" });
  },
};
