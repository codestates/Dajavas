import api from "./index";

const userApi = {
  //유저 로그인 /user/login
  login: (info) => {
    return api.post("/user/login", info);
  },
  //유저 소셜로그인
  kakao: (authCode) => {
    return api.post(
      "/user/login/kakao",
      { authCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  //유저 회원가입
  signup: (info) => api.post("/user/signup", info),

  //이메일 중복검사
  checkEmail: (email) => api.get(`/user/emailcheck?email=${email}`),
  //닉네임 중복검사
  checkNickName: (nickname) => api.get(`/user/namecheck?nickname=${nickname}`),
};

export default userApi;
