import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { FaCrown } from "react-icons/fa";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
const AWS = require("aws-sdk/dist/aws-sdk-react-native");

const Div = styled.div`
  height: 60vh;
  width: 50vw;
  margin-bottom: 5px;
`;
const Day = styled.div`
  border: dotted black 2px;
  margin: 1rem;
  padding: 1rem;
`;
const File = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: gray 0.1px solid;
  margin: 0 1rem;
`;
const Input = styled.input`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Photo = styled.img`
  border: gray 0.1px solid;
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
  border: gray 0.1px solid;
`;
const Text = styled.div`
  font-size: ${(props) => (props.RankRegisteraiton ? "1rem" : "1.2rem")};
  font-weight: bolder;
  color: gray;
  opacity: 0.9;
  margin-bottom: 10px;
  margin-top: ${(props) => (props.RankRegisteraiton ? "15px" : "")};
  &:hover {
    cursor: ${(props) => (props.RankRegisteraiton ? "pointer" : "")};
  }
`;

const Span = styled.span`
  outline: none;
  border: 0;
  font-size: 1rem;
  font-weight: bolder;
  color: gray;
  opacity: 0.9;
`;
const Btn = styled.button`
  background-color: #8bbac2;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  &:hover {
    cursor: pointer;
    background-color: coral;
  }
  box-shadow: 0 10px 25px #3c4a5645;
`;
const SubText = styled.div`
  font-size: 0.3rem; ;
`;
const Size = styled.input`
  border: 0;
  outline: none;
`;

const Select = styled.select`
  border: 0;
  outline: none;
`;

function UpdateBoardContent({ targetFish, userInfo, navigation }) {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // 기록 하는곳
  const [record, setRecord] = useState(targetFish);
  const [photo, setPhoto] = useState(record.src);
  const [size, setSize] = useState(record.size);
  const [rank, ranked] = useState(false);
  const fishList = [
    "변경안함",
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
  const [fishName, setFishName] = useState(record.fish_name);

  const selectRank = () => {
    ranked(!rank);
    if (rank === true) {
      return 1;
    } else {
      return 0;
    }
  };

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
        Bucket: "dajavas-photo",
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

  // 수정
  const save = (e) => {
    e.preventDefault();

    if (!photo || !fishName || !size) {
      alert("모두 입력해주세요");
    }
    if (fishName === "변경안함") {
      axios({
        url: `${process.env.REACT_APP_BASE_URL}fish/board`,
        method: "put",
        headers: { authorizationtoken: userInfo.accessToken },
        data: {
          ...record,
          src: photo,
          size: size,
          ranked: rank,
          userId: userInfo.id,
        },
      });
    } else {
      axios({
        url: `${process.env.REACT_APP_BASE_URL}fish/board`,
        method: "put",
        headers: { authorizationtoken: userInfo.accessToken },
        data: {
          ...record,
          fish_name: fishName,
          src: photo,
          size: size,
          ranked: rank,
          userId: userInfo.id,
        },
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err));
    }

    setTimeout(() => {
      navigate("/fishboard");
    }, 500);
  };

  return (
    <Div>
      <form onSubmit={save}>
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
            <Text>
              내가 선택한 어종:{" "}
              <span style={{ fontWeight: "bolder" }}>{fishName} </span>
            </Text>
            <Span>어종 선택 </Span>
            <Select onChange={(e) => setFishName(e.target.value)}>
              {fishList.map((el, idx) => (
                <option value={el} key={idx}>
                  {el}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Span>크기</Span>
            <Size
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            ></Size>
            <Span>cm</Span>
            <Text RankRegisteraiton onClick={() => selectRank()}>
              랭크 등록
            </Text>
            <SubText>(클릭하면 랭크에 등록돼요!)</SubText>
            {rank === false ? "" : <FaCrown size="30px" color="gold" />}
          </div>
        </Fish>
        <Btn onClick={(e) => save(e)}>기록 저장</Btn>
      </form>
    </Div>
  );
}

const mapStateToProps = (state) => {
  return {
    targetFish: state.updateFishReducer.data,
    userInfo: state.userReducer,
  };
};

export default connect(mapStateToProps)(UpdateBoardContent);
