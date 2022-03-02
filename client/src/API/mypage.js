import api from './index';

const mypageApi = {
    //마이페이지 유저정보가져오기
    getUserInfo: (email, accessToken) => {
        return api.get(`/user/mypage?email=${email}`, {
            headers: {
                'AuthorizationToken': accessToken
            }
        })
    },
    //마이페이지 유저정보변경
    //axios.put(`/user/mypage/login_method/email`, {nickName: a, password: 123})
    modifyUserInfo: (accessToken, formData) => {
        console.log('api 요청시 formData', formData);
        // return api.put(`/user/mypage/${login_method}/${email}`, formData, {
        // return api.put(`/user/mypage/${email}`, formData, {
        return api.put('/user/mypage', formData, {
            headers: {
                "content-type": "multipart/form-data",
               'AuthorizationToken': accessToken,
            }
        });

    },
    //마이페이지 회원탈퇴
    deleteUserInfo: (email, login_method, accessToken) => {
        return api.delete(`/user/mypage/${login_method}/${email}`, {
            headers: {
                'AuthorizationToken': accessToken
            }
        })
    }
}
export default mypageApi;