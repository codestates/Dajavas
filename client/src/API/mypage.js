import { applyMiddleware } from 'redux';
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
    // modifyUserInfo: (accessToken, nickname, password, email) => {
    modifyUserInfo: (accessToken, formData) => {
 
        // return api.post('/user/mypage', formData, {
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //         'AuthorizationToken': accessToken,
        //     }
        // });

        return api.patch('/user/mypage',{
            email: formData.get("email"),
            nickname: formData.get("nickname"),
            password: formData.get("password"),
        }, {
            headers: {
                // 'content-type': 'multipart/form-data',
                'AuthorizationToken': accessToken,
            }
        });

    },
    //마이페이지 회원탈퇴
    deleteUserInfo: (email, accessToken) => {
        return api.delete(`/user/mypage?email=${email}`, {
            headers: {
                'AuthorizationToken': accessToken
            }
        })
    },
    //마이페이지 로그아웃
    logoutUserInfo: (accessToken)=>{
        return api.post('/user/logout',{},{
            headers: {
                'AuthorizationToken': accessToken
            }
        })
    }
}
export default mypageApi;