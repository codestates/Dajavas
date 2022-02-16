import React from 'react'

function MyPage() {

    const moveToHome = () => {
        window.location.replace('/');
    }

    return (
        <>
            MyPage
            <div>
                <div>
                    <input type='text' placeholder='이메일' />
                </div>
                <div>
                    <div>
                        <input type='text' placeholder='닉네임' />
                    </div>
                    <button>중복확인</button>
                </div>
                <div>
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
                    <div>
                        소셜로그인은 비밀번호 변경이 되지 않습니다
                    </div>
                </div>
                <button>
                    수정
                </button>
            </div>
            <button>
                로그아웃
            </button>
            <button >
                회원탈퇴
            </button>
        </>
    )
}

export default MyPage
