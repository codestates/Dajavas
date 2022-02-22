import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import debounce from 'lodash/debounce';
import { FcGoogle } from 'react-icons/fa'; //구글 아이콘
import { RiKakaoTalkFill } from 'react-icons/ri'; //카카오 아이콘

// import {
//     modalOffAction,
//     loginAction,
// } from '../../store/actions';
import userApi from '../../API/user';

function Signup() {

    const moveToHome = () => {
        window.location.replace('/');
    }
    const moveToLogin = () => {
        window.location.href='/login';
    }

    const [inputValue, setInputValue] = useState({ //입력값
        email: '',
        nickName: '',
        password: '',
        passwordCheck: '',
    });

    const [validated, setValidated] = useState({ //유효성 검사 통과여부
        email: true,
        nickName: true,
        password: true,
        passwordCheck: true,
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isOnVerification, setIsOnVerification] = useState(false); //모든항목 유효성 검사 통과여부

    const handleSignupInputChange = debounce(async (e) => {
        const { name, value } = e.target;
        setInputValue({...inputValue, [name]: value});

        if(name === 'email') {
            const emailVal = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
            setValidated({...validated, [name]: emailVal});
            if(value === '') {
                setErrorMessage('');
            } else if(emailVal) {
                setErrorMessage('');
                try {
                    const res = await userApi.checkEmail(value);
                    res.status === 200 && setErrorMessage('');
                } catch (err){
                    setErrorMessage('이미 가입된 이메일입니다.');
                }
            } else {
                setErrorMessage('이메일 형식이 올바르지 않습니다.');
            }
        } else if(name === 'password') {
            const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(value);
            /*  조건1. 6~20 영문 대소문자
                조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함  
            */
            setValidated({ ...validated, [name]: passwordVal });
            if (value === "") setErrorMessage("");
            else if (passwordVal) {
            setErrorMessage("");
            } else {
            setErrorMessage("6-20글자 숫자 혹은 특수 문자를 포함해야 합니다.");
            }
        } else if(name === 'passwordCheck'){
            const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(value);
            const passwordCheckVal = value === inputValue.password;
            if(value === '') {
                setErrorMessage('');
            } else if(passwordVal && passwordCheckVal) {
                setErrorMessage('');
            } else {
                setErrorMessage('비밀번호가 일치하지 않습니다.');
            }
        } else if(name === 'nickName'){
            try {
                const res = await userApi.checkNickName(value);
                res.status === 200 && setErrorMessage('');
                // setErrorMessage('');
            } catch(err){
                setErrorMessage('이미 사용중인 닉네임입니다.');
            }
        }
        
    }, 200);

    const handleSignup = async (e) => {
        e.prevenetDefault(); //에러메시지 1초만에 사라지는 것 방지
        const valResult = Object.values(validated).every((el) => {return el === true});
        if(valResult){
            const signInputValue = {...inputValue};
            delete signInputValue.passwordCheck;
            try{
                const res = await userApi.signup(signInputValue);
                res.status === 200 && setIsOnVerification(true);
            } catch(err){
                setErrorMessage('정보를 확인해주세요');
            }
        } else {
            setErrorMessage('정보를 확인해주세요');
        }
    }

    const handleSignKakao = () => {
        window.location.assign(
          `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&state=kakao`
        );
    };
    
    const handleSignGoogle = () => {
        window.location.assign(
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&state=google`
        );
    };

    return (
        <>
            Signup
            <div className='SignupInputContainer'>
                <div>
                    <div>
                        <input name='email' type='text' placeholder='이메일' onChange={handleSignupInputChange}/>
                    </div>
                </div>
                <div>
                    <div>
                        <input name='nickName' type='text' placeholder='닉네임' onChange={handleSignupInputChange}/>
                    </div>
                </div>
                <div>
                    <div>
                        <input name='password' type='text' placeholder='비밀번호' />
                    </div>
                </div>
                <div>
                    <div>
                        <input name='passwordCheck' type='text' placeholder='비밀번호 확인' />
                    </div>
                </div>
                <div>
                    <div>
                        {errorMessage}
                    </div>
                </div>
            </div>
            <button className='generalSignup' onClick={handleSignup}>회원가입</button>
            <button className='google' onClick={handleSignGoogle}>
                구글로 회원가입
            </button>
            <button className='kakao' onClick={handleSignKakao}>
                카카오로 회원가입
            </button>
            <button onClick={moveToHome}>
                홈으로
            </button>
            <button onClick={moveToLogin}>로그인</button>
        </>
    )
}

export default Signup
