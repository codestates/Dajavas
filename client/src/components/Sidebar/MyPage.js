import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import mypageApi from '../../API/mypage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    updateInfoAction,
    confirmModalOnAction,
    modalOffAction
} from '../../redux/store/actions';

function MyPage({type}) {
    const [errorMessage, setErrorMessage] = useState('');
    const [inputValue, setInputValue] = useState({
        password:'',
        passwordCheck:''
    })
    
    return (
        <>
            MyPage
            {/* {
                isLogin === false 
                ?
                <>
                <div> 로그인이 필요한 서비스입니다 </div>
                <div>
                    <Link to='/login'>로그인페이지로 이동</Link>
                </div>
                </>
                : */}
            <>
                <div>
                    <div>
                        <input type='text' placeholder='이메일' value='a@gmail.com'/>
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
            {/* } */}
        </>
    )
}

export default MyPage
