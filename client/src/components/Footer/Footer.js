import React from "react";
import styled from "styled-components";
import Logo from "../../img/javas.png";

const Bdiv = styled.div`
  margin-top: 30px;
  display: flex;
`;

const Div = styled.div`
  flex: 1;
  padding-bottom: 20px;
`;

const Pbold = styled.p`
  font-weight: 700;
  font-size: 23px;
`;

const Alink = styled.a`
  text-decoration: none;
  margin-right: 1rem;
`;

const Position = styled.div`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.59);
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
          style={{ width: 300, height: 180, color: "black" }}
        />
      </Div>
      <Div>
        <Pbold>ABOUT US</Pbold>
        <Alink
          href="https://github.com/codestates/Dajavas"
          target="_blank"
          rel="noreferrer"
        >
          repository
        </Alink>
        <Alink
          href="https://github.com/codestates/Dajavas/wiki"
          target="_blank"
          rel="noreferrer"
        >
          wiki
        </Alink>
      </Div>
      <Div>
        <Pbold>TEAM MEMBERS</Pbold>
        <Position>Frontend</Position>
        <Alink
          href="https://github.com/soyoung931014"
          target="_blank"
          rel="noreferrer"
        >
          박소영
        </Alink>
        <Alink
          href="https://github.com/boyoung589"
          target="_blank"
          rel="noreferrer"
        >
          양보영
        </Alink>
        <Position>Backend</Position>
        <Alink
          href="https://github.com/sunyeongjeong"
          target="_blank"
          rel="noreferrer"
        >
          정선영
        </Alink>
        <Alink
          href="https://github.com/Jhin3283"
          target="_blank"
          rel="noreferrer"
        >
          정현진
        </Alink>
      </Div>
    </Bdiv>
  );
}

export default Footer;
