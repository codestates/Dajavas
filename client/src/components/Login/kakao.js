import { React } from "react";
import axios from "axios";
import qs from "qs";
import { KAKAO_URL, REST_API_KEY, SECRET_KEY, REDIRECT_URI } from "./oauth";

function kakao() {
  // oauth kakao login
  // 코드 값 받아오기!
  let code = new URL(window.location.href).searchParams.get("code");

  const kakao = async () => {
    try {
      //
      const result = await axios.get(
        `${process.env.REDIRECT_URI}/api/v1/oauth2/authorization/kakao?code=${code}`
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div>
        <a href={KAKAO_URL}>
          <img
            src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
            width="222"
            alt="카카오 로그인"
          />
        </a>
      </div>
    </>
  );
}

export default kakao;
