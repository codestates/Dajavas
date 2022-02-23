const axios = require("axios");
const { REACT_APP_KAKAO_REST_KEY, REACT_APP_REDIRECT_URI } = process.env;

module.exports = async (code) => {
  const data = {
    grant_type: "authorization_code",
    client_id: REACT_APP_KAKAO_REST_KEY,
    redirect_uri: REACT_APP_REDIRECT_URI || "http://localhost:3000/oauth/kakao",
    code,
  };
  console.log("========", data);
  const queryString =
    "https://kauth.kakao.com/oauth/token?" +
    Object.keys(data)
      .map((key) => `${key}=${data[key]}`)
      .join("&");

  return await axios.post(queryString);
};
