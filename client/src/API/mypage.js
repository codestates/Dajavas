import api from "./index";

const mypageApi = {
  //마이페이지 유저정보가져오기
  getUserInfo: (email, accessToken) => {
    return api.get(`/user/mypage?email=${email}`, {
      headers: {
        AuthorizationToken: accessToken,
      },
    });
  },
  //마이페이지 유저정보변경
  modifyUserInfo: (accessToken, formData) => {
    return api.patch(
      "/user/mypage",
      {
        email: formData.get("email"),
        nickname: formData.get("nickname"),
        password: formData.get("password"),
      },
      {
        headers: {
          AuthorizationToken: accessToken,
        },
      }
    );
  },
  //마이페이지 회원탈퇴
  deleteUserInfo: (email, accessToken) => {
    return api.delete(`/user/mypage?email=${email}`, {
      headers: {
        AuthorizationToken: accessToken,
      },
    });
  },
  //마이페이지 로그아웃
  logoutUserInfo: (accessToken) => {
    return api.post(
      "/user/logout",
      {},
      {
        headers: {
          AuthorizationToken: accessToken,
        },
      }
    );
  },
};
export default mypageApi;
