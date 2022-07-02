import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Footer from "../../Footer/Footer";
import { connect } from "react-redux";
import Modal from "../../Modal/Modal";
import { useNavigate } from "react-router-dom";

const AWS = require("aws-sdk/dist/aws-sdk-react-native");

const Background = styled.div`
  background-color: #8bbac2;
  width: 100%;
  height: 80vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Div = styled.div`
  background-color: #abccff;
  height: 65vh;
  width: 40vw;
  background-color: #ebf1f1;
  border-radius: 8px;
  padding-bottom: 5px;
  border: gray 0.1px solid;
  box-shadow: 0 10px 25px #3c4a5645;
  margin-top: 3.5rem;
`;
const Day = styled.div`
  margin: 1rem;
  font-size: large;
  font-weight: bold;
  opacity: 0.7;
`;
const File = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px gray;
  border-top: solid 1px gray;
  margin: 0 1rem;
  opacity: 0.6;
`;
const Input = styled.input`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const Size = styled.input`
  border: 0 solid black;
  outline: none;
`;

const Select = styled.select`
  border: 0;
  outline: none;
`;
const Photo = styled.img`
  border: solid gray 2px;
  opacity: 0.6;
  margin: 0.8rem;
  padding: 2rem;
  width: 20rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Fish = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
  margin: 1rem;
  border-bottom: solid 1px gray;
  border-top: solid 1px gray;
  opacity: 0.6;
`;
const Span = styled.span`
  margin: 0.3rem;
  font-size: large;
  font-weight: bold;
  color: black;
  opacity: 1;
`;
const Btn = styled.div`
  margin-top: 2.2rem;
  font-size: large;
  font-weight: bold;
  opacity: 0.7;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.5);
    cursor: pointer;
    color: coral;
  }
`;

function BoardContent({ userInfo }) {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [photo, setPhoto] = useState("");
  const [size, setSize] = useState("");

  const fishList = [
    "선택하세요",
    "가자미",
    "갈치",
    "개서대",
    "농어",
    "넙치",
    "도다리",
    "돔",
    "민어",
    "방어",
    "볼락",
    "붕장어",
    "살오징어",
    "우럭",
    "청어",
    "뱀장어",
    "산천어",
    "송어",
    "쏘가리",
  ];
  const [fishName, setFishName] = useState("");

  // 오늘날짜
  let now = new Date();
  let year = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let today = now.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let dayOfWeek = week[now.getDay()];

  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: `{process.env.REACT_APP_AWS_IMG_ID}`,
    }),
  });

  // 파일 업로드
  const firstImgHandle = (event) => {
    const imageFile = event.target.files[0];
    setPhoto(imageFile);

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "dajavasimage",
        Key: imageFile.name,
        Body: imageFile,
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        setPhoto(data.Location);
      },
      function (err) {
        console.log(err);
      }
    );
  };

  // ADD
  const save = (e) => {
    e.preventDefault();
    if (!photo || !fishName || !size) {
      alert("모두 입력해주세요");
    } else {
      axios({
        url: `${process.env.REACT_APP_BASE_URL}fish/board`,
        data: {
          fish_name: fishName,
          src: photo,
          size: size,
          userId: userInfo.id,
          ranked: "0",
        },
        method: "post",
        headers: { authorizationToken: userInfo.accessToken },
      })
        .then((result) => {
          alert("작성되었습니다");
          setTimeout(() => {
            navigate("/fishboard");
          }, 1000);
        })
        .catch((err) => {
          alert("작성에 실패했습니다.");
          return;
        });
    }
  };

  const goHome = () => {
    alert("로그인을 하세요");
    navigate("/login");
  };
  const setfishname = (e) => {
    setFishName(e.target.value);
  };
  const setsize = (e) => {
    setSize(e.target.value);
  };

  return (
    <>
      <Background>
        <Modal text="내가 잡은 물고기를 기록해보아요" />

        <Container>
          <Div>
            <form onSubmit={save}>
              <Day>
                {year}년 {todayMonth}월 {today}일 {dayOfWeek}요일
              </Day>
              <File>
                <Photo src={photo} alt="사진" />
                <Input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={firstImgHandle}
                />
              </File>

              <Fish>
                <div>
                  <Span>어종 선택 </Span>
                  <Select onChange={(e) => setfishname(e)}>
                    {fishList.map((el, idx) => (
                      <option value={el} key={idx}>
                        {el}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Span>크기</Span>
                  <Size box type="text" onChange={(e) => setsize(e)}></Size>
                  <Span>cm</Span>
                </div>
              </Fish>
              {userInfo.isLogin === false ? (
                <>
                  <Btn onClick={goHome}>기록 저장</Btn>
                </>
              ) : (
                <>
                  <Btn onClick={(e) => save(e)}>기록 저장</Btn>
                </>
              )}
            </form>
          </Div>
        </Container>
      </Background>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContent);
