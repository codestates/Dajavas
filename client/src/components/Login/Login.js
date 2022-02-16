import React from 'react'
import Sidebar from '../Sidebar/Sidebar';

function Login() {

    const moveToHome = () => {
        window.location.replace('/');
    }
    const moveToSignup = () => {
        window.location.href='/signup';
    }

    return (
        <>
            <div>
                login
                <div>
                    <input type='text' placeholder='아이디' />
                </div>
                <div>
                    <input type='text' placeholder='비밀번호' />
                </div>
                <button onClick={moveToHome}>로그인</button>
            </div>
            <button>
                구글로 로그인
            </button>
            <button>
                카카오로 로그인
            </button>
            <button onClick={moveToHome}>
                홈으로
            </button>
            <div>
                아직 아이디가 없으신가요?
            </div>
            <button onClick={moveToSignup}>
                회원가입
            </button>
        </>
    )
}

export default Login
