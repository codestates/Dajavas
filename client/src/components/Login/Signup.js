import React from 'react'

function Signup() {

    const moveToHome = () => {
        window.location.replace('/');
    }
    const moveToLogin = () => {
        window.location.href='/login';
    }

    return (
        <>
            Signup
            <div>
                <div>
                    <div>
                        <input type='text' placeholder='이메일' />
                    </div>
                    <div>
                        형식이 올바르지 않습니다
                    </div>
                    <button>중복확인</button>
                </div>
                <div>
                    <div>
                        <input type='text' placeholder='닉네임' />
                    </div>
                    <div>
                        2~10자의 길이로 작성해주세요
                    </div>
                    <button>중복확인</button>

                </div>
                <div>
                    <div>
                        <input type='text' placeholder='비밀번호' />
                    </div>
                    <div>
                        비밀번호 형식이 올바르지 않습니다
                    </div>
                </div>
                <div>
                    <div>
                        <input type='text' placeholder='비밀번호 확인' />
                    </div>
                    <div>
                        비밀번호와 일치하지 않습니다
                    </div>
                </div>
            </div>
            <button>
                구글로 회원가입
            </button>
            <button>
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
