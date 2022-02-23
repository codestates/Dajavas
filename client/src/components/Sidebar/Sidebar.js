import React from 'react'
import { useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styles from './sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars  } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Div = styled.div`
  border: dotted red 2px;
`


const Sidebar = ({ width=280, isLogin, userInfo }) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(width);
    const side = useRef();
    
    // button 클릭 시 토글
    const toggleMenu = () => {
      if (xPosition > 0) {
        setX(0);
        setOpen(true);
      } else {
        setX(width);
        setOpen(false);
      }
    };
    
    // 사이드바 외부 클릭시 닫히는 함수
    const handleClose = async e => {
      let sideArea = side.current;
      let sideCildren = side.current.contains(e.target);
      if (isOpen && (!sideArea || !sideCildren)) {
        await setX(width); 
        await setOpen(false);
      }
    }
  
    useEffect(()=> {
      window.addEventListener('click', handleClose);
      return () => {
        window.removeEventListener('click', handleClose);
      };
    })
  

    return (
        <Div className={styles.container}>
            <div ref={side}  className={styles.sidebar} style={{ width: `${width}px`, height: '100%',  transform: `translatex(${-xPosition}px)`}}>
                <FontAwesomeIcon icon={faBars}
                    className={styles.icon}
                    onClick={() => toggleMenu()}
                    className={styles.button} 
                >
                {/* {isOpen ? 
                <span>X</span> : <img src="images/avatar.png" alr="contact open button" className={styles.openBtn}/>
                } */}
                </FontAwesomeIcon>
                {
                  isLogin === true ?
                  <div>{userInfo.nickname}님</div> :
                  <div>
                      <Link to='/login'>로그인</Link>
                  </div>
                }
                <div>
                    <Link to='/mypage'>마이페이지</Link>
                </div>
                <div>
                    <Link to='/fishdata'>물고기정보</Link>
                </div>
                <div>
                    <Link to='/closedseason'>금어기</Link>
                </div>
                <div>
                    <Link to='/checklist'>체크리스트</Link>
                </div>
            </div>
        </Div>
    )
}

export default Sidebar
