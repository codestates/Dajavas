import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import media from 'styled-media-query';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fa'; //구글 아이콘
import { RiKakaoTalkFill } from 'react-icons/ri'; //카카오 아이콘

import {
    loginAction,
} from '../../store/actions';
import userApi from '../../API/user';

function Login({type}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({ //입력값
        email: '',
        password: '',
    });

    const [validated, setValidated] = useState({ //유효성 검사 통과여부
        email: true,
        password: true,
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isOnVerification, setIsOnVerification] = useState(false); //모든항목 유효성 검사 통과여부

    const handleLoginInputValue = debounce(async (e) => {
        const {name, value} = e.target;
        setInputValue({...inputValue, [name]: value});
        if(name === 'email'){
            const emailVal = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
            setValidated({...validated, [name]: emailVal})
        } else if(name === 'password'){
            const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(value);
            /*  조건1. 6~20 영문 대소문자
                조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함  
            */
            setValidated({...validated, [name]: passwordVal});

        }
    }, 200);

    const handleLogin = async (e) => {
        e.preventDefault();
        const valResult = validated.email && validated.password;
        if(valResult){
            const signInputValue = {...inputValue};
            try{
                const res = await userApi.login(signInputValue);
                if(res.status === 200){
                    dispatch(loginAction(res.data));
                    navigate('/home', {replace: true})
                }
            } catch (err){
                setErrorMessage('입력하신 내용을 다시 확인해주세요');
            }
        }
    }

    const handleLoginKakao = () => {
        window.location.assign(
          `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&state=kakao`
        );
    };
    
      const handleLoginGoogle = () => {
        window.location.assign(
          `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&state=google`
        );
    };
    

    return (
        <>
            <div className='loginInputContainer'>
                login
                <div>
                    <input 
                        type='text' 
                        placeholder='이메일'
                        onChange={handleLoginInputValue}
                    />
                </div>
                <div>
                    <input 
                        type='text' 
                        placeholder='비밀번호'
                        onChange={handleLoginInputValue}
                    />
                </div>
                <button onClick={handleLogin}>로그인</button>
            </div>
            <button className='google' onClick={handleLoginGoogle}>
                구글로 로그인
            </button>
            <button className='kakao' onClick={handleLoginKakao}>
                카카오로 로그인
            </button>
            <button onClick = {()=> navigate('/home', {replace: false})}>
                홈으로
            </button>
            <div>
                아직 아이디가 없으신가요?
            </div>
            <button onClick={()=> navigate('/signup', {replace: false})}>
                회원가입
            </button>
            <div>{errorMessage}</div>
        </>
    )
}

export default Login
