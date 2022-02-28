const func = require("../function");
const { accessToken } = require("./accesstoken");
// test 시 로그인 해서 토큰 받아서 적용할 것!

module.exports = {
  post: async (req, res) => {
    //console.log("--------------", req);
    // 일반 토큰 로그아웃?
    const validate = await func.validateToken(req.headers.authorizationtoken);
    if (!validate) {
      res.status(401).json({ message: "not authorized" });
    }
    res.status(200).json({ message: "logout" });
    // 카카오 로그아웃( 액세스 토큰과 리프레시 토큰을 모두 만료)
    // 로그아웃 요청 성공 시, 응답 코드와 로그아웃된 사용자의 회원번호 받음
    // 웹 브라우저의 카카오계정 세션은 만료되지 않고, 로그아웃을 호출한 앱의 토큰만 만료
    // const _url = "https://kapi.kakao.com/v1/user/logout";
    // const _headers = {
    //   Authorization: `Bearer ${accessToken}`,
    // };
    // console.log(this.accessToken);
    // //console.log(JSON.stringify(_headers));
    // return await lastValueFrom(this.http.post(_url, "", { headers: _headers }));
  },
};
