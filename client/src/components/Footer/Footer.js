import React from "react";
import styled from "styled-components";
import Logo from "../../img/logo.jpg";

const Bdiv = styled.div`
  margin-top: 10px;
  display: flex;
  box-shadow: 10 10px 0px #3c4a5645;
`;

const Div = styled.div`
  flex: 1;
  padding-bottom: 20px;
  
`;

const Pbold = styled.p`
  font-weight: 700;
  font-size: 23px;
  opacity: 0.5;
`;

const Alink = styled.a`
  text-decoration: none;
  margin-right: 1rem;
  opacity: 0.5;
  width:1rem;
`;

const Position = styled.div`
  font-size: 20px;
  opacity: 0.5;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  font-weight: 600;
`;

function Footer() {
  return (
    <Bdiv>
      <Div>
        <img
          src={Logo}
          alt="logo"
          style={{ width: 280, height: 100, color: "black" }}
        />
      </Div>
      <Div>
        <Pbold>ABOUT US</Pbold>
          <div>
            <Alink
              href="https://github.com/codestates/Dajavas"
              target="_blank"
              rel="noreferrer"
              style={{color: 'gray', fontWeight:'bolder' ,fontSize: '1rem'}}
            >
            repository
            </Alink>
        </div>
        <div>
            <Alink
              href="https://github.com/codestates/Dajavas/wiki"
              target="_blank"
              rel="noreferrer"
              style={{color: 'gray', fontWeight:'bolder'}}
            >
              wiki
            </Alink>
        </div>
        
      </Div>
      <Div>
        <Pbold>TEAM MEMBERS</Pbold>
        <Position>Frontend</Position>
        <Alink
          href="https://github.com/soyoung931014"
          target="_blank"
          rel="noreferrer"
          style={{color: 'gray', fontWeight:'bolder' ,fontSize: '1rem'}}
        >
          박소영
        </Alink>
        <Alink
          href="https://github.com/boyoung589"
          target="_blank"
          rel="noreferrer"
          style={{color: 'gray', fontWeight:'bolder' ,fontSize: '1rem'}}
        >
          양보영
        </Alink>
        <Position>Backend</Position>
        <Alink
          href="https://github.com/sunyeongjeong"
          target="_blank"
          rel="noreferrer"
          style={{color: 'gray', fontWeight:'bolder' ,fontSize: '1rem'}}
        >
          정선영
        </Alink>
        <Alink
          href="https://github.com/Jhin3283"
          target="_blank"
          rel="noreferrer"
          style={{color: 'gray', fontWeight:'bolder' ,fontSize: '1rem'}}
        >
          정현진
        </Alink>
      </Div>
    </Bdiv>
  );
}

export default Footer;
