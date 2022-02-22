import api from './index';

const mypage = {
    //마이페이지 유저정보가져오기
    getUserInfo: (userId, token) => {
        return api.get(`/user/mypage/${userId}`, {
            headers: {
                AuthorizationToken: token
            }
        })
    },
    //마이페이지 유저정보변경
    //axios.put(`/user/mypage/login_method/userId`, {nickName: a, password: 123})
    modifyUserInfo: (userId, login_method, token, formData) => {
        console.log('api 요청시 formData', formData);
        return api.put(`/user/mypage/${login_method}/${userId}`, formData, {
            headers: {
                AuthorizationToken: token
            }
        });
    },
    //마이페이지 회원탈퇴
    deleteUserInfo: (userId, login_method, token) => {
        return api.delete(`/user/mypage/${login_method}/${userId}`, {
            headers: {
                AuthorizationToken: token
            }
        })
    }
}