import api from "./index";

const userApi = {
  //유저 로그인 /user/login
  login: async (info) => {
    const res = await api.post("/user/login", info); //소셜로그인과 구분되게 /user/login/general
  },
  //유저 소셜로그인
  kakao: (authorizationCode) => {
    return api.post(
      "/user/login/social", //일반 로그인, 구글과 구분되게 /user/login/kakao 로 바꾸면 어떨까요
      { authorizationCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  google: (authorizationCode) => {
    return api.post(
      "/user/login/social", //'user/login/google
      { authorizationCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  //유저 회원가입
  signup: (info) => api.post("/user/signup", info),
  //유저 로그아웃
  logout: async (login_method, userId) => {
    const res = await api.get(`/user/logout/${login_method}/${userId}`);
  },
  //이메일 중복검사
  checkEmail: (email) => api.get(`/user/emailcheck?email=${email}`),
  //닉네임 중복검사
  checkNickName: (nickname) => api.get(`/user/namecheck?nickname=${nickname}`),
};

export default userApi;
